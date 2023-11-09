import Http from '@/utils/request'
export interface UserList {
  id?: number
  avatar?: string
  userName: string
  name: string,
  iphone: string
  email: string
  password?: string
  sex: 0 | 1 // 0-男 1-女
  status: 0 | 1 // 1-正常 0-禁用
  roles?: number[]
  token?: string
  [key: string]: any
}

export interface Query {
  userName?: string
  email?: string
  iphone?: string
  [key: string]: any
}

export const getUser = () => {
  return Http.get<UserList[]>('/user')
}

export const editUser = (params: UserList) => {
  return Http.put('/user', params)
}

export const delUser = (id: number[]) => {
  return Http.delete('/user', id)
}

export const addUser = (params: UserList) => {
  return Http.post('/user', params)
}