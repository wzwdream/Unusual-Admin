import axios from 'axios/index';
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

class Request {
    // axios 实例
    instance: AxiosInstance

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
    }
    request(config: AxiosRequestConfig) {
        return this.instance.request(config)
    }
}

export default Request
