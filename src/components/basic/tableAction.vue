<template>
  <n-space justify="center">
    <n-button v-if="props.optShow.view" type="info" text size="small" @click="emit('handleView')">{{ $t('view')}}</n-button>
    <n-button v-if="props.optShow.edit" v-permission="permission.edit" :disabled="disabled" type="warning" text size="small" @click="emit('handleEdit')">{{$t('edit') }}</n-button>
    <n-button v-if="props.optShow.del" v-permission="permission.del" :disabled="disabled" type="error" text size="small" @click="emit('handleDelete')">{{$t('delete') }}</n-button>
  </n-space>
</template>

<script setup lang="ts" name="TableAction">
interface ActionProps {
  optShow?: {
    view?: boolean
    edit?: boolean
    del?: boolean
  }
  disabled?: boolean
  permission?: {
    edit?: string[]
    del?: string[]
  }
}
const props = withDefaults(defineProps<ActionProps>(), {
  optShow: () => {
    return {
      view: true,
      edit: true,
      del: true
    }
  },
  disabled: false,
  permission: () => {
    return {
      edit: [],
      del: []
    }
  }
})

// 操作按钮事件
const emit = defineEmits(['handleView', 'handleEdit', 'handleDelete'])
</script>