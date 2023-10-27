export type Action = {
  (e: 'add'): void
  (e: 'delete'): void
  (e: 'edit'): void
  (e: 'download'): void
  (e: 'changeCheckrow', value: object[]): void
  (e: 'reset'): void
  (e: 'search'): void
}