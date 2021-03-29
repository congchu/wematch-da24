import {api} from 'lib/api'
import axios from 'axios';
import * as types from './types'
import {API_MIDDLEWARE_URL,API_MESSAGE_URL} from "constants/env";

export const getAddress = async (dong: string) => {
    const { data } = await axios.get(`${API_MIDDLEWARE_URL}/address?district=${dong}`)

    return data
}

export const getMoveIdx = async (formData: types.RequestUserInfoInsert) => {
    return await axios.post(`${API_MIDDLEWARE_URL}/inquiry`, formData)
}


