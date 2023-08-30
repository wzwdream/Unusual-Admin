import { createDiscreteApi } from 'naive-ui'
import { setting } from '@/setting'
import { useCssVar } from '@vueuse/core'
import { kebabCase } from 'lodash-es'

const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar']
)

export { message, notification, dialog, loadingBar }

export const useVarCss = () => {
  document.title = setting.title // 设置默认标题
  const common: Record<string, string> = setting.naiveThemeOverrides.common
  for (const key in common) {
    useCssVar(`--${kebabCase(key)}`, document.documentElement).value = common[key] || ''
  }
}