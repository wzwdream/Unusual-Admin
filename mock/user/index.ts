import { resultError, resultSuccess, getRequestToken, requestParams } from '../utils'
import { userInfo, captcha } from './userInfo'
import { decrypt } from '@/utils/aes'
export default [
  // 用户登录
  {
    url: '/api/api/login',
    method: 'post',
    response: ({ body }: requestParams) => {
      const { userName, userPassword } = body
      const checkUser = userInfo.find(
        (item) => item.userName === userName && item.userPassword === decrypt(userPassword),
      )
      if (!checkUser) {
        return resultError('用户名或密码错误！')
      }
      const { token } = checkUser
      return resultSuccess({
        token,
        checkUser
      })
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)

      const checkUser = userInfo.find((item) => item.token === token)
      if (!checkUser) {
        return resultError(
          'The corresponding user information was not obtained!',
        )
      }
      return resultSuccess(checkUser)
    }
  },
  {
    url: '/api/logout',
    method: 'post',
    response: () => {
      return resultSuccess('')
    }
  },
  {
    url: '/api/captcha',
    method: 'get',
    response: () => {
      return resultSuccess(captcha, '获取验证码成功')
    }
  }
]