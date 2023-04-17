import { createApp } from 'vue'
import './style.scss' // 全局样式
import App from './App.vue'
import router from './router/index' // 引入路由
import { createPinia } from 'pinia' // 引入pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
const pinia = createPinia() // 创建 Pinia 实例
pinia.use(piniaPluginPersistedstate)
import Vue3GridLayout from './components/grid-layout'
const app = createApp(App)
app.use(router).use(pinia).use(Vue3GridLayout).mount('#app')