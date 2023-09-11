
<template>
  <iframe :src="route.meta.link" :style="`height: ${style('link')};width:100%;`" frameborder="0" box-border />
</template>

<script setup lang="ts" name="Link">
import { style } from '@/utils/help'
const route = useRoute()
</script>

<style scoped>
</style>