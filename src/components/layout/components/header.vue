<template>
  <section class="header">
    <div :class="{ 'header-logo': true, 'logo-close': menuStore.collapsed }">
      <n-image width="32" height="32" preview-disabled src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg" />
      <span v-show="!menuStore.collapsed" class="logo-text">模板系统</span>
    </div>
    <div class="header-right">
      <n-tooltip trigger="hover">
        <template #trigger>
          <n-button class="header-icon" text @click="menuStore.changeCollapsed(!menuStore.collapsed)">
            <n-icon size="24">
              <MenuUnfoldOutlined v-if="menuStore.collapsed" />
              <MenuFoldOutlined v-else />
            </n-icon>
          </n-button>
        </template>
        {{ !menuStore.collapsed ? '收起菜单' : '展开菜单' }}
      </n-tooltip>
      <div class="header-trigger">
        <n-breadcrumb>
          <n-breadcrumb-item>
            <n-icon :component="GridSharp" /> 北京总行</n-breadcrumb-item>
          <n-breadcrumb-item>
            <n-icon :component="GridSharp" /> 天津分行</n-breadcrumb-item>
          <n-breadcrumb-item>
            <n-icon :component="GridSharp" /> 平山道支行</n-breadcrumb-item>
        </n-breadcrumb>
        <div class="header-tools">
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button class="header-icon" text @click="toggle">
              <n-icon size="24">
                <FullscreenOutlined v-if="!isFullscreen" />
                <FullscreenExitOutlined v-else />
              </n-icon>
            </n-button>
            </template>
            {{ !isFullscreen ? '全屏' : '退出全屏' }}
          </n-tooltip>
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
                  <n-icon><PersonOutline /></n-icon>
                </template>
                个人设置
              </n-button>
              <n-button text>
                <template #icon>
                  <n-icon><LockClosedOutline /></n-icon>
                </template>
                修改密码
              </n-button>
              <n-button text>
                <template #icon>
                  <n-icon><LogOutOutline /></n-icon>
                </template>
                退出登录
              </n-button>
            </n-button-group>
          </n-popover>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup name="Header">
import { GridSharp, LogOutOutline, LockClosedOutline, PersonOutline } from '@vicons/ionicons5'
import { MenuUnfoldOutlined, MenuFoldOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@vicons/antd'
import { useMenuStore } from '@/store/menu'
import { useFullscreen } from '@vueuse/core'

const { isFullscreen, toggle } = useFullscreen()
const menuStore = useMenuStore()

</script>

<style scoped>
.header, .header-logo, .header-right, .header-icon, .header-trigger, .header-tools {
  height: 64px;
  display: flex;
  align-items: center;
}
.header-logo {
  flex: 0 1 200px;
  justify-content: center;
  .logo-text {
    font-size: 18px;
    margin-left: 10px;
    font-weight: 700;
  }
}
.logo-close {
  flex: 0 1 64px;
}
.header-right {
  flex: 1;
  .header-icon {
    width: 44px;
    justify-content: center;
    cursor: pointer;
  }
  .header-trigger {
    flex: 1;
    justify-content: space-between;
    padding-right: 30px;
    .header-user {
      flex: 0 0 110px;
      cursor: pointer;
    }
  }
}
</style>