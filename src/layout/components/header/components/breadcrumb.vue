<template>
  <n-breadcrumb>
    <n-breadcrumb-item>
      <n-icon :component="GridSharp" /> 北京总行</n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon :component="GridSharp" /> 天津分行</n-breadcrumb-item>
    <n-breadcrumb-item>
      <n-icon :component="GridSharp" /> 平山道支行</n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts" name="Breadcrumb">
import { GridSharp } from '@vicons/ionicons5'

</script>