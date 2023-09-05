
<template>
  <component :is="component" />
</template>

<script setup lang="ts" name="Icon">
import { h } from 'vue'
import { Icon } from '@iconify/vue'
import SvgIcon from './svgIcon.vue'
import { NIcon } from 'naive-ui'

interface IconProps {
  icon: string
  size?: number
  color?: string
  type?: 'iconify' | 'svg'
}
const props = withDefaults(defineProps<IconProps>(), {
  size: 24,
  color: '#333639',
  type: 'iconify'
})

const renderIcon = (icon: string, props: { size: number, color: string }) => {
  return () => h(NIcon, props, { default: () => h(Icon, { icon }) })
}

const renderSvgIcon = (icon: string, props: { size: number, color: string }) => {
  return () => h(NIcon, props, { default: () => h(SvgIcon, { icon }) })
}

const component = computed(() =>
  props.type === 'iconify'
    ? renderIcon(props.icon, { size: props.size, color: props.color })
    : renderSvgIcon(props.icon, { size: props.size, color: props.color })
)
</script>