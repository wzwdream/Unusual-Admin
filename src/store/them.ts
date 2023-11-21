import { useDark, useToggle, useWindowSize } from '@vueuse/core'
import { defineStore } from 'pinia'
import { getLanguage, type Local, setLocale } from '@/lang/index'
import { darkTheme, dateZhCN, zhCN } from 'naive-ui'
const isDark = useDark()

export const useThemeStore = defineStore('them', {
  state: () => {
    return {
      isDark,
      language: getLanguage() as Local,
      collapsed: false,
      showDrawerMenu: false
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
    },
    // 屏幕尺寸
    screenSize() {
      const { width } = useWindowSize()
      // xl对应屏幕 >=1920 px 超大显示器
      // lg对应屏幕>=1200px，小于 1920px 台式1920*1080显示器
      // md对应屏幕>=992px，小于1200px 适合笔记本
      // sm对应屏幕>=768px，小于992px 适合平板
      // xs对应屏幕<=768 手机端屏幕
      return width.value >= 1920 ? 'xl' :
             width.value >= 1200 ? 'lg' :
             width.value >= 992 ? 'md' :
             width.value >= 768 ? 'sm' :
             'xs'
    },
    isShowSider() {
      const screen: 'xl' | 'lg' | 'md' | 'sm' | 'xs' = this.screenSize
      return screen !== 'xs'
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
    },
    changeCollapsed(val: boolean) {
      this.collapsed = val
    },
    changeshowDrawerMenu(val: boolean) {
      this.showDrawerMenu = val
    },
  },
  persist: true
})