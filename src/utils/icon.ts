import { type SelectOption } from 'naive-ui/es/select/src/interface'
import { type VNodeChild } from 'vue'
import Icon from '@/components/icon/index.vue'

// 存储一些常用的图标，预设的icon
export const icons = [
  { label: 'tools', value: 'iconoir:tools' },
  { label: 'email', value: 'material-symbols:stacked-email-outline' },
  { label: 'chain', value: 'system-uicons:chain' },
  { label: 'settings', value: 'basil:settings-alt-outline' },
  { label: 'account', value: 'mdi:account-tag-outline' },
  { label: 'tabler', value: 'tabler:components' },
  { label: 'markdown', value: 'ri:markdown-line' },
  { label: 'text', value: 'ic:twotone-text-fields' },
  { label: 'list', value: 'material-symbols:lists' },
  { label: 'search', value: 'mdi:magnify' },
  { label: 'rest', value: 'mdi:restore' },
  { label: 'add', value: 'material-symbols:add-rounded' },
  { label: 'edit', value: 'material-symbols:edit-outline' },
  { label: 'delete', value: 'material-symbols:delete-outline' },
  { label: 'download', value: 'material-symbols:download-rounded' },
  { label: 'searchOff', value: 'ic:outline-search-off' },
  { label: 'fullscreen', value: 'ant-design:fullscreen-outlined' },
  { label: 'fullscreenExit', value: 'ant-design:fullscreen-exit-outlined' },
  { label: 'reload', value: 'ant-design:reload-outlined' },
  { label: 'menuUnfold', value: 'ant-design:menu-unfold-outlined' },
  { label: 'menuFold', value: 'ant-design:menu-fold-outlined' },
  { label: 'language', value: 'heroicons:language-solid' },
  { label: 'enter', value: 'uil:enter' },
  { label: 'upward', value: 'material-symbols:arrow-upward' },
  { label: 'downward', value: 'material-symbols:arrow-downward' },
  { label: 'left', value: 'material-symbols:chevron-left' },
  { label: 'right', value: 'material-symbols:chevron-right' },
  { label: 'close', value: 'material-symbols:close-rounded' },
  { label: 'sunny', value: 'material-symbols:sunny-outline' },
  { label: 'dark', value: 'material-symbols:dark-mode-outline-rounded' },
  { label: 'github', value: 'mdi:github' },
  { label: 'juejin', value: 'tabler:brand-juejin' },
  { label: 'qq', value: 'bi:tencent-qq' },
  { label: 'wechat', value: 'tabler:brand-wechat' },
  { label: 'manageAccounts', value: 'material-symbols:manage-accounts-outline' },
  { label: 'lock', value: 'ri:lock-line' },
  { label: 'logout', value: 'material-symbols:logout' },
  { label: 'indeterminate', value: 'material-symbols:check-indeterminate-small-rounded' },
  { label: 'expand', value: 'mdi:arrow-expand-horizontal' },
  { label: 'expand-left', value: 'mdi:arrow-expand-left' },
  { label: 'expand-right', value: 'mdi:arrow-expand-right' },
  { label: 'save', value: 'mingcute:save-2-line' },
  { label: 'colordict', value: 'arcticons:colordict' },
  { label: 'preview', value: 'material-symbols:preview' },
  { label: 'map', value: 'material-symbols:map-outline-sharp' },
]

// 渲染Icon
export const renderIcon = (icon: string, size: number = 18): (() => VNodeChild) | undefined => {
  if (icon) return () => h(Icon, { icon, size })
  return undefined
}

// 下拉标签渲染自定义
export const renderLabel = (option: SelectOption): VNodeChild => {
  return [
    h(
      'div',
      { style: 'display: flex; align-items: center;' },
      [
        h(
           Icon,
           { icon: option.value as string, style: 'margin-right: 10px;' }
         ),
         option.label as string
      ]
    ),
  ]
}
