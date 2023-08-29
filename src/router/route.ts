import {RouteRecordRaw} from 'vue-router';
import Layout from '@/layout/index.vue'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/login',
        children: [
            {
                path: 'login',
                component: () => import('../views/login.vue'),
                meta: {title: '登录'}
            }
        ]
    },
    {
        path: '/list',
        redirect: '/list/baseList',
        component: Layout,
        children: [
            {
                path: '/list/baseList',
                component: () => import('../views/baseList.vue'),
                meta: {title: '列表'}
            },
            {
                path: '/list/drag',
                component: () => import('../components/drag.vue'),
                meta: {title: '拖拽'}
            },
        ]
    },
    {
        path: '/email',
        redirect:'/email/email',
        component: Layout,
        children:[
            {
                path: '/email/email',
                component: () => import('../views/email.vue')
            }
        ]

    }
]
