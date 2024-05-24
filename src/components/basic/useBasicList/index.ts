import { copyProps, dialog, download, notification } from '@/utils/help'
import { type FormInst } from 'naive-ui'
import { downloadExcel, usePagination } from './utils/index'
import { getData } from './utils/index'
import type { HookParams, Form, ListData, ModalAction } from './utils/type'
import { type RowData } from 'naive-ui/es/data-table/src/interface'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash-es'
import { useSelection } from './utils/useSelection'

export const useBasicList = <List extends Form = Form, QueryParams extends Form = Form>({
  name, // 名称
  url, // 查询url
  key = 'id', // rowKey
  isPagination = true, // 是否需要分页
  isInitQuery = true, // 是否初始化查询
  initForm = {} as List, // 表单初始化数据
  initQuery = {} as QueryParams, // 查询初始化数据
  doCreate, // 新建
  doDelete, // 删除
  doUpdate, // 编辑
  beforeRefresh, // 查询之前
  afterRefresh, // 查询之后
  beforeValidate, // 新增/编辑之前(同步)
  beforeAsyncValidate, // 新增/编辑之前（异步）
  beforeSave, // 新增/编辑保存之前
  afterSave // 新增/编辑保存之后
}: HookParams<List, QueryParams>) => {

  // 国际化
  const { t } = useI18n()

  // 操作类型
  const ACTIONS = computed(() => {
    return {
      view: t('view'),
      edit: t('edit'),
      add: t('add')
    }
  })

  const modalVisible = ref(false)
  const modalAction = ref<ModalAction>('add')
  const modalLoading = ref(false)
  const modalFormRef = ref<FormInst | null>(null)
  // 这里需要把rowkey的键存起来，方便后面修改数据的时候获取到 'id'
  const modalForm = reactive<List>({ ...initForm, [key]: undefined })

  const defualtQuery = reactive<QueryParams>({ ...initQuery })

  const modalTitle = computed(() => ACTIONS.value[modalAction.value as keyof typeof ACTIONS.value] + ' ' + (name || ''))
  const modalShowFooter = computed(() => modalAction.value !== 'view')

  /** 表格需要勾选的话需要设置rowkey */
  const rowKey = (row: RowData) => row[key]

  /** 重置搜索 */
  const handlereset = () => {
    copyProps(defualtQuery, initQuery)
  }

  /** 选择行变化 */
  const { changeCheckRow, checkedRowKeys, checkedRow } = useSelection<List>()

  /** 新增 */
  const handleAdd = async () => {
    beforeValidate && beforeValidate(modalForm.value)
    beforeAsyncValidate && await beforeAsyncValidate()
    modalAction.value = 'add'
    modalVisible.value = true
    copyProps(modalForm.value, initForm)
  }

  /** 修改 */
  const handleEdit = async (row?: List) => {
    beforeValidate && beforeValidate(modalForm.value)
    beforeAsyncValidate && await beforeAsyncValidate()
    let rowData = cloneDeep(row)
    if (!row && checkedRow.value) rowData = checkedRow.value[0] as List
    modalAction.value = 'edit'
    modalVisible.value = true
    copyProps(modalForm.value, rowData)
  }

  /** 查看 */
  const handleView = (row: List) => {
    modalAction.value = 'view'
    modalVisible.value = true
    copyProps(modalForm.value, cloneDeep(row))
  }

  /** 保存 */
  const handleSave = () => {
    if (!['edit', 'add'].includes(modalAction.value)) {
      modalVisible.value = false
      return
    }
    modalFormRef.value?.validate(async (err: any) => {
      if (err) return
      const action = modalAction.value === 'add' ? doCreate : doUpdate
      const prompt = modalAction.value === 'add' ? t('add') : t('edit')
      try {
        modalLoading.value = true
        // 保存之前，如果返回处理后的数据则替换
        const formData = beforeSave && beforeSave(modalForm.value)
        const params = formData || modalForm.value
        if (action) {
          const res = await action(params)
          // 保存之后
          notification.success({ title: '', content: prompt + ' ' + t('sucess'), duration: 1600 })
          afterSave && afterSave(modalAction.value, res)
          modalLoading.value = modalVisible.value = false
          listQuery()
        }
      } catch (error) {
        modalLoading.value = false
      }
    })
  }

  /** 删除 */
  const checkIds = computed(() => {
    return checkedRow.value?.map((item: any) => {
      return item[key]
    })
  })
  const handleDelete = (id?: number) => {
    if (id === undefined && checkIds.value && checkIds.value.length === 0) return
    const dia = dialog.warning({
      title: t('warn'),
      content: t('dureDelete'),
      positiveText: t('determine'),
      negativeText: t('cancellation'),
      onPositiveClick: async () => {
        dia.loading = true
        try {
          checkIds.value
          if (id !== undefined) {
            doDelete && await doDelete(id)
          } else {
            const deletePromises = checkIds.value.map(async (id: number) => {
              if (!doDelete) return
              return await doDelete(id)
            })
            await Promise.all(deletePromises)
          }
          dia.loading = false
          doDelete && notification.success({ title: '', content: t('delete') + ' ' + t('sucess'), duration: 1600 })
          listQuery()
        } catch (error) {
          dia.loading = false
        }
      },
      onNegativeClick: () => {
        console.log('取消')
      }
    })
  }

  // 查询
  const loading = ref(false)
  const listData = ref<List[]>()
  const listQuery = async () => {
    loading.value = true
    try {
      let params = {
        ...defualtQuery
      }
      if (isPagination) {
        params = {
          page: pagination?.page || 0,
          pageSize: pagination?.pageSize || 10,
          ...defualtQuery
        }
      }
      // 查询前，如果返回false则不继续查询
      const queryParams = beforeRefresh && beforeRefresh(params as QueryParams)
      if (typeof queryParams === 'boolean' && !queryParams) return
      if (queryParams && typeof queryParams !== 'boolean') params = queryParams as typeof params

      const tempData = await getData<ListData<List[]>>(url, params)

      const { data, total } = tempData.data

      // 查询后，如果返回处理后的数据则替换列表数据，没有则使用接口返回的数据
      const newData = afterRefresh && afterRefresh([...data])
      if (newData) {
        listData.value = newData || []
      } else {
        listData.value = data || []
      }
      if (isPagination) pagination.itemCount = total || 0
      checkedRow.value = []
      checkedRowKeys.value = []
      loading.value = false
    } catch(e) {
      loading.value = false
    }
  }

  // 分页
  const { pagination } = usePagination(listQuery)

  // 初始化查询
  isInitQuery && listQuery()

  /** 导出 */
  const handleDownload = async() => {
    const dia = dialog.warning({
      title: '导出数据',
      content: '是否导出数据？',
      positiveText: t('determine'),
      negativeText: t('cancellation'),
      onPositiveClick: async () => {
        dia.loading = true
        try {
          const params = {
            ...defualtQuery
          }
          const data = await downloadExcel(url + '/download', params)
          download(data, name)
          dia.loading = false
          notification.success({ title: '', content: '导出成功', duration: 1600 })
        } catch (error) {
          dia.loading = false
        }
      },
      onNegativeClick: () => {
        console.log('取消')
      }
    })
  }

  // 操作按钮禁用
  const btnDisabled = computed(() => {
    return {
      edit: !(checkedRowKeys.value.length === 1),
      del: !(checkedRowKeys.value.length > 0),
      download: isPagination && pagination.itemCount <= 0
    }
  })

  return {
    modalVisible,
    modalAction,
    modalTitle,
    modalLoading,
    modalShowFooter,
    handlereset,
    handleAdd,
    handleDelete,
    handleEdit,
    handleView,
    handleDownload,
    handleSave,
    modalForm,
    modalFormRef,
    defualtQuery,
    changeCheckRow,
    loading,
    listData,
    pagination,
    listQuery,
    rowKey,
    btnDisabled,
    checkedRowKeys
  }
}