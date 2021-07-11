import { api, ApiResponse } from 'lib/api'
import { RequestCleanAuthMatchData } from './types'

export const submitClean = async (form: RequestCleanAuthMatchData) => {
  const { data } = await api.request<ApiResponse<RequestCleanAuthMatchData>>({
    method: 'post',
    url: '/clean/auto-match',
    data: form
  })

  return data.data
}
