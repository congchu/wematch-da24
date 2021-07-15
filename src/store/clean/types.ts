import { IPartnerDetail, Level } from 'types/partner'

export interface RequestCleanAuthMatchData {
  clean_date: string
  clean_type: string
  house_type: string
  pyeong: number
  sido: string
  gugun: string
  dong: string
  detail_addr: string
  name: string
  phone1: string
  phone2: string
  phone3: string
  mkt_agree: boolean
  agent_id: string | string[] | null
  clean_option?: string[]
  memo?: string
}

export interface ResponseCleanAutoMatch {
  type: string
  result: string
  match_list: IPartnerDetail[]
  inquiry_idx: string
}
