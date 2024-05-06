<template>
  <div class="wh-full pos-relative flex flex-col flex-nowrap">
    <div class="bg"></div>
    <div h-50 mx-auto>
      <n-button text color="#bad9ea" font-size-24 @click="backHome">返回首页</n-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="NotFound">
const router = useRouter()
const backHome = () => {
  router.replace( '/' )
}
</script>

<style scoped>
.bg {
  width: 100%;
  height: calc(100% - 50px);
  background: url('@/assets/notFound.png') no-repeat;
  background-size: contain;
  background-position: center;
}
</style>