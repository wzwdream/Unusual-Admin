<script setup lang="ts">
import { useThemeStore } from '@/store/them';
import { setting } from './setting'
import { THEME_KEY } from 'vue-echarts'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()
const { isDark: noWhilte, locale, dateLocale, theme } = storeToRefs(themeStore)

// 控制echarts的主题
const isDark = computed(() => {
  return noWhilte ? 'dark' : ''
})
provide(THEME_KEY, isDark)
</script>

<template>
  <n-config-provider
    wh-full
    :locale="locale"
    :date-locale="dateLocale"
    :theme="theme"
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
