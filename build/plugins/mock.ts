import { viteMockServe } from 'vite-plugin-mock'

export const mockPlugins = (isBuild: boolean, viteEnv: ViteEnv) => {
  return viteMockServe({
    mockPath: 'mock',
    enable: viteEnv.VITE_MOCK, // 开启mock
    logger: true, //是否在控制台显示请求日志
  })
}