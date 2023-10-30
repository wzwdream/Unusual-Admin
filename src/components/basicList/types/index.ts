export type Action = {
  (e: 'add'): void
  (e: 'delete', ids?: number[]): void // 为了类型兼容设置的参数类型
  (e: 'edit', row?: undefined): void// 为了类型兼容设置的参数类型
  (e: 'download'): void
  (e: 'changeCheckrow', value: object[]): void
  (e: 'reset'): void
  (e: 'search'): void
}