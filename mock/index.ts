import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import user from './user/index'
import Role from './system/role'
import Menu from './system/menu'
import List from './list/index'
const mock = [...user, ...Role, ...Menu, ...List]

export const setupProdMockServer = () => {
  createProdMockServer(mock)
}
