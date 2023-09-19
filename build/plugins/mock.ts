import { viteMockServe } from 'vite-plugin-mock'

export const mockPlugins = (isBuild: boolean, viteEnv: ViteEnv) => {
  return [
    viteMockServe({
      mockPath: 'mock',
      localEnabled: !isBuild, // 只有开发环境开启mock
      prodEnabled: isBuild && viteEnv.VITE_MOCK, //设置打包是否启用 mock 功能
      supportTs: true, // 是否读取ts文件模块
      logger: true, //是否在控制台显示请求日志
      // 开启生产模式的mock
      injectCode: `
        import { setupProdMockServer } from '../mock/index.ts';
        setupProdMockServer();
        `
    })
  ]
}