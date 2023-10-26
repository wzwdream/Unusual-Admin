import { type PaginationInfo } from 'naive-ui/es/pagination'

export type Pagination = {
  page: number;
  pageSize: number;
  itemCount: number;
  showSizePicker: boolean;
  showQuickJumper: boolean;
  pageSizes: number[];
  prefix: ({ itemCount }: PaginationInfo) => string;
}

export type Action = {
  (e: 'add'): void
  (e: 'delete'): void
  (e: 'edit'): void
  (e: 'download'): void
  (e: 'changeCheckrow', value: object[]): void
  (e: 'reset'): void
}