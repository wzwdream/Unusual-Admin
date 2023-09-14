<template>
  <n-popselect v-model:value="themeStore.language" :options="options" :on-update:value="languageChange">
    <n-button mr-20 text>
      <Icon icon="heroicons:language-solid" />
    </n-button>
  </n-popselect>
</template>

<script setup lang="ts" name="Language">
import { Local } from '@/lang';
import { useThemeStore } from '@/store/them';
import { useI18n } from 'vue-i18n'
const { locale, t } = useI18n()

const themeStore = useThemeStore()

const options = computed(() => [
  { label: t('header.chinese'), value: 'zh-CN' },
  { label: t('header.english'), value: 'en' }
])

const languageChange = (language: Local) => {
  locale.value = language
  themeStore.setLanguage(language)
}
</script>

<style scoped></style>