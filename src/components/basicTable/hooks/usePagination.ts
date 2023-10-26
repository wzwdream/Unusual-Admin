import { type PaginationInfo } from 'naive-ui/es/pagination'
import { useI18n } from 'vue-i18n'
import { type Pagination } from '../types'


export const usePagination = () => {
  // 国际化
  const { t } = useI18n()
  const total = computed(() => {
    return {
      total: t('total'),
      tiao: t('tiao')
    }
  })
  const pagination = reactive<Pagination>({
    page: 1,
    pageSize: 10,
    itemCount: 0,
    showSizePicker: true,
    showQuickJumper: true,
    pageSizes: [10, 20, 30, 40, 50, 100],
    prefix: ({ itemCount }: PaginationInfo) => {
      return `${total.value.total} ${itemCount} ${total.value.tiao}`
    }
  })
  return {
    pagination,
  }
}
