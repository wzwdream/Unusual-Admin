import { resultSuccess } from '../utils'
export default [
  {
    url: '/api/github',
    method: 'get',
    response: () => {
      return resultSuccess({} , '获取数据成功', 100)
    }
  },
  {
    url: '/api/github/languages',
    method: 'get',
    response: () => {
      return resultSuccess([] , '获取数据成功', 100)
    }
  },
  {
    url: '/api/github/commits',
    method: 'get',
    response: () => {
      return resultSuccess([] , '获取数据成功', 100)
    }
  },
  {
    url: '/api/github/traffic/views',
    method: 'get',
    response: () => {
      return resultSuccess([] , '获取数据成功', 100)
    }
  }
]
