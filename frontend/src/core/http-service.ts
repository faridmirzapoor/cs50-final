const BASE_URL = 'http://127.0.0.1:8000/'
import axios from "axios"

export const httpService = axios.create({
    baseURL: BASE_URL
})

export const httpInterceptedService = axios.create({
    baseURL: BASE_URL
})

httpInterceptedService.interceptors.request.use(
    async(config) => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers?.set("authorization", `Token ${token}`)
        }
        return config
    },
    (error) => Promise.reject(error)
)