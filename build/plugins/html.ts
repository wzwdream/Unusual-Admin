import { createHtmlPlugin } from 'vite-plugin-html'

export const htmlPlugin = (isBuild: boolean, viteEnv: ViteEnv) => {

  const htmlPlugin = createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: viteEnv.VITE_TITLE,
      },
    },
  })
  return htmlPlugin
}
