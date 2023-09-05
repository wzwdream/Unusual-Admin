<template>
  <svg aria-hidden="true" width="1em" height="1em">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts" name="SvgIcon">
interface SvgIconProps {
  icon: string
  prefix?: string
  color?: string
}
const props = withDefaults(defineProps<SvgIconProps>(), {
  prefix: 'icon',
  color: 'currentColor'
})

const symbolId = computed(() => `#${props.prefix}-${props.icon}`)
</script>