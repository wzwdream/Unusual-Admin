<template>
  <n-layout-header bordered h-60 px-10 flex items-center>
    <div flex items-center>
      <Collapsed />
      <Breadcrumb v-show="themStore.isShowSider" />
    </div>
    <div ml-auto flex items-center>
      <Tools />
      <UserManage />
    </div>
  </n-layout-header>
</template>

<script lang="ts" setup name="Header">
import Collapsed from './components/collapsed.vue'
import Breadcrumb from './components/breadcrumb.vue'
import Tools from './components/tools.vue'
import UserManage from './components/userManage.vue'
import { useThemeStore } from '@/store/them'
const themStore = useThemeStore()

</script>

<style scoped>
</style>