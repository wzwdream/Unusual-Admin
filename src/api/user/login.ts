import Http from '@/utils/request'

export const getCaptcha = () => {
  return Http.get<string>('/captcha')
}
export const login = (params: Record<string, string>) => {
  return Http.post('/api/login', params)
}
export const logout = () => {
  return Http.post('/logout')
}