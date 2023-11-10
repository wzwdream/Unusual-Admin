import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import user from './user/index'
import Role from './system/role'
import Menu from './system/menu'
import List from './list/index'
import userManage from './user/userInfo'
import dict from './system/dict'
const mock = [...user, ...Role, ...Menu, ...List, ...userManage, ...dict]

export const setupProdMockServer = () => {
  createProdMockServer(mock)
}
