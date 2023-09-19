import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export const autoImport = () => {
  return [
    // 自动引入APi
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/, /\.vue\?vue/,
        /\.md$/,
      ],
      imports: [
        'vue',
        'vue-router',
        {
          'naive-ui': [
            'useDialog',
            'useMessage',
            'useNotification',
            'useLoadingBar'
          ]
        }
      ],
      // eslint报错处理
      eslintrc: {
        enabled: true
      }
    }),
    // 自动引入组件
    Components({
      dirs: ['src/components'], // 自动导入项目的公共组件
      extensions: ['vue', 'tsx'], // 组件有效的文件扩展名
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({ customCollections: ['svg'], componentPrefix: 'icon' }),
      ]
    })
  ]
}