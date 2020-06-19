import axios, { AxiosError } from 'axios'
import { API_URL} from '../constants/env'

export interface ApiResponse<T> {
    data: T;
    err: number;
    msg: string;
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

const api = axios.create({
    baseURL: API_URL
})

api.interceptors.response.use((response) => {
    return response
}, (error: AxiosError) => {
    throw new ApiError(500, 'SERVER ERROR')
})

export default api