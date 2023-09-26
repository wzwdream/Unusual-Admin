import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'

export const home = {
  path: '/worktop',
  meta: { title: '工作台', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: false },
  component: () => import('@/views/worktop/index.vue')
}
export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue'),
    meta: { title: '登录', visibily: false }
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: { visibily: false },
    children: [
      {
        path: '/redirect/:path*',
        meta: { visibily: false },
        component: () => import('@/views/features/redirect.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/worktop',
    component: Layout,
    meta: { visibily: true, title: '工作台', isDir: true },
    children: [home]
  }
]
