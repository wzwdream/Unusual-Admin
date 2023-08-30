import { defineStore } from 'pinia'
export const useTagStore = defineStore('tags', {
  state: () => {
    return {
      tags: [
        { key: '1', name: '爱在西元前' },
        { key: '2', name: '不该' },
        { key: '3', name: '超人不会飞' },
        { key: '4', name: '手写的从前' },
        { key: '5', name: '哪里都是你' },
        { key: '6', name: '哪里都是你' },
        { key: '7', name: '哪里都是你' },
        { key: '8', name: '哪里都是你' },
        { key: '9', name: '哪里都是你' },
        { key: '10', name: '哪里都是你' },
        { key: '11', name: '哪里都是你' },
      ],
      activeTag: '',
      showContextMenu: false,
      contextMenuX: 0,
      contextMenuY: 0,
      currentTag: '',
      fullContent: false
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
    },
    setTags(val: { key: string; name: string }[]) {
      this.tags = val
    },
    changeActiveTag(val: string) {
      this.activeTag = val
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
    refresh() {
      console.log('refresh')
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
      this.setTags([])
    }
  },
  persist: true
})