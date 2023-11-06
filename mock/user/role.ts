import { RoleList } from '@/api/user/userRole'
import { requestParams, resultSuccess } from '../utils'

interface List extends RoleList {
  id: number
  roleSort: number
  roleMenu: string[]
}
const adminRole = ['/tools', '/tools/email', '/link', '/link/juejing', '/system', '/system/userRole', '/component', '/component/baseList', '/component/markdownDemo', '/component/richTextDemo']
const exploitRole = ['/tools', '/tools/email', '/link', '/link/juejing', '/component', '/component/baseList', '/component/markdownDemo', '/component/richTextDemo']
const testRole = ['/component', '/component/baseList', '/component/markdownDemo', '/component/richTextDemo']
let userRole = [
  { id: 1, roleName: '管理员', roleSort: 1, roleStatus: 1, roleMenu: adminRole, roleReamark: '超级管理员' },
  { id: 2, roleName: '开发', roleSort: 2, roleStatus: 1, roleMenu: exploitRole, roleReamark: '开发工程师' },
  { id: 3, roleName: '测试', roleSort: 3, roleStatus: 1, roleMenu: testRole, roleReamark: '测试工程师' },
]

export default [
  {
    url: '/api/userRole',
    method: 'get',
    response: (request: requestParams) => {
      const { page, pageSize } = request.query
      const total = userRole.length
      const resultData = userRole.slice(page - 1, pageSize)
      return resultSuccess(resultData, '获取数据成功', total)
    }
  },
  {
    url: '/api/updateRole',
    method: 'put',
    response: (request: requestParams) => {
      const index: number = userRole.findIndex(role => role.id === Number(request.body.id))
      const role: List  = userRole[index]
      Object.keys(role).map(key => {
        role[key] = request.body[key]
      })
      role.roleMenu = request.body.roleMenu
      return resultSuccess('', '修改数据成功')
    }
  },
  {
    url: '/api/deleteRole',
    method: 'delete',
    response: (request: requestParams) => {
      request.body.map((item: number | string) => {
        const roles = userRole.filter(role => role.id != Number(item))
        userRole = roles
      })
      return resultSuccess('', '删除数据成功')
    }
  },
  {
    url: '/api/addRole',
    method: 'post',
    response: (request: requestParams) => {
      userRole.push({ ...request.body, id: userRole[userRole.length - 1].id + 1 })
      return resultSuccess('', '新增数据成功')
    }
  }
]