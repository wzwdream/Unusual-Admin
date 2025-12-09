import { type Details } from '@/api/system/dict'
import { useDictStore } from '@/store/dict'

// 根据字典值的name获取字典详情
export const useDict = (params: string[] = []) => {

  const dict = ref<Record<string, Details[]>>()
  const dictStore = useDictStore()

  const getDicts = async () => {
    dict.value = await dictStore.getDicts(params)
  }

  // 初始化字典数据
  getDicts()

  // 根据字典名称获取字典数据
  const getDict = (name: string) => {
    return dictStore.getDict(name)
  }

  // 根据字典值获取字典label
  const getDictLabel = (name: string, value: string) => {
    return dictStore.getDictLabel(name, value)
  }

  return {
    dict,
    getDict,
    getDictLabel
  }
}