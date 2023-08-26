<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button mr-10 text @click="menuStore.changeCollapsed(!menuStore.collapsed)">
        <n-icon size="24">
          <MenuUnfoldOutlined v-if="menuStore.collapsed" />
          <MenuFoldOutlined v-else />
        </n-icon>
      </n-button>
    </template>
    {{ !menuStore.collapsed ? '收起菜单' : '展开菜单' }}
  </n-tooltip>
</template>

<script setup lang="ts" name="Collapsed">
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@vicons/antd'
import { useMenuStore } from '@/store/menu'
const menuStore = useMenuStore()
</script>