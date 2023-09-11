<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button mr-10 text @click="menuStore.changeCollapsed(!menuStore.collapsed)">
        <Icon v-if="menuStore.collapsed" icon="ant-design:menu-unfold-outlined" />
        <Icon v-else icon="ant-design:menu-fold-outlined" />
      </n-button>
    </template>
    {{ !menuStore.collapsed ? $t('header.collapsed') : $t('header.expand') }}
  </n-tooltip>
</template>

<script setup lang="ts" name="Collapsed">
import { useMenuStore } from '@/store/menu'
const menuStore = useMenuStore()
</script>