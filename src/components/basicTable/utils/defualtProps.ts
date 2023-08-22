import type { CreateRowKey, RowData } from 'naive-ui/es/data-table/src/interface'
import { NDataTable, type DataTableColumn } from 'naive-ui'
import type { ExtractPropTypes, PropType } from 'vue'

export const defualtProps = {
  ...NDataTable.props, // 这里继承原 UI 组件的 props
  url: {
    type: String,
    require: true
  },
  columns: {
    type: Array as PropType<Array<DataTableColumn>>,
    required: true
  },
  rowKey: {
    type: Function as PropType<CreateRowKey<any>>,
    default: (row: RowData) => row.id
  },
  queryParams: {
    type: Object as PropType<Record<string, any>>,
    require: true
  },
  add: {
    type: Boolean,
    default: true
  },
  del: {
    type: Boolean,
    default: true
  },
  edit: {
    type: Boolean,
    default: true
  },
  download: {
    type: Boolean,
    default: true
  },
  selection: {
    type: Boolean,
    default: true
  },
  toolbar: {
    type: Boolean,
    default: true
  }
}


export type DefualtProps = ExtractPropTypes<typeof defualtProps >