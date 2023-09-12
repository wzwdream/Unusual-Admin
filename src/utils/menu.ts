import { type menu } from '@/type/menu'
import { type MenuOption } from 'naive-ui'
import { type RouteRecordRaw } from 'vue-router'
import { hRouter, renderIcon } from './help'

// 通过路由获取菜单数组
export const buildMenu = (routes: RouteRecordRaw[]): menu[] => {
  const result: menu[] = []
  routes.map(item => {
    if (item.meta?.visibily) {
      const r: menu = { label: item.meta.title, key: item.path, ...item.meta }
      if (item.children) {
        r.children = buildMenu(item.children)
      }
      result.push(r)
    }
  })
  return result
}

// 根据路由生成菜单配置
export const buildMenuOptions = (menu: menu[]): MenuOption[] => {
  const result: MenuOption[] = []
  menu.map(item => {
    const r: MenuOption = {
      label: item.isDir ? item.label : hRouter(item.label as string, item.key),
      key: item.key,
      icon: renderIcon(item.icon as string),
      isDir: item.isDir
    }
    if (item.children) r.children = buildMenuOptions(item.children)
    result.push(r)
  })
  return result
}

// 通过选中菜单获取对应的tag
export const searchMenu = (menu: menu[], path: string): menu | null => {
  const queue: menu[] = [...menu]

  while (queue.length > 0) {
    const node = queue.shift()!
    if (node.key === path) return node
    if (node.children) queue.push(...node.children as menu[])
  }

  return null
}

// 通过选中菜单获取面包屑菜单
export const buildBreadcrumb = (menu: menu[], targetPath: string, ancestors: menu[] = []): menu[] => {
  for (const item of menu) {
    if (item.key === targetPath) {
      return [...ancestors, item]
    }

    if (item.children) {
      const foundAncestors = buildBreadcrumb(item.children, targetPath, [...ancestors, item])
      if (foundAncestors.length > 0) {
        return foundAncestors
      }
    }
  }

  return []
}