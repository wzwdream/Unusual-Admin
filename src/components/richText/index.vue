<template>
<div style="border: 1px solid #ccc;">
  <Toolbar
    :editor="editorRef"
    :defaultConfig="toolbarConfig"
    mode="simple"
    style="border-bottom: 1px solid #ccc"
  />
  <Editor
    v-model="value"
    :defaultConfig="editorConfig"
    mode="simple"
    :style="{'height': props.height +'px', 'overflow-y': 'hidden'}"
    @onCreated="handleCreated"
  />
</div>
</template>

<script setup lang="ts" name="RichText">
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import { i18nChangeLanguage } from '@wangeditor/editor'
import { useThemeStore } from '@/store/them'

interface MarkdownProps {
  height?: number,
  disabled?: boolean // 预览主题
  uploadImgMethod?: (params?: Record<string, any>) => Promise<any>, // 上传文件的方法
  methodParams?: Record<string, any> // 上传文件的参数
  modelValue: string,
}
const props = withDefaults(defineProps<MarkdownProps>(), {
  height: 450,
  disabled: false,
  modelValue: ''
})

// 是否只读
const changeDisabled = (disabled: boolean) => {
  const editor = editorRef.value
  disabled ? editor?.disable() : editor?.enable()
}
watch(() => props.disabled, () => {
  changeDisabled(props.disabled)
})

// 编辑器实例，必须用 shallowRef，重要！
const editorRef = shallowRef()

// 编辑器内容
const emit = defineEmits(['update:modelValue'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

// 语言
const themeStore = useThemeStore()
i18nChangeLanguage(themeStore.language) // 语言不能动态切换，只能在初始化的时候指定...

// 配置
const toolbarConfig = {
  excludeKeys: ['uploadVideo', 'insertVideo', 'fullScreen'] // 去除工具栏中的某一些
}
const editorConfig = {
  placeholder: '请输入内容...'
}

// 编辑器创建回调函数
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  changeDisabled(props.disabled)
}

// 组件销毁时，也及时销毁编辑器，重要！
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

</script>
