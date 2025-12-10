import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getDictDetails, type Details } from '@/api/system/dict'

export const useDictStore = defineStore('dict', () => {
    // 存储字典数据，键为字典名称，值为字典详情数组
    const dictData = ref<Record<string, Details[]>>({})
    // 存储字典版本信息，键为字典名称，值为版本号
    const dictVersions = ref<string>('')

    /**
     * 更新字典版本信息
     * @param version 新的字典版本号
     */
    const updateDictVersion = (version: string) => {
        dictVersions.value = version
    }

    /**
     * 获取字典版本
     * @returns 字典版本号
     */
    const getDictVersion = () => {
        return dictVersions.value || ''
    }

    /**
     * 加载字典数据
     * @param dictNames 字典名称数组
     * @returns 加载的字典数据对象
     */
    const getDicts = async (dictNames: string[]) => {
        try {
            if (!Array.isArray(dictNames)) {
                return {};
            }
            // 过滤并去重有效字典名称
            const uniqueNames = [...new Set(dictNames.filter(name => 
                typeof name === 'string' && name.trim()
            ))];
            
            if (uniqueNames.length === 0) {
                return {};
            }

            const result: Record<string, Details[]> = {};
            const unloadedDicts: string[] = [];

            // 分离已加载和未加载的字典
            dictNames.forEach(name => {
                if (dictData.value[name]) {
                    result[name] = dictData.value[name];
                } else {
                    unloadedDicts.push(name);
                }
            });

            // 如果有未加载的字典，从接口请求获取
            if (unloadedDicts.length > 0) {
                const { data } = await getDictDetails(unloadedDicts);

                // 合并新加载的数据到结果
                Object.assign(result, data);

                // 更新全局字典缓存
                Object.assign(dictData.value, data);
            }

            return result;
        } catch (error) {
            console.error('加载字典数据失败:', error);
            return {};
        }
    };

    /**
     * 根据字典名称获取字典数据
     * @param name 字典名称
     * @returns 字典详情数组
     */
    const getDict = (name: string) => {
        return dictData.value[name] || []
    }

    /**
     * 根据字典名称和值获取字典标签
     * @param name 字典名称
     * @param value 字典值
     * @returns 字典标签
     */
    const getDictLabel = (name: string, value: string) => {
        const dict = getDict(name)
        const item = dict.find(item => item.value === value)
        return item?.label || ''
    }

    /**
     * 根据字典名称和标签获取字典值
     * @param name 字典名称
     * @param label 字典标签
     * @returns 字典值
     */
    const getDictValue = (name: string, label: string) => {
        const dict = getDict(name)
        const item = dict.find(item => item.label === label)
        return item?.value || ''
    }

    /**
     * 清除指定字典数据
     * @param names 字典名称
     */
    const clearDicts = (names: string[]) => {
        names.forEach(name => {
            clearDict(name)
        })
    }


    /**
     * 清除指定字典数据
     * @param name 字典名称
     */
    const clearDict = (name: string) => {
        delete dictData.value[name]
    }

    /**
     * 清除所有字典数据
     */
    const clearAllDict = () => {
        dictData.value = {}
    }

    return {
        dictData,
        updateDictVersion,
        getDictVersion,
        getDict,
        getDicts,
        getDictLabel,
        getDictValue,
        clearDict,
        clearDicts,
        clearAllDict
    }
})
