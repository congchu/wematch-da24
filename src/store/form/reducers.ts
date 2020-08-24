import { createReducer, ActionType } from 'typesafe-actions'
import * as actions from './actions'
import * as types from 'store/common/types'
export type Actions = ActionType<typeof actions>

export interface FormState {
    type: 'house' | 'oneroom' | 'office' | undefined;
    date: string[];
    address: {
        start: string;
        end: string;
        detailStart: string;
        detailEnd: string;
    }
    floor: {
        start: string;
        end: string;
    }
    name: string;
    phone: string;
    contents?: string;
    isMoveStore: boolean;
    agree: {
        terms: boolean;
        privacy: boolean;
        marketing: boolean;
    }
    formData: types.RequestUserInfoInsert
}

const initialState: FormState = {
    type: undefined,
    date: [],
    address: {
        start: '',
        end: '',
        detailStart: '',
        detailEnd: '',
    },
    floor: {
        start: '',
        end: '',
    },
    name: '',
    phone: '',
    contents: '',
    isMoveStore: false,
    agree: {
        terms: false,
        privacy: false,
        marketing: false
    },
    formData: {
        movingType: undefined,
        movingDate: '',
        sido: '',
        gugun: '',
        dong: '',
        floor: '',
        detailAddr: '',
        sido2: '',
        gugun2: '',
        dong2: '',
        floor2: '',
        detailAddr2: '',
        distance: '',
        name: '',
        phone1: '',
        phone2: '',
        phone3: '',
        keepMove: false,
        mktAgree: false,
        agentId: '',
    }
}

export default createReducer<FormState, Actions>(initialState)
    .handleAction(actions.setMoveType, (state, action) => ({...state, type: action.payload}))
    .handleAction(actions.setMoveDate, (state, action) => ({...state, date: action.payload}))
    .handleAction(actions.setAddress, (state, action) => ({...state, address: action.payload}))
    .handleAction(actions.setFloor, (state, action) => ({...state, floor: action.payload}))
    .handleAction(actions.setContents, (state, actions) => ({...state, contents: actions.payload}))
    .handleAction(actions.setName, (state, action) => ({...state, name: action.payload}))
    .handleAction(actions.setPhone, (state, action) => ({...state, phone: action.payload}))
    .handleAction(actions.setIsMoveStore, (state, action) => ({...state, isMoveStore: action.payload}))
    .handleAction(actions.setAgree, (state, action) => ({...state, agree: action.payload}))
    .handleAction(actions.setFormData, (state, action) => ({...state, formData: action.payload}))