export interface menu {
  label?: string
  key: string
  icon?: string
  children?: menu[]
  isDir?: boolean // 是否目录
  keepAlive?: boolean // 是否keeplive缓存
  name?: string
}

export interface MenuRouting {
  id: number
  pid: number
  path: string
  title: string
  visibily: boolean
  isDir: boolean
  icon: string
  name?: string
  component?: string
  keepAlive?: boolean
  externalLink?: boolean
  link?: string
  children?: MenuRouting[]
}