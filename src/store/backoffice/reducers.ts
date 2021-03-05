import { createReducer, ActionType } from 'typesafe-actions'

import * as actions from './actions'
import {INotice} from 'types/notice'
import * as types from '../common/types'



export type Actions = ActionType<typeof actions>

export interface BackofficeState {
    notice: {
        data: INotice[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore: boolean;
    },
    contactForm: types.ContactFormData,
    formData: {
        data: types.ContactFormData,
        loading: boolean;
    };
}

const initialState: BackofficeState  = {
    notice: {
        data: [],
        loading: false,
        moreLoading: false,
        hasMore: false
    },
    // service_type: '',
    // contact_type: '',
    // name: '',
    // tel: '',
    // ip_address: '',
    // contents: '',
    contactForm: {
        contact_type: '',
        name: '',
        tel: '',
        contents:'',
        ip_address: '',
        service_type: ''
    },
    formData: {
        data: {
            contact_type: '',
            name: '',
            tel: '',
            contents:'',
            ip_address: '',
            service_type: ''
        },
        loading: false
    },

}

export default createReducer <BackofficeState, Actions>(initialState)
    .handleAction(actions.fetchNoticeListAsync.request, (state) => ({ ...state, notice: { ...state.notice, loading: true }}))
    .handleAction(actions.fetchNoticeListAsync.success, (state, action) => ({ ...state, notice: { data: action.payload.notices, loading: false, hasMore: action.payload.has_more }}))
    .handleAction(actions.fetchNoticeMoreListAsync.request, (state) => ({ ...state, notice: { ...state.notice, moreLoading: true }}))
    .handleAction(actions.fetchNoticeMoreListAsync.success, (state, action) => ({ ...state, notice: { data: [...state.notice.data, ...action.payload.notices], loading: false, moreLoading: false, hasMore: action.payload.has_more}}))
    .handleAction(actions.submitContactFormAsync.request, (state) => ({...state, formData: { ...state.formData, loading: true}}))
    .handleAction(actions.submitContactFormAsync.success, (state, action) => ({...state, formData: { ...state.formData, data: action.payload ,loading: false}}))
    .handleAction(actions.setFormData, (state, action) => ({...state, contactForm: action.payload}))