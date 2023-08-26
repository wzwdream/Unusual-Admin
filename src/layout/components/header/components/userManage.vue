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
          <n-icon>
            <PersonOutline />
          </n-icon>
        </template>
        个人设置
      </n-button>
      <n-button text>
        <template #icon>
          <n-icon>
            <LockClosedOutline />
          </n-icon>
        </template>
        修改密码
      </n-button>
      <n-button text>
        <template #icon>
          <n-icon>
            <LogOutOutline />
          </n-icon>
        </template>
      退出登录
    </n-button>
  </n-button-group>
</n-popover>
</template>
<script setup lang="ts" name="UserManage">
import { LogOutOutline, LockClosedOutline, PersonOutline } from '@vicons/ionicons5'

</script>