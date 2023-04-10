import { InjectionKey } from 'vue'
import { ProvideData } from '../types/index'
export const key = Symbol() as InjectionKey<ProvideData> // 标注类型。