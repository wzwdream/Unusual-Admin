import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: ''
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    restUser() {
      this.$reset()
    }
  },
  persist: {
    storage: window.sessionStorage, // 存储位置修改为 sessionStorage
  }
})