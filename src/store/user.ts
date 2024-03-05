import { defineStore } from 'pinia'
import router from '@/router'
import { getUserInfo, logout, type UserInfo } from '@/api/user/login'
import { resetStore } from '@/utils/help'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: '',
      userInfo: {} as UserInfo
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
    },
    async getInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data
      } catch {
        this.userLogout()
      }
    }
  },
  persist: {
    storage: window.sessionStorage,
    paths: ['token', 'userInfo'],
  }
})