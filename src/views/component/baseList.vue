<template>
  <div>
    <BasicList
      ref="testTable"
      :columns="columns"
      :data="listData"
      :pagination="pagination"
      :loading="loading"
      :row-key="rowKey"
      @reset="handlereset"
      @search="listQuery"
      @add="handleAdd"
      @delete="handleDelete"
      @edit="handleEdit"
      @download="handleDownload"
      @change-checkrow="changeCheckRow"
    >
      <template #queryBar>
        <query-item label="姓名">
          <n-input v-model:value="defualtQuery.name" size="small" placeholder="输入姓名" />
        </query-item>
        <query-item label="年龄">
          <n-input v-model:value="defualtQuery.age" size="small" placeholder="年龄" />
        </query-item>
      </template>
    </BasicList>
  </div>
</template>

<script setup lang="ts" name="BaseList">
import { useBasicList } from '@/components/basic/useBasicList/index'
import { type BasicTableType } from '@/type/components'
import { type DataTableColumn } from 'naive-ui/es/data-table'

// 表格
const testTable = ref<BasicTableType | null>(null)
const columns: Array<DataTableColumn> = [
  {
    type: 'selection'
  },
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

// 表格hooks
const {
  handleAdd,
  handleDelete,
  handleEdit,
  handleDownload,
  handlereset,
  defualtQuery,
  changeCheckRow,
  listQuery,
  listData,
  pagination,
  loading,
  rowKey
} = useBasicList({
  name: '表格',
  url: '/list/test',
  key: 'id',
  initQuery: { name: '', age: '' },
  beforeRefresh: (form) => {
    console.log(form)
    return true
  },
  afterRefresh: (list) => {
    list.forEach(item => {
      item.age = 10
    })
    return list
  }
  // doCreate: addUserRole,
  // doDelete: deleteUserRole,
  // doUpdate: updateUserRole
})
</script>

<style scoped>
</style>
