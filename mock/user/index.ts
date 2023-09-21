import { resultError, resultSuccess, getRequestToken, decrypt, requestParams } from '../utils'
import { userInfo } from './userInfo'
export default [
  // 用户登录
  {
    url: '/api/api/login',
    method: 'post',
    response: ({ body }: requestParams) => {
      console.log('123')
      const { userName, userPassword } = body
      const  pwd = decrypt(userPassword)
      const checkUser = userInfo.find(
        (item) => item.userName === userName && item.userPassword === pwd,
      )
      if (!checkUser) {
        return resultError('用户名或密码错误！')
      }
      const { token } = checkUser
      return resultSuccess({
        token,
      })
    },
  },
  // 获取用户信息
  {
    url: '/api/user/info',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request)
      console.log(token)

      const checkUser = userInfo.find((item) => item.token === token)
      if (!checkUser) {
        return resultError(
          'The corresponding user information was not obtained!',
        )
      }
      return resultSuccess(checkUser)
    }
  }
]