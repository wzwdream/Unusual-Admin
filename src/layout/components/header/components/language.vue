<template>
  <n-popselect v-model:value="themeStore.language" :options="options">
    <n-button mr-20 text>
      <Icon icon="heroicons:language-solid" />
    </n-button>
  </n-popselect>
</template>

<script setup lang="ts" name="Language">
import { useThemeStore } from '@/store/them';
import { $t } from '@/lang/index'

const themeStore = useThemeStore()

const options = [
  { label: $t('sousuo'), value: 'zh-CN' },
  { label: $t('yingwen'), value: 'en' }
]
</script>

<style scoped></style>