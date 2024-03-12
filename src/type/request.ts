export interface Result {
  code: number
  message: string
  path: string
  timestamp: string
}
export interface ResultData<T = any> extends Result {
  data: T
}