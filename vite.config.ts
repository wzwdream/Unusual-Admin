
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import * as path from 'path';

export default defineConfig({
    resolve: {
        //设置别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    plugins: [
        vue(),
        vueJsx(),
        VueSetupExtend(), // setup语法糖name增强插件
        // 自动引入APi
        AutoImport({
            imports: [
                'vue',
                'vue-router',
                {'naive-ui': [
                    'useDialog',
                    'useMessage',
                    'useNotification',
                    'useLoadingBar'
                ]} // 自动导入naive-ui的api
            ]
        }),
        // 自动引入组件
        Components({
            dirs: ['src/components'], // 自动导入项目的公共组件
            extensions: ['vue', 'tsx'], // 组件有效的文件扩展名
            resolvers: [NaiveUiResolver()] // 自动导入naive组件库组件
        }),
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
                target: '***',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            }
        }
    }
})
