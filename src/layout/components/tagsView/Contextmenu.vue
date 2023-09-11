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
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const tagStore = useTagStore()
const options = computed(() => [
  {
    label: t('tag.fullScreen'),
    key: 'fullScreen'
  },
  {
    label: t('tag.refresh'),
    key: 'refresh',
    disabled: tagStore.currentTag !== tagStore.activeTag
  },
  {
    label: t('tag.close'),
    key: 'close',
    disabled: tagStore.tags.length <= 1
  },
  {
    label: t('tag.closeOther'),
    key: 'closeOther',
    disabled: tagStore.tags.length <= 1
  },
  {
    label: t('tag.closeLeft'),
    key: 'closeLeft',
    disabled: tagStore.tags.length <= 1 || tagStore.currentTagIndex === 0
  },
  {
    label: t('tag.closeRight'),
    key: 'closeRight',
    disabled: tagStore.tags.length <= 1 || tagStore.currentTagIndex === tagStore.tags.length - 1
  },
  {
    label: t('tag.closeAll'),
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