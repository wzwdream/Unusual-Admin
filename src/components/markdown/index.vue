<template>
  <md-editor
    v-model="value"
    :editorId="props.editorId"
    :theme="theme"
    :language="language"
    :previewTheme="props.previewTheme"
    :codeTheme="props.codeTheme"
    :noImgZoomIn="true"
    :autofocus="true"
    :read-only="readOnly"
    :style="props.mStyle || { height: style('page') }"
    :toolbarsExclude="props.toolbarsExclude"
    @save="save"
    @upload-img="uploadImg"
  />
</template>

<script setup lang="ts" name="Markdown">
import { MdEditor, type ToolbarNames, type Themes } from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'
import { useThemeStore } from '@/store/them'
import { style } from '@/utils/help'
import { type CSSProperties } from 'vue'

interface MarkdownProps {
  editorId?: string, // 同页面使用多个编辑器时做区分，单个不需要
  previewTheme?: 'default' | 'tgithub' |  'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis' // 预览主题
  codeTheme?: 'atom'|'a11y'|'github'|'gradient'|'kimbie'|'paraiso'|'qtcreator'|'stackoverflow' // 代码主题
  readOnly?: boolean
  mStyle?: string | CSSProperties // 内联样式
  toolbarsExclude?: ToolbarNames[], // 需要排除的工具栏
  modelValue: string,
  uploadImgMethod?: (params?: Record<string, any>) => Promise<any>, // 上传文件的方法
  methodParams?: Record<string, any> // 上传文件的参数
}
const props = withDefaults(defineProps<MarkdownProps>(), {
  editorId: 'markRaw_MdEditor',
  previewTheme: 'default',
  codeTheme: 'atom',
  contentWidth: 180,
  mStyle: '',
  toolbarsExclude: () => ['htmlPreview', 'codeRow', 'code', 'unorderedList', 'orderedList', 'quote'],
  modelValue: ''
})

// markdown内容
const emit = defineEmits(['update:modelValue', 'save', 'uploadImg'])
const value = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  }
})

const themeStore = useThemeStore()
// 颜色主题
const theme = computed(() => {
  if (themeStore.isDark) return 'dark' as Themes
  return 'light' as Themes
})

// 语言
const language = computed(() => {
  if (themeStore.language === 'en') return 'en-US'
  return 'zh-CN'
})

// 保存
const save = (text: string, h: Promise<string>) => {
  emit('save', text, h)
}
// 上传文件
const uploadImg = async (files: Array<File>, callBack: (urls: string[]) => void) => {
  const res = await Promise.all(
    files.map((file) => {
      return new Promise((rev, rej) => {
        const form = new FormData()
        form.append('file', file)
        const params = props.methodParams
        if (params) {
          Object.keys(params).map(item => {
            if(params.hasOwn(item)) {
              form.append(item, params[item])
            }
          })
        }
        const method = props.uploadImgMethod
        if (method) {
          method(params).then((res) => {
            rev(res)
          }).catch((error) => {
            rej(error)
          })
        }
      })
    })
  )

  callBack(res.map((item: any) => item.data.url))
  emit('uploadImg', res)
}
</script>
