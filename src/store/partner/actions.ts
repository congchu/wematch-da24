import { createAction, createAsyncAction } from 'typesafe-actions'
import { PartnerList, PartnerDetail, Review } from 'types/partner'
import { Pagination } from 'types/pagination'
import {create} from "domain";

interface ListType {
    data: PartnerList[];
    has_more: boolean;
}

interface ReviewType {
    data: Review[];
    has_more: boolean;
}
export const fetchPartnerListAsync = createAsyncAction(
    'FETCH_PARTNER_LIST_REQUEST',
    'FETCH_PARTNER_LIST_RESPONSE',
    'FETCH_PARTNER_LIST_FAILURE'
)<Pagination, ListType ,undefined>()

export const fetchPartnerMoreListAsync = createAsyncAction(
    'FETCH_PARTNER_MORE_LIST_REQUEST',
    'FETCH_PARTNER_MORE_LIST_RESPONSE',
    'FETCH_PARTNER_MORE_LIST_FAILURE'
)<Pagination, ListType, undefined>()

export const fetchPartnerDetailAsync = createAsyncAction(
    'FETCH_PARTNER_DETAIL_REQUEST',
    'FETCH_PARTNER_DETAIL_RESPONSE',
    'FETCH_PARTNER_DETAIL_FAILURE'
)<{username: string}, PartnerDetail, undefined>()

export const fetchReviewListAsync = createAsyncAction(
    'FETCH_REVIEW_LIST_REQUEST',
    'FETCH_REVIEW_LIST_RESPONSE',
    'FETCH_REVIEW_LIST_FAILURE'
)<{username: string, page: number, size: number}, ReviewType, undefined>()

export const fetchReviewMoreListAsync = createAsyncAction(
    'FETCH_REVIEW_MORE_LIST_REQUEST',
    'FETCH_REVIEW_MORE_LIST_RESPONSE',
    'FETCH_REVIEW_MORE_LIST_FAILURE'
)<{ username: string, page: number, size: number }, ReviewType, undefined>()

export const setPartnerPick = createAction('SET_PARTNER_PICK')<PartnerDetail[]>()

export const fetchCartListAsync = createAsyncAction(
    'FETCH_CART_LIST_REQUEST',
    'FETCH_CART_LIST_RESPONSE',
    'FETCH_CART_LIST_FAILURE',
)<{idx: string},any,undefined>()

export const fetchMatchingAsync = createAsyncAction(
    'FETCH_MATCHING_REQUEST',
    'FETCH_MATCHING_RESPONSE',
    'FETCH_MATCHING_FAILURE'
)<any, any, undefined>()