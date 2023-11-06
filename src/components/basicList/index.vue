<template>
  <n-card :segmented="{ content: true }" content-style="padding: 10px;" header-style="padding: 10px;">
    <template #header>
      <n-space v-show="showSearch" mb-10 align="center">
        <slot name="queryBar"></slot>
        <n-space v-if="props.querybar" translate-y-3>
          <n-button type="primary" size="small" secondary :render-icon="renderIcon('mdi:magnify', 14)" @click="emit('search')">{{ $t('search') }}</n-button>
          <n-button type="warning" size="small" secondary :render-icon="renderIcon('mdi:restore', 14)" @click="emit('reset')">{{ $t('reset') }}</n-button>
        </n-space>
      </n-space>
      <n-space v-if="props.toolbar" justify="space-between" align="center">
        <n-space>
          <n-button v-if="props.add" type="info" size="tiny" :render-icon="renderIcon('material-symbols:add-rounded', 14)" @click="emit('add')">{{ $t('add') }}</n-button>
          <n-button v-if="props.edit" :disabled="editDisabled" type="warning" size="tiny" :render-icon="renderIcon('material-symbols:edit-outline', 14)" @click="emit('edit')">{{ $t('edit') }}</n-button>
          <n-button v-if="props.del" :disabled="delDisabled" type="error" size="tiny" :render-icon="renderIcon('material-symbols:delete-outline', 14)" @click="emit('delete')">{{ $t('delete') }}</n-button>
          <n-button v-if="props.download" :disabled="pagination.itemCount <= 0" type="primary" size="tiny" :render-icon="renderIcon('material-symbols:download-rounded', 14)" @click="emit('download')">{{ $t('export') }}</n-button>
          <slot name="toolbarLeft"></slot>
        </n-space>
        <n-space>
          <slot name="toolbarRight"></slot>
          <n-button-group size="tiny">
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
                <n-button ghost @click="emit('search')">
                  <Icon icon="ant-design:reload-outlined" />
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
      :remote="true"
      :columns="columns"
      @update:checked-row-keys="changeCheck"
    />
  </n-card>
</template>

<script lang="ts" setup name="BasicList">
import { useSelection } from './hooks/useSelection'
import { defualtProps } from './defualtProps'
import { renderIcon } from '@/utils/help'
import { type Action } from './types/index'
import { useTagStore } from '@/store/tags'

// props
const props = defineProps(defualtProps)

// 表格列展示
const columns = ref([...props.columns])
watch(props, (newColumns) => {
  columns.value = [...newColumns.columns]
}, { deep: true })

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

</script>

<style scoped>
</style>./defualtProps