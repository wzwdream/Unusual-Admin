import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import user from './user'
// import list from './list'
const mock = [...user]

export const setupProdMockServer = () => {
  createProdMockServer(mock)
}
