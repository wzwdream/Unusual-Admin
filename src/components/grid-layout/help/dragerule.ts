import { Layout, LayoutItem } from '../types/index'
import { findIndexById } from './utils'

/**
 * 布局项是否发生了位置、大小变化
 * @param oldItem 原始数据
 * @param newItem 变化后的数据
 * @returns 判断结果
 */
export const isLayoutChanged = (oldItem: LayoutItem, newItem: LayoutItem) => {
    return (oldItem.x !== newItem.x || oldItem.y !== newItem.y || oldItem.w !== newItem.w || oldItem.h !== newItem.h)
}

/**
 * 判断两个矩形是否相交
 * @param rect1 第一个item
 * @param rect2 第二个item
 * @returns 判断结果 true-相交 false-不相交
 */
export const isOverlap = ({ x: x1, y: y1, w: w1, h: h1 }: LayoutItem, { x: x2, y: y2, w: w2, h: h2 }: LayoutItem) => {
    return (x1 + w1 > x2 && x1 < x2 + w2 && y1 + h1 > y2 && y1 < y2 + h2)
}

/**
 * 碰撞检测
 * @param layout 布局数据
 * @param newItem 检测的item
 * @returns 检测结果
 */
export const collisionDetection = (layout: Layout, newItem: LayoutItem): boolean => {
    return layout
        .filter(item => item.id !== newItem.id)
        .some(item => isOverlap(newItem, item))
}

/**
 * 碰撞规避（只针对单个布局项）
 * @param layout 布局数据
 * @param itemId 做规避的元素id
 * @param col 布局的列数
 * @returns 重新计算后的布局数据
 */
export const collisionAvoidanceForItem = (layout: Layout, itemId: string, col: number): Layout => {
    const { index, data: item } = findIndexById(layout, itemId)
    const { w } = item
    let x = item.x
    let y = item.y
    let direction = "left"

    const isCollision = () => collisionDetection(layout, { ...item, x, y })

    while (isCollision()) {
        switch (direction) {
            case "left":
                if (x > 1) x--
                else direction = "right"
                break
            case "right":
                if (x + w <= col) x++
                else direction = "up"
                break
            case "up":
                if (y > 1 && x + w < col) y--
                else direction = "down"
                break;
            default:
                y++
                direction = "left"
        }
    }
    const newItem = { ...item, x, y }
    return [...layout.slice(0, index), newItem, ...layout.slice(index + 1)]
}


/**
 * 获取所有与指定布局项发生碰撞的布局项的索引
 * @param layout 布局数据
 * @param item 当前移动的item
 * @returns 所有与当前移动的item发生碰撞的布局项的id
 */
export const getCollidingIndexes = (layout: Layout, item: LayoutItem): string[] => {
    return layout
        .filter(elem => elem.id !== item.id && isOverlap(item, elem))
        .map(item => item.id)
}

/**
 * 碰撞规避（针对多个布局项）
 * @param layout 布局数据
 * @param itemIndexs 所有与指定item发生碰撞的布局项的索引
 * @param col 布局的列数
 * @returns 新的布局数据
 */
export const collisionAvoidanceForItems = (layout: Layout, itemIds: string[], col: number): Layout => {
    let newLayout = [...layout]
    for (const itemId of itemIds) {
        newLayout = collisionAvoidanceForItem(newLayout, itemId, col)
    }
    return newLayout
}
