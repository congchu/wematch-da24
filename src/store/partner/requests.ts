import api, {ApiResponse} from 'lib/api'
import { PartnerList, PartnerDetail, Review } from 'types/partner'
import { API_URL } from 'constants/env'

export const getPartnerList = async (page: number, size: number) => {
    const { data } = await api.request<ApiResponse<PartnerList[]>>({
        method: 'get',
        url: `/da24/partners/?page=${page}&size=${size}`
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
