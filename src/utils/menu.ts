import { type TreeMenu } from '@/type/menu'
import { type MenuOption } from 'naive-ui'
import { hRouter } from './help'
import { renderIcon } from './icon'

// 根据路由生成菜单配置
export const buildMenuOptions = (menu: TreeMenu[]): MenuOption[] => {
  const result: MenuOption[] = []
  menu.map(item => {
    const r: MenuOption = {
      name: item.name,
      keeplive: item.keepAlive,
      title: item.isDir ? item.title : hRouter(item.title as string, item.path),
      path: item.path,
      icon: renderIcon(item.icon as string),
      isDir: item.isDir
    }
    if (item.children) r.children = buildMenuOptions(item.children)
    result.push(r)
  })
  return result
}

// 通过选中菜单获取面包屑菜单
export const buildBreadcrumb = (menu: TreeMenu[], targetPath: string, ancestors: TreeMenu[] = []): TreeMenu[] => {
  for (const item of menu) {
    if (item.path === targetPath) {
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