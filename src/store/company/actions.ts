import {ICompanyDetail, ICompanyReview} from './type'
import {createAsyncAction} from 'typesafe-actions'

interface CompanyReviewType {
  data: ICompanyReview[];
  has_more: boolean;
}
export const fetchCompanyDetailAsync = createAsyncAction(
    "FETCH_COMPANY_DETAIL_REQUEST",
    "FETCH_COMPANY_DETAIL_RESPONSE",
    "FETCH_COMPANY_DETAIL_FAILURE"
)<{idx: string}, ICompanyDetail, undefined>();

export const fetchCompReviewListAsync = createAsyncAction(
    "FETCH_COMPANY_REVIEW_LIST_REQUEST",
    "FETCH_COMPANY_REVIEW_LIST_RESPONSE",
    "FETCH_COMPANY_REVIEW_LIST_FAILURE"
)<{idx: string; page: number; size: number}, CompanyReviewType, undefined>();

export const fetchCompReviewMoreListAsync = createAsyncAction(
    "FETCH_COMPANY_REVIEW_MORE_LIST_REQUEST",
    "FETCH_COMPANY_REVIEW_MORE_LIST_RESPONSE",
    "FETCH_COMPANY_REVIEW_MORE_LIST_FAILURE"
)<{idx: string; page: number; size: number}, CompanyReviewType, undefined>();

