import {ApiResponse, middlewareApi} from '../../lib/api'
import {ICompanyDetail, ICompanyReview} from './type'

export const getCompanyDetail = async (idx: string) => {
    const { data } = await middlewareApi.request<ApiResponse<ICompanyDetail>>({
        method: 'get',
        url: `/partners/${idx}`
    })

    return data.data
}

export const getCompReviewList = async (idx:string, page: number, size: number) => {
    const { data } = await middlewareApi.request<ApiResponse<ICompanyReview[]>>({
        method: 'get',
        url: `/reviews/${idx}?page=${page}&size=${size}`
    })

    return data.data
}
