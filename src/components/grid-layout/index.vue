<template>
    <div class="grid">
        <canvas v-show="isDrawGridLines" ref="canvas" class="canvas"></canvas>
        <div class="grid-layout" ref="gridLayout">
            <slot />
            <div v-show="isDraging" class="dragingItem"></div>
        </div>
    </div>
</template>

<script setup lang="ts" name="Grid">
import { Layout, DraggableStart, DraggableHandle, DraggableEnd, Removes, HandleType, LayoutItem } from './types/index'
import { key } from './help/key'
import useDrage from './help/useDrage'
import useLayout from './help/useLayout'
import { calcColWidth, calcHeight, drawGridLines } from './help/utils';
// 默认props
interface PropsType {
    data: Layout, // 布局数据
    col?: number, // 列数
    rowH?: number, // 行高
    drage?: boolean, // 是否可拖拽
    resize?: boolean, // 是否可缩放
    remove?: boolean, // 是否可删除
    gutter?: number, // 网格间距
    isDrawGridLines?: boolean // 网格线
}
const props = withDefaults(defineProps<PropsType>(), {
    col: 12,
    rowH: 50,
    drage: true,
    resize: true,
    remove: true,
    gutter: 10,
    isDrawGridLines: true
})
/**
 * 初始化数据
 */
const canvas = ref<HTMLCanvasElement>()
/**
 * 引用hook，分离拖拽、缩放、删除的逻辑代码
 */
const { dragData, draggableStart, draggableHandle, draggableEnd, isDraging, removes, propsId, dragingstyle } = useDrage(props)
const { rowHeight, colWidth, layoutStyle, updateStyle } = useLayout()
/**
 * 保证hook中的数据是最新数据
 */
watchEffect( () => {
    // 绘制网格线
    if (canvas.value && gridLayout.value && props.isDrawGridLines) {
        drawGridLines(canvas.value, rowHeight.value, gridLayout.value.clientWidth, colWidth.value, dragData.rowH, dragData.gutter)
    }
    dragData.data = props.data
    dragData.drage = props.drage
    dragData.rowH = props.rowH
    dragData.col = props.col
    dragData.gutter = props.gutter
    dragData.resize = props.resize
    dragData.remove = props.remove
    updateStyle(dragData.col, dragData.rowH, dragData.gutter)
})
/**
 * 抛出emit事件
 */
const emit = defineEmits<{
    (e: 'update:data', data: Layout): void
    (e: 'draggableStart', id: string): void
    (e: 'draggableHandle', id: string, data: LayoutItem): void
    (e: 'draggableEnd', data: Layout): void
    (e: 'remove', id: string): void
}>()
const updateData = () => {
    emit('update:data', dragData.data)
}
const dragStart: DraggableStart = (id: string) => {
    draggableStart(id)
    emit('draggableStart', id)
}
const dragHandle: DraggableHandle = (shiftX: number, shiftY: number, handleType?: HandleType) => {
    const { newData, newItem } = draggableHandle(shiftX, shiftY, colWidth.value, handleType)
    rowHeight.value = calcHeight(dragData.rowH, dragData.gutter, newData)
    emit('draggableHandle', propsId.value, newItem)
}
const dragEnd: DraggableEnd = () => {
    draggableEnd()
    updateData()
    emit('draggableEnd', dragData.data)
}
const remove: Removes = (id: string) => {
    removes(id)
    updateData()
    emit('remove', id)
}
/**
 * 计算每个item的宽度高度
 */
const gridLayout = ref<HTMLDivElement | null>(null)
const calcWidth = () => {
    if (gridLayout.value) {
        const { col, gutter } = dragData
        colWidth.value = calcColWidth(col, gutter, gridLayout.value.clientWidth)
    }
}
onMounted(() => {
    calcWidth()
    rowHeight.value = calcHeight(props.rowH, props.gutter, props.data)
    window.onresize = calcWidth
})
/**
 * 注入的参数
 */
const provideData = reactive({
    data: dragData.data, // 布局数据
    rowH: dragData.rowH, // item高度
    col: dragData.col, // 列数
    gutter: dragData.gutter, // 间距
    colWidth, // item宽度
    drage: dragData.drage, // 是否可拖拽
    resize: dragData.resize, // 是否可缩放
    remove: dragData.remove, // 是否可删除
    draggableStart: dragStart, // 拖拽开始
    draggableHandle: dragHandle, // 拖拽中
    draggableEnd: dragEnd, // 拖拽结束
    removes: remove // 删除元素方法
})
provide(key, provideData)
</script>

<style scoped lang="scss">
.grid {
    position: relative;

    .grid-layout {
        display: grid;
        place-items: center center;
        grid-template-columns: v-bind('layoutStyle.gridTemplateColumns');
        grid-auto-rows: v-bind('layoutStyle.gridAutoRows');
        gap: v-bind('layoutStyle.gap');
        height: v-bind('layoutStyle.height');
        overflow-x: hidden;
        touch-action: none;
        .dragingItem {
            width: 100%;
            height: 100%;
            background-color: #2c7ec2;
            grid-area: v-bind('dragingstyle.yStart') / v-bind('dragingstyle.xStart') / v-bind('dragingstyle.yEnd') / v-bind('dragingstyle.xEnd');
            z-index: 5;
        }
    }

    .canvas {
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>