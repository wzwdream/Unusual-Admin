import { menu } from '@/type/menu'
import { defineStore } from 'pinia'
import router from '@/router'
import { loadingBar } from '@/utils/help'
export const useTagStore = defineStore('tags', {
  state: () => {
    return {
      tags: [
        { key: '/list/baseList', label: '基础列表', icon: 'material-symbols:align-space-even-rounded' }
      ] as menu[],
      activeTag: '/list/baseList',
      showContextMenu: false,
      contextMenuX: 0,
      contextMenuY: 0,
      currentTag: '',
      fullContent: false,
      refreshLoading: true
    }
  },
  getters: {
    currentTagIndex(): number {
      return this.tags.findIndex((item) => item.key === this.currentTag)
    },
    activeTagIndex(): number {
      return this.tags.findIndex((item) => item.key === this.activeTag)
    }
  },
  actions: {
    removeTag(val: string) {
      const tags = this.tags.filter(item => item.key !== val)
      this.setTags(tags)
      if (val === this.activeTag) this.changeActiveTag(tags[0].key)
    },
    addTag(val: menu) {
      if (this.tags.findIndex(item => item.key === val.key) >= 0) return
      const tags = [...this.tags, val]
      this.setTags(tags)
    },
    setTags(val: menu[]) {
      this.tags = val
    },
    changeActiveTag(val: string, jump: boolean = true) {
      if (this.activeTag !== val) {
        if(jump) router.push(val)
        this.activeTag = val
      }
    },
    handleContextmenu(e: MouseEvent, val: string) {
      this.currentTag = val
      const { clientX, clientY } = e
      this.contextMenuX = clientX
      this.contextMenuY = clientY + 10
      this.showContextMenu = true
    },
    setFullContent(val: boolean) {
      this.fullContent = val
    },
    async refresh() {
      const tag = this.tags[this.activeTagIndex]
      const { keepAlive } = tag
      // 去除keeplive的缓存
      loadingBar.start()
      if (keepAlive) tag.keepAlive = false
      this.refreshLoading = false
      await nextTick()
      tag.keepAlive = keepAlive
      this.refreshLoading = true

      // 防止加载条不正确的关闭
      setTimeout(() => {
        loadingBar.finish()
      }, 100)
    },
    removeOther() {
      const tags = this.tags.filter(item => item.key === this.currentTag)
      this.setTags(tags)
    },
    removeLeft() {
      const filterTags = this.tags.filter((item, index) => index >= this.currentTagIndex)
      this.setTags(filterTags)
    },
    removeRight() {
      const filterTags = this.tags.filter((item, index) => index <= this.currentTagIndex)
      this.setTags(filterTags)
    },
    removeAll() {
      this.setTags([this.tags[0]])
      this.changeActiveTag(this.tags[0].key)
    }
  },
  persist: true
})