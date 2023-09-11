import { RouteRecordRaw } from 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    title?: string // 标题
    visibily?: boolean // 是否可见
    icon?: string // 图标
    isKeepAlive?: boolean // 是否缓存
    isDir?: boolean // 是否目录
    externalLink?: boolean // 是否外链菜单
    link?: string // 外链菜单的地址链接
    requiresAuth?: boolean // 是否需要登录才能查看
  }
  RouteRecordRaw
}
