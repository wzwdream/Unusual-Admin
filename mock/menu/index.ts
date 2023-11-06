import { type requestParams, resultSuccess } from '../utils'

interface Menu {
  id: number
  pid: number
  path: string
  title: string
  visibily: boolean
  isDir: boolean
  icon: string
  name?: string
  component?: string
  keepAlive?: boolean
  externalLink: boolean
  link?: string
  sort: number
  isLeaf?: boolean
  children?: Menu[]
}

const menus: Menu[] = [
  { id: 1, pid: 0, path: '/tools', title: '工具', visibily: true, isDir: true, externalLink: false, icon: 'iconoir:tools', sort: 1 },
  { id: 2, pid: 1, path: '/tools/email', name: 'email', isDir: false, externalLink: false, component: 'views/tools/email.vue', title: '邮件', visibily: true, icon: 'material-symbols:stacked-email-outline', keepAlive: false, sort: 1 },
  { id: 3, pid: 0, path: '/link', title: '外链菜单', visibily: true, isDir: true, externalLink: false, icon: 'system-uicons:chain', sort: 2 },
  { id: 4, pid: 3, path: '/link/juejing', name: 'Juejing', title: '掘金', visibily: true, isDir: false, icon: 'tabler:brand-juejin', externalLink: true, link: 'https://juejin.cn/', sort: 1 },
  { id: 5, pid: 0, path: '/system', title: '系统管理', visibily: true, isDir: true, externalLink: false, icon: 'basil:settings-alt-outline', sort: 3 },
  { id: 6, pid: 5, path: '/system/userRole', name: 'userRole', isDir: false, externalLink: false, component: 'views/system/userRole.vue', title: '角色管理', visibily: true, icon: 'mdi:account-tag-outline', keepAlive: false, sort: 1 },
  { id: 7, pid: 0, path: '/component', title: '组件管理', visibily: true, externalLink: false, isDir: true, icon: 'tabler:components', sort: 3 },
  { id: 8, pid: 7, path: '/component/baseList', name: 'BaseList', isDir: false, externalLink: false, component: 'views/component/baseList.vue', title: '列表组件', visibily: true, icon: 'material-symbols:align-space-even-rounded', keepAlive: true, sort: 1 },
  { id: 9, pid: 7, path: '/component/markdownDemo', name: 'MarkdownDemo', isDir: false, externalLink: false, component: 'views/component/markdownDemo.vue', title: 'Markdown', visibily: true, icon: 'ri:markdown-line', keepAlive: true, sort: 2 },
  { id: 10, pid: 7, path: '/component/richTextDemo', name: 'RichTextDemo', isDir: false, externalLink: false, component: 'views/component/richTextDemo.vue', title: '富文本', visibily: true, icon: 'ic:twotone-text-fields', keepAlive: true, sort: 3 },
]

const convertToTree = (menus: Menu[]): Menu[] => {
  const map: Record<number, Menu> = {}
  const tree: Menu[] = []

  menus.forEach(route => {
    const { id, pid } = route

    map[id] = {
      id: route.id,
      pid: route.pid,
      path: route.path,
      name: route.name,
      component: route.component,
      title: route.title,
      visibily: route.visibily,
      icon: route.icon || '',
      keepAlive: route.keepAlive || false,
      isDir: route.isDir,
      externalLink: route.externalLink || false,
      link: route.link || '',
      sort: route.sort,
      children: map[id]?.children || []
    }
    if (pid === 0) {
      tree.push(map[id])
    } else {
      if (!map[pid]) {
        map[pid] = {} as Menu
        map[pid].children = []
      }
      map[pid].children?.push(map[id])
    }
  })

  return removeEmptyAndSort(tree)
}

// 排序和去除空children，同时生成树型数据懒加载需要的结构
const removeEmptyAndSort = (tree: Menu[]) => {
  tree.sort((a, b) => {
    if(a.sort && b.sort) return a.sort - b.sort
    return 0
  })
  tree.forEach(item => {
    if (!item.children || item.children.length === 0) {
      item.isLeaf = true
      return item.children = undefined
    } else {
      item.isLeaf = false
      removeEmptyAndSort(item.children)
    }
  })
  return tree
}

export default [
  // 用户登录
  {
    url: '/api/userMenu',
    method: 'get',
    response: (request: requestParams) => {
      const { page, pageSize, pid } = request.query
      let allMenu = menus
      if (pid) {
        allMenu = allMenu.filter(item => item.pid = pid)
      }
      const total = allMenu.length
      const resultData = allMenu.slice(page - 1, pageSize)
      return resultSuccess(resultData, '获取数据成功', total)
    }
  },
  {
    url: '/api/treeMenu',
    method: 'get',
    response: () => {
      return resultSuccess(convertToTree(menus))
    }
  },
]
