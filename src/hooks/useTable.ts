import { PaginationInfo } from 'naive-ui/es/pagination'
import { initData } from '@/api/user/index'

const useTable = (url: string, queryParms: Record<string, any> = {}) => {
  const pagination = reactive({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    showQuickJumper: true,
    pageSizes: [10, 20, 30, 40, 50, 100],
    prefix: ({ itemCount }: PaginationInfo) => {
      return `共 ${itemCount} 条`
    },
    onChange: (page: number) => {
      pagination.page = page
      query()
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.pageSize = pageSize
      pagination.page = 1
      query()
    }
  })
  const listData = ref([])
  const loading = ref(false)
  const query = () => {
    loading.value = true
    queryParms.age = ''
    queryParms.name = ''
    const params = {
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...queryParms
    }
    initData(url, params).then(res => {
      console.log(res, 'res')
      listData.value = res.data
      pagination.itemCount = res.total as number
      loading.value = false
    })
  }
  query()
  return {
    pagination,
    listData,
    query,
    loading
  }
}
export default useTable