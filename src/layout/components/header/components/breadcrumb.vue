<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="breadcrumb in menuStore.breadcrumb" :key="breadcrumb.key">
      <Icon :href="breadcrumb.isDir ? undefined : breadcrumb.key" :icon="(breadcrumb.icon as string)" /> {{ breadcrumb.label }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { useMenuStore } from '@/store/menu'
const menuStore = useMenuStore()
console.log(menuStore.breadcrumb)
</script>