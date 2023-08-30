<template>
  <n-layout has-sider>
    <Sider />
    <n-layout h-full>
      <Header />
      <TagsView />
      <Content />
      <Footer />
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts" name="Layout">
import Header from './components/header/index.vue'
import Sider from './components/sider/index.vue'
import Footer from './components/footer.vue'
import Content from './components/content.vue'
import TagsView from './components/tagsView/index.vue'
</script>

<style scoped>
</style>
