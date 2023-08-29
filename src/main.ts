import {createApp} from 'vue'
import './style.scss' // 全局样式
import 'virtual:uno.css' // 引入unocss
import App from './App.vue'
import router from './router' // 引入路由
import {createPinia} from 'pinia' // 引入pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { setting } from './setting'

const pinia = createPinia() // 创建 Pinia 实例
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
document.title = setting.title // 设置默认标题
app
.use(router)
.use(pinia)
.mount('#app')
