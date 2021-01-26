import {ApiResponse, bookingApi} from 'lib/api'
import {ICompanyDetail, ICompanyReview} from './type'

export const getCompanyDetail = async (username: string) => {
    const { data } = await bookingApi.request<ApiResponse<ICompanyDetail>>({
        method: 'get',
        url: `/partners/${username}`
    })

    return data.data
}

export const getCompReviewList = async (username:string, page: number, size: number) => {
    const { data } = await bookingApi.request<ApiResponse<ICompanyReview[]>>({
        method: 'get',
        url: `/reviews/${username}?page=${page}&size=${size}`
    })

    return data.data
}
