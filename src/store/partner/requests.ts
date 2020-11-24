import axios from 'axios'
import {bookingApi, ApiResponse} from 'lib/api'
import { IPartnerList, IPartnerDetail, IReview, IRecommendedList } from 'types/partner'
import {API_MIDDLEWARE_URL} from 'constants/env'

export const getPartnerList = async (page: number, size: number, idx?: string) => {
    const { data } = await bookingApi.request<ApiResponse<IPartnerList>>({
        method: 'get',
        url: `/curation?page=${page}&size=${size}&idx=${idx}`
    })

    return data.data
}

export const getPartnerDetail = async (username: string, idx: string) => {
    const { data } = await bookingApi.request<ApiResponse<IPartnerDetail>>({
        method: 'get',
        url: `/partners/${username}?idx=${idx}`
    })

    return data.data
}

export const getReviewList = async (username:string, page: number, size: number) => {
    const { data } = await bookingApi.request<ApiResponse<IReview[]>>({
        method: 'get',
        url: `/reviews/${username}?page=${page}&size=${size}`
    })

    return data.data
}

export const getRecommendedPartnerList = async (idx: string, admin_id: string[]) => {
    const { data } = await bookingApi.request<ApiResponse<IRecommendedList[]>>({
        method: 'get',
        url: `/cart?idx=${idx}&admin_id=${admin_id}`
    })

    return data
}

export const getMatchingIdx = async (idx:string, partners:string[]) => {
    const body = {idx: idx, partners: partners}
    return await axios.post(`${API_MIDDLEWARE_URL}/match`, body)
}