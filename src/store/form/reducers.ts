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
        moving_type: undefined,
        moving_date: '',
        sido: '',
        gugun: '',
        dong: '',
        floor: '',
        detail_addr: '',
        sido2: '',
        gugun2: '',
        dong2: '',
        floor2: '',
        detail_addr2: '',
        distance: 1,
        name: '',
        phone1: '',
        phone2: '',
        phone3: '',
        keep_move: false,
        mkt_agree: false,
        agent_id: '',
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
    .handleAction(actions.setInitialFormData, (state, action) => {
        const {
            moving_date, detail_addr, detail_addr2, dong, dong2,
            floor, floor2, gugun, gugun2, keepMove, terms, privacy, marketing,
            name, phone1, phone2, phone3, sido, sido2
        } = action.payload;
        return {...state,
            date: [moving_date],
            floor: {start: floor, end: floor2},
            address: {start: `${sido} ${gugun} ${dong}`, end: `${sido2} ${gugun2} ${dong2}`,detailStart: detail_addr, detailEnd: detail_addr2},
            name: name,
            phone: `${phone1}${phone2}${phone3}`,
            agree: {terms, privacy, marketing}
        }
    })