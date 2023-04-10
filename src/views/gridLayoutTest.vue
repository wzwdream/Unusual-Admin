<template>
    <div>
        <GridLayout v-model:data="layout" @draggableStart="draggableStart" @draggableHandle="draggableHandle" @draggableEnd="draggableEnd" @remove="remove">
            <GridItem v-for="item in layout" :key="item.id" :id="item.id">
                {{ item.id }}
            </GridItem>
        </GridLayout>
        <button @click="layout = []">改变</button>
    </div>
</template>

<script setup lang="ts">
import { Layout } from '@/components/grid-layout/types';

const layout = ref([
    { id: '1', x: 1, y: 1, h: 1, w: 1 },
    { id: '2', x: 2, y: 1, h: 1, w: 1 },
    { id: '3', x: 3, y: 1, h: 1, w: 1 },
    { id: '4', x: 4, y: 1, h: 1, w: 1 },
    { id: '5', x: 1, y: 2, h: 1, w: 1 },
    { id: '6', x: 1, y: 3, h: 1, w: 1 },
    { id: '7', x: 1, y: 4, h: 1, w: 1 },
    { id: '8', x: 1, y: 5, h: 4, w: 1 },
    { id: '9', x: 2, y: 2, h: 1, w: 1 },
    { id: '10', x: 2, y: 3, h: 1, w: 1 },
    { id: '11', x: 2, y: 4, h: 1, w: 1 },
    { id: '12', x: 5, y: 5, h: 1, w: 2 },
])
// 验证更新数据是否正确
watch(layout, () => {
    console.log('数据更新', layout.value)
}, {deep: true})

const draggableStart = (id: string) => {
    console.log('拖拽开始', id)
}
const draggableHandle = (id: string, data: Layout) => {
    console.log('拖拽中', id, data)
}
const draggableEnd = (data: Layout) => {
    console.log('拖拽结束', data)
}
const remove = (id: string) => {
    console.log('删除', id)
}
</script>