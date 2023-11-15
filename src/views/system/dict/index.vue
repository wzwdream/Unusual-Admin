<template>
  <div>
    <n-grid cols="4" item-responsive :y-gap="8" :x-gap="10" responsive="screen">
      <n-gi span="4 m:2 l:2 xl:2">
        <BasicLayout
          v-model:columns="columns"
          :btnDisabled="btnDisabled"
          @search="listQuery"
          @reset="handlereset"
          @add="handleAdd"
          @delete="handleDelete"
          @edit="handleEdit"
          @download="handleDownload"
        >
          <template #queryBar>
            <query-item label="名称">
              <n-input v-model:value="defualtQuery.name" size="small" placeholder="输入字典名称或者描述" />
            </query-item>
          </template>
          <n-data-table
            :columns="columns"
            :data="listData"
            :pagination="pagination"
            :loading="loading"
            :row-key="rowKey"
            :row-props="rowProps"
            :row-class-name="getRowClassName"
            striped
            :remote="true"
            @update:checked-row-keys="changeCheckRow"
          />
        </BasicLayout>
        <BasicModel
          v-model:visible="modalVisible"
          :title="modalTitle"
          :loading="modalLoading"
          :show-footer="modalShowFooter"
          width="450px"
          @save="handleSave"
        >
          <n-form
            ref="modalFormRef"
            label-placement="left"
            label-align="right"
            :label-width="80"
            :model="modalForm"
            :disabled="modalAction === 'view'"
          >
            <n-form-item label="字典名称" path="name">
              <n-input v-model:value="modalForm.name" />
            </n-form-item>
            <n-form-item label="描述" path="description">
              <n-input v-model:value="modalForm.description" />
            </n-form-item>
          </n-form>
        </BasicModel>
      </n-gi>
      <n-gi span="4 m:2 l:2 xl:2">
        <Details :pid="selectedRow?.id" :name="selectedRow?.name" />
      </n-gi>
    </n-grid>
  </div>
</template>

<script setup lang="ts" name="Dict">
import { type DataTableColumn } from 'naive-ui/es/data-table'
import { type DictList, type DictQuery, editDict, delDict, addDict } from '@/api/system/dict'
import TableAction from '@/components/basic/tableAction.vue'
import { useBasicList } from '@/components/basic/useBasicList/index'
import Details from './details.vue'

// 表格
const columns = ref<DataTableColumn<DictList>[]>([
  {
    type: 'selection',
    // disabled: (row) => {
    //   return row.id === 1
    // }
  },
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '字典名称',
    key: 'name'
  },
  {
    title: '字典描述',
    key: 'description'
  },
  {
    title: '操作',
    key: 'actions',
    // width: 280,
    align: 'center',
    fixed: 'right',
    render(row) {
      return [
        h(
          TableAction,
          {
            onHandleDelete: () => handleDelete([row.id as number]),
            onHandleEdit: () => handleEdit(row),
            onHandleView: () => handleView(row)
          },
        )
      ]
    }
  }
])

// 点击表格的某一行，添加选中效果，并存储行数据
const selectedRow = ref<DictList>()
const rowProps = (row: DictList) => {
  return {
    style: 'cursor: pointer;',
    onClick: () => {
      selectedRow.value = row
    }
  }
}
// 根据点击选中的设置样式
const getRowClassName = computed(() => {
  return (row: DictList) => {
    if (row.id === selectedRow.value?.id) {
      return 'selected-row'
    }
    return ''
  }
})

// 表格hooks
const {
  modalVisible,
  modalAction,
  modalShowFooter,
  modalTitle,
  modalLoading,
  handleAdd,
  handleDelete,
  handleEdit,
  handleDownload,
  handleView,
  handleSave,
  handlereset,
  defualtQuery,
  modalForm,
  modalFormRef,
  changeCheckRow,
  listQuery,
  listData,
  pagination,
  loading,
  rowKey,
  btnDisabled
} = useBasicList<DictList, DictQuery>({
  name: '字典',
  url: '/dict',
  key: 'id',
  initForm: { name: '', description: '' },
  initQuery: { name: '' },
  doCreate: addDict,
  doDelete: delDict,
  doUpdate: editDict,
  // 保证在每次查询后都清除选中的数据
  afterRefresh: (data) => {
    selectedRow.value = undefined
    return data
  }
})
</script>
