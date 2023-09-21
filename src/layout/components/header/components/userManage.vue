<template>
  <n-dropdown :options="options" @select="handleSelect">
    <n-space align="center" class="header-user">
      <n-avatar round :size="32" src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      <span>管理员</span>
    </n-space>
  </n-dropdown>
</template>

<script setup lang="ts" name="UserManage">
import { renderIcon } from '@/utils/help'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/store/user'
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

const userSoter = useUserStore()
const handleMap = new Map([
  [ 'profile', () => {} ],
  [ 'editProfile', () => {} ],
  [ 'logout', () => userSoter.userLogout() ]
])

const handleSelect = (key: string) => {
  const handle = handleMap.get(key)
  handle && handle()
}
</script>