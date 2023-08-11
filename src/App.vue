<script setup lang="ts">
import { zhCN, dateZhCN } from 'naive-ui'
import {  } from 'naive-ui'
</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <div class="home">
        <router-view></router-view>
      </div>
  </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.home {
  height: 100%;
  width: 100%;
  background-color: white;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
