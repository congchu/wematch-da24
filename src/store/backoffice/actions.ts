import {createAction, createAsyncAction} from "typesafe-actions";
import {INotice} from 'types/backoffice'

interface NoticeType {
  notices: INotice[];
  has_more: boolean;
}


export const fetchNoticeListAsync = createAsyncAction(
  "FETCH_NOTICE_LIST_REQUEST",
  "FETCH_NOTICE_LIST_RESPONSE",
  "FETCH_NOTICE_LIST_FAILURE"
)< {page: number; size: number} , NoticeType, undefined>();

export const fetchNoticeMoreListAsync = createAsyncAction(
    "FETCH_NOTICE_MORE_LIST_REQUEST",
    "FETCH_NOTICE_MORE_RESPONSE",
    "FETCH_NOTICE_MORE_FAILURE"
)< {page: number; size: number} , NoticeType, undefined>();

