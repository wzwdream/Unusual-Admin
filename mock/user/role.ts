import { RoleList } from '@/api/user/userRole'
import { requestParams, resultSuccess } from '../utils'

interface List extends RoleList {
  id: number
  roleSort: number
  roleMenu: string[]
}
const adminMenu = ['/list', '/list/baseList', '/list/drag', '/email', '/email/email', '/link', '/link/juejing', '/system', '/system/userRole']
const userRole = [
  { id: 1, roleName: '管理员', roleSort: 1, roleStatus: 1, roleMenu: adminMenu, roleReamark: '超级管理员' },
  { id: 2, roleName: '开发', roleSort: 2, roleStatus: 1, roleMenu: adminMenu, roleReamark: '开发工程师' }
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
      return resultSuccess('', '修改数据成功')
    }
  },
  {
    url: '/api/deleteRole',
    method: 'delete',
    response: (request: requestParams) => {
      const index = userRole.findIndex(role => role.id === Number(request.body.id))
      delete userRole[index]
      return resultSuccess('', '删除数据成功')
    }
  },
  {
    url: '/api/addRole',
    method: 'post',
    response: (request: requestParams) => {
      console.log('123', request.body)
      userRole.push(request.body as List)
      return resultSuccess('', '新增数据成功')
    }
  }
]