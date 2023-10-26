import { type ResultData } from '@/type/request'
import { dialog, message } from '@/utils/help'
import { type FormInst } from 'naive-ui'

type Form = Record<string, any>

const ACTIONS = {
  view: '查看',
  edit: '编辑',
  add: '新增',
}

export const useBasic = <T extends Form>({
  name,
  initForm = {} as Form,
  initQuery = {} as Form,
  doCreate,
  doDelete,
  doUpdate,
  refresh,
}: {
  name: string
  initForm: Form
  initQuery: Form
  doCreate: (form: T) => Promise<ResultData<T[]>>
  doDelete: (id: number[]) => Promise<any>
  doUpdate: (form: T) => Promise<any>
  refresh: (data?: any) => void
}) => {

  const modalVisible = ref(false)
  const modalAction = ref('')
  const modalLoading = ref(false)
  const modalFormRef = ref<FormInst | null>(null)
  const modalForm = ref<Form>({ ...initForm })

  const defualtQuery = ref({ ...initQuery })

  const modalTitle = computed(() => ACTIONS[modalAction.value as keyof typeof ACTIONS] + name)
  const modalShowFooter = computed(() => modalAction.value !== 'view')

  /** 重置搜索 */
  const handlereset = () => {
    defualtQuery.value = {...initQuery}
  }

  /** 选择行变化 */
  const checkedRow = ref()
  const changeCheckRow = (row: T[]) => {
    checkedRow.value = row
  }
  /** 新增 */
  const handleAdd = () => {
    modalAction.value = 'add'
    modalVisible.value = true
    modalForm.value = { ...initForm }
  }

  /** 修改 */
  const handleEdit = (row?: T) => {
    console.log(row)
    modalAction.value = 'edit'
    modalVisible.value = true
    modalForm.value = { ...row }
  }

  /** 查看 */
  const handleView = (row: T) => {
    modalAction.value = 'view'
    modalVisible.value = true
    modalForm.value = { ...row }
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
      const prompt = modalAction.value === 'add' ? '新增' : '编辑'
      try {
        modalLoading.value = true
        const data = await action(modalForm.value as T)
        message.success(prompt + '成功')
        modalLoading.value = modalVisible.value = false
        data && refresh(data)
      } catch (error) {
        modalLoading.value = false
      }
    })
  }

  /** 删除 */
  const handleDelete = (ids?: number[]) => {
    if (ids && ids.length === 0) return
    const dia = dialog.warning({
      title: '警告',
      content: '确定删除？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: async () => {
        dia.loading = true
        try {
          modalLoading.value = true
          const data = await doDelete(ids as number[])
          dia.loading = false
          message.success('删除成功')
          modalLoading.value = false
          refresh(data)
        } catch (error) {
          modalLoading.value = false
          dia.loading = false
        }
      },
      onNegativeClick: () => {
        console.log('取消')
      }
    })
  }

  /** 导出 */
  const handleDownload = () => {
    console.log('handleDownload')
  }

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
    changeCheckRow
  }
}
