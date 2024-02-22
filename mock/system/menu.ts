import { type requestParams, resultSuccess } from '../utils'

interface Menu {
  id: number
  pid: number
  path: string
  title: string
  visibily: 0 | 1
  menuType: 0 | 1 | 2
  competence?: string
  icon: string
  name?: string
  component?: string
  keepAlive: 0 | 1
  externalLink: 0 | 1
  link?: string
  sort: number
  isLeaf?: boolean
  children?: Menu[]
}

let menus: Menu[] = [
  { id: 1, pid: 0, path: '/tools', title: '工具', visibily: 1, menuType: 1, externalLink: 0, keepAlive: 0, icon: 'iconoir:tools', sort: 1 },
  { id: 2, pid: 1, path: '/tools/email', name: 'email', menuType: 0, externalLink: 0, component: 'views/tools/email.vue', title: '邮件', visibily: 1, icon: 'material-symbols:stacked-email-outline', keepAlive: 0, sort: 1 },
  { id: 2, pid: 1, path: '/tools/preview', name: 'preview', menuType: 0, externalLink: 0, component: 'views/tools/preview.vue', title: '预览', visibily: 1, icon: 'material-symbols:preview', keepAlive: 0, sort: 2 },
  { id: 3, pid: 0, path: '/link', title: '外链菜单', visibily: 1, menuType: 1, externalLink: 0, keepAlive: 0, icon: 'system-uicons:chain', sort: 2 },
  { id: 4, pid: 3, path: '/link/juejing', name: 'Juejing', title: '掘金', visibily: 1, menuType: 0, keepAlive: 0, icon: 'tabler:brand-juejin', externalLink: 1, link: 'https://juejin.cn/', sort: 1 },
  { id: 5, pid: 0, path: '/system', title: '系统管理', visibily: 1, menuType: 1, externalLink: 0, keepAlive: 0, icon: 'basil:settings-alt-outline', sort: 3 },
  { id: 6, pid: 5, path: '/system/userRole', name: 'userRole', menuType: 0, externalLink: 0, component: 'views/system/userRole.vue', title: '角色管理', visibily: 1, icon: 'mdi:account-tag-outline', keepAlive: 0, sort: 1 },
  { id: 7, pid: 0, path: '/component', title: '组件管理', visibily: 1, externalLink: 0, menuType: 1, keepAlive: 0, icon: 'tabler:components', sort: 3 },
  { id: 8, pid: 7, path: '/component/markdownDemo', name: 'MarkdownDemo', menuType: 0, externalLink: 0, component: 'views/component/markdownDemo.vue', title: 'Markdown', visibily: 1, icon: 'ri:markdown-line', keepAlive: 1, sort: 2 },
  { id: 9, pid: 7, path: '/component/richTextDemo', name: 'RichTextDemo', menuType: 0, externalLink: 0, component: 'views/component/richTextDemo.vue', title: '富文本', visibily: 1, icon: 'ic:twotone-text-fields', keepAlive: 1, sort: 3 },
  { id: 10, pid: 5, path: '/system/userMenu', name: 'userMenu', menuType: 0, externalLink: 0, component: 'views/system/userMenu.vue', title: '菜单管理', visibily: 1, icon: 'material-symbols:lists', keepAlive: 0, sort: 2 },
  { id: 11, pid: 5, path: '/system/user', name: 'user', menuType: 0, externalLink: 0, component: 'views/system/user.vue', title: '用户管理', visibily: 1, icon: 'material-symbols:manage-accounts-outline', keepAlive: 0, sort: 3 },
  { id: 12, pid: 5, path: '/system/dict', name: 'dict', menuType: 0, externalLink: 0, component: 'views/system/dict/index.vue', title: '字典管理', visibily: 1, icon: 'arcticons:colordict', keepAlive: 0, sort: 4 },
  { id: 13, pid: 7, path: '/component/draggableDrid', name: 'DraggableDrid', menuType: 0, externalLink: 0, component: 'views/component/draggableDrid.vue', title: '拖拽grid布局', visibily: 1, icon: 'ic:twotone-text-fields', keepAlive: 0, sort: 4 },
  {
    'pid': 0,
    'path': '',
    'title': '删除用户',
    'visibily': 0,
    'menuType': 2,
    'icon': '',
    'name': '',
    'component': '',
    'keepAlive': 0,
    'externalLink': 0,
    'link': '',
    'sort': 1,
    'competence': 'del:user',
    'id': 13,
    'isLeaf': true
},
]

const convertToTree = (menus: Menu[]): Menu[] => {
  const map: Record<number, Menu> = {}
  const tree: Menu[] = []

  menus.forEach(menu => {
    const { id, pid } = menu

    map[id] = {
      id: menu.id,
      pid: menu.pid,
      path: menu.path,
      name: menu.name,
      component: menu.component,
      title: menu.title,
      visibily: menu.visibily,
      icon: menu.icon || '',
      keepAlive: menu.keepAlive || 0,
      menuType: menu.menuType,
      externalLink: menu.externalLink || 0,
      link: menu.link || '',
      sort: menu.sort,
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

  return removeEmptyAndSortTree(tree)
}

// 排序和去除空children
const removeEmptyAndSortTree = (tree: Menu[]) => {
  tree.sort((a, b) => a.sort - b.sort)
  tree.forEach(item => {
    if (!item.children || item.children.length === 0) {
      return item.children = undefined
    } else {
      removeEmptyAndSortTree(item.children)
    }
  })
  return tree
}

// 生成懒加载结构跟排序
const sortMenu = (menu: Menu[], menus: Menu[]) => {
  menu.sort((a, b) => a.sort - b.sort )
  menu.map(item => {
    const children = menus.filter(menu => item.id === menu.pid)
    item.isLeaf = children.length > 0 ? false : true
  })
  return menu
}
export default [
  {
    url: '/api/menu/treeMenu',
    method: 'get',
    response: () => {
      return resultSuccess(convertToTree(menus))
    }
  },
  {
    url: '/api/menu',
    method: 'get',
    response: (request: requestParams) => {
      const { pid, title } = request.query
      let resultData = menus
      if (title) {
        resultData = resultData.filter((item: Menu) => item.title.includes(title))
      }
      if (pid !== undefined) {
        resultData = resultData.filter((item: Menu) => item.pid == pid)
      }
      const total = resultData.length
      return resultSuccess(sortMenu(resultData, menus), '获取数据成功', total)
    }
  },
  {
    url: '/api/userMenu',
    method: 'delete',
    response: (request: requestParams) => {
      request.body.map((item: number | string) => {
        const menu = menus.filter(role => role.id != Number(item))
        menus = menu
      })
      return resultSuccess('', '删除数据成功')
    }
  },
  {
    url: '/api/userMenu',
    method: 'put',
    response: (request: requestParams) => {
      const index: number = menus.findIndex(menu => menu.id === Number(request.body.id))
      menus[index] = request.body
      return resultSuccess('', '修改数据成功')
    }
  },
  {
    url: '/api/menu/add',
    method: 'post',
    response: (request: requestParams) => {
      menus.push({ ...request.body, id: menus[menus.length - 1].id + 1 })
      return resultSuccess('', '新增数据成功')
    }
  }
]
