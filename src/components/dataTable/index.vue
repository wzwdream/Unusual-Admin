<template>
<n-space vertical>
  <n-space justify="space-between" align="center">
    <n-space>
      <n-button type="info" @click="emit('add')">新增</n-button>
      <n-button type="warning" @click="emit('edit')">修改</n-button>
      <n-button type="error" @click="emit('delete')">删除</n-button>
      <slot name="tableLeft"></slot>
    </n-space>
    <n-space>
      <slot name="tableRight"></slot>
      <n-button-group>
        <n-tooltip trigger="hover">
          <template #trigger>
            <n-button ghost @click="query">
              <template #icon>
                <n-icon><Reload /></n-icon>
              </template>
            </n-button>
          </template>
          刷新
        </n-tooltip>
        <ColumSetting v-model:columns="columns" />
      </n-button-group>
    </n-space>
  </n-space>
  <n-data-table
    v-bind="props"
    striped
    :pagination="pagination"
    :remote="true"
    :loading="loading"
    :data="listData"
    :columns="columns"
    :on-update:page="pageChange"
    :on-update:page-size="pageSizeChange"
  />
</n-space>
</template>

<script lang="ts" setup name="dataTable">
import { usePagination } from './hooks/usePagination'
import { type DefualtProps, defaultProps } from './utils/defualtProps'
import { getData } from './utils/request'
import { Reload } from '@vicons/ionicons5'

interface Props extends DefualtProps { } // 解决defineProps不能使用外部引用类型的缺点
const props = withDefaults(defineProps<Props>(), { ...defaultProps })

const emit = defineEmits(['add', 'delete', 'edit'])

// 表格数据
const listData = ref([])
const loading = ref(false)
const columns = ref(props.columns)
watch(props, (newColumns) => {
  columns.value = newColumns.columns
}, { deep: true })

// 分页
const { pagination } = usePagination()
const pageChange = (page: number) => {
  pagination.page = page
  query()
}
const pageSizeChange = (pageSize: number) => {
  pagination.page = 1
  pagination.pageSize = pageSize
  query()
}

// 查询
const query = async () => {
  loading.value = true
  const params = {
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...props.queryParams
  }
  getData(props.url, params).then(res => {
    listData.value = res.data
    pagination.itemCount = res.total
    loading.value = false
  }).catch((e) => {
    loading.value = false
    throw new Error(e)
  })
}
query()
</script>