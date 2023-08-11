import axios, { AxiosInstance, AxiosError } from 'axios'
declare module 'axios' {
    interface IAxios {
        total: number
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
        config.headers['Content-Type'] = 'application/json'
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
);
// 响应拦截器
service.interceptors.response.use(
    (response) => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject()
        }
    }
)

export default service
