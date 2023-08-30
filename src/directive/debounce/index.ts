import { ObjectDirective } from 'vue'
let debounceTimer: any = null
const shake = (fn: any, delay: number) => {
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
        el.addEventListener('click', () => {
            if (typeof binding.value !== 'function') throw new TypeError('A function type is required.')
            const activeShake = shake(binding.value, 1000)
            activeShake()
        })
    },
}
export default debounce
