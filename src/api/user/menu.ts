import { type TreeMenu } from '@/type/menu'
import Http from '@/utils/request'

export const getTreeMenu = () => {
  return Http.get<TreeMenu[]>('/menu/treeMenu')
}
export const getUserMenu = (params?: Record<string, any>) => {
  return Http.get<TreeMenu[]>('/userMenu', params)
}
export const delUserMenu = (params?: Record<string, any>) => {
  return Http.delete<TreeMenu[]>('/userMenu', params)
}
export const addUserMenu = (params?: Record<string, any>) => {
  return Http.post<TreeMenu[]>('/menu/add', params)
}
export const editUserMenu = (params?: Record<string, any>) => {
  return Http.put<TreeMenu[]>('/userMenu', params)
}