<template>
  <n-button @click="showModal = true">
    搜索
  </n-button>
  <n-modal
    v-model:show="showModal"
    style="width:560px;position:fixed;top:100px;left:50%;transform:translateX(-280px);"
    :bordered="false"
    :closable="false"
  >
    <n-card
      :bordered="false"
      :segmented="{ content: true, footer: 'soft' }"
      content-style="padding-top: 0;border-top: none;"
    >
    <template #header>
      <n-input v-model:value="searchValue" type="text" placeholder="请输入关键字进行搜索" />
    </template>
    <n-empty v-if="result.length <= 0" description="暂无搜索结果" />
    <n-list v-else hoverable clickable>
      <n-list-item v-for="item in result" :key="item.path" class="bg-primary my-5 rd-8">
        {{ item.meta?.title }}
      </n-list-item>
    </n-list>
    <template #footer>
      尾部
    </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts" name="Search">
import { routes } from '@/router/route'
import { type RouteRecordRaw } from 'vue-router';
const showModal = ref(false)
const searchValue = ref('')
const result = computed(() => {
  return searchRoute(searchValue.value, routes)
})
const searchRoute = (val: string, route: RouteRecordRaw[] = []) => {
  const R: RouteRecordRaw[] = []
  route.forEach(item => {
    if (item.children) {
      R.push(...searchRoute(val, item.children))
    } else if (item.meta && (val ?? '' !== '')) {
      const title = item.meta.title as string
      if (item.path.includes(val) || title.includes(val)) {
        R.push(item)
      }
    }
  })
  return R
}
</script>