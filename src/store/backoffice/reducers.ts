import { createReducer, ActionType } from 'typesafe-actions'

import * as actions from './actions'
import {INotice, PartnerFormData} from 'types/backoffice'
import {ContactFormData} from 'types/backoffice'


export type Actions = ActionType<typeof actions>

export interface BackofficeState {
    notice: {
        data: INotice[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore: boolean;
    },
    contactForm: {
        data: ContactFormData,
        loading: boolean;
    },
    partnerForm: {
        data: PartnerFormData,
        loading: boolean
    }
}

const initialState: BackofficeState  = {
    notice: {
        data: [],
        loading: false,
        moreLoading: false,
        hasMore: false
    },
    contactForm: {
        data: {
            id: null,
            service_type: '',
            contact_type: '',
            name: '',
            tel: '',
            contents: '',
            ip_address: '',
            created_at: '',
        },
        loading: false
    },
    partnerForm: {
        data: {
            id: null,
            service_type: '',
            area: '',
            company_name: '',
            tel: '',
            reason: '',
            contents: '',
            ip_address: '',
            created_at: ''
        },
        loading: false
    }

}

export default createReducer <BackofficeState, Actions>(initialState)
    .handleAction(actions.fetchNoticeListAsync.request, (state) => ({ ...state, notice: { ...state.notice, loading: true }}))
    .handleAction(actions.fetchNoticeListAsync.success, (state, action) => ({ ...state, notice: { data: action.payload.notices, loading: false, hasMore: action.payload.has_more }}))
    .handleAction(actions.fetchNoticeMoreListAsync.request, (state) => ({ ...state, notice: { ...state.notice, moreLoading: true }}))
    .handleAction(actions.fetchNoticeMoreListAsync.success, (state, action) => ({ ...state, notice: { data: [...state.notice.data, ...action.payload.notices], loading: false, moreLoading: false, hasMore: action.payload.has_more}}))
    .handleAction(actions.submitContactFormAsync.request, (state) => ({...state, contactForm: { ...state.contactForm, loading: true}}))
    .handleAction(actions.submitContactFormAsync.success, (state, action) => ({...state, contactForm: { ...state.contactForm, data: action.payload ,loading: false}}))
    .handleAction(actions.submitPartnerFormAsync.request, (state) => ({...state, partnerForm: { ...state.partnerForm, loading: true}}))
    .handleAction(actions.submitPartnerFormAsync.success, (state, action) => ({...state, partnerForm: { ...state.partnerForm, data: action.payload ,loading: false}}))