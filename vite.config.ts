import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import { setupPlugins } from './build/plugins/index'
import { conversionsEnv } from './build/utils'

export default defineConfig(({ command, mode }) => {
  const isBuild = command === 'build'

  const viteEnv: ViteEnv = conversionsEnv(loadEnv(mode, process.cwd()))
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_BASE_API } = viteEnv
  return {
    base: VITE_PUBLIC_PATH || './',
    resolve: {
      //设置别名
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    plugins: setupPlugins(isBuild, viteEnv),
    server: {
      host: true,
      port: VITE_PORT, // 启动端口
      // 设置代理
      proxy: {
        [VITE_BASE_API]: {
          target: 'http://127.0.0.1:3500',
          changeOrigin: true,
          rewrite: (path) => path.replace(new RegExp(`^${VITE_BASE_API}`), '')
        }
      }
    },
    build: {
      reportCompressedSize: false, // 是否开启计算文件大小，项目过大会影响打包效率
      sourcemap: !isBuild,
      assetsDir: 'static',
      // 打包输出配置
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // 最小化分包
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
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
