import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {NaiveUiResolver} from 'unplugin-vue-components/resolvers'
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
            include: [
                /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                /\.vue$/, /\.vue\?vue/, // .vue
                /\.md$/, // .md
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
                enabled: true // 报错undefined
            }
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
                // target: 'http://42.194.198.23:3500',
                target: 'http://127.0.0.1:3500',
                changeOrigin: true,
                rewrite: (path) => {
                    // path.replace(/^\/api/, '/')
                    return path
                }
            }
        }
    },
    build: {
        /** 消除打包大小超过 500kb 警告 */
        chunkSizeWarningLimit: 2000,
        /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
        minify: 'terser',
        /** 在打包代码时移除 console.log、debugger 和 注释 */
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log']
            },
            format: {
                /** 删除注释 */
                comments: true
            }
        },
        //关闭文件计算
        reportCompressedSize: false,
        //关闭生成map文件 可以达到缩小打包体积
        sourcemap: false,
        /** 打包后静态资源目录 */
        assetsDir: 'static',
        // 打包输出配置
        rollupOptions: {
            output: {
                chunkFileNames: 'static/js/[name]-[hash].js',
                entryFileNames: 'static/js/[name]-[hash].js',
                assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
            }
        }
    }
})
