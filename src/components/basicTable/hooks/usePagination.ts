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
export const usePagination = () => {
  const pagination = reactive<Pagination>({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    showQuickJumper: true,
    pageSizes: [10, 20, 30, 40, 50, 100],
    prefix: ({ itemCount }: PaginationInfo) => {
      return `共 ${itemCount} 条`
    }
  })
  return {
    pagination,
  }
}
