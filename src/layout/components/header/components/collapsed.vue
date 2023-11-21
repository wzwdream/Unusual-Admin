<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button mr-10 text @click="btnClick">
        <Icon v-if="collapsed" icon="ant-design:menu-unfold-outlined" />
        <Icon v-else icon="ant-design:menu-fold-outlined" />
      </n-button>
    </template>
    {{ !collapsed ? $t('header.collapsed') : $t('header.expand') }}
  </n-tooltip>
</template>

<script setup lang="ts" name="Collapsed">
import { useThemeStore } from '@/store/them'
const themStore = useThemeStore()

const collapsed = computed(() => {
  if (themStore.isShowSider) return themStore.collapsed
  return !themStore.showDrawerMenu
})

const btnClick = () => {
  if (themStore.isShowSider) return themStore.changeCollapsed(!collapsed.value)
  return themStore.changeshowDrawerMenu(collapsed.value)
}
</script>