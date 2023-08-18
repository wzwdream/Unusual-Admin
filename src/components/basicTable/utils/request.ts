import service from '@/utils/request'
import qs from 'qs'

export const getData = (url: string, params: Record<string, any>) => {
  return service({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get'
  })
}