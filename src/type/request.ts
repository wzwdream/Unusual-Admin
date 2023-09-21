export interface Result {
  code: number
  message: string
  total?: number
}
export interface ResultData<T = any> extends Result {
  data: T
}