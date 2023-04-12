import { Layout, LayoutItem } from '../types/index'

/**
 * 计算每一列的宽度
 * @param col 列数
 * @param gutter 间距
 * @param boxWidth 容器宽度
 * @returns 每列的宽度
 */
export const calcColWidth = (col: number, gutter: number, boxWidth: number,): number => {
    return (boxWidth - (col - 1) * gutter) / col
}
/**
 * 计算边界值-以x,y,h,w计算，计算再边界内的合法值
 * @param initNumber 初始值
 * @param moveNumber 移动距离
 * @param gapNumbe 元素本身高度/宽度
 * @param boundaryNumber 边界值-边界值为0时表示没有边界
 * @returns 移动后的值
 */
export const calcBoundary = (initNumber: number, moveNumber: number, gapNumber: number, boundaryNumber = 0) => {
    if (initNumber + moveNumber <= 0) return 1
    if (boundaryNumber && (initNumber + moveNumber + gapNumber) >= boundaryNumber + 1) {
        return boundaryNumber + 1 - gapNumber
    }
    return initNumber + moveNumber
}

/**
 * 根据id查找index
 * @param layout 数据
 * @param id 需要查找的id值
 * @returns 返回查找到的数据index
 */
export const findIndexById = (layout: Layout, id: string) => {
    const index = layout.findIndex((item) => item.id === id)
    const data = layout[index]
    return {
        index,
        data
    }
}

/**
 * 布局项是否发生了位置、大小变化
 * @param oldItem 原始数据
 * @param newItem 变化后的数据
 * @returns 判断结果
 */
export const isLayoutChanged = (oldItem: LayoutItem, newItem: LayoutItem) => {
    return (
        oldItem.x !== newItem.x ||
        oldItem.y !== newItem.y ||
        oldItem.w !== newItem.w ||
        oldItem.h !== newItem.h
    )
}

/**
 * 判断两个矩形是否相交
 * @param rect1 第一个item
 * @param rect2 第二个item
 * @returns 判断结果 true-相交 false-不相交
 */
export const isOverlap = (rect1: LayoutItem, rect2: LayoutItem) => {
    const { x: x1, y: y1, w: w1, h: h1 } = rect1
    const { x: x2, y: y2, w: w2, h: h2 } = rect2
    return (
        x1 + w1 > x2 &&
        x1 < x2 + w2 &&
        y1 + h1 > y2 &&
        y1 < y2 + h2
    )
}

/**
 * 碰撞检测
 * @param layout 布局数据
 * @param newItem 检测的item
 * @returns 检测结果
 */
export const collisionDetection = (layout: Layout, newItem: LayoutItem): boolean => {
    // 排除当前移动的元素
    const data = layout.filter(item => item.id !== newItem.id)
    for (const item of data) {
        if (isOverlap(newItem, item)) {
            return true
        }
    }
    return false
}

/**
 * 碰撞规避（只针对单个布局项）
 * @param layout 布局数据
 * @param itemIndex 做规避的元素
 * @returns 重新计算后的布局数据
 */
export const collisionAvoidanceForItem = (layout: Layout, itemId: string, col :number): Layout => {
    const { index, data: item } = findIndexById(layout, itemId)
    const { w } = item
    let x = item.x
    let y = item.y
    let toLeft = true
    let toRight = false
    let toUp = true
    let toDown = false
    // 先向左找位置，在向右找位置，找不到就向上找，最后向下找
    while (collisionDetection(layout, { ...item, x, y })) {
        if (x > 1 && toLeft) {
            x --
        } else if (x === 1 && !toRight) {
            toLeft = false
            toRight = true
        } else if (x + w <= col) {
            x ++
        } else if (toUp && y > 1) {
            x = 1
            y --
        } else if (y === 1 && !toDown) {
            toUp = false
            toDown = true
        } else {
            x = 1
            y ++
        }
    }
    layout.splice(index, 1, { ...item, x, y })
    return layout
}

/**
 * 获取所有与指定布局项发生碰撞的布局项的索引
 * @param layout 布局数据
 * @param itemIndex 指定item的索引
 * @returns 所有与指定item发生碰撞的布局项的索引
 */
export const getCollidingIndexes = (layout: Layout, item: LayoutItem): string[] => {
    const collidingIds: string[] = []
    const { id } = item
    layout.forEach(elem => {
        if (elem.id !== id && isOverlap(elem, item)) {
            collidingIds.push(elem.id)
        }
    })
    return collidingIds
}

/**
 * 碰撞规避（针对多个布局项）
 * @param layout 布局数据
 * @param itemIndexs 所有与指定item发生碰撞的布局项的索引
 * @returns 新的布局数据
 */
export const collisionAvoidanceForItems = (layout: Layout, itemIds: string[], col: number): Layout => {
    let newLayout = [...layout]
    for (const itemId of itemIds) {
        newLayout = collisionAvoidanceForItem(newLayout, itemId, col)
    }
    return newLayout
}

export const deepClone = (obj: any, cache = new WeakMap()) => {

    // 判断是否是引用类型，如果不是则直接返回
    if (obj === null || typeof obj !== 'object') return obj

    // 判断是否是特殊的对象类型（Date/RegExp）
    if (obj instanceof Date) return new Date(obj)
    if (obj instanceof RegExp) return new RegExp(obj)

    // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
    if (cache.has(obj)) return cache.get(obj)

    // 使用原对象的构造函数创建一个新对象
    const newObj = new obj.constructor()

    // 缓存对象，用于循环引用的情况
    cache.set(obj, newObj)

    for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
            // 递归克隆
            newObj[key] = deepClone(obj[key], cache)
        }
    }

    return newObj
}