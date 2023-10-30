import Http from '@/utils/request'
export interface RoleList {
  id?: number
  roleName: string
  roleSort: number | null
  roleStatus: number
  roleMenu?: string[]
  roleReamark: string
  [key: string]: any
}

export interface RoleQuery {
  roleName?: string
  roleStatus?: number
  [key: string]: any
}

export const getUserRole = () => {
  return Http.get<RoleList[]>('/userRole')
}

export const updateUserRole = (params: RoleList) => {
  return Http.put('/updateRole', params)
}

export const deleteUserRole = (id: number[]) => {
  return Http.delete('/updateRole', id)
}

export const addUserRole = (params: RoleList) => {
  return Http.post('/addRole', params)
}