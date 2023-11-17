import { type RouteRecordRaw } from 'vue-router'
import { type TreeMenu } from '@/type/menu'
import Layout from '@/layout/index.vue'
import Link from '@/views/link/index.vue'

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
        title: item.title,
        visibily: item.visibily || 0,
        icon: item.icon || '',
        keepAlive: item.keepAlive || 0,
        menuType:item.menuType || 0,
        externalLink: item.externalLink || 0,
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
  data.forEach((item: RouteRecordRaw) => {
    if (item.children && item.children?.length > 0) {
      item.component = Layout
      filterRoute(item.children)
    } else {
      item.component = loadView(item.component)
      if (item.meta?.externalLink) item.component = Link
    }
  })
  return data
}
