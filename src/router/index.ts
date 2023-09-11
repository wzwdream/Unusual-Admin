import { createRouter, createWebHistory } from 'vue-router'
import { loadingBar } from '@/utils/help'
import { setting } from '@/setting'
import { routes } from './route'
import { useMenuStore } from '@/store/menu'
import { useTagStore } from '@/store/tags'

const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior: () => ({ left: 0, top: 0 })
})

router.beforeEach((to, from, next) => {
  // 开启加载条
  loadingBar.start()

  // 设置网页标签名
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + setting.title
  }
  next()
})


router.afterEach((to) => {
  // 解决浏览器手势返回和点击退回菜单选择跟tag选择状态不正确
  const menuStore = useMenuStore()
  const tagStore = useTagStore()
  menuStore.setActiveMenuKey(to.path)
  tagStore.changeActiveTag(to.path, false)

  // 关闭加载条
  loadingBar.finish()
})

export default router
