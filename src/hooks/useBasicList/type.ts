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
export interface HookParams<List extends Form, RoleQuery extends Form> {
  name?: string
  key: string,
  url: string
  initForm?: List
  initQuery?: RoleQuery
  doCreate?: (form: List) => Promise<ResultData<List[]>>
  doDelete?: (id: number[]) => Promise<any>
  doUpdate?: (form: List) => Promise<any>
  beforeRefresh?: (form: RoleQuery) => RoleQuery | boolean
  afterRefresh?: (listData: List[]) => List[]
  beforeSave?: (listData: List) => List
  afterSave?: () => void
}