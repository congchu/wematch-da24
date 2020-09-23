import api from 'lib/api'
import axios from 'axios';
import * as types from './types'

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
            'send_phone': 'INTERIOR',
            'dest_phone': `${phone}`
        }
    })

    return data
}

export const verifyAuthCode = async (phone: string, code: string) => {
    const { data } = await api.request<types.RequestVerifyAuthCodeProps>({
        method: 'get',
        // url: `/msg/auth?dest_phone=${phone}&code=${code}`
        url: `/msg/auth?dest_phone=${phone}&code=${code}`
    })

    return data
}

export const getMoveIdx = async (formData: types.RequestUserInfoInsert) => {
    return await axios.post('https://d3heusccn8.execute-api.ap-northeast-2.amazonaws.com/dev/inquiry', formData)
}