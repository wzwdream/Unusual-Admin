<template>
  <n-dropdown :options="options" @select="handleSelect">
    <n-avatar round :size="32" mr-30 src="/logo.jpg" class="bg-[#fff]"/>
  </n-dropdown>
</template>

<script setup lang="ts" name="UserManage">
import { renderIcon } from '@/utils/icon'
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
const router = useRouter()
const handleMap = new Map([
  [ 'profile', () => {
    router.push('/user/profile')
  }],
  [ 'editProfile', () => {
    router.push({
      path: '/user/profile',
      query: {
        pwd: '1'
      }
    })
  } ],
  [ 'logout', () => userSoter.userLogout() ]
])

const handleSelect = (key: string) => {
  const handle = handleMap.get(key)
  handle && handle()
}
</script>
