import { type PaginationInfo } from 'naive-ui/es/pagination'

export const usePagination = () => {
  const pagination = reactive({
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
    pagination
  }
}