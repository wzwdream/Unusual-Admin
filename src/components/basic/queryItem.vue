<template>
  <n-space align="center">
    <label v-if="!!props.label" class="flex-shrink-0 flex justify-end pr-10 text-font" :style="{ width: props.labelWidth }">
      <span v-if="props.required" class="color-[#d03050] flex-shrink-0">*&nbsp;</span>
      {{ label }}
    </label>
    <div :style="{ width: props.contentWidth + 'px' }" flex-shrink-0>
      <slot />
    </div>
  </n-space>
</template>

<script setup lang="ts" name="QueryItem">
interface ItenmProps {
  label?: string
  labelWidth?: string
  contentWidth?: number
  required?: boolean
}
const props = withDefaults(defineProps<ItenmProps>(), {
  label: '',
  labelWidth: 'auto',
  contentWidth: 180,
  required: false
})
</script>

<style lang="scss" scope>
  .text-font {
    font-size: 14px;
    font-family: v-sans, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  }
</style>