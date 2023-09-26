<script setup lang="ts" name="BaseList">
import { type BasicTableType } from '@/type/components';
import { type DataTableColumn } from 'naive-ui/es/data-table';
import { type FormInst } from 'naive-ui/es/form/src/interface'
// 表单
const defualtQuery = reactive({
  name: null,
  age: null
})
const formRef = ref<FormInst | null>(null)
const handleValidateClick = (e: MouseEvent) => {
  e.preventDefault()
  testTable.value?.listQuery()
}
// 表格
const testTable = ref<BasicTableType | null>(null)
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
  <div>
    <n-form ref="formRef" inline :mode="defualtQuery" label-placement="left" label-width="auto">
      <n-form-item label="姓名" path="user.name">
        <n-input v-model:value="defualtQuery.name" placeholder="输入姓名" />
      </n-form-item>
      <n-form-item label="年龄" path="user.age">
        <n-input v-model:value="defualtQuery.age" placeholder="输入年龄" />
      </n-form-item>
      <n-form-item>
        <n-button attr-type="button" @click="handleValidateClick">
          查询
        </n-button>
        <n-button attr-type="button" @click="handleValidateClick">
          重置
        </n-button>
      </n-form-item>
    </n-form>
    <BasicTable ref="testTable" :columns="columns" :url="'/list/test'" :query-params="defualtQuery" />
  </div>
</template>

<style scoped>
</style>
