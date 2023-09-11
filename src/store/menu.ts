import { defineStore } from 'pinia'
import { routes } from '@/router/route'
import { buildMenu } from '@/utils/help'
export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      collapsed: false,
      activeMenuKey: '/list/baseList',
      menu: buildMenu(routes)
    }
  },
  getters: {},
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