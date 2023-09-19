import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'

export const iconPlugins = () => {
  return [
    Icons({
      compiler: 'vue3',
      scale: 1,
      defaultClass: 'inline-block',
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
      symbolId: 'icon-[dir]-[name]'
    })
  ]
}