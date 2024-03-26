import { type Details, getDictDetails } from '@/api/system/dict'

// 根据字典值的name获取字典详情
export const useDict = (params: string[] = []) => {
  const dict = ref<Record<string, Details[]>>()
  if (params.length > 0) {
    params.map(item => {
      if (item) {
        getDictDetails({ name: item }).then(res => {
          dict.value = {
           ...dict.value,
            [item]: res.data
          }
        })
      }
    })
  }

  // 根据字典名称获取字典数据
  const getDict = (name: string) => {
    let retult: Details[] = []
    if (dict.value) {
      retult = dict.value[name]
    }
    return retult
  }
  // 根据字典值获取字典label
  const getDictLabel = (name: string, value: string) => {
    let retult = ''
    if (dict.value) {
      const dict = getDict(name)
      dict.map(item => {
        if (item.value === value) {
          retult = item.label
        }
      })
    }
    return retult
  }
  return {
    dict,
    getDict,
    getDictLabel
  }
}