import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
        meta: { visibily: false },
        children: [
            {
                path: 'login',
                component: () => import('../views/login.vue'),
                meta: { title: '登录', visibily: false }
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
                component: () => import('../views/baseList.vue'),
                meta: { title: '基础列表', visibily: true, icon: 'material-symbols:align-space-even-rounded', isKeepAlive: true }
            },
            {
                path: '/list/drag',
                component: () => import('../components/drag.vue'),
                meta: { title: '拖拽' }
            },
        ]
    },
    {
        path: '/sendEmail',
        redirect: '/email/sendEmail',
        component: Layout,
        children: [
            {
                path: '/email/sendEmail',
                component: () => import('../views/sendEmail'),
                meta: { title: '邮件' }
            }
        ]

    }
]
