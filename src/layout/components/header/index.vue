<template>
  <n-layout-header bordered h-60 px-10 flex items-center>
    <div flex items-center>
      <Collapsed />
      <Breadcrumb />
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
</script>

<style scoped>
</style>