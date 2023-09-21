import { defineStore } from 'pinia'
import router from '@/router'
import { logout } from '@/api/user/login'
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
    },
    async userLogout() {
      await logout()
      this.restUser()
      router.replace('/login')
    }
  },
  persist: {
    storage: window.sessionStorage, // 存储位置修改为 sessionStorage
  }
})