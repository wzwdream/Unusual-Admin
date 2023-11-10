import { dialog, message } from '@/utils/help'
import { type FormInst } from 'naive-ui'
import { usePagination } from './utils/index'
import { getData } from './utils/index'
import type { HookParams, Form } from './utils/type'
import { type RowData } from 'naive-ui/es/data-table/src/interface'
import { type UnwrapRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash-es'
import { useSelection } from './utils/useSelection'

export const useBasicList = <List extends Form = Form, RoleQuery extends Form = Form>({
  name, // 名称
  url, // 查询url
  key, // rowKey
  isPagination = true, // 是否需要分页
  isInitQuery = true, // 是否初始化查询
  initForm = {} as List, // 表单初始化数据
  initQuery = {} as RoleQuery, // 查询初始化数据
  doCreate, // 新建
  doDelete, // 删除
  doUpdate, // 编辑
  beforeRefresh, // 查询之前
  afterRefresh, // 查询之后
  beforeSave, // 新增/编辑保存之前
  afterSave // 新增/编辑保存之后
}: HookParams<List, RoleQuery>) => {

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
  const modalAction = ref('')
  const modalLoading = ref(false)
  const modalFormRef = ref<FormInst | null>(null)
  const modalForm = ref<List>({ ...initForm })

  const defualtQuery = ref<RoleQuery>({ ...initQuery })

  const modalTitle = computed(() => ACTIONS.value[modalAction.value as keyof typeof ACTIONS.value] + ' ' + (name || ''))
  const modalShowFooter = computed(() => modalAction.value !== 'view')

  /** 表格需要勾选的话需要设置rowkey */
  const rowKey = (row: RowData) => row[key]

  /** 重置搜索 */
  const handlereset = () => {
    defualtQuery.value = {...initQuery} as UnwrapRef<RoleQuery>
  }

  /** 选择行变化 */
  const { changeCheckRow, checkedRowKeys, checkedRow } = useSelection<List>()

  /** 新增 */
  const handleAdd = () => {
    modalAction.value = 'add'
    modalVisible.value = true
    modalForm.value = { ...initForm } as UnwrapRef<List>
  }

  /** 修改 */
  const handleEdit = (row?: List) => {
    let rowData = cloneDeep(row)
    if (!row && checkedRow.value) rowData = checkedRow.value[0]
    modalAction.value = 'edit'
    modalVisible.value = true
    modalForm.value = rowData as UnwrapRef<List>
  }

  /** 查看 */
  const handleView = (row: List) => {
    modalAction.value = 'view'
    modalVisible.value = true
    modalForm.value = cloneDeep(row) as UnwrapRef<List>
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
        const formData = beforeSave && beforeSave(modalForm.value as List)
        const params = formData || modalForm.value as List
        action && await action(params)
        // 保存之后
        afterSave && afterSave()
        action && message.success(prompt + ' ' + t('sucess'))
        modalLoading.value = modalVisible.value = false
        listQuery()
      } catch (error) {
        modalLoading.value = false
      }
    })
  }

  /** 删除 */
  const checkIds = computed(() => {
    return checkedRow.value?.map(item => {
      return item[key]
    })
  })
  const handleDelete = (ids?: number[]) => {
    if (ids && ids.length === 0 && checkIds.value && checkIds.value.length === 0) return
    let rowKeys = ids
    if (!ids) rowKeys = checkIds.value
    const dia = dialog.warning({
      title: t('warn'),
      content: t('dureDelete'),
      positiveText: t('determine'),
      negativeText: t('cancellation'),
      onPositiveClick: async () => {
        dia.loading = true
        try {
          doDelete && await doDelete(rowKeys as number[])
          dia.loading = false
          doDelete && message.success(t('delete') + ' ' + t('sucess'))
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
        ...defualtQuery.value
      }
      if (isPagination) {
        params = {
          page: pagination?.page || 0,
          pageSize: pagination?.pageSize || 10,
          ...defualtQuery.value
        }
      }
      // 查询前，如果返回false则不继续查询
      const queryParams = beforeRefresh && beforeRefresh(params as RoleQuery)
      if (typeof queryParams === 'boolean' && !queryParams) return
      if (queryParams && typeof queryParams !== 'boolean') params = queryParams as typeof params

      const { data, total } = await getData<List[]>(url, params)

      // 查询后，如果返回处理后的数据则替换列表数据，没有则使用接口返回的数据
      const newData = afterRefresh && afterRefresh([...data])
      if (newData) {
        listData.value = newData || []
      } else {
        listData.value = data || []
      }
      if (isPagination) pagination.itemCount = total as number || 0
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
  const handleDownload = () => {
    console.log('handleDownload')
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
    btnDisabled
  }
}