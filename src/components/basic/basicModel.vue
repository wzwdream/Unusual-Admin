<template>
  <n-modal v-model:show="show" :style="{ width }" preset="card" :title="title" size="huge" :bordered="false">
    <slot />
    <template v-if="showFooter" #footer>
      <footer flex justify-end>
        <slot name="footer">
          <n-button @click="show = false">取消</n-button>
          <n-button :loading="loading" ml-20 type="primary" @click="emit('save')">保存</n-button>
        </slot>
      </footer>
    </template>
  </n-modal>
</template>

<script setup lang="ts" name="BaseModel">
interface ActionProps {
  width?: string
  title?: string
  showFooter?: boolean
  visible?: boolean
  loading?: boolean
}
const props = withDefaults(defineProps<ActionProps>(), {
  width: '600px',
  title: '',
  showFooter: true,
  visible: false,
  loading: false
})
const emit = defineEmits(['update:visible', 'save'])
const show = computed({
  get() {
    return props.visible
  },
  set(v) {
    emit('update:visible', v)
  },
})
</script>
