import { ObjectDirective } from 'vue'
let debounceTimer: any = null
const shake = (fn: any, delay: number = 1000) => {
    return (...args: unknown[]) => {
        if (debounceTimer) {
            clearTimeout(debounceTimer)
        }
        debounceTimer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
const debounce: ObjectDirective = {
    mounted(el, binding) {
        const eventName = binding.arg || 'click'
        el.addEventListener(eventName, () => {
            if (typeof binding.value !== 'function') throw new TypeError('A function type is required.')
            const activeShake = shake(binding.value, 1000)
            activeShake()
        })
    },
}
export default debounce
