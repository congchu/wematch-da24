import axios, { AxiosError } from 'axios'
import {API_BOOKING_URL, API_MIDDLEWARE_URL, API_URL} from 'constants/env'

export interface ApiResponse<T> {
    data: T;
    err: number;
    msg?: string;
    result?: 'success' | 'failure'
}

export class ApiError extends Error {
    code: number
    msg: string
    constructor(code: number, msg?: string) {
        super()
        this.code = code
        this.msg = msg || ''
    }
}
export const api = axios.create({
    baseURL: API_URL
})

export const bookingApi = axios.create({
    baseURL: API_BOOKING_URL
})

export const middlewareApi = axios.create({
    baseURL: API_MIDDLEWARE_URL
})
api.interceptors.response.use((response) => {
    return response
}, (error: AxiosError) => {
    if (error.response?.data.result === 'failure') {
        //TODO: 예외처리 추가해야함
    }
})

export default {bookingApi, api, middlewareApi}
