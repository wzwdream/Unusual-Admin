<template>
  <section ref="tagBoxRef" flex p-10 items-center>
    <n-button v-show="showWrap" text mr-10 @click="moveTo('left')">
      <Icon icon="material-symbols:chevron-left" size="24" />
    </n-button>
    <n-scrollbar v-if="tagsView" ref="scrollbarRef" :x-scrollable="true">
      <n-space ref="tagsRef" :wrap="false" relative>
        <n-tag
          v-for="tag in tagStore.tags"
          ref="tagRef"
          :key="tag.key"
          :type="tag.key === tagStore.activeTag ? 'primary' : 'default'"
          class="cursor-pointer hover:color-primary rd-4 px-10"
          :closable="tagStore.tags.length > 1"
          @close="tagStore.removeTag(tag.key)"
          @click="tagClick(tag.key)"
          @contextmenu.prevent="tagStore.handleContextmenu($event, tag.key)"
        >
          <template #icon>
            <Icon :icon="(tag.icon as string)" size="14" />
          </template>
          {{ tag.label }}
        </n-tag>
      </n-space>
      <Contextmenu />
    </n-scrollbar>
    <n-button v-show="showWrap" text ml-10 @click="moveTo('right')">
      <Icon icon="material-symbols:chevron-right" size="24" />
    </n-button>
  </section>
</template>

<script setup lang="ts" name="TagsView">
import Contextmenu from './Contextmenu.vue'
import { useTagStore } from '@/store/tags'
import { setting } from '@/setting'
import { useMenuStore } from '@/store/menu'
import { useResizeObserver } from '@vueuse/core'
import { type ScrollbarInst } from 'naive-ui'
import { type TagRef } from 'naive-ui/es/tag/src/Tag'

const { tagsView } = setting
const tagStore = useTagStore()
const menuStore = useMenuStore()

const tagClick = (key: string) => {
  menuStore.setActiveMenuKey(key)
  tagStore.changeActiveTag(key)
}

watch(() => tagStore.activeTag, () => {
  if (showWrap.value && tagBoxRef.value) {
    const { x, width } = tagRef.value[tagStore.activeTagIndex].$el.getBoundingClientRect()
    const { x: x1 } = tagBoxRef.value.getBoundingClientRect()
    const movex = x - x1 - width
    scrollbarRef.value?.scrollBy({ left: movex, behavior: 'smooth' })
  }
})
const tagBoxRef = ref<HTMLElement | null>(null)
const tagRef = ref<TagRef[]>([])
const tagsRef = ref(null)
const scrollbarRef = ref<ScrollbarInst>()

const tagBoxWidth = ref(0)
const tagsWidth = ref(0)
const showWrap = computed(() => {
  return tagBoxWidth.value < tagsWidth.value
})

// 监听元素宽度变化
useResizeObserver(tagsRef, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  tagsWidth.value = width
})
useResizeObserver(tagBoxRef, (entries) => {
  const entry = entries[0]
  const { width } = entry.contentRect
  tagBoxWidth.value = width
})

const moveTo = (type: string) => {
  const width = type === 'left' ? -200 : 200
  scrollbarRef.value?.scrollBy({ left: width, behavior: 'smooth' })
}
</script>

<style scoped>
</style>
