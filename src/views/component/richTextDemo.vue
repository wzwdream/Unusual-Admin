<template>
  <div>
    <div mb-10>富文本编辑器基于<a color-blue target="_blank" href="https://www.wangeditor.com/">wangEditor</a></div>
    <RichText v-model="text" />
  </div>
</template>

<script setup lang="ts" name="RichTextDemo">
const text = ref('')
</script>
