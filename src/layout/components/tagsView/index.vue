<template>
  <n-scrollbar v-if="tagsView" :x-scrollable="true">
    <n-space :wrap="false" p-10 dark:border-light>
      <n-tag
        v-for="tag in tagStore.tags"
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
</template>

<script setup lang="ts" name="TagsView">
import Contextmenu from './Contextmenu.vue'
import { useTagStore } from '@/store/tags'
import { setting } from '@/setting'
import { useMenuStore } from '@/store/menu'

const { tagsView } = setting
const tagStore = useTagStore()
const menuStore = useMenuStore()

const tagClick = (key: string) => {
  menuStore.setActiveMenuKey(key)
  tagStore.changeActiveTag(key)
}
</script>

<style scoped>
</style>
