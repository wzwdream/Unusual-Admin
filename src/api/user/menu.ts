import Http from '@/utils/request'

export interface TreeMenu {
  path: string
  name?: string
  component?: string
  children?: TreeMenu[]
  title?: string
  meta?: {
    title: string
    visibily: boolean
    isDir?: boolean
    icon: string
    keepAlive?: boolean
    externalLink?: boolean
    link?: string
    sort?: number
  }
  [key: string]: any
}
export const getTreeMenu = () => {
  return Http.get<TreeMenu[]>('/treeMenu')
}
