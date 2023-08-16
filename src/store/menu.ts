import { defineStore } from 'pinia'
export const useMenuStore = defineStore('menu', {
  state: () => {
    return {
      collapsed: false
    }
  },
  getters: {},
  actions: {
    changeCollapsed(val: boolean) {
      this.collapsed = val
    }
  },
  persist: true
})