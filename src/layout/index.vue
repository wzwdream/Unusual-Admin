<template>
  <n-layout has-sider>
    <n-layout-sider
      show-trigger
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      :native-scrollbar="false"
      :collapsed="menuStore.collapsed"
      @collapse="menuStore.changeCollapsed(true)"
      @expand="menuStore.changeCollapsed(false)"
    >
      <Sider />
    </n-layout-sider>
    <n-layout h-full>
      <Header />
      <Content />
      <Footer />
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts" name="Layout">
import Header from './components/header/index.vue'
import Sider from './components/sider/index.vue'
import Footer from './components/footer.vue'
import Content from './components/content.vue'
import { useMenuStore } from '@/store/menu'
const menuStore = useMenuStore()
</script>

<style scoped>
</style>
