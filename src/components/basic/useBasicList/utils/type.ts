import { ResultData } from '@/type/request'
import { type PaginationInfo } from 'naive-ui/es/pagination'

// 分页
export type Pagination = {
  page: number
  pageSize: number
  itemCount: number
  showSizePicker: boolean
  showQuickJumper: boolean
  pageSizes: number[]
  prefix: ({ itemCount }: PaginationInfo) => string
  onUpdatePage: (page: number) => void
  onUpdatePageSize: (pageSize: number) => void
}

export type Form = Record<string, any>

// Hook传入的参数
export interface HookParams<List extends Form, QueryParams extends Form> {
  name?: string
  key: string
  isPagination?: boolean
  isInitQuery?: boolean
  url: string
  initForm?: List
  initQuery?: QueryParams
  doCreate?: (form: List) => Promise<ResultData<List[]>>
  doDelete?: (id: number) => Promise<any>
  doUpdate?: (form: List) => Promise<any>
  beforeRefresh?: (form: QueryParams) => QueryParams | boolean
  afterRefresh?: (listData: List[]) => List[] | undefined
  beforeSave?: (listData: List) => List | undefined
  afterSave?: () => void
}

export type ListData<T> = {
  data: T
  total: number
}