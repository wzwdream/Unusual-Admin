<template>
  <Markdown v-model="text" />
</template>

<script setup lang="ts" name="MarkdownDemo">
const text = ref('Markdown基于[MdEditorV3](https://imzbf.github.io/md-editor-v3/en-US/index)')
</script>
