<template>
  <n-dropdown
    :show="tagStore.showContextMenu"
    :x="tagStore.contextMenuX"
    :y="tagStore.contextMenuY"
    trigger="manual"
    :options="options"
    placement="bottom-start"
    @select="handleSelect"
    @clickoutside="hideContextMenu"
  />
</template>

<script setup lang="ts" name="Contextmenu">
import { useTagStore } from '@/store/tags';

const tagStore = useTagStore()
const options = computed(() => [
  {
    label: '内容全屏',
    key: 'fullScreen'
  },
  {
    label: '刷新页面',
    key: 'refresh',
    disabled: tagStore.currentTag !== tagStore.activeTag
  },
  {
    label: '关闭页面',
    key: 'close',
    disabled: tagStore.tags.length <= 1
  },
  {
    label: '关闭其他',
    key: 'closeOther',
    disabled: tagStore.tags.length <= 1
  },
  {
    label: '关闭左侧',
    key: 'closeLeft',
    disabled: tagStore.tags.length <= 1 || tagStore.currentTagIndex === 0
  },
  {
    label: '关闭右侧',
    key: 'closeRight',
    disabled: tagStore.tags.length <= 1 || tagStore.currentTagIndex === tagStore.tags.length - 1
  },
  {
    label: '关闭全部',
    key: 'closeAll'
  }
])
const handleMap = new Map([
  [ 'fullScreen', () => tagStore.setFullContent(!tagStore.fullContent) ],
  [ 'refresh', () => tagStore.refresh() ],
  [ 'close', () => tagStore.removeTag(tagStore.currentTag) ],
  [ 'closeOther', () => tagStore.removeOther() ],
  [ 'closeLeft', () => tagStore.removeLeft() ],
  [ 'closeRight', () => tagStore.removeRight() ],
  [ 'closeAll', () => tagStore.removeAll() ],
])
const handleSelect = (key: string) => {
  const handle = handleMap.get(key)
  handle && handle()
  hideContextMenu()
}
const hideContextMenu = () => {
  tagStore.showContextMenu = false
}

</script>