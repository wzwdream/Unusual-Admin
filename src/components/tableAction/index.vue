<template>
  <n-space justify="center">
    <n-button v-if="props.look" size="small" type="info" secondary :render-icon="renderIcon('ic:outline-remove-red-eye', 14)" @click="emit('look')">查看</n-button>
    <n-button v-if="props.edit" size="small" type="primary" secondary :render-icon="renderIcon('material-symbols:edit-outline', 14)" @click="emit('edit')">编辑</n-button>
    <n-button v-if="props.delete" size="small" type="error" secondary :render-icon="renderIcon('material-symbols:delete-outline', 14)" @click="hanldDelete">删除</n-button>
  </n-space>
</template>

<script setup lang="ts" name="TableAction">
import { renderIcon } from '@/utils/help'
interface ActionProps {
  look?: boolean
  edit?: boolean
  delete?: boolean
}
const props = withDefaults(defineProps<ActionProps>(), {
  look: true,
  edit: true,
  delete: true
})
export type Action = {
  (e: 'handleDelete'): void
  (e: 'edit'): void
  (e: 'look'): void
}

// 操作按钮事件
const emit = defineEmits<Action>()
const hanldDelete = () => {
  emit('handleDelete')
}
</script>