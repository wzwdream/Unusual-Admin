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
  visibily: 0 | 1
  isDir: 0 | 1
  icon: string
  name?: string
  component?: string
  keepAlive: 0 | 1
  externalLink: 0 | 1
  link?: string
  sort: number
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