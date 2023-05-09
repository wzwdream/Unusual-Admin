<template>
    <div class="grid-item-box" @pointerdown="(e: PointerEvent) => draggableStart(e, 'drag')">
        <div :class="{ 'grid-item': true, 'grid-resizing': isDraging && handleType === 'resize', 'grid-draging': isDraging && handleType === 'drag' }">
            <slot />
            <div v-show="layoutData?.resize" @pointerdown.stop="(e: PointerEvent) => draggableStart(e, 'resize')">
                <slot name="resize">
                    <div class="grid-item-resize"></div>
                </slot>
            </div>
            <!-- 这里绑定pointerdown事件主要是为了防止鼠标按下事件的扩散，从而触发到父元素的拖拽事件 -->
            <div v-show="layoutData?.remove"  @pointerdown.stop="draggableStart" @click.stop="removes">
                <slot name="remove">
                    <div class="grid-item-remove"></div>
                </slot>

            </div>
        </div>
    </div>
</template>

<script setup lang="ts" name="GridItem">
import { LayoutItem, HandleType } from '../types/index'
import { key } from '../help/key'
import { findIndexById } from '../help/utils';
const layoutData = inject(key)
// 默认props
interface PropsType {
    id: string,
}
const props = defineProps<PropsType>()
/**
 * 计算当前item的样式
 */
const layout = computed(() => {
    let data: LayoutItem | undefined
    let xStart = 0, yStart = 0, xEnd = 0, yEnd = 0, width = '0px', height = '0px'
    if (layoutData?.data) {
        const { data: itemdata } = findIndexById(layoutData.data, props.id)
        data = itemdata
        const { x, y, w, h } = data
        xStart = x,
            yStart = y,
            xEnd = x + w,
            yEnd = y + h
        width = `${(w - 1) * layoutData.gutter + w * layoutData.colWidth}px`
        height = `${(h - 1) * layoutData.gutter + h * layoutData.rowH}px`
    }
    return {
        xStart,
        yStart,
        xEnd,
        yEnd,
        width,
        height,
        data
    }
})
/**
 * 拖拽初始值
 */
const offsetX = ref(0), offsetY = ref(0), isDraging = ref(false)
const handleType = ref<HandleType>()
/**
 * 拖拽/缩放的样式
 */
const style = reactive({
    width: '0px',
    height: '0px',
    transform: 'translate3d(0, 0, 0)'
})
/**
 * 开始拖拽，记录初始位置、操作类型、并绑定后续事件
 * @param e 鼠标/触摸事件event
 * @param type 操作类型：drag-拖拽、resize-缩放
 */
const draggableStart = (e: PointerEvent, type?: HandleType) => {
    if (!layoutData?.drage || !type) return
    handleType.value = type
    offsetX.value = e.clientX
    offsetY.value = e.clientY
    window.addEventListener('pointermove', draggableHandle)
    window.addEventListener('pointerup', draggableEnd)
    isDraging.value = true
    layoutData.draggableStart(props.id)
}
/**
 * 拖拽中，计算移动距离，动态更改拖拽/缩放的样式
 * @param e 鼠标/触摸事件event
 */
const draggableHandle = (e: PointerEvent) => {
    const { clientX, clientY } = e
    const shiftX = clientX - offsetX.value
    const shiftY = clientY - offsetY.value

    if (handleType.value === 'drag') {
        style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0)`
    }

    if (handleType.value === 'resize' && layoutData) {
        const { width, height } = layout.value
        const newWidth = Math.max(parseInt(width) + shiftX, layoutData.colWidth)
        const newHeight = Math.max(parseInt(height) + shiftY, layoutData.rowH)
        style.width = `${newWidth}px`
        style.height = `${newHeight}px`
    }
    layoutData?.draggableHandle(shiftX, shiftY, handleType.value)
}
/**
 * 拖拽结束，解绑事件
 */
const draggableEnd = () => {
    // 防止第二次拖拽开始的时候位置错乱
    if (handleType.value === 'drag') {
        style.transform = 'translate3d(0, 0, 0)'
    }
    if (handleType.value === 'resize' && layoutData) {
        const { width, height } = layout.value
        style.width = `${parseInt(width)}px`
        style.height = `${parseInt(height)}px`
    }
    window.removeEventListener('pointermove', draggableHandle)
    window.removeEventListener('pointerup', draggableEnd)
    layoutData?.draggableEnd()
    isDraging.value = false
}
/**
 * 删除元素
 * @param e 鼠标/触摸事件event
 */
const removes = () => {
    layoutData?.removes(props.id)
}
</script>

<style scoped lang="scss">
.grid-item-box {
    position: relative;
    width: 100%;
    height: 100%;
    grid-area: v-bind('layout.yStart') / v-bind('layout.xStart') / v-bind('layout.yEnd') / v-bind('layout.xEnd');

    .grid-item {
        position: absolute;
        top: 0;
        left: 0;
        width: v-bind('layout.width');
        height: v-bind('layout.height');
        cursor: move;
        user-select: none;
        overflow: hidden;
        background-color: #ccc;
        z-index: 1;

        .grid-item-resize {
            position: absolute;
            width: 10px;
            height: 10px;
            bottom: 2px;
            right: 2px;
            border-bottom: 2px solid #686565;
            border-right: 2px solid #686565;
            border-bottom-right-radius: 2px;
            cursor: nw-resize;
        }

        .grid-item-remove {
            position: absolute;
            right: 2px;
            top: -2px;
            color: #686565;
            cursor: pointer;
        }

        .grid-item-remove::before {
            content: "\2716";
            display: inline-block;
        }
    }

    .grid-resizing {
        width: v-bind('style.width');
        height: v-bind('style.height');
        opacity: 0.6;
        z-index: 99;
    }

    .grid-draging {
        z-index: 99;
        transform: v-bind('style.transform');
    }
}

</style>