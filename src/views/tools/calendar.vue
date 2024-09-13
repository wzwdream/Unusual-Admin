<script setup lang="ts">
import CalendarComponent from '@/views/component/CalendarComponent.vue';

const myDate = ref(new Date());
</script>

<template>
  <div>
    <CalendarComponent v-model="myDate"></CalendarComponent>
  </div>
</template>

<style scoped>

</style>
