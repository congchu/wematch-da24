import { middlewareApi } from 'lib/api';
import * as types from './types';
import {api} from 'lib/api'
import axios from 'axios';

export const getUserConsult = async (name:string, phone: string[]) => {
    const query = `?name=${name}&phone1=${phone[0]}&phone2=${phone[1]}&phone3=${phone[2]}`;

    const { data } = await middlewareApi.request({
        method: 'GET',
        url: `/user/orders${query}`
    })

    return data;
}

//TODO: 로그인 개발서버용 api 나올 시 로직 변경.
export const postSignUp = async (formData: types.RequestSignUpProps) => {
    const response = await axios.post(`https://www.devops.wematch.com/auth/signup`, {...formData})
    
    return {token: response.headers['x-wematch-token'], data: response.data.data};
}

export const getSignIn = async (phone: string, code: string) => {
    const response = await axios({
        method: 'get',
        url: `https://www.devops.wematch.com/auth/signin?tel=${phone}&code=${code}`
    })  
    return {token: response.headers['x-wematch-token'], data: response.data.data};
}

export const getUser = async (token: string) => {
    console.log('token: ', token)
    const {data} = await axios({
        method: 'get',
        url: 'https://www.devops.wematch.com/auth/user',
        headers: {
            'x-wematch-token': token
        }
    })

    return data;
}

export const verifySendMessage = async (phone: string) => {
    const { data } = await axios({
        method: 'post',
        url: `https://www.devops.wematch.com/auth/tel`,
        data: {
            tel: phone
        }
    })

    return data
}

export const verifyAuthCode = async (phone: string, code: string) => {
    const { data } = await axios({
        method: 'get',
        url: `https://www.devops.wematch.com/auth/tel?tel=${phone}&code=${code}`,
    })

    return data
}