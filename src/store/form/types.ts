import { IPartnerDetail, Level } from 'types/partner'

export interface SubmittedForm {
  result: ESubmittedFormResult
  match_list: IPartnerDetail[]
  inquiry_idx: string
}

export enum ESubmittedFormResult {
  Success = 'success',
  NoPartner = 'no partner',
  NoService = 'no service'
}
