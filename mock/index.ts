import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import user from './user/index'
import Role from './user/index'
import Menu from './menu/index'
import List from './list/index'
const mock = [...user, ...Role, ...Menu, ...List]

export const setupProdMockServer = () => {
  createProdMockServer(mock)
}
