<template>
  <grid-layout
      v-model:data="layout"
      @draggableStart="draggableStart"
      @draggableHandle="draggableHandle"
      @draggableEnd="draggableEnd"
      @remove="remove"
  >
    <grid-item v-for="item in layout" :key="item.id" :id="item.id">
        {{ item.id }}
    </grid-item>
</grid-layout>
</template>

<script setup lang="ts" name="DraggableDrid">
import { GridLayout, GridItem, type Layout, type LayoutItem } from 'vue3-draggable-grid'
import 'vue3-draggable-grid/dist/style.css'

const layout = ref<Layout>([
  { id: '1', x: 1, y: 1, h: 2, w: 2 },
  { id: '2', x: 5, y: 1, h: 2, w: 2 },
  { id: '3', x: 7, y: 1, h: 2, w: 2 },
  { id: '4-static', x: 3, y: 1, h: 2, w: 2, static: true },
  { id: '5', x: 9, y: 1, h: 2, w: 2 },
  { id: '6', x: 11, y: 1, h: 2, w: 2 },
  { id: '7', x: 1, y: 3, h: 2, w: 2 },
  { id: '8-static', x: 3, y: 3, h: 3, w: 2, static: true },
  { id: '9', x: 5, y: 3, h: 2, w: 2 },
  { id: '10', x: 7, y: 3, h: 3, w: 2 },
  { id: '11', x: 9, y: 3, h: 2, w: 2 },
  { id: '12', x: 11, y: 3, h: 4, w: 2 },
  { id: '13', x: 1, y: 5, h: 3, w: 2 },
  { id: '14', x: 3, y: 6, h: 2, w: 2 },
  { id: '15', x: 5, y: 5, h: 2, w: 2 },
  { id: '16', x: 7, y: 6, h: 2, w: 2 },
  { id: '17', x: 9, y: 5, h: 2, w: 2 }
])

// 验证更新数据是否正确
watch(layout, () => {
  console.log('数据更新', layout.value)
}, {deep: true})

const draggableStart = (id: string) => {
  console.log('拖拽开始', id)
}

const draggableHandle = (id: string, data: LayoutItem) => {
  console.log('拖拽中', id, data)
}

const draggableEnd = (data: Layout) => {
  console.log('拖拽结束', data)
}

const remove = (id: string) => {
  console.log('删除', id)
}

</script>