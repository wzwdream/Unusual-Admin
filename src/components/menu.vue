<template>
  <div>
    <n-menu :options="menuOptions" :default-expanded-keys="defaultExpandedKeys" />
  </div>
</template>

<script  lang="ts">
// import { defineComponent, h, Component } from 'vue'
import { NIcon } from 'naive-ui'
import type { MenuOption } from 'naive-ui'
import {
  GridSharp as GridSharp,
  Mail as Mail,
  // TabletPortraitOutline,
  // BagOutline as BagOutlineIcon
} from '@vicons/ionicons5'
import { RouterLink } from 'vue-router'

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
      }
    ]
  },
  {
    label: '邮件',
    key: 'email',
    icon: renderIcon(Mail),
  }
]

export default defineComponent({
  setup() {
    return {
      menuOptions,
      defaultExpandedKeys: ['fish', 'braise']
    }
  }
})
</script>
