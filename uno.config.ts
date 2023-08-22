// uno.config.ts
import { defineConfig, presetUno, presetAttributify } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(), // 添加 UnoCSS 的默认样式预设
    presetAttributify()
  ],
})
