import Http from '@/utils/request'

export const getMenu = () => {
  return Http.get('/treeMenu')
}
