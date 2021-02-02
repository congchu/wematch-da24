import { middlewareApi } from 'lib/api';
import * as types from './types';
import {api} from 'lib/api'
import axios from 'axios';


//TODO: 쿼리스트링 변경 예정(API 수정)
export const getUserConsult = async (name:string, phone: string[]) => {

    //TODO: API 변경 시 삭제
    const query = `?name=${name}&phone1=${phone[0]}&phone2=${phone[1]}&phone3=${phone[2]}`;

    const { data } = await middlewareApi.request({
        method: 'GET',
        url: `/user/orders${query}`
    })

    return data;
}

//TODO: 로그인 개발서버용 api 나올 시 로직 변경.
export const postSignUp = async (formData: types.RequestSignUpProps) => {
    // const response =  await api.request<types.RequestSignUpProps>({
    //     method: 'post',
    //     url: '/auth/users',
    //     data: {...formData}
    // })
    const response = await axios.post(`/auth/users`, {...formData})

    return response.headers['X-Wematch-Token'];
}

export const getUser = async (token: string) => {
    const {data} = await api.request<types.RequestSignInProps>({
        method: 'get',
        url: '/auth/user',
        headers: {
            'X-Wematch-Token': token
        }
    })

    return data;
}
