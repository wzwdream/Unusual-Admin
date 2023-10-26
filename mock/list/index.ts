import { resultSuccess, requestParams } from '../utils'
import Mock from 'mockjs'
export default [
  // 用户登录
  {
    url: '/api/list/test',
    method: 'get',
    response: ({ query }: requestParams) => {
      const { page, pageSize, age } = query
      const size = 'list|' + pageSize
      const userAge = age ? 'age|' + age : 'age|18-60'
      const template = {
        [size]: [
          {
            'id|+1': (page - 1) * pageSize + 1,
            'name': '@cname',
            [userAge]: 0
          }
        ]
      };

      const userList = Mock.mock(template)
      return resultSuccess(userList.list , '获取数据成功', 100)
    }
  }
]