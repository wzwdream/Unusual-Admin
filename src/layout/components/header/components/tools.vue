<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button mx-10 text @click="toggle">
        <n-icon size="24">
          <FullscreenOutlined v-if="!isFullscreen" />
          <FullscreenExitOutlined v-else />
        </n-icon>
      </n-button>
    </template>
    {{ !isFullscreen ? '全屏' : '退出全屏' }}
  </n-tooltip>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button mr-20 text @click="toggleDark">
        <n-icon size="24">
          <SunnyOutline v-if="!themeStore.isDark" />
          <MoonOutline v-else />
        </n-icon>
      </n-button>
    </template>
    {{ !themeStore.isDark ? '深色' : '浅色' }}
  </n-tooltip>
</template>

<script setup lang="ts" name="Tools">
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import { FullscreenOutlined, FullscreenExitOutlined } from '@vicons/antd'
import { useThemeStore } from '@/store/them';
import { useFullscreen } from '@vueuse/core'
const { isFullscreen, toggle } = useFullscreen()
const themeStore = useThemeStore()
const toggleDark = () => {
  themeStore.setIsDark()
}
</script>