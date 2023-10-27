import { type PaginationInfo } from 'naive-ui/es/pagination'
import { useI18n } from 'vue-i18n'
import { type Pagination } from '../type'
import Http from '@/utils/request'

// 操作类型
export const ACTIONS = {
  view: '查看',
  edit: '编辑',
  add: '新增',
}

// 请求数据接口
export const getData = <T extends Record<string, unknown>[]>(url: string, params: Record<string, any>) => {
  return Http.get<T>(url, params)
}

// 分页
export const usePagination = (listQuery: () => void) => {
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
    },
    onUpdatePage: (page: number) => {
      pagination.page = page
      listQuery()
    },
    onUpdatePageSize: (pageSize: number) => {
      pagination.page = 1
      pagination.pageSize = pageSize
      listQuery()
    }
  })
  return {
    pagination,
  }
}
