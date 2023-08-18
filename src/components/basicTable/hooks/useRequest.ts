import { type ComputedRef } from 'vue'
import { getData } from '../utils/request'
import { type Pagination } from './usePagination'


export const useRequest = (params: ComputedRef<Record<string, unknown>>, url: string, pagination: Pagination) => {
  const loading = ref(false)
  const listData = ref([])
  const listQuery = () => {
    loading.value = true
    getData(url, params.value).then(res => {
      listData.value = res.data
      pagination.itemCount = res.total
      loading.value = false
    }).catch((e) => {
      loading.value = false
      throw new Error(e)
    })
  }
  listQuery()
  return {
    loading, listData, listQuery
  }
}