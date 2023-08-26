import { useDark, useToggle } from '@vueuse/core'
import { defineStore } from 'pinia'
const isDark = useDark()
export const useThemeStore = defineStore('them', {
  state: () => {
    return {
      isDark
    }
  },
  getters: {},
  actions: {
    setIsDark() {
      this.isDark = !this.isDark
      useToggle(this.isDark)
    }
  },
  persist: true
})