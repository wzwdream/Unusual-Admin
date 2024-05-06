<template>
  <n-layout-content ref="contentRef" :style="`height: ${calcHeight()};`" :native-scrollbar="false" bg-hex-f5f6fb dark:bg-black>
    <n-back-top :visibility-height=" 10 " bottom="120" />
    <main :style="`min-height: ${calcHeight('main')};`" bg-white dark:bg-dark m-10 box-border>
      <router-view v-slot=" { Component, route } ">
        <Transition name="fade-slide" mode="out-in" appear>
          <KeepAlive :include="keepAliveNames">
            <component v-if="tagStore.refreshLoading" :is="Component" :key="route.fullPath" />
          </KeepAlive>
        </Transition>
      </router-view>
    </main>
  </n-layout-content>
</template>

<script setup lang="ts" name="Content">
import { useTagStore } from '@/store/tags'
import { useFullscreen } from '@vueuse/core'
import { calcHeight } from '@/utils/help'

// 内容全屏
const contentRef = ref<HTMLElement | null>(null)
const { toggle, isFullscreen } = useFullscreen(contentRef)
const tagStore = useTagStore()

// 需要keep缓存的组件
const keepAliveNames = computed(() => {
  return tagStore.tags.filter((item) => item.keepAlive).map((item) => item.name) as string[]
})
// 全屏参数
watch(isFullscreen, () => {
  if(!isFullscreen.value) tagStore.setFullContent(isFullscreen.value)
})
watch(() => tagStore.fullContent, () => {
  if (tagStore.fullContent) toggle()
})
</script>