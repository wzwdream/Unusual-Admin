export interface menu {
  label?: string
  key: string
  icon?: string
  children?: menu[]
  isDir?: boolean // 是否目录
}