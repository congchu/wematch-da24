import api, { ApiResponse } from 'lib/api'

type KeywordProp = string[];

export interface PartnerDataProp {
    "id": number;
    "username": string;
    "score": string;
    "manager_name": string;
    "title": string;
    "description": string;
    "keyword": {
        "kind_positive": KeywordProp;
        "professional_positive": KeywordProp;
        "recommendation_positive": KeywordProp;
    };
    "pick_count": number;
    "review_count": number;
    "experience":number;
    "image": string;
}

export const fetchList = async (count: number) => {
    const { data } = await api.request<ApiResponse<PartnerDataProp>>({
        method: 'get',
        url: `/partners/?count=${count}`
    })

    return data.data
}