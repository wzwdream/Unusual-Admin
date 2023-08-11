<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <div class="home">
        <div class="menu">
          <Menu />
        </div>
        <main class="main">
          <router-view></router-view>
        </main>
      </div>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: white;
  display: flex;

  .menu {
    width: 210px;
  }

  .main {
    flex-grow: 1;
  }
}
</style>
