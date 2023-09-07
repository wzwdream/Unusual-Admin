import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
import { getLanguage, type Local, setLocale } from '@/lang/index'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
const isDark = useDark()
export const useThemeStore = defineStore('them', {
  state: () => {
    return {
      isDark,
      language: getLanguage() as Local
    }
  },
  getters: {
    locale(state) {
      if (state.language === 'en') return null
      return zhCN
    },
    dateLocale(state) {
      if (state.language === 'en') return null
      return dateZhCN
    },
    theme(state) {
      if (state.isDark) return darkTheme
      return undefined
    }
  },
  actions: {
    setIsDark() {
      this.isDark = !this.isDark
      useToggle(this.isDark)
    },
    setLanguage(val: Local) {
      setLocale(val)
      this.language = val
    }
  },
  persist: true
})