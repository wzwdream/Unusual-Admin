import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { notification } from './help'
import { Result, ResultData } from '@/type/request'
import { useUserStore } from '@/store/user'
import router from '@/router/index'

const service: AxiosInstance = axios.create({
  timeout: 60000,
  baseURL: '/api',
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers['Authorization'] = 'Bearer ' + userStore.token
    }
    return config
  },
  (error: AxiosError<Result>) => {
    notification.error({ title: error.code, content: error.message, duration: 1600 })
    return Promise.reject(error)
  }
)
// 响应拦截器
service.interceptors.response.use(
  // AxiosResponse
  (response: AxiosResponse) => {
    if (response.status === 200) {
      const { data } = response
      if (data.code && data.code !== 200){
        notification.error({ title: data.code.toString(), content: data.message, duration: 1600 })
        if (data.code === 401) router.replace('/login')
        return Promise.reject(data)
      }
      return data
    } else {
      notification.error({ title: response.data.code, content: response.data.message, duration: 1600 })
      return Promise.reject()
    }
  },
  (error: AxiosError<Result>) => {
    let title = error.code
    let content = error.message
    if (error.response?.data) {
      title = error.response.data.code as string
      content = error.response.data.message
    }
    notification.error({ title: title, content: content, duration: 1600 })
    return Promise.reject(error)
  }
)

/* 导出封装的请求方法 */
const http = {
  get<T = any>(url: string, params?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return service.get(url, { params, ...config })
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<ResultData<T>> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, data?: object, config?: AxiosRequestConfig,): Promise<ResultData<T>> {
    return service.delete(url, { data, ...config })
  }
}

export default http
