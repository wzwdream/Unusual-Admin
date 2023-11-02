import { type PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import UnoCSS from 'unocss/vite'
import { htmlPlugin } from './html'
import { autoImport } from './autoImport'
import { iconPlugins } from './icon'
import { mockPlugins } from './mock'
import { createCompression } from './compression'

export const setupPlugins = (isBuild: boolean, viteEnv: ViteEnv) => {
  const plugins: PluginOption[] = [
    vue(),
    vueJsx(),
    UnoCSS(),
    VueSetupExtend(), // setup语法糖name增强插件
    ...autoImport(),
    ...iconPlugins()
  ]

  const html = htmlPlugin(isBuild, viteEnv)
  plugins.push(html)

  if (viteEnv.VITE_MOCK) {
    const mock = mockPlugins(isBuild, viteEnv)
    plugins.push(mock)
  }

  if (viteEnv.VITE_COMPRESS) {
    const compression = createCompression(isBuild)
    plugins.push(compression)
  }

  return plugins
}