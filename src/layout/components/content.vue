<template>
  <n-layout-content ref="contentRef" :content-style="`padding: 10px;height: ${style};`" :embedded="true" :native-scrollbar="false" :scrollbar-props="{ xScrollable: true}" bg-hex-f5f6fb dark:bg-dark>
    <n-back-top :visibility-height=" 10 " bottom="120" />
    <main bg-white dark:bg-dark wh-full>
      <router-view v-slot=" { Component, route } ">
        <Transition :duration=" 550 " name="fade">
          <KeepAlive>
            <component :is="Component" :key=" route.fullPath " />
          </KeepAlive>
        </Transition>
      </router-view>
    </main>
  </n-layout-content>
</template>

<script setup lang="ts" name="Content">
import { useTagStore } from '@/store/tags'
import { useFullscreen } from '@vueuse/core'
import { setting } from '@/setting'
const { showFooter, tagsView } = setting
const style = computed(() => {
  let height = 60
  if (showFooter) height += 30
  if (tagsView) height += 48
  return `calc(100vh - ${height}px)`
})
// 内容全屏
const contentRef = ref<HTMLElement | null>(null)
const { toggle, isFullscreen } = useFullscreen(contentRef)
const tagStore = useTagStore()
watch(isFullscreen, () => {
  if(!isFullscreen.value) tagStore.setFullContent(isFullscreen.value)
})
watch(() => tagStore.fullContent, () => {
  if (tagStore.fullContent) toggle()
})
</script>