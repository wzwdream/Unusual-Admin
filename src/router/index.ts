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
        path: '/HelloWorld',
        // redirect: '/HelloWorld',
        component: Layout,
        children: [
            {
                path: '/HelloWorld',
                component: () => import('../views/HelloWorld.vue')
            },
        ]
    },
    {
        path: '/test',
        redirect: '/test/layout',
        component: Layout,
        children: [
            {
                path: '/test/layout',
                component: () => import('../views/gridLayoutTest.vue'),
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
