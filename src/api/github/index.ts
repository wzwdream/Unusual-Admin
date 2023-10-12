import { gitHttp } from '@/utils/request'

// 获取技术栈（开发语言占比分布）
export const getLanguages = () => {
  return gitHttp.get('/languages')
}
// 获取star数
export const getStargazers = () => {
  return gitHttp.get('/stargazers')
}
// 获取fork数
export const getForks = () => {
  return gitHttp.get('/forks')
}
// 获取提交记录
export const getCommits = (page: number = 1, pageSize: number = 20) => {
  return gitHttp.get(`/commits?page=${page}&per_page=${pageSize}`)
}