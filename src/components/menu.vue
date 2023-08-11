<template>
  <div>
    <n-menu
        :options="menuOptions"
        :default-expanded-keys="defaultExpandedKeys"

    />
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

function renderIcon (icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) })
}

const menuOptions: MenuOption[] = [
  {
    label: 'CRUD',
    key: 'CRUD',
    icon: renderIcon(GridSharp),
    children: [
      {
        label: 'CRUD1',
        key: 'CRUD1',
      },
      {
        label: 'CRUD2',
        key: 'CRUD2',
      }
    ]
  },
  {
    label: '邮件',
    key: 'email',
    icon: renderIcon(Mail),
  },
]

export default defineComponent({
  setup () {
    return {
      menuOptions,
      defaultExpandedKeys: ['fish', 'braise']
    }
  }
})
</script>
