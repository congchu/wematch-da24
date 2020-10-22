import axios from 'axios'
import {bookingApi, ApiResponse} from 'lib/api'
import { PartnerList, PartnerDetail, Review } from 'types/partner'
import {API_MIDDLEWARE_URL} from 'constants/env'

export const getPartnerList = async (page: number, size: number, idx?: string) => {
    const { data } = await bookingApi.request<ApiResponse<PartnerList>>({
        method: 'get',
        url: `/curation?page=${page}&size=${size}&idx=${idx}`
    })

    return data.data
}

export const getPartnerDetail = async (username: string) => {
    const { data } = await bookingApi.request<ApiResponse<PartnerDetail>>({
        method: 'get',
        url: `/partners/${username}`
    })

    return data.data
}

export const getReviewList = async (username:string, page: number, size: number) => {
    const { data } = await bookingApi.request<ApiResponse<Review[]>>({
        method: 'get',
        url: `/reviews/${username}?page=${page}&size=${size}`
    })

    return data.data
}

export const getRecommendedPartnerList = async (idx: string, admin_id: string[]) => {
    const { data } = await bookingApi.request<ApiResponse<any>>({
        method: 'get',
        url: `/cart?idx=${idx}&admin_id=${admin_id}`
    })

    return data
}

export const getMatchingIdx = async (idx:string, partners:string[]) => {
    const body = {idx: idx, partners: partners}
    return await axios.post(`${API_MIDDLEWARE_URL}/match`, body)
}