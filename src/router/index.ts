import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/newOrder'
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
