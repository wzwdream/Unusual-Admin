import debounce from './debounce'
const directives = {
    debounce,
}
export default {
    install(app: any) {
        Object.keys(directives).forEach((key) => {
            app.directive(key, directives[key])
        })
    },
}
