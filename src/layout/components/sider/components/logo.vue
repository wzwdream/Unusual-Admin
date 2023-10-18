<template>
  <router-link h-60 f-c-c to="/">
    <n-image width="32" height="32" preview-disabled src='/N.png' />
    <h2 v-show="!menuStore.collapsed" ml-10 max-w-140 flex-shrink-0 text-16 font-bold color-primary>
      模板系统
    </h2>
  </router-link>
</template>

<script setup lang="ts" name="Logo">
import { useMenuStore } from '@/store/menu'
const menuStore = useMenuStore()

</script>
