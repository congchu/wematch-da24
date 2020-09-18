import axios from 'axios'
import api, {ApiResponse} from 'lib/api'
import { PartnerList, PartnerDetail, Review } from 'types/partner'
import { API_URL } from 'constants/env'

export const getPartnerList = async (page: number, size: number, idx?: string) => {
    const { data } = await api.request<ApiResponse<PartnerList>>({
        method: 'get',
        url: `/da24/curation?page=${page}&size=${size}&idx=${idx}`
    })

    return data.data
}

export const getPartnerDetail = async (username: string) => {
    const { data } = await api.request<ApiResponse<PartnerDetail>>({
        method: 'get',
        url: `/da24/partners/${username}`
    })

    return data.data
}

export const getReviewList = async (username:string, page: number, size: number) => {
    const { data } = await api.request<ApiResponse<Review[]>>({
        method: 'get',
        url: `/da24/reviews/${username}?page=${page}&size=${size}`
    })

    return data.data
}

export const getRecommendedPartnerList = async (idx: string) => {
    const { data } = await api.request<ApiResponse<any>>({
        method: 'get',
        url: `/da24/cart?idx=${idx}`
    })

    return data
}

export const getMatchingIdx = async (idx:string, partners:string[]) => {
    const body = {idx: idx, partners: partners}
    return await axios.post('https://d3heusccn8.execute-api.ap-northeast-2.amazonaws.com/dev/match', body)
}