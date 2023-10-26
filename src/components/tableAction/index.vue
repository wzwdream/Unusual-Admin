<template>
  <n-space justify="center">
    <n-tooltip v-if="props.view" trigger="hover">
      <template #trigger>
        <n-button size="small" type="info" secondary round :render-icon="renderIcon('majesticons:eye-line', 14)" @click="emit('view')" />
      </template>
      {{ $t('view') }}
    </n-tooltip>
    <n-tooltip v-if="props.edit" trigger="hover">
      <template #trigger>
        <n-button size="small" type="primary" secondary round :render-icon="renderIcon('material-symbols:edit-square-outline-sharp', 14)" @click="emit('edit')" />
      </template>
      {{ $t('edit') }}
    </n-tooltip>
    <n-tooltip v-if="props.delete" trigger="hover">
      <template #trigger>
        <n-button size="small" type="error" secondary round :render-icon="renderIcon('material-symbols:delete-outline', 14)" @click="hanldDelete" />
      </template>
      {{ $t('delete') }}
    </n-tooltip>
  </n-space>
</template>

<script setup lang="ts" name="TableAction">
import { renderIcon } from '@/utils/help'
interface ActionProps {
  view?: boolean
  edit?: boolean
  delete?: boolean
}
const props = withDefaults(defineProps<ActionProps>(), {
  view: true,
  edit: true,
  delete: true
})
export type Action = {
  (e: 'handleDelete'): void
  (e: 'edit'): void
  (e: 'view'): void
}

// 操作按钮事件
const emit = defineEmits<Action>()
const hanldDelete = () => {
  emit('handleDelete')
}
</script>