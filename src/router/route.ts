import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'

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
    redirect: '/list/baseList',
    meta: { visibily: false }
  }
]
