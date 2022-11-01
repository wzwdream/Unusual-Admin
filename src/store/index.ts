import { defineStore } from "pinia";
export const useMainStore = defineStore("main", {
    // 类似于Vue2组件中的data，用于存储全局状态数据，但有两个要求
    // 1. 必须是函数，目的是为了在服务端渲染的时候避免交叉请求导致的数据状态污染
    // 2. 必须是箭头函数，这样是为了更好的 TS 类型推导
    state: () => {
        return {
            msg: 'hello word'
        };
    },
    getters: {},
    actions: {
        changeAction(val: string) {
            this.msg = val
        }
    },
    persist: true
})