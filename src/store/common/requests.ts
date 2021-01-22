import {api} from 'lib/api'
import axios from 'axios';
import * as types from './types'
import {API_MIDDLEWARE_URL,API_MESSAGE_URL} from "constants/env";

export const getAddress = async (dong: string) => {
    const { data } = await api.request<types.RequestAddressProps[]>({
        method: 'get',
        url: `/async/address?district=${dong}`
    })

    return data
}

export const verifySendMessage = async (phone: string) => {
    const { data } = await api.request<types.RequestVerifySendMessageProps>({
        method: 'post',
        url: `/msg/auth`,
        data: {
            'send_phone': 'DA24_CUSTOMER',
            'dest_phone': `${phone}`
        }
    })

    return data
}

export const verifyAuthCode = async (phone: string, code: string) => {
    const { data } = await api.request<types.RequestVerifyAuthCodeProps>({
        method: 'get',
        url: `${API_MESSAGE_URL}?dest_phone=${phone}&code=${code}`
    })

    return data
}

export const getMoveIdx = async (formData: types.RequestUserInfoInsert) => {
    return await axios.post(`${API_MIDDLEWARE_URL}/inquiry`, formData)
}
