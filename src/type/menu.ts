export interface Tag {
  label: string
  key: string
  icon: string
  keepAlive: boolean // 是否keeplive缓存
  name: string
}
export interface TreeMenu {
  id?: number
  pid?: number
  path: string
  title: string
  visibily?: boolean
  isDir?: boolean
  icon?: string
  name?: string
  component?: any
  keepAlive?: boolean
  externalLink?: boolean
  link?: string
  sort?: number
  isLeaf?: boolean
  children?: TreeMenu[]
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