import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import drag from '../components/drag.vue'
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
        path: '/drag',
        component: drag
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
