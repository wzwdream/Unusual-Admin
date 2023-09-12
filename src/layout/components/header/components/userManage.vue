<template>
  <n-dropdown :options="options">
    <n-space align="center" class="header-user">
      <n-avatar round :size="32" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      <span>管理员</span>
    </n-space>
  </n-dropdown>
</template>

<script setup lang="ts" name="UserManage">
import { renderIcon } from '@/utils/help';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const options = computed(() => [
  {
    label: t('header.personalSettings'),
    key: 'profile',
    icon: renderIcon('material-symbols:manage-accounts-outline')
  },
  {
    label: t('header.modifyPassword'),
    key: 'editProfile',
    icon: renderIcon('ri:lock-line')
  },
  {
    label: t('header.logout'),
    key: 'logout',
    icon: renderIcon('material-symbols:logout')
  }
])
</script>