import {createAction, createAsyncAction} from 'typesafe-actions'
import * as types from 'store/common/types'
import {SubmittedForm} from 'store/form/types'
import {FormState} from "./reducers";

export type MoveTypeProp = 'house' | 'oneroom' | 'office' | undefined

export const setMoveType = createAction('SET_MOVE_TYPE')<MoveTypeProp>()
export const setMoveDate = createAction('SET_MOVE_DATE')<string[]>()
export const setAddress = createAction('SET_ADDRESS')<{
    start: string;
    end: string;
    detailStart: string;
    detailEnd: string;
}>()
export const setFloor = createAction('SET_FLOOR')<{
    start: string;
    end: string;
}>()
export const setContents = createAction('SET_CONTENTS')<string>()
export const setName = createAction('SET_NAME')<string>()
export const setPhone = createAction('SET_PHONE')<string>()
export const setIsMoveStore = createAction('')<boolean>()
export const setAgree = createAction('SET_TERMS_AGREE')<{
    terms: boolean;
    privacy: boolean;
    marketing: boolean;
}>();

export const setInitialFormData = createAction('SET_INITIAL_FORM_DATA')<any>()
export const setFormData = createAction('SET_FORM_DATA')<types.RequestUserInfoInsert>()
export const submitFormAsync = createAsyncAction(
    'FETCH_SUBMIT_FORM_REQUEST',
    'FETCH_SUBMIT_FORM_SUCCESS',
    'FETCH_SUBMIT_FORM_FAILURE'
)<{formData: types.RequestUserInfoInsert}, FormState, undefined>()

export const setSubmitType = createAction('SET_SUBMIT_TYPE')<'curation' | 'select'>()
export const fetchMoveData = createAction('FETCH_MOVE_DATA')();