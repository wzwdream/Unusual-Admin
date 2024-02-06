import http from '@/utils/request'
import type { Languages, Info, Commit, Views } from './type'

// 获取仓库信息
export const getInfo = () => {
  return http.get<Info>('/github')
}
// 获取技术栈（开发语言占比分布）
export const getLanguages = () => {
  return http.get<Languages>('/github/languages')
}
// 获取提交记录
export const getCommits = (page: number = 1, pageSize: number = 20) => {
  return http.get<Commit[]>(`/github/commits?page=${page}&per_page=${pageSize}`)
}
// 获取访问数(默认返回近14天的数据)
export const getViews = () => {
  return http.get<Views>('/github/traffic/views')
}
// // 获取star数
// export const getStargazers = () => {
//   return http.get('/github/stargazers')
// }
// // 获取fork数
// export const getForks = () => {
//   return http.get('/github/forks')
// }