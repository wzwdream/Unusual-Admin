/*
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑     永不宕机     永无BUG
 */

import { createApp } from 'vue'
import './style.scss' // 全局样式
import 'uno.css' // 引入unocss
import 'virtual:svg-icons-register' // 本地图标注册
import App from './App.vue'
import router from './router' // 引入路由
import {createPinia} from 'pinia' // 引入pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useVarCss } from './utils/help'
import directive from './directive'

const pinia = createPinia() // 创建 Pinia 实例
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

useVarCss()

app.use(router).use(pinia).use(directive).mount('#app')
