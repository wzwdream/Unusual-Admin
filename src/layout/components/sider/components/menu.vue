<template>
  <n-menu :options="menuOptions" :default-expanded-keys="defaultExpandedKeys" :accordion="accordion" />
</template>

<script setup lang="ts" name="Menu">
import { NIcon, type MenuOption } from 'naive-ui'
import { GridSharp, Mail } from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'
import { h, type Component } from 'vue'
import { setting } from '@/setting'
const { accordion } = setting
function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

// 使用v-router跳转
const hRouter = (lable: string, router: string) => {
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

const menuOptions: MenuOption[] = [
{
  label: '列表',
  key: 'list',
  icon: renderIcon(GridSharp),
  children: [
    {
      label: hRouter('基础列表', '/list'),
      key: 'go-to-work',
    },
    {
      label: hRouter('拖拽', '/list/drag'),
      key: 'go-to-work',
    }
  ]
},
{
  label: hRouter('邮件', '/email/email'),
  key: 'email',
  icon: renderIcon(Mail),
}
]
const defaultExpandedKeys = ['fish', 'braise']

</script>
