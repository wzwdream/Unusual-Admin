<template>
  <n-card ref="table" :segmented="{ content: true }">
    <template #header>
      <n-space v-if="props.toolbar" justify="space-between" align="center">
      <n-space>
        <n-button v-if="props.add" type="info" @click="emit('add')">{{ $t('add') }}</n-button>
        <n-button v-if="props.edit && props.selection" :disabled="editDisabled" type="warning" @click="emit('edit', checkedRowKeysRef)">{{ $t('edit') }}</n-button>
        <n-button v-if="props.del && props.selection" :disabled="delDisabled" type="error" @click="emit('delete', checkedRowKeysRef)">{{ $t('delete') }}</n-button>
        <n-button v-if="props.download" :disabled="pagination.itemCount <= 0" type="primary" @click="emit('download')">{{ $t('export') }}</n-button>
        <slot name="tableLeft"></slot>
      </n-space>
      <n-space>
        <slot name="tableRight"></slot>
        <n-button-group>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button ghost @click="toggle">
                <Icon v-if="!isFullscreen" icon="ant-design:fullscreen-outlined" />
                <Icon v-else icon="ant-design:fullscreen-exit-outlined" />
            </n-button>
            </template>
            {{ !isFullscreen ? $t('fullscreen') : $t('exitFullscreen') }}
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
import { useFullscreen } from '@vueuse/core'

// props
const props = defineProps(defualtProps)

// 全屏
const table = ref<HTMLElement | null>(null)
const { isFullscreen, toggle } = useFullscreen(table)

// 选中行以及操作按钮
const emit = defineEmits(['add', 'delete', 'edit', 'download'])
const { checkedRowKeysRef, changeCheck, editDisabled, delDisabled } = useSelection()

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