<!--
 * @Description: scalePicker.vue
-->
<script setup lang="ts">
import { onMounted } from 'vue'
import ScalePicker from 'scale-picker'

// 定义回调函数
const handleScaleChange = (value: number) => {
  console.log('刻度值变化:', value)
}

onMounted(() => {
  new ScalePicker({
    el: document.querySelector('#scale'),
    scale: 2,
    start: 0,
    end: 100,
    width: 200,
    height: 120,
    unit: 10, // 刻度间隔 'px'
    capacity: 1, // 刻度容量值
    currentValue: 0,
    fontSize: 12,
    fontColor: '#333',
    onChange: handleScaleChange // 传入回调函数
  })
})
</script>
<template>
  <div class="w-full flex-1 flex justify-center items-center">
    <div id="scale" class="w-400px h-200px bg-#fff"></div>
  </div>
</template>

<style scoped></style>
