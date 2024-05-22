import { type RouteRecordRaw } from 'vue-router'
import { type TreeMenu } from '@/type/menu'

// 通过menu数据生成路由数据
export const buildRoute = (routes: TreeMenu[]): RouteRecordRaw[] => {
  const result: RouteRecordRaw[] = []
  routes.map(item => {
    result.push({
      path: item.path,
      name: item.name,
      component: item.component as any,
      redirect: '',
      meta: {
        pid: item.pid,
        title: item.title,
        visibily: item.visibily,
        icon: item.icon || '',
        keepAlive: item.keepAlive,
        menuType:item.menuType,
        externalLink: item.externalLink,
        link: item.link || '',
        sort: item.sort || 1
      },
      children: item.children && buildRoute(item.children)
    })
  })
  return result
}

// 匹配views里面所有的.vue、.jsx、.tsx文件
const modules = import.meta.glob(['../views/**/*.vue', '../views/**/*.jsx', '../views/**/*.tsx'])

// 查找对应的页面
export const loadView = (view: any) => {
  let res
  for (const path in modules) {
    const dir = path.split('../')[1]
    if (dir === view) {
      res = () => modules[path]()
      break
    }
  }
  return res
}

// 补全路由信息-找到对应的组件
export const filterRoute = (data: RouteRecordRaw[]) => {
  const menu = data.map((item: RouteRecordRaw) => {
    if (item.meta?.menuType === 1 && item.children && item.children?.length > 0) {
      // 防止多级菜单嵌套布局组件
      if(item.meta?.pid === 0) item.component = () => import('@/layout/index.vue')
      filterRoute(item.children)
    } else {
      item.component = loadView(item.component)
      if (item.meta?.externalLink) item.component = () => import('@/views/link/index.vue')

      // 表示菜单是一级菜单，需要布局组件
      if(item.meta?.pid === 0) {
        item = {
          path: '/temp' + item.path,
          component: () => import('@/layout/index.vue'),
          meta: { visibily: true, title: item.meta.title, menuType: 1 },
          children: [item]
        }
      }
    }
    return item
  })
  return menu
}
