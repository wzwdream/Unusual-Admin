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
  visibily: boolean
  menuType: 0 | 1 | 2
  icon: string
  name?: string
  component?: string
  keepAlive: boolean
  externalLink: boolean
  competence?: string
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
  menuType: boolean
  icon: string
  name?: string
  component?: string
  keepAlive?: boolean
  externalLink?: boolean
  link?: string
  children?: MenuRouting[]
}