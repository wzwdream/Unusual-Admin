<template>
  <n-layout class="layout">
    <n-layout-header class="layout-hearder">
      Header Header Header
    </n-layout-header>
    <n-layout has-sider class="layout-content">
      <n-layout-sider show-trigger collapse-mode="width" :collapsed-width="64" :width="200" :native-scrollbar="false">
        <Menu />
      </n-layout-sider>
      <n-layout :native-scrollbar="false">
        <!-- <n-layout style="max-height: 320px"> -->
        <div class="layout-main">
          <router-view></router-view>
        </div>
        <n-layout-footer class="layout-footer" position="absolute">
          Footer Footer Footer
        </n-layout-footer>
      </n-layout>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts" name="Layout">
</script>

<style scoped>
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .layout-hearder,
  .layout-footer {
    height: 50px;
  }

  .layout-content {
    height: calc(100vh - 50px);
  }

  .layout-main {
    padding: 10px;
    padding-bottom: 50px;
  }
}
</style>
