<template>
  <n-menu ref="menuInstRef" v-model:value="menuSotre.activeMenuKey" :options="menuOptions" :accordion="accordion" :on-update-value="activeMenuChange" />
</template>

<script setup lang="ts" name="Menu">
import { setting } from '@/setting'
import { useMenuStore } from '@/store/menu'
import { buildMenuOptions, searchMenu } from '@/utils/menu'
import { useTagStore } from '@/store/tags'
import { MenuInst } from 'naive-ui'

const { accordion } = setting
const menuInstRef = ref<MenuInst | null>(null)
const menuSotre = useMenuStore()
const tagStore = useTagStore()

// 确保选中的菜单能够展开
watch(() => menuSotre.activeMenuKey, (newKey) => {
  menuInstRef.value?.showOption(newKey)
})

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
