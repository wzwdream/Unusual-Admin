import { App } from 'vue'
import GridLayout from './index.vue'
import GridItem from './gridItem/index.vue'
const Vue3GridLayout = {
    install: (app: App) => {
        app.component('grid-layout', GridLayout)
        app.component('grid-item', GridItem)
    }
}

export default Vue3GridLayout