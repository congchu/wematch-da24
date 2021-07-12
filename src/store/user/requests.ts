import { bookingApi, middlewareApi } from 'lib/api'
import * as types from './types'
import { api } from 'lib/api'
import axios from 'axios'
import { API_URL } from 'constants/env'

export const getUserConsult = async (name: string, phone: string[], token: string) => {
  const query = `?name=${name}&phone1=${phone[0]}&phone2=${phone[1]}&phone3=${phone[2]}`

  const { data } = await bookingApi.request({
    method: 'GET',
    url: `/user/orders${query}`,
    headers: {
      'x-wematch-token': token
    }
  })

  return data
}

//TODO: 로그인 개발서버용 api 나올 시 로직 변경.
export const postSignUp = async (formData: types.RequestSignUpProps) => {
  const response = await axios.post(`${API_URL}/auth/signup`, { ...formData })

  return { token: response.headers['x-wematch-token'], data: response.data.data }
}

export const getSignIn = async (phone: string, code: string) => {
  const response = await axios({
    method: 'get',
    url: `${API_URL}/auth/signin?tel=${phone}&code=${code}`
  })
  return { token: response.headers['x-wematch-token'], data: response.data.data }
}

export const getUser = async (token: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/auth/user`,
    headers: {
      'x-wematch-token': token
    }
  })

  return data
}

export const verifySendMessage = async (phone: string) => {
  const { data } = await axios({
    method: 'post',
    url: `${API_URL}/auth/tel`,
    data: {
      tel: phone
    }
  })

  return data
}

export const verifyAuthCode = async (phone: string, code: string) => {
  const { data } = await axios({
    method: 'get',
    url: `${API_URL}/auth/tel?tel=${phone}&code=${code}`
  })

  return data
}
