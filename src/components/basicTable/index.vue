<template>
  <n-card :segmented="{ content: true }">
    <template #header>
      <n-space v-show="showSearch" mb-20 align="center">
        <slot name="queryBar"></slot>
        <n-space v-if="props.querybar">
          <n-button type="primary" size="small" secondary :render-icon="renderIcon('mdi:magnify', 14)" @click="listQuery()">{{ $t('search') }}</n-button>
          <n-button type="warning" size="small" secondary :render-icon="renderIcon('mdi:restore', 14)" @click="emit('reset')">{{ $t('reset') }}</n-button>
        </n-space>
      </n-space>
      <n-space v-if="props.toolbar" justify="space-between" align="center">
        <n-space>
          <n-button v-if="props.add" type="info" size="small" :render-icon="renderIcon('material-symbols:add-rounded', 14)" @click="emit('add')">{{ $t('add') }}</n-button>
          <n-button v-if="props.edit && props.selection" :disabled="editDisabled" type="warning" size="small" :render-icon="renderIcon('material-symbols:edit-outline', 14)" @click="emit('edit')">{{ $t('edit') }}</n-button>
          <n-button v-if="props.del && props.selection" :disabled="delDisabled" type="error" size="small" :render-icon="renderIcon('material-symbols:delete-outline', 14)" @click="emit('delete')">{{ $t('delete') }}</n-button>
          <n-button v-if="props.download" :disabled="pagination.itemCount <= 0" type="primary" size="small" :render-icon="renderIcon('material-symbols:download-rounded', 14)" @click="emit('download')">{{ $t('export') }}</n-button>
          <slot name="tableLeft"></slot>
        </n-space>
      <n-space>
        <slot name="tableRight"></slot>
        <n-button-group>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button ghost @click="showSearch = !showSearch">
                <Icon v-if="showSearch" icon="ic:outline-search-off" />
                <Icon v-else icon="ic:outline-search" />
            </n-button>
            </template>
            {{ showSearch ? $t('retractSearch') : $t('expandSearch') }}
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button ghost @click="toggle">
                <Icon v-if="!tagStore.fullContent" icon="ant-design:fullscreen-outlined" />
                <Icon v-else icon="ant-design:fullscreen-exit-outlined" />
            </n-button>
            </template>
            {{ !tagStore.fullContent ? $t('fullscreen') : $t('exitFullscreen') }}
          </n-tooltip>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button ghost @click="listQuery">
                <template #icon>
                  <Icon icon="ant-design:reload-outlined" />
                </template>
              </n-button>
            </template>
            {{ $t('refresh') }}
          </n-tooltip>
          <ColumSetting v-model:columns="columns" />
        </n-button-group>
      </n-space>
      </n-space>
    </template>
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
      @update:checked-row-keys="changeCheck"
    />
  </n-card>
</template>

<script lang="ts" setup name="basicTable">
import { usePagination } from './hooks/usePagination'
import { useRequest } from './hooks/useRequest'
import { useSelection } from './hooks/useSelection'
import { defualtProps } from './utils/defualtProps'
import { renderIcon } from '@/utils/help'
import { type Action } from './types/index'
import { useTagStore } from '@/store/tags'

// props
const props = defineProps(defualtProps)

// 收起/展开搜索栏
const showSearch = ref(true)
// 全屏
const tagStore = useTagStore()
const toggle = () => {
  tagStore.setFullContent(!tagStore.fullContent)
}

// 选中行以及操作按钮
interface Emit extends /* @vue-ignore */  Action {}
const emit = defineEmits<Emit>()
const { changeCheck, editDisabled, delDisabled } = useSelection(emit)

// 表格数据
const selection: { type: string }[] = []
if (props.selection) selection.push({ type: 'selection'})
const columns = ref([...selection, ...props.columns])
watch(props, (newColumns) => {
  columns.value = [...selection, ...newColumns.columns]
}, { deep: true })

// 分页
const { pagination } = usePagination()
const pageChange = (page: number) => {
  pagination.page = page
  listQuery()
}
const pageSizeChange = (pageSize: number) => {
  pagination.page = 1
  pagination.pageSize = pageSize
  listQuery()
}

// 查询
const params = computed(() => {
  return {
    page: pagination.page,
    pageSize: pagination.pageSize,
    ...props.queryParams
  }
})
const { listQuery, loading, listData } = useRequest(params, props.url, pagination)

// 暴露查询方法，方便外部调用
defineExpose({ listQuery })
</script>

<style scoped>
</style>