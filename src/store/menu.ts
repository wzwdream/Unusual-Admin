import { defineStore } from 'pinia'
import { routes } from '@/router/route'
import { buildBreadcrumb, buildMenu } from '@/utils/menu'
import { menu } from '@/type/menu'

export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      collapsed: false,
      activeMenuKey: '/list/baseList',
      menu: buildMenu(routes),
    }
  },
  getters: {
    breadcrumb(): menu[] {
      const r = buildBreadcrumb(this.menu, this.activeMenuKey)
      return r
    }
  },
  actions: {
    changeCollapsed(val: boolean) {
      this.collapsed = val
    },
    setActiveMenuKey(val: string) {
      this.activeMenuKey = val
    }
  },
  persist: true
})