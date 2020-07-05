import { createAction, createAsyncAction } from 'typesafe-actions'
import { PartnerList, PartnerDetail, Review } from 'types/partner'
import { Pagination } from 'types/pagination'

export const fetchPartnerListAsync = createAsyncAction(
    'FETCH_PARTNER_LIST_REQUEST',
    'FETCH_PARTNER_LIST_RESPONSE',
    'FETCH_PARTNER_LIST_FAILURE'
)<Pagination, PartnerList[], undefined>()

export const fetchPartnerMoreListAsync = createAsyncAction(
    'FETCH_PARTNER_MORE_LIST_REQUEST',
    'FETCH_PARTNER_MORE_LIST_RESPONSE',
    'FETCH_PARTNER_MORE_LIST_FAILURE'
)<Pagination, PartnerList[], undefined>()

export const fetchPartnerDetailAsync = createAsyncAction(
    'FETCH_PARTNER_DETAIL_REQUEST',
    'FETCH_PARTNER_DETAIL_RESPONSE',
    'FETCH_PARTNER_DETAIL_FAILURE'
)<{username: string}, PartnerDetail, undefined>()

export const fetchReviewListAsync = createAsyncAction(
    'FETCH_REVIEW_LIST_REQUEST',
    'FETCH_REVIEW_LIST_RESPONSE',
    'FETCH_REVIEW_LIST_FAILURE'
)<{username: string, page: number, size: number}, Review[], undefined>()

export const fetchReviewMoreListAsync = createAsyncAction(
    'FETCH_REVIEW_MORE_LIST_REQUEST',
    'FETCH_REVIEW_MORE_LIST_RESPONSE',
    'FETCH_REVIEW_MORE_LIST_FAILURE'
)<{ username: string, page: number, size: number }, Review[], undefined>()

export const setPartnerPick = createAction('SET_PARTNER_PICK')<PartnerList[]>()
