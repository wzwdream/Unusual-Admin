<template>
  <n-layout-sider
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="200"
    :native-scrollbar="false"
    :collapsed="menuStore.collapsed"
    bordered
    @collapse="menuStore.changeCollapsed(true)"
    @expand="menuStore.changeCollapsed(false)"
  >
    <Logo v-if="sidebarLogo" />
    <Menu />
  </n-layout-sider>
</template>

<script setup lang="ts" name="Sider">
import { useMenuStore } from '@/store/menu'
import Logo from './components/logo.vue'
import Menu from './components/menu.vue'
import { setting } from '@/setting'
const { sidebarLogo } = setting
const menuStore = useMenuStore()
</script>
