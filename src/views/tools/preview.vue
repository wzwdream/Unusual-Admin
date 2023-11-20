<script setup lang="js">
const cloneEl = ref(null)
const originalEl = ref(null)
const {innerWidth: winWidth, innerHeight: winHeight} = window
const offset = ref({left: 0, top: 0})
const scale = ref(1)
const origin = ref('center')
const initialData = ref({offset: {}, origin: 'center', scale: 1})

function changeStyle(el, arr) {
  const original = el.style.cssText.split(';')
  original.pop()
  el.style.cssText = original.concat(arr).join(';') + ';'
}

function open(e) {

  originalEl.value = e.target // 缓存原始图DOM节点
  cloneEl.value = originalEl.value.cloneNode(true) // 克隆图片
  originalEl.value.style.opacity = 0
  openPreview() // 打开预览
}

function openPreview() {
  scale.value = 1
  const {offsetWidth, offsetHeight} = originalEl.value
  const {top, left} = originalEl.value.getBoundingClientRect()
  const mask = document.createElement('div')
  mask.classList.add('modal')
  // 添加在body下
  document.body.appendChild(mask)
  // 注册蒙层的点击事件，关闭弹窗
  const clickFunc = function () {
    // document.body.removeChild(this)
    // originalEl.value.style.opacity = 1
    changeStyle(cloneEl.value, ['transition: all .3s', `left: ${left}px`, `top: ${top}px`, 'transform: translate(0,0)', `width: ${offsetWidth}px`])
    setTimeout(() => {
      document.body.removeChild(this)
      originalEl.value.style.opacity = 1
      mask.removeEventListener('click', clickFunc)
    }, 300)
    mask.removeEventListener('click', clickFunc)
  }
  mask.addEventListener('click', clickFunc)

  changeStyle(cloneEl.value, [`left: ${left}px`, `top: ${top}px`])
  mask.appendChild(cloneEl.value) // 添加图片
  // 移动图片到屏幕中心位置
  const originalCenterPoint = {x: offsetWidth / 2 + left, y: offsetHeight / 2 + top}
  const winCenterPoint = {x: winWidth / 2, y: winHeight / 2}
  const offsetDistance = {left: winCenterPoint.x - originalCenterPoint.x + left, top: winCenterPoint.y - originalCenterPoint.y + top}
  const diffs = {left: ((adaptScale() - 1) * offsetWidth) / 2, top: ((adaptScale() - 1) * offsetHeight) / 2}
  changeStyle(cloneEl.value, ['transition: all 0.3s', `width: ${offsetWidth * adaptScale() + 'px'}`, `transform: translate(${offsetDistance.left - left - diffs.left}px, ${offsetDistance.top - top - diffs.top}px)`])
  // 消除偏差
  // setTimeout(() => {
  //   changeStyle(cloneEl.value, ['transition: all 0s', 'left: 0', 'top: 0', `transform: translate(${offsetDistance.left - diffs.left}px, ${offsetDistance.top - diffs.top}px)`])
  //   offset.value = {left: offsetDistance.left - diffs.left, top: offsetDistance.top - diffs.top} // 记录值
  //   record()
  // }, 300)
}

// 计算自适应屏幕的缩放值
function adaptScale() {
  const {offsetWidth: w, offsetHeight: h} = originalEl.value // 获取文档中图片的宽高
  let scale = 0
  scale = winWidth / w
  if (h * scale > winHeight - 80) {
    scale = (winHeight - 80) / h
  }
  return scale
}

// 记录初始化数据
function record() {
  initialData.value = Object.assign({}, {offset: offset.value, origin: origin.value, scale: origin.value})
}
</script>

<template>
  <div class="rounded-1 content block">
    <img class="cursor-pointer item"
         @click="open"
         src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8dGVjaHxlbnwwfHx8fDE2NjIwMjc1MzI&ixlib=rb-1.2.1&q=80&w=500"
         alt=""/>
    <img class="cursor-pointer item"
         @click="open"
         src="https://images.unsplash.com/photo-1495360010541-f48722b34f7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8Y2F0fGVufDB8fHx8MTY2MjAyNzg3Nw&ixlib=rb-1.2.1&q=80&w=500"
         alt=""/>
    <img class="cursor-pointer item"
         @click="open"
         src="https://images.unsplash.com/photo-1561948955-570b270e7c36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8OHx8Y2F0fGVufDB8fHx8MTY2MjAyNzg3Nw&ixlib=rb-1.2.1&q=80&w=500"
         alt=""/>
    <img class="cursor-pointer item"
         @click="open"
         src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Nnx8dGVjaHxlbnwwfHx8fDE2NjIwMjc1MzI&ixlib=rb-1.2.1&q=80&w=500"
         alt=""/>
  </div>
</template>

<style>
/* 图片预览样式 */
.modal {
  touch-action: none;
  position: fixed;
  z-index: 99;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.75);
  user-select: none;
}

.modal > img {
  position: absolute;
  padding: 0;
  margin: 0;
  transform: translateZ(0);
}

.content {
  /*background-color: gainsboro;*/
  width: 100%;
  /*width: 150px;*/
  /*height: 300px;*/
  /*width: 230px;*/
  margin: 0 auto;

}

.item {
  display: block;
  width: 240px;
  margin: 10px auto;
}
</style>
