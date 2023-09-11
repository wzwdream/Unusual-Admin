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
        {{ $t('header.personalSettings') }}
      </n-button>
      <n-button text>
        <template #icon>
          <Icon icon="ri:lock-line" />
        </template>
        {{ $t('header.modifyPassword') }}
      </n-button>
      <n-button text>
        <template #icon>
          <Icon icon="material-symbols:logout" />
        </template>
        {{ $t('header.logout') }}
    </n-button>
  </n-button-group>
</n-popover>
</template>
<script setup lang="ts" name="UserManage">

</script>