export interface menu {
  label?: string
  key: string
  icon?: string
  children?: menu[]
  isDir?: boolean // 是否目录
  keepAlive?: boolean // 是否keeplive缓存
  name?: string
}