import { type DataTableRowKey } from 'naive-ui/es/data-table'

export const useSelection = () => {
  const checkedRowKeysRef = ref<DataTableRowKey[]>([])
  const editDisabled = computed(() => {
    return !(checkedRowKeysRef.value.length === 1)
  })
  const delDisabled = computed(() => {
    return !(checkedRowKeysRef.value.length > 0)
  })
  const changeCheck = (rowKeys: DataTableRowKey[]) => {
    checkedRowKeysRef.value = rowKeys
  }
  return {
    checkedRowKeysRef,
    changeCheck,
    editDisabled,
    delDisabled
  }
}