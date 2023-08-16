<script setup lang="ts" name="BaseList">
import { type DataTableColumn } from 'naive-ui/es/data-table';

const defualtQuery = reactive({
  name: '',
  age: null
})
const columns: Array<DataTableColumn> = [
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: 'Name',
    key: 'name'
  },
  {
    title: 'Age',
    key: 'age'
  }
]
</script>

<template>
  <n-input v-model:value="defualtQuery.name" type="text" placeholder="name" />
  <n-input v-model:value="defualtQuery.age" type="text" placeholder="age" />
  <dataTable ref="dataTable" :columns="columns" :url="'/list/test'" :query-params="defualtQuery" :title="'测试'" />
</template>

<style scoped>
</style>
