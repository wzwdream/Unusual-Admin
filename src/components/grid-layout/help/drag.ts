import { Parameter, LayoutItem, HandleType } from '../types/index'
import { calcBoundary, collisionAvoidanceForItems, collisionDetection, deepClone, findIndexById, getCollidingIndexes, isLayoutChanged } from '../help/utils'
const useDrage = (data: Parameter) => {
    const isDraging = ref(false) // 是否拖拽中
    const propsId = ref('') // 当前操作的item的id
    const colWidth = ref(0) // item宽度
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
     * 初始化数据
     */
    const dragData = reactive<Parameter>(deepClone(data))
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
    const draggableHandle = (shiftX: number, shiftY: number, handleType?: HandleType) => {
        const { x, y, h, w } = dragingData.value.data
        const moveX = Math.round((shiftX) / (colWidth.value + dragData.gutter))
        const moveY = Math.round((shiftY) / (dragData.rowH + dragData.gutter))
        if (handleType === 'drag') {
            drageItem.x = calcBoundary(x, moveX, w, dragData.col,)
            drageItem.y = calcBoundary(y, moveY, h)
        }
        if (handleType === 'resize') {
            drageItem.w = (w + moveX) <= 0 ? 1 : (w +moveX)
            drageItem.h = (h + moveY) <= 0 ? 1 : (h + moveY)
        }
        const newItem = {
            ...drageItem,
            id: propsId.value
        }
        const newData = deepClone(dragData.data)
        const { index } = findIndexById(newData, propsId.value)
        newData[index] = newItem
        if (isLayoutChanged(newData, newItem)) {
            if (collisionDetection(newData, newItem)) {
                const collidingIndexes = getCollidingIndexes(newData, newItem)
                const data = collisionAvoidanceForItems(newData, collidingIndexes, dragData.col)
                data.forEach(item => {
                    if (item.id !== propsId.value) {
                        const { index } = findIndexById(dragData.data, item.id)
                        dragData.data.splice(index, 1, item)
                    }
                })
            } else {
                dragData.data[dragingData.value.index] = dragingData.value.data
                dragData.data.splice(dragingData.value.index, 1, dragingData.value.data)
            }
        }
    }
    /**
    * 拖拽结束，更新操作的item的数据到初始化数据中
    */
    const draggableEnd = () => {
        const { x, y, h, w } = drageItem
        const  { index, data } = dragingData.value
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
    const style = computed(() => {
        return {
            gridTemplateColumns: `repeat(${dragData.col}, minmax(50px, 1fr))`,
            gridAutoRows: `${dragData.rowH}px`,
            gap: `${dragData.gutter}px`,
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
        style,
        colWidth,
        removes,
        propsId,
        dragingData
    }
}
export default useDrage