import api, { ApiResponse } from 'lib/api'

export interface PartnerDataProp {
    "id": number,
    "username": string,
    "level": string,
    "title": string,
    "description": string,
    "keyword": {
        "kind_positive": string[],
        "professional_positive": string[],
        "recommendation_positive": string[]
    },
    "pick_count": number,
    "review_count": number,
    "experience": number,
    "image": string,
    "is_full": boolean
}

export const fetchList = async (page: number, size: number) => {
    const { data } = await api.request<ApiResponse<PartnerDataProp>>({
        method: 'get',
        url: `/partners/?page=${page}&size=${size}`
    })

    return data.data
}