
<template>
  <iframe :src="route.meta.link" frameborder="0" class="iframe" />
</template>

<script setup lang="ts" name="Link">
import { calcHeight } from '@/utils/help'
import { useTagStore } from '@/store/tags'

const route = useRoute()
const tagStore = useTagStore()

// 计算iframe的高度，全屏的时候应该是屏幕的高度，非全屏需要计算去除
const height = computed(() => {
  if (tagStore.fullContent) return '100vh'
  return calcHeight('link')
})
</script>

<style scoped lang="scss">
.iframe {
  height: v-bind(height);
  width: 100%;
}
</style>