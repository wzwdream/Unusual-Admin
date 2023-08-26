<script setup lang="ts">
import { zhCN, dateZhCN, darkTheme, useThemeVars } from 'naive-ui'
import { useThemeStore } from '@/store/them';
import { setting } from './setting'
const themeStore = useThemeStore()
const theme = useThemeVars()
console.log(theme)

</script>

<template>
  <n-config-provider wh-full :locale="zhCN" :date-locale="dateZhCN" :theme="themeStore.isDark ? darkTheme : undefined" :theme-overrides="setting.naiveThemeOverrides">
    <n-dialog-provider>
      <n-notification-provider>
        <n-message-provider>
          <router-view></router-view>
        </n-message-provider>
      </n-notification-provider>
    </n-dialog-provider>
  </n-config-provider>
</template>

<style scoped>
</style>
