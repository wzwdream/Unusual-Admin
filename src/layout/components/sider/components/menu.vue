<template>
  <n-menu :options="menuOptions" :default-expanded-keys="defaultExpandedKeys" :accordion="accordion" />
</template>

<script setup lang="ts" name="Menu">
import { type MenuOption } from 'naive-ui'
import { RouterLink } from 'vue-router'
import { h } from 'vue'
import { setting } from '@/setting'
import Icon from '@/components/icon/index.vue';
const { accordion } = setting
function renderIcon(icon: string) {
  return () => h(Icon, {icon})
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
  icon: renderIcon('material-symbols:align-space-even-rounded'),
  children: [
    {
      label: hRouter('基础列表', '/list'),
      key: 'list',
      icon: renderIcon('material-symbols:align-space-even-rounded'),
    },
    {
      label: hRouter('拖拽', '/list/drag'),
      key: 'drap',
    }
  ]
},
{
  label: hRouter('邮件', '/email/sendEmail'),
  key: 'email',
  icon: renderIcon('material-symbols:attach-email-outline'),
}
]
const defaultExpandedKeys = ['fish', 'braise']

</script>
