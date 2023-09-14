import Http from '@/utils/request'

export const getData = (url: string, params: Record<string, any>) => {
  return Http.get(url, params)
}