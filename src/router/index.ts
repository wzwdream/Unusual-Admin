import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Layout from '@/components/layout/index.vue'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect:'/login',
        children:[
            {
                path: 'login',
                component: () => import('../views/login.vue')
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
                component: () => import('../views/baseList.vue')
            },
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
