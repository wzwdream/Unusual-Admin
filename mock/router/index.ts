import { resultSuccess } from '../utils'

interface Route {
  id: number
  pid: number
  path: string
  title: string
  visibily: boolean
  isDir?: boolean
  icon: string
  name?: string
  component?: string
  keepAlive?: boolean
  externalLink?: boolean
  link?: string
  sort?: number
  children?: Route[]
}

interface RouteRecordRaw {
  path: string
  name?: string
  component?: string
  children?: RouteRecordRaw[]
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
}

const routes: Route[] = [
  { id: 1, pid: 0, path: '/list', title: '列表', visibily: true, isDir: true, icon: 'material-symbols:format-list-bulleted-rounded', sort: 1 },
  { id: 2, pid: 1, path: '/list/baseList', name: 'BaseList', component: 'views/baseList.vue', title: '基础列表', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true, sort: 1 },
  { id: 3, pid: 1, path: '/list/drag', name: 'Drag', component: 'views/drag.vue', title: '拖拽', visibily: true, icon: 'material-symbols:drag-pan', keepAlive: true, sort: 2 },
  { id: 4, pid: 0, path: '/email', title: '工具', visibily: true, isDir: true, icon: 'iconoir:tools', sort: 2 },
  { id: 5, pid: 4, path: '/email/email', name: 'email', component: 'views/email.vue', title: '邮件', visibily: true, icon: 'material-symbols:stacked-email-outline', keepAlive: false, sort: 1 },
  { id: 6, pid: 0, path: '/link', title: '外链菜单', visibily: true, isDir: true, icon: 'system-uicons:chain', sort: 3 },
  { id: 7, pid: 6, path: '/link/juejing', name: 'Juejing', title: '掘金', visibily: true, icon: 'tabler:brand-juejin', externalLink: true, link: 'https://juejin.cn/', sort: 1 }
]

const convertToTree = (routes: Route[]): RouteRecordRaw[] => {
  const map: Record<number, RouteRecordRaw> = {}
  const tree: RouteRecordRaw[] = []

  routes.forEach(route => {
    const { id, pid } = route

    map[id] = {
      path: route.path,
      name: route.name,
      component: route.component,
      meta: {
        title: route.title,
        visibily: route.visibily || false,
        icon: route.icon || '',
        keepAlive: route.keepAlive || false,
        isDir: route.isDir || false,
        externalLink: route.externalLink || false,
        link: route.link || '',
        sort: route.sort || 1
      },
      children: map[id]?.children || []
    }
    if (pid === 0) {
      tree.push(map[id])
    } else {
      if (!map[pid]) {
        map[pid] = {} as RouteRecordRaw
        map[pid].children = []
      }
      map[pid].children?.push(map[id])
    }
  })

  return tree
}

export default [
  // 用户登录
  {
    url: '/api/menu',
    method: 'get',
    response: () => {
      return resultSuccess(routes)
    }
  },
  {
    url: '/api/treeMenu',
    method: 'get',
    response: () => {
      return resultSuccess(convertToTree(routes))
    }
  },
]
