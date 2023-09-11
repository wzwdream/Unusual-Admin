<template>
  <n-menu v-model:value="menuSotre.activeMenuKey" :options="menuOptions" :accordion="accordion" :on-update-value="activeMenuChange" />
</template>

<script setup lang="ts" name="Menu">
import { setting } from '@/setting'
import { useMenuStore } from '@/store/menu'
import { buildMenuOptions, searchMenu } from '@/utils/help'
import { useTagStore } from '@/store/tags'


const { accordion } = setting
const menuSotre = useMenuStore()
const tagStore = useTagStore()
const activeMenuChange = (key: string) => {
  const tag = searchMenu(menuSotre.menu, key)
  if (tag) {
    tagStore.addTag(tag)
    tagStore.changeActiveTag(key, false)
  }
}
const menuOptions = computed(() => {
  return buildMenuOptions(menuSotre.menu)
})
</script>
