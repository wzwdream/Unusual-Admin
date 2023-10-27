// vite.config.ts
import { defineConfig, loadEnv } from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/vite@4.4.9_@types+node@20.5.7_sass@1.66.1/node_modules/vite/dist/node/index.js";
import { resolve as resolve2 } from "path";

// build/plugins/index.ts
import vue from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/@vitejs+plugin-vue@4.3.3_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/@vitejs+plugin-vue-jsx@3.0.2_vite@4.4.9_vue@3.3.4/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import VueSetupExtend from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/vite-plugin-vue-setup-extend@0.4.0_vite@4.4.9/node_modules/vite-plugin-vue-setup-extend/dist/index.mjs";
import viteCompression from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/vite-plugin-compression@0.5.1_vite@4.4.9/node_modules/vite-plugin-compression/dist/index.mjs";
import UnoCSS from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/unocss@0.55.3_postcss@8.4.28_vite@4.4.9/node_modules/unocss/dist/vite.mjs";

// build/plugins/html.ts
import { createHtmlPlugin } from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/vite-plugin-html@3.2.0_vite@4.4.9/node_modules/vite-plugin-html/dist/index.mjs";
var htmlPlugin = (isBuild, viteEnv) => {
  const htmlPlugin2 = createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: viteEnv.VITE_TITLE
      }
    }
  });
  return htmlPlugin2;
};

// build/plugins/autoImport.ts
import AutoImport from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/unplugin-auto-import@0.16.6_@vueuse+core@10.4.0/node_modules/unplugin-auto-import/dist/vite.js";
import Components from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/vite.mjs";
import { NaiveUiResolver } from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/unplugin-vue-components@0.25.1_vue@3.3.4/node_modules/unplugin-vue-components/dist/resolvers.mjs";
import IconsResolver from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/unplugin-icons@0.17.0/node_modules/unplugin-icons/dist/resolver.mjs";
var autoImport = () => {
  return [
    // 自动引入APi
    AutoImport({
      include: [
        /\.[tj]sx?$/,
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/
      ],
      imports: [
        "vue",
        "vue-router",
        {
          "naive-ui": [
            "useDialog",
            "useMessage",
            "useNotification",
            "useLoadingBar"
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
      dirs: ["src/components"],
      // 自动导入项目的公共组件
      extensions: ["vue", "tsx"],
      // 组件有效的文件扩展名
      resolvers: [
        NaiveUiResolver(),
        IconsResolver({ customCollections: ["svg"], componentPrefix: "icon" })
      ]
    })
  ];
};

// build/plugins/icon.ts
import Icons from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/unplugin-icons@0.17.0/node_modules/unplugin-icons/dist/vite.mjs";
import { createSvgIconsPlugin } from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/vite-plugin-svg-icons@2.0.1_vite@4.4.9/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import { resolve } from "path";
var iconPlugins = () => {
  return [
    Icons({
      compiler: "vue3",
      scale: 1,
      defaultClass: "inline-block"
    }),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), "src/assets/svg")],
      symbolId: "icon-[dir]-[name]"
    })
  ];
};

// build/plugins/mock.ts
import { viteMockServe } from "file:///D:/my-play/Unusual-Admin/node_modules/.pnpm/vite-plugin-mock@2.9.8_mockjs@1.1.0_vite@4.4.9/node_modules/vite-plugin-mock/dist/index.js";
var mockPlugins = (isBuild, viteEnv) => {
  return [
    viteMockServe({
      mockPath: "mock",
      localEnabled: viteEnv.VITE_MOCK,
      // 开启mock
      prodEnabled: viteEnv.VITE_MOCK,
      //设置打包是否启用 mock 功能
      supportTs: true,
      // 是否读取ts文件模块
      logger: true,
      //是否在控制台显示请求日志
      // 开启生产模式的mock
      injectCode: `
        import { setupProdMockServer } from '../mock/index.ts';
        setupProdMockServer();
        `
    })
  ];
};

// build/plugins/index.ts
var setupPlugins = (isBuild, viteEnv) => {
  const plugins = [
    vue(),
    vueJsx(),
    UnoCSS(),
    VueSetupExtend(),
    // setup语法糖name增强插件
    ...autoImport(),
    ...iconPlugins()
  ];
  if (viteEnv.VITE_COMPRESS)
    plugins.push(viteCompression());
  const html = htmlPlugin(isBuild, viteEnv);
  plugins.push(html);
  const mock = mockPlugins(isBuild, viteEnv);
  plugins.push(mock);
  return plugins;
};

