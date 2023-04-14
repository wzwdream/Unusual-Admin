import { Layout } from "../types"

/**
 * 计算每一列的宽度
 * @param col 列数
 * @param gutter 间距
 * @param boxWidth 容器宽度
 * @returns 每列的宽度
 */
export const calcColWidth = (col: number, gutter: number, boxWidth: number): number => {
    return (boxWidth - (col - 1) * gutter) / col
}
/**
 * 计算布局的高度
 * @param rowH 每列高度
 * @param gutter 间距
 * @param layout 布局数据
 * @returns 计算的高度
 */
export const calcHeight = (rowH: number, gutter: number, layout: Layout): number => {
    let y = 0, h = 0
    for (const { y: y1, h: h1 } of layout) {
        if (y1 + h1 > y + h) {
            y = y1
            h = h1
        }
    }
    return (y + h - 2) * gutter + (y + h - 1) * rowH + rowH + gutter
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
    return (initNumber + moveNumber <= 0)
        ? 1
        : (boundaryNumber && (initNumber + moveNumber + gapNumber) >= (boundaryNumber + 1))
            ? boundaryNumber + 1 - gapNumber
            : initNumber + moveNumber
};

/**
 * 根据id查找index
 * @param layout 数据
 * @param id 需要查找的id值
 * @returns 返回查找到的数据index
 */
export const findIndexById = (layout: Layout, id: string) => {
    const index = layout.findIndex((item) => item.id === id)
    const data = layout[index]
    return { index, data }
}

/**
 * 绘制网格线
 * @param canvas canvas实列
 * @param height 高度
 * @param width 宽度
 * @param colWidth 列宽
 * @param rowH 行高
 * @param gutter 间距
 */
export const drawGridLines = (canvas: HTMLCanvasElement, height: number, width: number, colWidth: number, rowH: number, gutter: number) => {
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    // 绘制网格线
    ctx.fillStyle = '#000'
    ctx.lineWidth = 0.2
    ctx.setLineDash([20, 5])
    for (let i = rowH + gutter / 2; i < height; i = i + rowH + gutter) {
        ctx.beginPath()
        ctx.moveTo(0, i)
        ctx.lineTo(width, i)
        ctx.stroke()
    }
    for (let i = colWidth + gutter / 2; i < width; i = i + colWidth + gutter) {
        ctx.beginPath()
        ctx.moveTo(i, 0)
        ctx.lineTo(i, height)
        ctx.stroke()
    }
}
/**
 * 深克隆函数
 * @param obj 需要拷贝的元素
 * @param cache 用来缓存的对象
 * @returns 返回拷贝的对象
 */
export const deepClone = <T>(obj: T, cache = new WeakMap()): T => {
    if (obj === null || typeof obj !== "object") return obj
    // 先返回 unknown，让instanceof 检查推断出正确的类型。这消除了后面的类型断言（as T）
    if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T
    if (obj instanceof RegExp) return new RegExp(obj.source) as unknown as T
    // 如果出现循环引用，则返回缓存的对象，防止递归进入死循环
    if (cache.has(obj)) return cache.get(obj)
    // 创建空数组/没有原型链的空对象
    const newObj: T = Array.isArray(obj) ? [] : Object.create(null)
    // 缓存对象，用于循环引用的情况
    cache.set(obj, newObj)
    for (const key in obj) {
        // 递归克隆
        newObj[key] = deepClone(obj[key], cache)
    }
    return newObj
}