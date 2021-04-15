import {api} from 'lib/api'
import axios from 'axios';
import * as types from './types'
import { API_MIDDLEWARE_URL, API_BOOKING_URL } from "constants/env";

export const getMoveIdx = async (formData: types.RequestUserInfoInsert) => {
    return await axios.post(`${API_MIDDLEWARE_URL}/inquiry`, formData)
}

export const getCompletedMoveIdx = async (inquiry_idx: string) => {
    const { data } = await api.get(`/da24-dev/user/orders/${inquiry_idx}`, {
        paramsSerializer: function(params) {
          const result = '';
          return result;
        }
      })

    return data;
}

export const getAddress = async (query: types.RequestAddressProps) => {
    const { data } = await api.request<types.RequestAddressProps>({
        method: 'get',
        url: `${API_BOOKING_URL}/addresses?keyword=${query.keyword}&currPage=${query.currPage}&cntPerPage=${query.cntPerPage}`
    });

    return data
}

export const getDistance = async(query: types.RequestDistanceType) => {
    const { data } = await api.request<types.RequestDistanceType>({
        method: 'get',
        url: `${API_BOOKING_URL}/addresses/distance?startZone=${query.startZone}&startRoad=${query.startRoad}&startIsGf=${query.startIsGf}&startMainBd=${query.startMainBd}&startSubBd=${query.startSubBd}&endZone=${query.endZone}&endRoad=${query.endRoad}&endIsGf=${query.endIsGf}&endMainBd=${query.endMainBd}&endSubBd=${query.endSubBd}`
    })
    return data
}
