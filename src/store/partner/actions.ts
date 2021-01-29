import {createAction, createAsyncAction} from "typesafe-actions";
import {IPartnerList, IPartnerDetail, IReview, IPartnerDetailForCompleted, IReviewForCompleted} from "types/partner";
import {Pagination} from "types/pagination";

interface ListType {
  data: IPartnerList[];
  has_more: boolean;
}

interface ReviewType {
  data: IReview[];
  has_more: boolean;
}

interface ReviewTypeForCompleted {
  data: IReviewForCompleted[];
  has_more: boolean;
}

export const fetchPartnerListAsync = createAsyncAction(
  "FETCH_PARTNER_LIST_REQUEST",
  "FETCH_PARTNER_LIST_RESPONSE",
  "FETCH_PARTNER_LIST_FAILURE"
)<Pagination, ListType, undefined>();

export const fetchPartnerMoreListAsync = createAsyncAction(
  "FETCH_PARTNER_MORE_LIST_REQUEST",
  "FETCH_PARTNER_MORE_LIST_RESPONSE",
  "FETCH_PARTNER_MORE_LIST_FAILURE"
)<Pagination, ListType, undefined>();

export const fetchPartnerDetailAsync = createAsyncAction(
  "FETCH_PARTNER_DETAIL_REQUEST",
  "FETCH_PARTNER_DETAIL_RESPONSE",
  "FETCH_PARTNER_DETAIL_FAILURE"
)<{adminId: string; idx: string}, IPartnerDetail, undefined>();

export const fetchPartnerDetailCompAsync = createAsyncAction(
    "FETCH_PARTNER_DETAIL_COMP_REQUEST",
    "FETCH_PARTNER_DETAIL_COMP_RESPONSE",
    "FETCH_PARTNER_DETAIL_COMP_FAILURE"
)<{adminId: string}, IPartnerDetailForCompleted, undefined>();

export const fetchReviewListAsync = createAsyncAction(
  "FETCH_REVIEW_LIST_REQUEST",
  "FETCH_REVIEW_LIST_RESPONSE",
  "FETCH_REVIEW_LIST_FAILURE"
)<{adminId: string; page: number; size: number}, ReviewType, undefined>();

export const fetchReviewMoreListAsync = createAsyncAction(
  "FETCH_REVIEW_MORE_LIST_REQUEST",
  "FETCH_REVIEW_MORE_LIST_RESPONSE",
  "FETCH_REVIEW_MORE_LIST_FAILURE"
)<{adminId: string; page: number; size: number}, ReviewType, undefined>();

export const fetchReviewListCompAsync = createAsyncAction(
    "FETCH_REVIEW_LIST_COMP_REQUEST",
    "FETCH_REVIEW_LIST_COMP_RESPONSE",
    "FETCH_REVIEW_LIST_COMP_FAILURE"
)<{adminId: string; page: number; size: number}, ReviewTypeForCompleted, undefined>();

export const fetchReviewMoreListCompAsync = createAsyncAction(
    "FETCH_REVIEW_MORE_LIST_COMP_REQUEST",
    "FETCH_REVIEW_MORE_LIST_COMP_RESPONSE",
    "FETCH_REVIEW_MORE_LIST_COMP_FAILURE"
)<{adminId: string; page: number; size: number}, ReviewTypeForCompleted, undefined>();

export const setPartnerPick = createAction("SET_PARTNER_PICK")<
  IPartnerDetail[]
>();

export const fetchCartListAsync = createAsyncAction(
  "FETCH_CART_LIST_REQUEST",
  "FETCH_CART_LIST_RESPONSE",
  "FETCH_CART_LIST_FAILURE"
)<{idx: string; admin_id: any | undefined}, any, undefined>();

export const fetchMatchingAsync = createAsyncAction(
  "FETCH_MATCHING_REQUEST",
  "FETCH_MATCHING_RESPONSE",
  "FETCH_MATCHING_FAILURE"
)<any, any, undefined>();

export const cartReset = createAction("CART_RESET")();
export const partnerListReset = createAction("PARTNER_LIST_RESET")();
