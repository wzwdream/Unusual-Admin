import { defineStore } from 'pinia'
import { buildBreadcrumb, buildMenu } from '@/utils/menu'
import { type menu } from '@/type/menu'
import { getMenu } from '@/api/user/menu'
import { type RouteRecordRaw } from 'vue-router'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      collapsed: false,
      activeMenuKey: '',
      treeMenu: [] as RouteRecordRaw[]
    }
  },
  getters: {
    breadcrumb(): menu[] {
      const r = buildBreadcrumb(this.menu, this.activeMenuKey)
      return r
    },
    menu(): menu[] {
      return buildMenu(this.treeMenu)
    },
  },
  actions: {
    changeCollapsed(val: boolean) {
      this.collapsed = val
    },
    setActiveMenuKey(val: string) {
      this.activeMenuKey = val
    },
    async GenerateRoutes(): Promise<RouteRecordRaw[]> {
      const { data } = await getMenu()
      this.treeMenu = data
      return data
    }
  },
  persist: true
})