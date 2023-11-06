import { defineStore } from 'pinia'
import { buildBreadcrumb } from '@/utils/menu'
import type { TreeMenu } from '@/type/menu'
import { getTreeMenu } from '@/api/user/menu'
import { type RouteRecordRaw } from 'vue-router'
import { home } from '@/router/route'
import { buildRoute } from '@/utils/route'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      collapsed: false,
      activeMenuKey: '',
      treeMenu: [] as TreeMenu[],
      updateRoute: true
    }
  },
  getters: {
    breadcrumb(): TreeMenu[] {
      const r = buildBreadcrumb(this.menu, this.activeMenuKey)
      return r
    },
    menu(): TreeMenu[] {
      const homeMenu = {
        path: home.path,
        title: home.title
      }
      return [homeMenu, ...this.treeMenu]
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
      const { data } = await getTreeMenu()
      this.treeMenu = data
      return buildRoute(this.treeMenu) as RouteRecordRaw[]
    }
  }
})