import { RouteRecordRaw } from 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    visibily?: 0 | 1
    menuType?: 0 | 1 | 2
    icon?: string
    name?: string
    component?: string
    keepAlive?: 0 | 1
    externalLink?: 0 | 1
    competence?: string
    link?: string
    sort?: number
  }
  RouteRecordRaw
}
