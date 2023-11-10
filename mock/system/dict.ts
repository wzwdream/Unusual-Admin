import type { DictList, Details } from '@/api/system/dict'
import { requestParams, resultSuccess } from '../utils'


let dict: DictList[] = [
  { id: 1, name: 'status', description: '启用状态' }
]
let dictDetails: Details[] = [
  { id: 1, pid: 1, label: '启用', value: '1', dictSort: 1, createTime: '2021-01-01 12:00:00' },
  { id: 2, pid: 1, label: '禁用', value: '0', dictSort: 2, createTime: '2021-01-01 12:00:00' }
]

export default [
  {
    url: '/api/dict',
    method: 'get',
    response: (request: requestParams) => {
      const { page, pageSize, name } = request.query
      let resultData = dict
      if (name) {
        resultData = resultData.filter(dict => dict.name.includes(name) || dict.description?.includes(name))
      }
      if (page && pageSize) {
        resultData = resultData.slice((page - 1) * pageSize, page * pageSize)
      }
      resultData.map(item => {
        item.dictDetails = dictDetails.filter(dict => dict.pid === item.id)
      })
      const total = dict.length
      return resultSuccess(resultData, '获取数据成功', total)
    }
  },
  {
    url: '/api/dict/details',
    method: 'get',
    response: (request: requestParams) => {
      const { name } = request.query
      let resultData: Details[] = []
      if ((name ?? '') !== '') {
        dict.filter(dict => dict.name === name).map(item => {
          resultData = dictDetails.filter(dict => dict.pid === item.id)
        })
      }
      return resultSuccess(resultData, '获取数据成功')
    }
  },
  {
    url: '/api/dict',
    method: 'put',
    response: (request: requestParams) => {
      const index: number = dict.findIndex(dict => dict.id === Number(request.body.id))
      dict[index] = request.body
      return resultSuccess('', '修改数据成功')
    }
  },
  {
    url: '/api/dict',
    method: 'delete',
    response: (request: requestParams) => {
      request.body.map((item: number | string) => {
        const temp = dict.filter(dict => dict.id != Number(item))
        dict = temp
      })
      return resultSuccess('', '删除数据成功')
    }
  },
  {
    url: '/api/dict',
    method: 'post',
    response: (request: requestParams) => {
      const id = dict[dict.length - 1].id || 0
      dict.push({ ...request.body, id: id + 1 })
      return resultSuccess('', '新增数据成功')
    }
  },
  {
    url: '/api/dictDetails',
    method: 'get',
    response: (request: requestParams) => {
      const { pid } = request.query
      const resultData = dictDetails.filter(item => item.pid === Number(pid))
      return resultSuccess(resultData, '获取数据成功', resultData.length)
    }
  },
  {
    url: '/api/dictDetails',
    method: 'put',
    response: (request: requestParams) => {
      const index: number = dictDetails.findIndex(dict => dict.id === Number(request.body.id))
      dictDetails[index] = request.body
      return resultSuccess('', '修改数据成功')
    }
  },
  {
    url: '/api/dictDetails',
    method: 'delete',
    response: (request: requestParams) => {
      request.body.map((item: number | string) => {
        const dictDetail = dictDetails.filter(dict => dict.pid != Number(item))
        dictDetails = dictDetail
      })
      return resultSuccess('', '删除数据成功')
    }
  },
  {
    url: '/api/dictDetails',
    method: 'post',
    response: (request: requestParams) => {
      const id = dictDetails[dictDetails.length - 1].id || 0
      dictDetails.push({ ...request.body, id: id + 1 })
      return resultSuccess('', '新增数据成功')
    }
  }
]