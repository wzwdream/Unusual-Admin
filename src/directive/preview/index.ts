import {ObjectDirective} from 'vue'
import './style.css'
const cloneEl = ref<HTMLElement | null>(null)
const originalEl = ref<HTMLElement | null>(null)
const {innerWidth: winWidth, innerHeight: winHeight} = window
const offset = ref({left: 0, top: 0})
const scale = ref(1)

function changeStyle(el: HTMLElement, arr: string[]):void {
    const original = el.style.cssText.split(';')
    original.pop()
    el.style.cssText = original.concat(arr).join(';') + ';'
}

// 计算自适应屏幕的缩放值
function adaptScale():number {
    const {offsetWidth: w, offsetHeight: h} = originalEl.value! // 获取文档中图片的宽高
    let scale = 0
    scale = winWidth / w
    if (h * scale > winHeight - 80) {
        scale = (winHeight - 80) / h
    }
    return scale
}

function openPreview():void {
    scale.value = 1
    const {offsetWidth, offsetHeight} = originalEl.value!
    const {top, left} = originalEl.value!.getBoundingClientRect()
    const mask = document.createElement('div')
    mask.classList.add('preview')
    // 添加在body下
    document.body.appendChild(mask)
    // 注册蒙层的点击事件，关闭弹窗
    const maskFuc = function () {
        changeStyle(cloneEl.value!, ['transition: all .3s', `left: ${left}px`, `top: ${top}px`, 'transform: translate(0,0)', `width: ${offsetWidth}px`])
        setTimeout(() => {
            document.body.removeChild(mask)
            originalEl.value!.style.opacity = '1'
            mask.removeEventListener('click', maskFuc)
        }, 300)
        mask.removeEventListener('click', maskFuc)
    }
    mask.addEventListener('click', maskFuc)
    changeStyle(cloneEl.value!, [`left: ${left}px`, `top: ${top}px`])
    mask.appendChild(cloneEl.value!) // 添加图片
    // 移动图片到屏幕中心位置
    const originalCenterPoint = {x: offsetWidth / 2 + left, y: offsetHeight / 2 + top}
    const winCenterPoint = {x: winWidth / 2, y: winHeight / 2}
    const offsetDistance = {
        left: winCenterPoint.x - originalCenterPoint.x + left,
        top: winCenterPoint.y - originalCenterPoint.y + top
    }
    const diffs = {left: ((adaptScale() - 1) * offsetWidth) / 2, top: ((adaptScale() - 1) * offsetHeight) / 2}
    changeStyle(cloneEl.value!, ['transition: all 0.3s', `width: ${offsetWidth * adaptScale() + 'px'}`, `transform: translate(${offsetDistance.left - left - diffs.left}px, ${offsetDistance.top - top - diffs.top}px)`])
    // 消除偏差
    setTimeout(() => {
        changeStyle(cloneEl.value!, ['transition: all 0s', 'left: 0', 'top: 0', `transform: translate(${offsetDistance.left - diffs.left}px, ${offsetDistance.top - diffs.top}px)`])
        offset.value = {left: offsetDistance.left - diffs.left, top: offsetDistance.top - diffs.top} // 记录值
    }, 300)
}

const preview: ObjectDirective = {
    mounted(el) {
        el.addEventListener('click', () => {
            originalEl.value = el as HTMLElement // 缓存原始图DOM节点
            cloneEl.value = originalEl.value?.cloneNode(true) as HTMLImageElement // 克隆图片
            originalEl.value.style.opacity = '0'
            openPreview()
        })
    }
}
export default preview
