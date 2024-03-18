import { ListData } from '@/components/basic/useBasicList/utils/type'
import Http from '@/utils/request'
export interface RoleList {
  id?: number
  name: string
  sort: number | null
  status: number
  roleMenu?: string[]
  remark: string
  [key: string]: any
}

export interface RoleQuery {
  name?: string
  status: number | null
  [key: string]: any
}

export const getUserRole = () => {
  return Http.get<ListData<RoleList[]>>('/role')
}

export const updateUserRole = (params: RoleList) => {
  return Http.put('/role', params)
}

export const deleteUserRole = (id: number) => {
  return Http.delete('/role/' + id)
}

export const addUserRole = (params: RoleList) => {
  return Http.post('/role', params)
}

export const getRoleMenuIds = (roleId: number) => {
  return Http.get('/role/menu/' + roleId)
}

export const saveRoleMenu = (roleId: number, menuIds: number[]) => {
  return Http.put('/role/menu/' + roleId, menuIds)
}