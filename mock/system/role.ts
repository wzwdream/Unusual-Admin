import { RoleList } from '@/api/user/role'
import { requestParams, resultSuccess } from '../utils'

interface List extends RoleList {
  id: number
  sort: number
  roleMenu: string[]
}
const adminRole = ['/tools', '/tools/email', '/link', '/link/juejing', '/system', '/system/role', '/system/user', '/system/userMenu', '/system/dict', '/component', '/component/baseList', '/component/markdownDemo', '/component/richTextDemo', '/component/draggableDrid']
const exploitRole = ['/tools', '/tools/email', '/link', '/link/juejing', '/component', '/component/baseList', '/component/markdownDemo', '/component/richTextDemo']
const testRole = ['/component', '/component/baseList', '/component/markdownDemo', '/component/richTextDemo']
let role = [
  { id: 1, name: '管理员', sort: 1, status: 1, roleMenu: adminRole, remark: '超级管理员' },
  { id: 2, name: '开发', sort: 2, status: 1, roleMenu: exploitRole, remark: '开发工程师' },
  { id: 3, name: '测试', sort: 3, status: 1, roleMenu: testRole, remark: '测试工程师' },
]

export default [
  {
    url: '/api/role',
    method: 'get',
    response: (request: requestParams) => {
      const { page, pageSize } = request.query
      let resultData = role
      if (page && pageSize) {
        resultData = resultData.slice((page - 1) * pageSize, page * pageSize)
      }
      const total = role.length
      return resultSuccess(resultData, '获取数据成功', total)
    }
  },
  {
    url: '/api/role',
    method: 'put',
    response: (request: requestParams) => {
      const index: number = role.findIndex(role => role.id === Number(request.body.id))
      const tempRole: List  = role[index]
      Object.keys(role).map(key => {
        tempRole[key] = request.body[key]
      })
      tempRole.roleMenu = request.body.roleMenu
      return resultSuccess('', '修改数据成功')
    }
  },
  {
    url: '/api/role',
    method: 'delete',
    response: (request: requestParams) => {
      request.body.map((item: number | string) => {
        const roles = role.filter(role => role.id != Number(item))
        role = roles
      })
      return resultSuccess('', '删除数据成功')
    }
  },
  {
    url: '/api/role',
    method: 'post',
    response: (request: requestParams) => {
      role.push({ ...request.body, id: role[role.length - 1].id + 1 })
      return resultSuccess('', '新增数据成功')
    }
  }
]