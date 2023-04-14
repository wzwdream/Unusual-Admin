import { Parameter, LayoutItem, HandleType } from '../types/index'
import { collisionAvoidanceForItems, collisionDetection, getCollidingIndexes } from './dragerule'
import { calcBoundary, deepClone, findIndexById } from './utils'
const useDrage = (data: Parameter) => {
    /**
     * 初始化数据
    */
    const dragData = reactive<Parameter>(deepClone(data))
    const isDraging = ref(false) // 是否拖拽中
    const propsId = ref('') // 当前操作的item的id
    const drageItem = reactive({ x: 0, y: 0, h: 0, w: 0 }) // 操作item的提示数据
    /**
     * 操作item的数据
     */
    const dragingData = computed(() => {
        const { index, data } = findIndexById(dragData.data, propsId.value)
        return {
            index,
            data
        }
    })
    /**
     * 开始拖拽，记录当前操作的item的初始数据
     * @param id 当前操作的item的id
     */
    const draggableStart = (id: string) => {
        propsId.value = id
        const { x, y, h, w } = dragingData.value.data
        drageItem.x = x
        drageItem.y = y
        drageItem.h = h
        drageItem.w = w
        isDraging.value = true
    }
    /**
     * 拖拽中，计算当前操作item的位置/大小，并更新提示数据
     * @param shiftX 横向移动的距离
     * @param shiftY 纵向移动的距离
     * @param handleType 操作类型：drag-拖拽、resize-缩放
     */
    const draggableHandle = (shiftX: number, shiftY: number, colWidth: number, handleType?: HandleType) => {
        const { x, y, h, w } = dragingData.value.data
        const moveX = Math.round((shiftX) / (colWidth + dragData.gutter))
        const moveY = Math.round((shiftY) / (dragData.rowH + dragData.gutter))
        if (handleType === 'drag') {
            drageItem.x = calcBoundary(x, moveX, w, dragData.col,)
            drageItem.y = calcBoundary(y, moveY, h)
        } else if (handleType === 'resize') {
            drageItem.w = (w + moveX) <= 0 ? 1 : (w + moveX)
            drageItem.h = (h + moveY) <= 0 ? 1 : (h + moveY)
        }
        const newItem = { ...drageItem, id: propsId.value }
        const newData = deepClone(dragData.data)
        const { index } = findIndexById(newData, propsId.value)
        newData[index] = newItem
        if (collisionDetection(newData, newItem)) {
            const collidingIndexes = getCollidingIndexes(newData, newItem)
            const avoidingItems  = collisionAvoidanceForItems(newData, collidingIndexes, dragData.col)
            avoidingItems .forEach(item => {
                if (item.id !== propsId.value) {
                    const { index } = findIndexById(dragData.data, item.id)
                    dragData.data.splice(index, 1, item)
                }
            })
        } else {
            dragData.data.splice(dragingData.value.index, 1, dragingData.value.data)
        }
        return {
            newData,
            newItem
        }
    }
    /**
    * 拖拽结束，更新操作的item的数据到初始化数据中
    */
    const draggableEnd = () => {
        const { x, y, h, w } = drageItem
        const { index, data } = dragingData.value
        const newData: LayoutItem = {
            ...data,
            x,
            y,
            h,
            w
        }
        dragData.data.splice(index, 1, newData)
        isDraging.value = false
    }
    /**
     * 删除item，并更新数据
     * @param id 当前操作的item的id
     */
    const removes = (id: string) => {
        propsId.value = id
        const { index } = dragingData.value
        dragData.data.splice(index, 1)
    }
    /**
     * 当前操作的item的提示数据的样式和布局样式
     */
    const dragingstyle = computed(() => {
        return {
            xStart: drageItem.x,
            yStart: drageItem.y,
            xEnd: drageItem.x + drageItem.w,
            yEnd: drageItem.y + drageItem.h
        }
    })
    return {
        dragData,
        draggableStart,
        draggableHandle,
        draggableEnd,
        drageItem,
        isDraging,
        dragingstyle,
        removes,
        propsId,
        dragingData
    }
}
export default useDrage