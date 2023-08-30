import {createApp} from 'vue'
import './style.scss' // 全局样式
import 'uno.css' // 引入unocss
import App from './App.vue'
import router from './router' // 引入路由
import {createPinia} from 'pinia' // 引入pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { useVarCss } from './utils/help'

const pinia = createPinia() // 创建 Pinia 实例
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

useVarCss()
app.use(router).use(pinia).mount('#app')
