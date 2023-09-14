<template>
  <n-menu ref="menuInstRef" v-model:value="menuSotre.activeMenuKey" :options="menuOptions" :accordion="accordion" />
</template>

<script setup lang="ts" name="Menu">
import { setting } from '@/setting'
import { useMenuStore } from '@/store/menu'
import { buildMenuOptions } from '@/utils/menu'
import { MenuInst } from 'naive-ui'

const { accordion } = setting
const menuInstRef = ref<MenuInst | null>(null)
const menuSotre = useMenuStore()

// 确保选中的菜单能够展开
watch(() => menuSotre.activeMenuKey, (newKey) => {
  menuInstRef.value?.showOption(newKey)
})

const menuOptions = computed(() => {
  return buildMenuOptions(menuSotre.menu)
})
</script>
