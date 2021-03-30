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


export const getCompletedMoveIdx = async (inquiry_idx: string) => {
    return await api.get(`/da24-dev/user/orders/${inquiry_idx}`, {
        paramsSerializer: function(params) {
          var result = '';
          return result;
        }
      })
}