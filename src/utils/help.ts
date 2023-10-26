import { createDiscreteApi } from 'naive-ui'
import { setting } from '@/setting'
import { useCssVar } from '@vueuse/core'
import { kebabCase } from 'lodash-es'
import { RouterLink } from 'vue-router';
import { type VNodeChild, h } from 'vue'
import Icon from '@/components/icon/index.vue'
import { useMenuStore } from '@/store/menu';
import { useTagStore } from '@/store/tags';


const { message, notification, dialog, loadingBar } = createDiscreteApi(
  ['message', 'dialog', 'notification', 'loadingBar']
)

// 全局信息提示/弹窗/加载进度条
export { message, notification, dialog, loadingBar }

// 全局css变量
export const useVarCss = () => {
  document.title = setting.title // 设置默认标题
  const common: Record<string, string> = setting.naiveThemeOverrides.common
  for (const key in common) {
    useCssVar(`--${kebabCase(key)}`, document.documentElement).value = common[key] || ''
  }
}

// 渲染Icon
export const renderIcon = (icon: string, size: number = 18): (() => VNodeChild) | undefined => {
  if (icon) return () => h(Icon, { icon, size })
  return undefined
}

// 使用v-router跳转
export const hRouter = (lable: string, router: string) => {
  return () => h(
    RouterLink,
    {
      to: {
        path: router
      }
    },
    { default: () => lable }
  )
}

// 计算content高度
export const style = (type: string = '') => {
  const { showFooter, tagsView } = setting
  let height = 60
  if (showFooter) height += 30
  if (tagsView) height += 48
  if (type === 'main') height += 20
  if (type === 'link') height += 50
  return `calc(100vh - ${height}px)`
}

// 重置sotre
export const resetStore = () => {
  const menuStore = useMenuStore()
  menuStore.$reset()
  const tagsStore = useTagStore()
  tagsStore.$reset()
  const userStore = useMenuStore()
  userStore.$reset()
}