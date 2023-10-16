import { gitHttp } from '@/utils/request'
import type { Languages, Info, Commit, Views } from './type'

// 获取仓库信息
export const getInfo = () => {
  return gitHttp.get<Info>('/widgets-for-windows')
}
// 获取技术栈（开发语言占比分布）
export const getLanguages = () => {
  return gitHttp.get<Languages>('/widgets-for-windows/languages')
}
// 获取提交记录
export const getCommits = (page: number = 1, pageSize: number = 20) => {
  return gitHttp.get<Commit[]>(`/widgets-for-windows/commits?page=${page}&per_page=${pageSize}`)
}
// 获取访问数(默认返回近14天的数据)
export const getViews = () => {
  return gitHttp.get<Views>('/widgets-for-windows/traffic/views')
}
// // 获取star数
// export const getStargazers = () => {
//   return gitHttp.get('/widgets-for-windows/stargazers')
// }
// // 获取fork数
// export const getForks = () => {
//   return gitHttp.get('/widgets-for-windows/forks')
// }