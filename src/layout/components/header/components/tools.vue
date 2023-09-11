<template>
  <Search />
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button mr-20 text @click="toggle">
        <Icon v-if="!isFullscreen" icon="ant-design:fullscreen-outlined" />
        <Icon v-else icon="ant-design:fullscreen-exit-outlined" />
      </n-button>
    </template>
    {{ !isFullscreen ? $t('header.fullscreen') : $t('header.exitFullscreen') }}
  </n-tooltip>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button mr-20 text @click="toggleDark">
        <Icon v-if="!themeStore.isDark" icon="material-symbols:sunny-outline" />
        <Icon v-else icon="material-symbols:dark-mode-outline-rounded" />
      </n-button>
    </template>
    {{ !themeStore.isDark ? $t('header.dark') : $t('header.light') }}
  </n-tooltip>
  <Language />
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-button text mr-20 @click="openGithub">
        <Icon icon="mdi:github" />
      </n-button>
    </template>
    GitHub
  </n-tooltip>
</template>

<script setup lang="ts" name="Tools">
import { useThemeStore } from '@/store/them';
import { useFullscreen } from '@vueuse/core'
import Search from './search.vue'
import Language from './language.vue'

const { isFullscreen, toggle } = useFullscreen()
const themeStore = useThemeStore()

const toggleDark = () => {
  themeStore.setIsDark()
}

const openGithub = () => {
  window.open('https://github.com/wzwdream/widgets-for-windows', '_blank')
}
</script>