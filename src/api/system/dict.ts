import Http from '@/utils/request'
export interface Details {
  id?: number
  pid?: number
  label: string
  value: string
  dictSort: number
  createTime?: string
  [key: string]: any
}
export interface DictList {
  id?: number
  name: string
  description?: string
  dictDetails?: Details[]
  [key: string]: any
}

export interface DictQuery {
  name?: string
  id?: number
  [key: string]: any
}

export interface DictDetailQuery {
  pid?: number
  [key: string]: any
}

export const getDict = (params: DictQuery) => {
  return Http.get<DictList[]>('/dict', params)
}

export const editDict = (params: DictList) => {
  return Http.put('/dict', params)
}

export const delDict = (id: number[]) => {
  return Http.delete('/dict', id)
}

export const addDict = (params: DictList) => {
  return Http.post('/dict/details', params)
}

export const getDictDetails = (params: DictQuery) => {
  return Http.get<Details[]>('/dict/details', params)
}

export const editDictDetails = (params: Details) => {
  return Http.put('/dictDetails', params)
}

export const delDictDetails = (id: number[]) => {
  return Http.delete('/dictDetails', id)
}

export const addDictDetails = (params: Details) => {
  return Http.post('/dictDetails', params)
}