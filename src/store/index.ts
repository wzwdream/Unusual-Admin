import {createPinia} from 'pinia' // 引入pinia
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { App } from 'vue'

const pinia = createPinia() // 创建 Pinia 实例
pinia.use(piniaPluginPersistedstate)

// 注册pinia
export const setupPinia = (app: App) => {
  app.use(pinia)
}