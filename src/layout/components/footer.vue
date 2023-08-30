<template>
  <n-layout-footer v-if="showFooter" bordered h-30 f-c-c text-14>
    <span>{{ footerTxt }} ⋅ {{ caseNumber }}</span>
  </n-layout-footer>
</template>

<script setup lang="ts" name="Footer">
import { setting } from '@/setting'
const { footerTxt, caseNumber, showFooter } = setting
</script>