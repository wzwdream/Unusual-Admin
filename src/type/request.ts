export interface Result {
  code: string | number
  message: string
  total?: number
}
export interface ResultData<T = any> extends Result {
  data: T
}