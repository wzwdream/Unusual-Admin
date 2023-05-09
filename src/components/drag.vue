<template>
  <div id="drag">
    <div class="slide">
      <div @click="add()">{{count}}</div>
      <div id="list" v-on:mousedown="onDrag">
        <img class="item" src="../assets/IMG_0249.JPG"/>
      </div>
    </div>
    <div id="content">
      <span id="tip">拖动图片放置于此</span>
    </div>
<!--    <div class="content" @click="update">{{count}}</div>-->
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    // 定义响应式数据 ref对象
    const count = ref(1)
    let dragging = false
    let cloneEl = null
    let initial = {}
    let queue = []
    function add(){
      count.value++
    }
    function onDrag($event){
      console.log($event,'e')
      $event.preventDefault()
      if ($event.target.classList.contains('item') && !cloneEl) {
        document.getElementById('app').classList.add('active')
        // 选中了元素
        cloneEl = $event.target.cloneNode(true)
        cloneEl.classList.add('flutter')
        // 模拟一个随机大小的"原图"，实际业务中不存在
        const fakeSize = parseInt(100 * randomNum(3, 5))
        // 初始化数据
        init($event, { width: $event.target.offsetWidth }, fakeSize, Math.random())
        // 加载"原图"
        simulate(cloneEl.src.replace(/w=100/g, 'w=' + fakeSize), initial.flag)

        $event.target.parentElement.appendChild(cloneEl)
        dragging = true
        $event.target.classList.add('hide') // 放在最后
        queue.push(() => {
          $event.target.classList.remove('hide')
        })
      }
      // 记录鼠标初始化事件
      function init({ offsetX, offsetY, pageX, pageY }, { width }, fakeSize, flag) {
        initial = { offsetX, offsetY, pageX, pageY, width, fakeSize, flag }
        moveFlutter(pageX - offsetX, pageY - offsetY)
      }
      function moveFlutter(x, y, d = 0) {
        // const scale = null // TODO: 关闭缩放
        const scale = d ? initial.width + d <= initial.fakeSize ? `transform: scale(${(initial.width + d) / initial.width})` : null : null
        const options = [`left: ${x}px`, `top: ${y}px`]
        scale && options.push(scale)
        changeStyle(options)
      }
      function changeStyle(arr) {
        const original = cloneEl.style.cssText.split(';')
        original.pop()
        cloneEl.style.cssText = original.concat(arr).join(';') + ';'
      }
      // 加载原图通常需要时间，利用缓存来优化卡顿
      function simulate(url, flag) {
        cloneEl.setAttribute('raw', url)
        const image = new Image()
        image.src = url
        image.onload = function () {
          // 异步任务，克隆节点可能会先被清理
          cloneEl && initial.flag === flag && (cloneEl.src = url)
        }
      }
      function randomNum(n, m) {
        return Math.random() * (m - n) + n
      }
    }

    return {
      count,
      onDrag,
      add

    }
  }
}
</script>

<style lang="scss" scoped>
#drag {
  width: 100vw;
  height: 100vh;
  display: flex;
}

.active {
  cursor: grabbing;
}
.flutter{
  position: absolute;
  z-index: 9999;
  pointer-events: none;
}

.slide {
  width: 260px;
  height: 100%;
  overflow: scroll;
  border-right: 1px solid rgba(0, 0, 0, .15);

  #list {
    user-select: none;

    .item {
      background: rgba(0, 0, 0, .15);
      width: 120px;
      display: inline-block;
      break-inside: avoid;
      margin-bottom: 4px;
    }

    .item:hover {
      cursor: grab;
      filter: brightness(90%);
    }

    .item:active {
      cursor: grabbing;
    }

  }

  .grid {
    column-count: 2;
    column-gap: 0px;
  }

}

.slide::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

//.content {
//  position: relative;
//  flex: 1;
//  height: 100%;
//  margin-left: 45px;
//  background: white;
//  color: #1a1a1a;
//  .item {
//    position: absolute;
//    transform-origin: top left;
//  }
//
//}
#content {
  position: relative;
  flex: 1;
  height: 100%;
  margin-left: 45px;
  background: rgba(0,0,0,.07);
  .item {
    position: absolute;
    transform-origin: top left;
  }
  #tip {
    color: #999999;
    font-size: 28px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

</style>
