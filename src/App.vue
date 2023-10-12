<script setup lang="ts">
import { useThemeStore } from '@/store/them';
import { setting } from './setting'
import { THEME_KEY } from 'vue-echarts'

const themeStore = useThemeStore()

// 控制echarts的主题
const isDark = computed(() => {
  return themeStore.isDark ? 'dark' : ''
})
provide(THEME_KEY, isDark)
</script>

<template>
  <n-config-provider
    wh-full
    :locale="themeStore.locale"
    :date-locale="themeStore.dateLocale"
    :theme="themeStore.theme"
    :theme-overrides="setting.naiveThemeOverrides"
  >
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
