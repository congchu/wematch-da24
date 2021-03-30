import {createAction, createAsyncAction} from "typesafe-actions";
import {INotice, IFaq, ContactFormData, PartnerFormData} from 'types/backoffice'

interface NoticeType {
  notices: INotice[];
  has_more: boolean;
}

interface FaqType {
  notices: IFaq[];
  has_more: boolean;
}

export const fetchNoticeListAsync = createAsyncAction(
  "FETCH_NOTICE_LIST_REQUEST",
  "FETCH_NOTICE_LIST_RESPONSE",
  "FETCH_NOTICE_LIST_FAILURE"
)< {page: number; size: number} , NoticeType, undefined>();


export const fetchFaqListAsync = createAsyncAction(
    "FETCH_FAQ_LIST_REQUEST",
    "FETCH_FAQ_LIST_RESPONSE",
    "FETCH_FAQ_LIST_FAILURE"
)< {page: number; size: number} , FaqType, undefined>();

export const fetchFaqMoreListAsync = createAsyncAction(
    "FETCH_FAQ_MORE_LIST_REQUEST",
    "FETCH_FAQ_MORE_RESPONSE",
    "FETCH_FAQ_MORE_FAILURE"
)< {page: number; size: number} , FaqType, undefined>();


export const submitContactFormAsync = createAsyncAction(
    'FETCH_SUBMIT_CONTACT_FORM_REQUEST',
    'FETCH_SUBMIT_CONTACT_FORM_SUCCESS',
    'FETCH_SUBMIT_CONTACT_FORM_FAILURE'
)<{ formData : ContactFormData } , ContactFormData , undefined>()

export const submitPartnerFormAsync = createAsyncAction(
    'FETCH_SUBMIT_PARTNER_FORM_REQUEST',
    'FETCH_SUBMIT_PARTNER_FORM_SUCCESS',
    'FETCH_SUBMIT_PARTNER_FORM_FAILURE'
)<{ formData : PartnerFormData } , PartnerFormData , undefined>()
