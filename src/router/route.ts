import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'

export const home: RouteRecordRaw = {
  path: '/workbenches',
  meta: { title: '工作台', visibily: true, icon: 'material-symbols:home-outline', keepAlive: false, name: 'Workbenches' },
  component: () => import('@/views/workbenches/index.vue')
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login.vue'),
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
    redirect: '/workbenches',
    component: Layout,
    meta: { visibily: true, title: '工作台', menuType: 1 },
    children: [home]
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/profile',
    children: [
      {
        path: '/user/profile',
        component: () => import('@/views/user/profile.vue'),
        name: 'Profile',
        meta: { title: '个人中心', visibily: false }
      }
    ]
  },
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/notFound/index.vue'),
    meta: { title: 'notFound', visibily: false }
  }
]
