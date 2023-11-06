import { type TreeMenu } from '@/type/menu'
import Http from '@/utils/request'

export const getTreeMenu = () => {
  return Http.get<TreeMenu[]>('/treeMenu')
}
