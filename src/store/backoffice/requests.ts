import axios from 'axios'
import {api, ApiResponse, middlewareApi} from 'lib/api'
import {INotice} from 'types/backoffice'
import {ContactFormData} from 'types/backoffice'

export const getNoticeList = async (page: number, size: number) => {
    const { data } = await api.request<ApiResponse<INotice[]>>({
        method: 'get',
        url: `/backoffice/api/notices?size=${size}&page=${page}&type=NOTICE`

    })

    return data.data
}

export const submitContactForm = async (form: ContactFormData) => {
    const { data } = await api.request<ApiResponse<ContactFormData>>({
        method: 'post',
        url: `/backoffice/api/contacts`,
        data: form
    })

    return data.data
}
