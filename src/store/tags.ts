import { defineStore } from 'pinia'

export const useTagStore = defineStore('tags', {
  state: () => {
    return {
      tags: [],
      activeTag: ''
    }
  },
  getters: {},
  actions: {
  },
  persist: true
})