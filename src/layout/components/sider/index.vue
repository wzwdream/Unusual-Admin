<template>
  <n-layout-sider
    v-show="themStore.isShowSider"
    show-trigger
    collapse-mode="width"
    :collapsed-width="64"
    :width="200"
    :native-scrollbar="false"
    :collapsed="themStore.collapsed"
    bordered
    @collapse="themStore.changeCollapsed(true)"
    @expand="themStore.changeCollapsed(false)"
  >
    <Logo v-if="sidebarLogo" />
    <Menu />
  </n-layout-sider>
  <n-drawer v-model:show="themStore.showDrawerMenu" placement="left" :auto-focus="false" width="200">
    <n-drawer-content :native-scrollbar="false" body-content-style="padding: 0px;">
      <Logo v-if="sidebarLogo" />
      <Menu />
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts" name="Sider">
import Logo from './components/logo.vue'
import Menu from './components/menu.vue'
import { setting } from '@/setting'
import { useThemeStore } from '@/store/them'
const { sidebarLogo } = setting
const themStore = useThemeStore()
watch(() => themStore.screenSize, (size) => {
  if (size === 'sm') themStore.changeCollapsed(true)
})
</script>
