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
      <n-layout-content :native-scrollbar="false" class="layout-main">
        <div class="layout-box">
          <n-back-top :visibility-height="10" bottom="120" />
          <router-view></router-view>
        </div>
      </n-layout-content>
      <n-layout-footer class="layout-footer" position="absolute">
        xxxx公司 xxxxx系统 ⋅ xxxx备案号号-40
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
  width: 100%;
  height: 100%;
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
    background: #f5f7f9;
    .layout-box {
      padding: 10px;
      padding-bottom: 43px;
    }
  }
  .layout-footer {
    height: 33px;
    line-height: 33px;
    z-index: 1;
    padding: 0 200px;
    text-align: center;
  }
}
</style>
