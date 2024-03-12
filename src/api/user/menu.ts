import { type TreeMenu } from '@/type/menu'
import Http from '@/utils/request'

export const getTreeMenu = () => {
  return Http.get<TreeMenu[]>('/menu/treeMenu')
}
export const getUserMenu = (params?: Record<string, any>) => {
  return Http.get<TreeMenu[]>('/menu', params)
}
export const delUserMenu = (id: number) => {
  return Http.delete<TreeMenu[]>('/userMenu/' + id)
}
export const addUserMenu = (params?: Record<string, any>) => {
  return Http.post<TreeMenu[]>('/menu/add', params)
}
export const editUserMenu = (params?: Record<string, any>) => {
  return Http.put<TreeMenu[]>('/userMenu', params)
}