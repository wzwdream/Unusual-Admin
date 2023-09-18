import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

export default defineConfig(config => {
  return {
    base: './',
    resolve: {
      //设置别名
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      UnoCSS(),
      VueSetupExtend(), // setup语法糖name增强插件
      Icons({
        compiler: 'vue3',
        scale: 1,
        defaultClass: 'inline-block',
      }),
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
          } // 自动导入naive-ui的api
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
        ] // 自动导入naive组件库组件
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), 'src/assets/svg')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteMockServe({
        mockPath: 'mock',
        localEnabled: config.command === 'serve', // 只有开发环境开启mock
        prodEnabled: true, //设置打包是否启用 mock 功能
        supportTs: true, // 是否读取ts文件模块
        logger: true, //是否在控制台显示请求日志
        // 开启生产模式的mock
        injectCode: `
          import { setupProdMockServer } from '../mock/index.ts';
          setupProdMockServer();
          `
      })
    ],
    server: {
      port: 8080, //启动端口
      hmr: {
        host: '127.0.0.1',
        port: 8080
      },
      // 设置 https 代理
      proxy: {
        '/api': {
          // target: 'http://42.194.198.23:3500',
          target: 'http://127.0.0.1:4173',
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/^\/api/, '/')
          }
        }
      }
    },
    build: {
      chunkSizeWarningLimit: 2000,
      minify: 'terser',
      /** 在打包代码时移除 console.log、debugger 和 注释 */
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log']
        },
        format: {
          comments: true
        }
      },
      //关闭文件计算
      reportCompressedSize: false,
      //关闭生成map文件 可以达到缩小打包体积
      sourcemap: false,
      assetsDir: 'static',
      // 打包输出配置
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 让每个插件都打包成独立的文件
              return id .toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    }
  }
})
