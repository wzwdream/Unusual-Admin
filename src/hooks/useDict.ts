import { type Details, getDictDetails } from '@/api/system/dict'

// 根据字典值的name获取字典详情
export const useDict = (params: string[] = []) => {
  const dict = ref<Record<string, Details[]>>()
  if (params.length > 0) {
    params.map(item => {
      getDictDetails({ name: item }).then(res => {
        dict.value = {
         ...dict.value,
          [item]: res.data
        }
      })
    })
  }
  return {
    dict
  }
}