<template>
  <n-card title="字典详情" size="small" :segmented="true">
    <template #header-extra>
      <n-button type="info" size="small" @click="handleAdd">
        <template #icon>
          <Icon icon="material-symbols:add-rounded" />
        </template>
        新增
      </n-button>
    </template>
    <n-h3 v-if="props.pid === undefined" prefix="bar">
      <n-text type="primary"> 点击字典查看详情</n-text>
    </n-h3>
    <BasicLayout
      v-else
      v-model:columns="columns"
      :btnDisabled="btnDisabled"
      :querybar="false"
      :toolbar="false"
      :opt-show="{ add: false, edit: false, del: false, download: false }"
    >
      <n-data-table
        :columns="columns"
        :data="listData"
        :pagination="pagination"
        :loading="loading"
        :row-key="rowKey"
        striped
        :remote="true"
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
        <n-form-item label="字典标签" path="label">
          <n-input v-model:value="modalForm.label" />
        </n-form-item>
        <n-form-item label="字典值" path="value">
          <n-input v-model:value="modalForm.value" />
        </n-form-item>
        <n-form-item label="字典排序" path="dictSort">
          <n-input-number v-model:value="modalForm.dictSort" />
        </n-form-item>
      </n-form>
    </BasicModel>
  </n-card>
</template>

<script setup lang="ts" name="Details">
import { type DataTableColumn } from 'naive-ui/es/data-table'
import { type Details, type DictDetailQuery, editDictDetails, delDictDetails, addDictDetails } from '@/api/system/dict'
import TableAction from '@/components/basic/tableAction.vue'
import { useBasicList } from '@/components/basic/useBasicList/index'

interface DetailsProps {
  pid?: number
  name?: string
}
const props = defineProps<DetailsProps>()

// 在挂载后执行watchEffect，保证首次触发时不会报错
onMounted(() => {
  watchEffect(() => {
    if (props.pid) {
      defualtQuery.value.pid = props.pid
      listQuery()
    } else {
      listData.value = []
      pagination.itemCount = 0
      pagination.page = 1
    }
  })
})

// 表格
const columns = ref<DataTableColumn<Details>[]>([
  {
    title: 'ID',
    key: 'id'
  },
  {
    title: '所属字典',
    key: 'name',
    render() {
      return h(
       'span',
        {},
        props.name
      )
    }
  },
  {
    title: '字典标签',
    key: 'label'
  },
  {
    title: '字典值',
    key: 'value'
  },
  {
    title: '排序',
    key: 'dictSort'
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
  handleView,
  handleSave,
  defualtQuery,
  modalForm,
  modalFormRef,
  listQuery,
  listData,
  pagination,
  loading,
  rowKey,
  btnDisabled
} = useBasicList<Details, DictDetailQuery>({
  name: '字典详情',
  url: '/dictDetails',
  key: 'id',
  isInitQuery: false,
  initForm: { id: undefined, pid: undefined, label: '', value: '', dictSort: 1},
  initQuery: { pid: undefined },
  doCreate: addDictDetails,
  doDelete: delDictDetails,
  doUpdate: editDictDetails,
  beforeSave: (listData) =>  {
    listData.pid = props.pid
    return listData
  },
})
</script>

<style scoped>
:deep(.selected-row > .n-data-table-td) {
  background-color: #e8f4ff !important;
}
</style>
