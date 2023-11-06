import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import { loadingBar } from '@/utils/help'
import { routes } from './route'
import { useMenuStore } from '@/store/menu'
import { useTagStore } from '@/store/tags'
import { Tag } from '@/type/menu'
import { useUserStore } from '@/store/user'
import { filterRoute } from '@/utils/route'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 路由白名单
const whiteList = ['/login']
router.beforeEach(async (to, from, next) => {
  // 开启加载条
  loadingBar.start()
  // 免登录白名单直接进入
  if (whiteList.includes(to.path)) return next()

  const userStore = useUserStore()
  // 是否已经登录
  if (userStore.token) {
    if (to.path === '/login') return next('/')
    await nextTick()
    const menuStore = useMenuStore()
    if (menuStore.updateRoute) {
      const data = await menuStore.GenerateRoutes()
      const routers = filterRoute(data)
      routers.forEach((route: RouteRecordRaw) => {
        router.addRoute( route)
      })
      // 防止死循环
      menuStore.updateRoute = false
      next({ ...to, replace: true })
    } else {
      next()
    }
  } else {
    // 如果没有登录则重定向登录页面
    next(`/login?redirect=${to.fullPath}`)
  }
})


router.afterEach(async (to) => {
  // 设置网页标签名
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + import.meta.env.VITE_TITLE
  }
  // 解决浏览器手势返回和点击退回时菜单选择跟tag选择状态不正确
  const menuStore = useMenuStore()
  const tagStore = useTagStore()

  // 动态更新tags和选中
  if (to.meta.visibily) {
    const tag: Tag = {
      icon: to.meta.icon || '',
      keepAlive: to.meta.keepAlive || false,
      key: to.fullPath,
      label: to.meta.title || '',
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
