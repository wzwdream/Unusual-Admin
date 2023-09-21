import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'
import Link from '@/components/link/index.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue'),
    meta: { title: '登录', visibily: false }
  },
  {
    path: '/',
    redirect: '/list',
    meta: { visibily: false }
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { visibily: false },
    children: [
      {
        path: '/redirect/:path*',
        meta: { visibily: false },
        component: () => import('@/components/features/redirect.vue')
      }
    ]
  },
  {
    path: '/list',
    redirect: '/list/baseList',
    component: Layout,
    meta: { title: '列表', visibily: true, isDir: true, icon: 'material-symbols:align-space-even-rounded' },
    children: [
      {
        path: '/list/baseList',
        name: 'BaseList',
        component: () => import('../views/baseList.vue'),
        meta: { title: '基础列表', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      },
      {
        path: '/list/drag',
        name: 'Drag',
        component: () => import('../components/drag.vue'),
        meta: { title: '拖拽', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      },
      {
        path: '/c',
        name: 'c',
        component: () => import('../views/baseList.vue'),
        meta: { title: 'c', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      },
      {
        path: '/d',
        name: 'd',
        component: () => import('../views/baseList.vue'),
        meta: { title: 'd', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      }, {
        path: '/e',
        name: 'e',
        component: () => import('../views/baseList.vue'),
        meta: { title: 'e', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      }, {
        path: '/f',
        name: 'f',
        component: () => import('../views/baseList.vue'),
        meta: { title: 'f', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      }, {
        path: '/g',
        name: 'g',
        component: () => import('../views/baseList.vue'),
        meta: { title: 'g', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      }, {
        path: '/h',
        name: 'h',
        component: () => import('../views/baseList.vue'),
        meta: { title: 'h', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      }, {
        path: '/j',
        name: 'j',
        component: () => import('../views/baseList.vue'),
        meta: { title: 'j', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      }, {
        path: '/k',
        name: 'k',
        component: () => import('../views/baseList.vue'),
        meta: { title: 'k', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true }
      },
    ]
  },
  {
    path: '/sendEmail',
    redirect: '/email/sendEmail',
    name: '',
    component: Layout,
    meta: { title: '工具', visibily: true, isDir: true, icon: 'material-symbols:align-space-even-rounded' },
    children: [
      {
        path: '/email/sendEmail',
        name: 'SendEmail',
        component: () => import('../views/sendEmail'),
        meta: { title: '邮件', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: false }
      }
    ]
  },
  {
    path: '/link',
    redirect: '/link/juejing',
    component: Layout,
    meta: { title: '外链菜单', visibily: true, isDir: true, icon: 'material-symbols:align-space-even-rounded' },
    children: [
      {
        path: '/link/juejing',
        name: 'Juejing',
        component: Link,
        meta: { title: '掘金', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true, externalLink: true, link: 'https://juejin.cn/' }
      },
      // 测试菜单
      {
        path: '/a',
        redirect: '/a/b',
        meta: { title: 'a', visibily: true, isDir: true, icon: 'material-symbols:align-space-even-rounded' },
        children: [
          {
            path: '/a/b',
            name: 'B',
            component: Link,
            meta: { title: 'b', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true, externalLink: true, link: 'https://juejin.cn/' }
          }
        ]
      }
    ]
  }
]
