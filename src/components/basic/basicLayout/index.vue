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
      <n-space justify="space-between" align="center">
        <slot name="toolbarLeft"></slot>
        <n-space>
          <n-button v-if="props.optShow.add" type="info" size="tiny" :render-icon="renderIcon('material-symbols:add-rounded', 14)" @click="emit('add')">{{ $t('add') }}</n-button>
          <n-button v-if="props.optShow.edit" :disabled="props.btnDisabled.edit" type="warning" size="tiny" :render-icon="renderIcon('material-symbols:edit-outline', 14)" @click="emit('edit')">{{ $t('edit') }}</n-button>
          <n-button v-if="props.optShow.del" :disabled="props.btnDisabled.del" type="error" size="tiny" :render-icon="renderIcon('material-symbols:delete-outline', 14)" @click="emit('delete')">{{ $t('delete') }}</n-button>
          <n-button v-if="props.optShow.download" :disabled="props.btnDisabled.download" type="primary" size="tiny" :render-icon="renderIcon('material-symbols:download-rounded', 14)" @click="emit('download')">{{ $t('export') }}</n-button>
        </n-space>
        <n-space v-if="props.toolbar">
          <n-button-group size="tiny">
            <n-tooltip trigger="hover">
              <template #trigger>
                <n-button ghost @click="showSearch = !showSearch">
                  <Icon v-if="showSearch" icon="ic:outline-search-off" />
                  <Icon v-else icon="mdi:magnify" />
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
            <ColumSetting :columns="props.columns" @updateColumns="(columns: TableColumn<any>[]) => emit('update:columns', columns)" />
          </n-button-group>
        </n-space>
        <slot name="toolbarRight"></slot>
      </n-space>
    </template>
    <slot></slot>
  </n-card>
</template>

<script lang="ts" setup name="BasicLayout">
import { renderIcon } from '@/utils/help'
import { useTagStore } from '@/store/tags'
import { type TableColumn } from 'naive-ui/es/data-table/src/interface';

interface ListProps {
  columns: TableColumn<any>[]
  optShow?: {
    add?: boolean
    edit?: boolean
    del?: boolean
    download?: boolean
  }
  toolbar?: boolean
  querybar?: boolean
  btnDisabled: {
    edit: boolean
    del: boolean
    download: boolean
  }
}
const props = withDefaults(defineProps<ListProps>(), {
  optShow: () => {
    return {
      add: true,
      edit: true,
      del: true,
      download: true
    }
  },
  btnDisabled: () => {
    return {
      edit: false,
      del: false,
      download: false
    }
  },
  toolbar: true,
  querybar: true,
})

// 收起/展开搜索栏
const showSearch = ref(true)

// 全屏
const tagStore = useTagStore()
const toggle = () => {
  tagStore.setFullContent(!tagStore.fullContent)
}

// 选中行以及操作按钮
const emit = defineEmits<{
  (e: 'add'): void
  (e: 'delete', ids?: number[]): void // 为了类型兼容设置的参数类型
  (e: 'edit', row?: undefined): void// 为了类型兼容设置的参数类型
  (e: 'download'): void
  (e: 'reset'): void
  (e: 'search'): void
  (e: 'update:columns', colums: TableColumn<any>[]): void
}>()

</script>
