import { api, ApiResponse } from 'lib/api'
import { RequestCleanAuthMatchData } from './types'

export const submitClean = async (form: RequestCleanAuthMatchData, token: string) => {
  const { data } = await api.request<ApiResponse<RequestCleanAuthMatchData>>({
    method: 'post',
    url: '/clean/auto-match',
    data: form,
    headers: {
      'x-wematch-token': token
    }
  })

  return data.data
}
