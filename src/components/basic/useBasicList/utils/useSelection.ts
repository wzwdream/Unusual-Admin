import { type DataTableRowKey } from 'naive-ui/es/data-table'
import { type Form } from './type'
import { type UnwrapRef } from 'vue'
import { cloneDeep } from 'lodash-es'

export const useSelection = <Row extends Form = Form>() => {
  const checkedRowKeys = ref<DataTableRowKey[]>([])
  const checkedRow = ref<Row[]>([])
  const changeCheckRow = (rowKeys: DataTableRowKey[], row: object[]) => {
    checkedRowKeys.value = rowKeys
    checkedRow.value = cloneDeep(row) as UnwrapRef<Row[]>
  }
  return {
    checkedRowKeys,
    changeCheckRow,
    checkedRow
  }
}