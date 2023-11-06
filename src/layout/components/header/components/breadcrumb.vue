<template>
  <n-breadcrumb>
    <n-breadcrumb-item v-for="breadcrumb in menuStore.breadcrumb" :key="breadcrumb.path">
      <Icon v-if="breadcrumb.icon" :href="breadcrumb.isDir ? undefined : breadcrumb.path" :icon="(breadcrumb.icon as string)" /> {{ breadcrumb.title }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { useMenuStore } from '@/store/menu'
const menuStore = useMenuStore()
</script>