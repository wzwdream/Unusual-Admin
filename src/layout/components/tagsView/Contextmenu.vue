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
import { renderIcon } from '@/utils/icon'

const { t } = useI18n()
const tagStore = useTagStore()
const options = computed(() => [
  {
    key: 'fullScreen',
    label: t('tag.fullScreen'),
    icon: renderIcon('ant-design:fullscreen-outlined')
  },
  {
    key: 'refresh',
    label: t('tag.refresh'),
    icon: renderIcon('ant-design:reload-outlined'),
    disabled: tagStore.currentTag !== tagStore.activeTag
  },
  {
    key: 'close',
    label: t('tag.close'),
    icon: renderIcon('material-symbols:check-indeterminate-small-rounded'),
    disabled: tagStore.tags.length <= 1
  },
  {
    key: 'closeOther',
    label: t('tag.closeOther'),
    icon: renderIcon('mdi:arrow-expand-horizontal'),
    disabled: tagStore.tags.length <= 1
  },
  {
    key: 'closeLeft',
    label: t('tag.closeLeft'),
    icon: renderIcon('mdi:arrow-expand-left'),
    disabled: tagStore.tags.length <= 1 || tagStore.currentTagIndex === 0
  },
  {
    key: 'closeRight',
    label: t('tag.closeRight'),
    icon: renderIcon('mdi:arrow-expand-right'),
    disabled: tagStore.tags.length <= 1 || tagStore.currentTagIndex === tagStore.tags.length - 1
  },
  {
    key: 'closeAll',
    label: t('tag.closeAll'),
    icon: renderIcon('material-symbols:close-rounded'),
    disabled: tagStore.tags.length <= 1
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