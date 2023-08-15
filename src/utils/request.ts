import axios, { AxiosInstance, AxiosError,AxiosResponse } from 'axios'
import { notification } from './help'
declare module 'axios' {
    interface IAxios {
        total: number,
        code:number
    }
    export interface AxiosResponse extends IAxios {}
}
const service: AxiosInstance = axios.create({
    timeout: 60000,
    baseURL: '/api',
});
// 请求拦截器
service.interceptors.request.use(
    (config) => {
        config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
        return config
    },
    (error: AxiosError) => {
        notification.create({ title: error.code, type: 'error', content: error.message, duration: 1600 })
        return Promise.reject(error)
    }
);
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data
        } else {
            notification.create({ title: response.data.code, type: 'error', content: response.data.message, duration: 600 })
            return Promise.reject()
        }
    },
    (error: AxiosError) => {
        notification.create({ title: error.code, type: 'error', content: error.message, duration: 1600 })
        return Promise.reject(error)
    }
)

export default service
