import { RouteRecordRaw } from 'vue-router';
import Layout from '@/layout/index.vue'
import Link from '@/components/link/index.vue'

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
                meta: { title: '拖拽', visibily: true, icon: 'material-symbols:align-space-even-rounded', isKeepAlive: true }
            },
        ]
    },
    {
        path: '/sendEmail',
        redirect: '/email/sendEmail',
        component: Layout,
        meta: { title: '工具', visibily: true, isDir: true, icon: 'material-symbols:align-space-even-rounded' },
        children: [
            {
                path: '/email/sendEmail',
                component: () => import('../views/sendEmail'),
                meta: { title: '邮件', visibily: true, icon: 'material-symbols:align-space-even-rounded', isKeepAlive: true }
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
                component: Link,
                meta: { title: '掘金', visibily: true, icon: 'material-symbols:align-space-even-rounded', isKeepAlive: true, externalLink: true, link: 'https://juejin.cn/' }
            }
        ]

    }
]
