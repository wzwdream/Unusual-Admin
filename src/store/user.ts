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
    }
  },
  persist: {
    storage: window.sessionStorage, // 存储位置修改为 sessionStorage
  }
})