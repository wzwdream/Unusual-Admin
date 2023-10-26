import { defineStore } from 'pinia'
import router from '@/router'
import { logout } from '@/api/user/login'
import { resetStore } from '@/utils/help'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: {}
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    async userLogout() {
      await logout()
      resetStore()
      router.replace('/login')
    }
  },
  persist: {
    storage: window.sessionStorage, // 存储位置修改为 sessionStorage
  }
})