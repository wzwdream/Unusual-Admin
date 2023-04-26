import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/HelloWorld'
    },
    {
        path:'/HelloWorld',
        component: HelloWorld
    },
    {
        path: '/layout',
        component: () => import('../views/gridLayoutTest.vue')
    },
    {
        path: '/login',
        component: () => import('../views/login.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
