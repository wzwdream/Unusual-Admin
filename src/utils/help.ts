import { createDiscreteApi } from 'naive-ui'
import { setting } from '@/setting'
import { useCssVar } from '@vueuse/core'
import { kebabCase } from 'lodash-es'
import { RouterLink } from 'vue-router';
import { h } from 'vue'
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

// 计算content高度(需要在setup中使用)
export const calcHeight = (type: string = '') => {
  const tagStore = useTagStore()
  if (tagStore.fullContent) return 'calc(100vh - 20px)' // 全屏的content高度固定
  const { showFooter, tagsView } = setting
  let height = 60
  if (showFooter) height += 30
  if (tagsView) height += 48
  if (type === 'main') height += 20
  if (type === 'link') height += 30
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

// 复制属性
export const copyProps = (target: any, source: any) => {
  for (const key in target) {
    // eslint-disable-next-line no-prototype-builtins
    if (target.hasOwnProperty(key)) {
      target[key] = source[key]
    }
  }
}

// 下载文件
export const download = (data: any, name?: string) => {
  const blob = new Blob([data], { type: 'application/octet-stream' });

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.style.display = 'none';
  a.href = url;

  const date = new Date();
  a.download = (name || '') + date.getFullYear() + (date.getMonth() + 1) + date.getDate() + '.xlsx';

  a.click();

  window.URL.revokeObjectURL(url);
}
