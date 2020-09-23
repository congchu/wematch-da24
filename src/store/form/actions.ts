import { createAction } from 'typesafe-actions'
import * as types from 'store/common/types'

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

export const setFormData = createAction('SET_FORM_DATA')<types.RequestUserInfoInsert>()

export const setInitialFormData = createAction('SET_INITIAL_FORM_DATA')<any>()