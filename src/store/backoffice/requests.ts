import axios from 'axios'
import {api, ApiResponse} from 'lib/api'
import {INotice} from 'types/notice'

export const getNoticeList = async (page: number, size: number) => {

    const { data } = await api.request<ApiResponse<INotice[]>>({
        method: 'get',
        url: `/backoffice/api/notices?size=${size}&page=${page}&type=NOTICE`

    })

    return data.data
}
