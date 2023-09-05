<template>
  <n-popover trigger="hover" placement="bottom">
    <template #trigger>
      <n-space align="center" class="header-user">
        <n-avatar round :size="32" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
        <span>管理员</span>
      </n-space>
    </template>
    <n-button-group vertical>
      <n-button text>
        <template #icon>
          <Icon icon="material-symbols:manage-accounts-outline" />
        </template>
        个人设置
      </n-button>
      <n-button text>
        <template #icon>
          <Icon icon="ri:lock-line" />
        </template>
        修改密码
      </n-button>
      <n-button text>
        <template #icon>
          <Icon icon="material-symbols:logout" />
        </template>
      退出登录
    </n-button>
  </n-button-group>
</n-popover>
</template>
<script setup lang="ts" name="UserManage">

</script>