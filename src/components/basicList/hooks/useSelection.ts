import { type DataTableRowKey } from 'naive-ui/es/data-table'
import { type Action } from '../types'

export const useSelection = (emit: Action) => {
  const checkedRowKeysRef = ref<DataTableRowKey[]>([])
  const editDisabled = computed(() => {
    return !(checkedRowKeysRef.value.length === 1)
  })
  const delDisabled = computed(() => {
    return !(checkedRowKeysRef.value.length > 0)
  })
  const changeCheck = (rowKeys: DataTableRowKey[], row: object[]) => {
    checkedRowKeysRef.value = rowKeys
    emit('changeCheckrow', row)
  }
  return {
    checkedRowKeysRef,
    changeCheck,
    editDisabled,
    delDisabled
  }
}