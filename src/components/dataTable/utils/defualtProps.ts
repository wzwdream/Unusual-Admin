import { DataTableColumn } from 'naive-ui/es/data-table'

export interface DefualtProps {
  title?: string,
  columns: Array<DataTableColumn>,
  url: string,
  queryParams: Record<string, any>
}


export const defaultProps = {
  title: ''
}