// build/utils.ts
function conversionsEnv(envConf) {
  const ret = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, "\n");
    realName = realName === "true" ? true : realName === "false" ? false : realName;
    if (envName === "VITE_PORT") {
      realName = Number(realName);
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
}

// vite.config.ts
var __vite_injected_original_dirname = "D:\\my-play\\Unusual-Admin";
var vite_config_default = defineConfig(({ command, mode }) => {
  const isBuild = command === "build";
  const viteEnv = conversionsEnv(loadEnv(mode, process.cwd()));
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_BASE_API } = viteEnv;
  return {
    base: VITE_PUBLIC_PATH || "./",
    resolve: {
      //设置别名
      alias: {
        "@": resolve2(__vite_injected_original_dirname, "src")
      }
    },
    plugins: setupPlugins(isBuild, viteEnv),
    server: {
      host: true,
      port: VITE_PORT,
      // 启动端口
      // 设置代理
      proxy: {
        "/api": {
          target: VITE_BASE_API || "http://127.0.0.1:3500",
          changeOrigin: true,
          rewrite: (path) => {
            return path.replace(/^\/api/, "");
          }
        }
      }
    },
    build: {
      reportCompressedSize: false,
      // 是否开启计算文件大小，项目过大会影响打包效率
      sourcemap: !isBuild,
      assetsDir: "static",
      // 打包输出配置
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              return id.toString().split("node_modules/")[1].split("/")[0].toString();
            }
          },
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYnVpbGQvcGx1Z2lucy9pbmRleC50cyIsICJidWlsZC9wbHVnaW5zL2h0bWwudHMiLCAiYnVpbGQvcGx1Z2lucy9hdXRvSW1wb3J0LnRzIiwgImJ1aWxkL3BsdWdpbnMvaWNvbi50cyIsICJidWlsZC9wbHVnaW5zL21vY2sudHMiLCAiYnVpbGQvdXRpbHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxteS1wbGF5XFxcXFVudXN1YWwtQWRtaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15LXBsYXlcXFxcVW51c3VhbC1BZG1pblxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbXktcGxheS9VbnVzdWFsLUFkbWluL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52IH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHsgcmVzb2x2ZSB9IGZyb20gJ3BhdGgnXHJcbmltcG9ydCB7IHNldHVwUGx1Z2lucyB9IGZyb20gJy4vYnVpbGQvcGx1Z2lucy9pbmRleCdcclxuaW1wb3J0IHsgY29udmVyc2lvbnNFbnYgfSBmcm9tICcuL2J1aWxkL3V0aWxzJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUgfSkgPT4ge1xyXG4gIGNvbnN0IGlzQnVpbGQgPSBjb21tYW5kID09PSAnYnVpbGQnXHJcblxyXG4gIGNvbnN0IHZpdGVFbnY6IFZpdGVFbnYgPSBjb252ZXJzaW9uc0Vudihsb2FkRW52KG1vZGUsIHByb2Nlc3MuY3dkKCkpKVxyXG4gIGNvbnN0IHsgVklURV9QT1JULCBWSVRFX1BVQkxJQ19QQVRILCBWSVRFX0JBU0VfQVBJIH0gPSB2aXRlRW52XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBiYXNlOiBWSVRFX1BVQkxJQ19QQVRIIHx8ICcuLycsXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIC8vXHU4QkJFXHU3RjZFXHU1MjJCXHU1NDBEXHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgJ0AnOiByZXNvbHZlKF9fZGlybmFtZSwgJ3NyYycpXHJcbiAgICAgIH1cclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBzZXR1cFBsdWdpbnMoaXNCdWlsZCwgdml0ZUVudiksXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgaG9zdDogdHJ1ZSxcclxuICAgICAgcG9ydDogVklURV9QT1JULCAvLyBcdTU0MkZcdTUyQThcdTdBRUZcdTUzRTNcclxuICAgICAgLy8gXHU4QkJFXHU3RjZFXHU0RUUzXHU3NDA2XHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9hcGknOiB7XHJcbiAgICAgICAgICB0YXJnZXQ6IFZJVEVfQkFTRV9BUEkgfHwgJ2h0dHA6Ly8xMjcuMC4wLjE6MzUwMCcsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9LFxyXG4gICAgYnVpbGQ6IHtcclxuICAgICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLCAvLyBcdTY2MkZcdTU0MjZcdTVGMDBcdTU0MkZcdThCQTFcdTdCOTdcdTY1ODdcdTRFRjZcdTU5MjdcdTVDMEZcdUZGMENcdTk4NzlcdTc2RUVcdThGQzdcdTU5MjdcdTRGMUFcdTVGNzFcdTU0Q0RcdTYyNTNcdTUzMDVcdTY1NDhcdTczODdcclxuICAgICAgc291cmNlbWFwOiAhaXNCdWlsZCxcclxuICAgICAgYXNzZXRzRGlyOiAnc3RhdGljJyxcclxuICAgICAgLy8gXHU2MjUzXHU1MzA1XHU4RjkzXHU1MUZBXHU5MTREXHU3RjZFXHJcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgIG1hbnVhbENodW5rcyhpZCkge1xyXG4gICAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSB7XHJcbiAgICAgICAgICAgICAgLy8gXHU2NzAwXHU1QzBGXHU1MzE2XHU1MjA2XHU1MzA1XHJcbiAgICAgICAgICAgICAgcmV0dXJuIGlkIC50b1N0cmluZygpLnNwbGl0KCdub2RlX21vZHVsZXMvJylbMV0uc3BsaXQoJy8nKVswXS50b1N0cmluZygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ3N0YXRpYy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcclxuICAgICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnc3RhdGljL2pzL1tuYW1lXS1baGFzaF0uanMnLFxyXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XSdcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRDpcXFxcbXktcGxheVxcXFxVbnVzdWFsLUFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15LXBsYXlcXFxcVW51c3VhbC1BZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXFxcXGluZGV4LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teS1wbGF5L1VudXN1YWwtQWRtaW4vYnVpbGQvcGx1Z2lucy9pbmRleC50c1wiO2ltcG9ydCB7IHR5cGUgUGx1Z2luT3B0aW9uIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHZ1ZSBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUnXHJcbmltcG9ydCB2dWVKc3ggZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlLWpzeCdcclxuaW1wb3J0IFZ1ZVNldHVwRXh0ZW5kIGZyb20gJ3ZpdGUtcGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQnXHJcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXHJcbmltcG9ydCBVbm9DU1MgZnJvbSAndW5vY3NzL3ZpdGUnXHJcbmltcG9ydCB7IGh0bWxQbHVnaW4gfSBmcm9tICcuL2h0bWwnXHJcbmltcG9ydCB7IGF1dG9JbXBvcnQgfSBmcm9tICcuL2F1dG9JbXBvcnQnXHJcbmltcG9ydCB7IGljb25QbHVnaW5zIH0gZnJvbSAnLi9pY29uJ1xyXG5pbXBvcnQgeyBtb2NrUGx1Z2lucyB9IGZyb20gJy4vbW9jaydcclxuXHJcbmV4cG9ydCBjb25zdCBzZXR1cFBsdWdpbnMgPSAoaXNCdWlsZDogYm9vbGVhbiwgdml0ZUVudjogVml0ZUVudikgPT4ge1xyXG4gIGNvbnN0IHBsdWdpbnM6IFBsdWdpbk9wdGlvbltdID0gW1xyXG4gICAgdnVlKCksXHJcbiAgICB2dWVKc3goKSxcclxuICAgIFVub0NTUygpLFxyXG4gICAgVnVlU2V0dXBFeHRlbmQoKSwgLy8gc2V0dXBcdThCRURcdTZDRDVcdTdDRDZuYW1lXHU1ODlFXHU1RjNBXHU2M0QyXHU0RUY2XHJcbiAgICAuLi5hdXRvSW1wb3J0KCksXHJcbiAgICAuLi5pY29uUGx1Z2lucygpXHJcbiAgXVxyXG4gIGlmICh2aXRlRW52LlZJVEVfQ09NUFJFU1MpIHBsdWdpbnMucHVzaCh2aXRlQ29tcHJlc3Npb24oKSkgLy8gXHU1RjAwXHU1NDJGXHU2NTg3XHU0RUY2XHU1MzhCXHU3RjI5XHJcblxyXG4gIGNvbnN0IGh0bWwgPSBodG1sUGx1Z2luKGlzQnVpbGQsIHZpdGVFbnYpXHJcbiAgcGx1Z2lucy5wdXNoKGh0bWwpXHJcblxyXG4gIGNvbnN0IG1vY2sgPSBtb2NrUGx1Z2lucyhpc0J1aWxkLCB2aXRlRW52KVxyXG4gIHBsdWdpbnMucHVzaChtb2NrKVxyXG5cclxuICByZXR1cm4gcGx1Z2luc1xyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxteS1wbGF5XFxcXFVudXN1YWwtQWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcbXktcGxheVxcXFxVbnVzdWFsLUFkbWluXFxcXGJ1aWxkXFxcXHBsdWdpbnNcXFxcaHRtbC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbXktcGxheS9VbnVzdWFsLUFkbWluL2J1aWxkL3BsdWdpbnMvaHRtbC50c1wiO2ltcG9ydCB7IGNyZWF0ZUh0bWxQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1odG1sJ1xyXG5cclxuZXhwb3J0IGNvbnN0IGh0bWxQbHVnaW4gPSAoaXNCdWlsZDogYm9vbGVhbiwgdml0ZUVudjogVml0ZUVudikgPT4ge1xyXG5cclxuICBjb25zdCBodG1sUGx1Z2luID0gY3JlYXRlSHRtbFBsdWdpbih7XHJcbiAgICBtaW5pZnk6IGlzQnVpbGQsXHJcbiAgICBpbmplY3Q6IHtcclxuICAgICAgZGF0YToge1xyXG4gICAgICAgIHRpdGxlOiB2aXRlRW52LlZJVEVfVElUTEUsXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gIH0pXHJcbiAgcmV0dXJuIGh0bWxQbHVnaW5cclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG15LXBsYXlcXFxcVW51c3VhbC1BZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxteS1wbGF5XFxcXFVudXN1YWwtQWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxhdXRvSW1wb3J0LnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teS1wbGF5L1VudXN1YWwtQWRtaW4vYnVpbGQvcGx1Z2lucy9hdXRvSW1wb3J0LnRzXCI7aW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcclxuaW1wb3J0IENvbXBvbmVudHMgZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvdml0ZSdcclxuaW1wb3J0IHsgTmFpdmVVaVJlc29sdmVyIH0gZnJvbSAndW5wbHVnaW4tdnVlLWNvbXBvbmVudHMvcmVzb2x2ZXJzJ1xyXG5pbXBvcnQgSWNvbnNSZXNvbHZlciBmcm9tICd1bnBsdWdpbi1pY29ucy9yZXNvbHZlcidcclxuXHJcbmV4cG9ydCBjb25zdCBhdXRvSW1wb3J0ID0gKCkgPT4ge1xyXG4gIHJldHVybiBbXHJcbiAgICAvLyBcdTgxRUFcdTUyQThcdTVGMTVcdTUxNjVBUGlcclxuICAgIEF1dG9JbXBvcnQoe1xyXG4gICAgICBpbmNsdWRlOiBbXHJcbiAgICAgICAgL1xcLlt0al1zeD8kLyxcclxuICAgICAgICAvXFwudnVlJC8sIC9cXC52dWVcXD92dWUvLFxyXG4gICAgICAgIC9cXC5tZCQvLFxyXG4gICAgICBdLFxyXG4gICAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgJ3Z1ZScsXHJcbiAgICAgICAgJ3Z1ZS1yb3V0ZXInLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICduYWl2ZS11aSc6IFtcclxuICAgICAgICAgICAgJ3VzZURpYWxvZycsXHJcbiAgICAgICAgICAgICd1c2VNZXNzYWdlJyxcclxuICAgICAgICAgICAgJ3VzZU5vdGlmaWNhdGlvbicsXHJcbiAgICAgICAgICAgICd1c2VMb2FkaW5nQmFyJ1xyXG4gICAgICAgICAgXVxyXG4gICAgICAgIH1cclxuICAgICAgXSxcclxuICAgICAgLy8gZXNsaW50XHU2MkE1XHU5NTE5XHU1OTA0XHU3NDA2XHJcbiAgICAgIGVzbGludHJjOiB7XHJcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxyXG4gICAgICB9XHJcbiAgICB9KSxcclxuICAgIC8vIFx1ODFFQVx1NTJBOFx1NUYxNVx1NTE2NVx1N0VDNFx1NEVGNlxyXG4gICAgQ29tcG9uZW50cyh7XHJcbiAgICAgIGRpcnM6IFsnc3JjL2NvbXBvbmVudHMnXSwgLy8gXHU4MUVBXHU1MkE4XHU1QkZDXHU1MTY1XHU5ODc5XHU3NkVFXHU3Njg0XHU1MTZDXHU1MTcxXHU3RUM0XHU0RUY2XHJcbiAgICAgIGV4dGVuc2lvbnM6IFsndnVlJywgJ3RzeCddLCAvLyBcdTdFQzRcdTRFRjZcdTY3MDlcdTY1NDhcdTc2ODRcdTY1ODdcdTRFRjZcdTYyNjlcdTVDNTVcdTU0MERcclxuICAgICAgcmVzb2x2ZXJzOiBbXHJcbiAgICAgICAgTmFpdmVVaVJlc29sdmVyKCksXHJcbiAgICAgICAgSWNvbnNSZXNvbHZlcih7IGN1c3RvbUNvbGxlY3Rpb25zOiBbJ3N2ZyddLCBjb21wb25lbnRQcmVmaXg6ICdpY29uJyB9KSxcclxuICAgICAgXVxyXG4gICAgfSlcclxuICBdXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG15LXBsYXlcXFxcVW51c3VhbC1BZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxteS1wbGF5XFxcXFVudXN1YWwtQWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxpY29uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teS1wbGF5L1VudXN1YWwtQWRtaW4vYnVpbGQvcGx1Z2lucy9pY29uLnRzXCI7aW1wb3J0IEljb25zIGZyb20gJ3VucGx1Z2luLWljb25zL3ZpdGUnXHJcbmltcG9ydCB7IGNyZWF0ZVN2Z0ljb25zUGx1Z2luIH0gZnJvbSAndml0ZS1wbHVnaW4tc3ZnLWljb25zJ1xyXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcclxuXHJcbmV4cG9ydCBjb25zdCBpY29uUGx1Z2lucyA9ICgpID0+IHtcclxuICByZXR1cm4gW1xyXG4gICAgSWNvbnMoe1xyXG4gICAgICBjb21waWxlcjogJ3Z1ZTMnLFxyXG4gICAgICBzY2FsZTogMSxcclxuICAgICAgZGVmYXVsdENsYXNzOiAnaW5saW5lLWJsb2NrJyxcclxuICAgIH0pLFxyXG4gICAgY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgICBpY29uRGlyczogW3Jlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvc3ZnJyldLFxyXG4gICAgICBzeW1ib2xJZDogJ2ljb24tW2Rpcl0tW25hbWVdJ1xyXG4gICAgfSlcclxuICBdXHJcbn0iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkQ6XFxcXG15LXBsYXlcXFxcVW51c3VhbC1BZG1pblxcXFxidWlsZFxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFxteS1wbGF5XFxcXFVudXN1YWwtQWRtaW5cXFxcYnVpbGRcXFxccGx1Z2luc1xcXFxtb2NrLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi9teS1wbGF5L1VudXN1YWwtQWRtaW4vYnVpbGQvcGx1Z2lucy9tb2NrLnRzXCI7aW1wb3J0IHsgdml0ZU1vY2tTZXJ2ZSB9IGZyb20gJ3ZpdGUtcGx1Z2luLW1vY2snXHJcblxyXG5leHBvcnQgY29uc3QgbW9ja1BsdWdpbnMgPSAoaXNCdWlsZDogYm9vbGVhbiwgdml0ZUVudjogVml0ZUVudikgPT4ge1xyXG4gIHJldHVybiBbXHJcbiAgICB2aXRlTW9ja1NlcnZlKHtcclxuICAgICAgbW9ja1BhdGg6ICdtb2NrJyxcclxuICAgICAgbG9jYWxFbmFibGVkOiB2aXRlRW52LlZJVEVfTU9DSywgLy8gXHU1RjAwXHU1NDJGbW9ja1xyXG4gICAgICBwcm9kRW5hYmxlZDogdml0ZUVudi5WSVRFX01PQ0ssIC8vXHU4QkJFXHU3RjZFXHU2MjUzXHU1MzA1XHU2NjJGXHU1NDI2XHU1NDJGXHU3NTI4IG1vY2sgXHU1MjlGXHU4MEZEXHJcbiAgICAgIHN1cHBvcnRUczogdHJ1ZSwgLy8gXHU2NjJGXHU1NDI2XHU4QkZCXHU1M0Q2dHNcdTY1ODdcdTRFRjZcdTZBMjFcdTU3NTdcclxuICAgICAgbG9nZ2VyOiB0cnVlLCAvL1x1NjYyRlx1NTQyNlx1NTcyOFx1NjNBN1x1NTIzNlx1NTNGMFx1NjYzRVx1NzkzQVx1OEJGN1x1NkM0Mlx1NjVFNVx1NUZEN1xyXG4gICAgICAvLyBcdTVGMDBcdTU0MkZcdTc1MUZcdTRFQTdcdTZBMjFcdTVGMEZcdTc2ODRtb2NrXHJcbiAgICAgIGluamVjdENvZGU6IGBcclxuICAgICAgICBpbXBvcnQgeyBzZXR1cFByb2RNb2NrU2VydmVyIH0gZnJvbSAnLi4vbW9jay9pbmRleC50cyc7XHJcbiAgICAgICAgc2V0dXBQcm9kTW9ja1NlcnZlcigpO1xyXG4gICAgICAgIGBcclxuICAgIH0pXHJcbiAgXVxyXG59IiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxteS1wbGF5XFxcXFVudXN1YWwtQWRtaW5cXFxcYnVpbGRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXG15LXBsYXlcXFxcVW51c3VhbC1BZG1pblxcXFxidWlsZFxcXFx1dGlscy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovbXktcGxheS9VbnVzdWFsLUFkbWluL2J1aWxkL3V0aWxzLnRzXCI7ZXhwb3J0IGZ1bmN0aW9uIGNvbnZlcnNpb25zRW52KGVudkNvbmY6IFJlY29yZDxzdHJpbmcsIGFueT4pOiBWaXRlRW52IHtcclxuICBjb25zdCByZXQ6IGFueSA9IHt9XHJcblxyXG4gIGZvciAoY29uc3QgZW52TmFtZSBvZiBPYmplY3Qua2V5cyhlbnZDb25mKSkge1xyXG4gICAgbGV0IHJlYWxOYW1lID0gZW52Q29uZltlbnZOYW1lXS5yZXBsYWNlKC9cXFxcbi9nLCAnXFxuJylcclxuICAgIHJlYWxOYW1lID0gcmVhbE5hbWUgPT09ICd0cnVlJyA/IHRydWUgOiByZWFsTmFtZSA9PT0gJ2ZhbHNlJyA/IGZhbHNlIDogcmVhbE5hbWVcclxuXHJcbiAgICBpZiAoZW52TmFtZSA9PT0gJ1ZJVEVfUE9SVCcpIHtcclxuICAgICAgcmVhbE5hbWUgPSBOdW1iZXIocmVhbE5hbWUpXHJcbiAgICB9XHJcbiAgICByZXRbZW52TmFtZV0gPSByZWFsTmFtZVxyXG4gICAgcHJvY2Vzcy5lbnZbZW52TmFtZV0gPSByZWFsTmFtZVxyXG4gIH1cclxuICByZXR1cm4gcmV0O1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFnUSxTQUFTLGNBQWMsZUFBZTtBQUN0UyxTQUFTLFdBQUFBLGdCQUFlOzs7QUNBeEIsT0FBTyxTQUFTO0FBQ2hCLE9BQU8sWUFBWTtBQUNuQixPQUFPLG9CQUFvQjtBQUMzQixPQUFPLHFCQUFxQjtBQUM1QixPQUFPLFlBQVk7OztBQ0w2USxTQUFTLHdCQUF3QjtBQUUxVCxJQUFNLGFBQWEsQ0FBQyxTQUFrQixZQUFxQjtBQUVoRSxRQUFNQyxjQUFhLGlCQUFpQjtBQUFBLElBQ2xDLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxNQUNOLE1BQU07QUFBQSxRQUNKLE9BQU8sUUFBUTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUNELFNBQU9BO0FBQ1Q7OztBQ2I0UyxPQUFPLGdCQUFnQjtBQUNuVSxPQUFPLGdC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
