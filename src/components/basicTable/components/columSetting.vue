<template>
  <n-tooltip trigger="hover">
    <template #trigger>
      <n-popover trigger="click" placement="bottom">
        <template #trigger>
          <n-button ghost>
            <template #icon>
              <Icon icon="ant-design:setting-outlined" />
            </template>
          </n-button>
        </template>
        <template #header>
          <n-space justify="space-between">
            <n-checkbox v-model:checked="checkAll" :indeterminate="indeterminate" @update:checked="onCheckAll">{{ $t('colSetting') }}</n-checkbox>
          </n-space>
        </template>
        <n-checkbox-group v-model:value="selectedColums" :on-update:value="selectedChange">
          <n-space vertical>
            <template v-for="column in deepColumns">
              <n-checkbox v-if="column.type !== 'selection'" :key="column.key" :value="column.key" :label="column.title" />
            </template>
          </n-space>
        </n-checkbox-group>
      </n-popover>
    </template>
    {{ $t('colShowcase') }}
  </n-tooltip>
</template>

<script lang="ts" setup name="ColumSetting">
import { type DataTableColumn } from 'naive-ui/es/data-table'

const props =  defineProps<{ columns: Array<DataTableColumn> }>()
const emit = defineEmits(['update:columns'])
const checkAll = ref(true)
const indeterminate = ref(false)
const selectedColums = ref<(string | number)[]>([])
// 保留初始数据
const deepColumns = [...props.columns.map((item: any) => {
  selectedColums.value.push(item.key)
  return { ...item }
})]

// 全选
const onCheckAll = (val: boolean) => {
  indeterminate.value = false
  if (!val) {
    selectedColums.value = []
    emit('update:columns', [])
  } else {
    deepColumns.map(item => {
      selectedColums.value.push(item.key)
    })
    emit('update:columns', deepColumns)
  }
}
// 单选
const selectedChange = (val: (string | number)[]) => {
  selectedColums.value = val
  indeterminate.value = selectedColums.value?.length === deepColumns.length ? false : true
  const colunms = deepColumns.filter(item => selectedColums.value.includes(item.key))
  emit('update:columns', colunms)
}
</script>