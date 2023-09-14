import { createRouter, createWebHistory } from 'vue-router'
import { loadingBar } from '@/utils/help'
import { setting } from '@/setting'
import { routes } from './route'
import { useMenuStore } from '@/store/menu'
import { useTagStore } from '@/store/tags'
import { menu } from '@/type/menu'

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


router.afterEach(async (to) => {
  console.log('luyou', to)
  // 解决浏览器手势返回和点击退回时菜单选择跟tag选择状态不正确
  const menuStore = useMenuStore()
  const tagStore = useTagStore()

  if (to.meta.visibily) {
    const tag: menu = {
      icon: to.meta.icon,
      keepAlive: to.meta.keepAlive,
      key: to.fullPath,
      label: to.meta.title,
      name: to.name as string
    }
    await tagStore.addTag(tag)
  }

  menuStore.setActiveMenuKey(to.path)
  tagStore.changeActiveTag(to.path, false)
  // 关闭加载条
  loadingBar.finish()
})

export default router
