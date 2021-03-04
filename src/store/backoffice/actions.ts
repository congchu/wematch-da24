import {createAction, createAsyncAction} from "typesafe-actions";
import {INotice} from 'types/notice'

interface NoticeType {
  data: INotice[];
  has_more: boolean;
}


export const fetchNoticeListAsync = createAsyncAction(
  "FETCH_NOTICE_LIST_REQUEST",
  "FETCH_MATCHING_RESPONSE",
  "FETCH_MATCHING_FAILURE"
)< {page: number; size: number} , NoticeType, undefined>();

export const fetchNoticeMoreListAsync = createAsyncAction(
    "FETCH_NOTICE_MORE_LIST_REQUEST",
    "FETCH_MATCHING_MORE_RESPONSE",
    "FETCH_MATCHING_MORE_FAILURE"
)< {page: number; size: number} , NoticeType, undefined>();

