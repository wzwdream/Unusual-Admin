import { createRouter, createWebHistory } from 'vue-router'
import { loadingBar } from '@/utils/help'
import { setting } from '@/setting'
import { routes } from './route'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + setting.title
  }
  loadingBar.start()
  next()
})


router.afterEach(() => {
  loadingBar.finish()
})

export default router
