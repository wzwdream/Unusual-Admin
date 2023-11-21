import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'
import Home from '@/views/workbenches/index.vue'

export const home: RouteRecordRaw = {
  path: '/workbenches',
  meta: { title: '工作台', visibily: 1, icon: 'material-symbols:home-outline', keepAlive: 0 },
  component: Home
}

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/user/login.vue'),
    meta: { title: '登录', visibily: 0 }
  },
  {
    path: '/redirect',
    name: 'Redirect',
    component: Layout,
    meta: { visibily: 0 },
    children: [
      {
        path: '/redirect/:path*',
        meta: { visibily: 0 },
        component: () => import('@/views/features/redirect.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: '/workbenches',
    component: Layout,
    meta: { visibily: 1, title: '工作台', menuType: 1 },
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
        meta: { title: '个人中心', visibily: 0 }
      }
    ]
  },
]
