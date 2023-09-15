import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
import user from './user'
const mock = [...user]

export function setupProdMockServer() {
  createProdMockServer(mock)
}
