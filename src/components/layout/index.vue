<template>
  <n-layout class="layout">
    <n-layout-header class="layout-hearder">
      <Header />
    </n-layout-header>
    <n-layout has-sider class="layout-content">
      <n-layout-sider
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="200"
        :native-scrollbar="false"
        :collapsed="menuStore.collapsed"
        class="layout-sider"
        @collapse="menuStore.changeCollapsed(true)"
        @expand="menuStore.changeCollapsed(false)"
      >
        <Menu />
      </n-layout-sider>
      <n-layout-content :native-scrollbar="false">
        <div class="layout-main">
          <n-back-top :visibility-height="10" bottom="60" />
          <router-view></router-view>
        </div>
      </n-layout-content>
      <n-layout-footer class="layout-footer" position="absolute">
        Footer Footer Footer
      </n-layout-footer>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts" name="Layout">
import Header from './components/header.vue'
import { useMenuStore } from '@/store/menu'
const menuStore = useMenuStore()

</script>

<style scoped>
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .layout-hearder {
    height: 64px;
  }
  .layout-sider {
    z-index: 2;
  }
  .layout-content {
    height: calc(100vh - 64px);
  }

  .layout-main {
    padding: 10px;
    padding-bottom: 50px;
    background: #f5f7f9;
  }
  .layout-footer {
    height: 50px;
    z-index: 1;
    padding: 0 200px;
    text-align: center;
  }
}
</style>
