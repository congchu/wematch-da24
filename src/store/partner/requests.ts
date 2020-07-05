import api, {ApiResponse} from 'lib/api'
import { PartnerList, PartnerDetail, Review } from 'types/partner'

export const getPartnerList = async (page: number, size: number) => {
    const { data } = await api.request<ApiResponse<PartnerList[]>>({
        method: 'get',
        url: `/partners/?page=${page}&size=${size}`
    })

    return data.data
}

export const getPartnerDetail = async (username: string) => {
    const { data } = await api.request<ApiResponse<PartnerDetail>>({
        method: 'get',
        url: `/partners/${username}`
    })

    return data.data
}

export const getReviewList = async (username:string, page: number, size: number) => {
    const { data } = await api.request<ApiResponse<Review[]>>({
        method: 'get',
        url: `/reviews/${username}?page=${page}&size=${size}`
    })

    return data.data
}
