import { createReducer, ActionType } from 'typesafe-actions'

import * as actions from './actions'
import {INotice} from 'types/backoffice'


export type Actions = ActionType<typeof actions>

export interface BackofficeState {
    notice: {
        notices: INotice[];
        loading: boolean;
        moreLoading?: boolean;
        hasMore: boolean;
    },
    faq: {
        faq: IFaq[];
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
        notices: [],
        loading: false,
        moreLoading: false,
        hasMore: false
    },
    faq: {
        faq: [],
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
    .handleAction(actions.fetchNoticeListAsync.success, (state, action) => ({ ...state, notice: { notices: action.payload.notices, loading: false, hasMore: action.payload.has_more }}))
    .handleAction(actions.fetchNoticeMoreListAsync.request, (state) => ({ ...state, notice: { ...state.notice, moreLoading: true }}))
    .handleAction(actions.fetchNoticeMoreListAsync.success, (state, action) => ({ ...state, notice: { notices: [...state.notice.notices, ...action.payload.notices], loading: false, moreLoading: false, hasMore: action.payload.has_more}}))
    .handleAction(actions.fetchFaqListAsync.request, (state) => ({ ...state, faq: { ...state.faq, loading: true }}))
    .handleAction(actions.fetchFaqListAsync.success, (state, action) => ({ ...state, faq: { faq: action.payload.notices, loading: false, hasMore: action.payload.has_more }}))
    .handleAction(actions.fetchFaqMoreListAsync.request, (state) => ({ ...state, faq: { ...state.faq, moreLoading: true }}))
    .handleAction(actions.fetchFaqMoreListAsync.success, (state, action) => ({ ...state, faq: { faq: [...state.faq.faq, ...action.payload.notices], loading: false, moreLoading: false, hasMore: action.payload.has_more}}))
    .handleAction(actions.submitContactFormAsync.request, (state) => ({...state, contactForm: { ...state.contactForm, loading: true}}))
    .handleAction(actions.submitContactFormAsync.success, (state, action) => ({...state, contactForm: { ...state.contactForm, data: action.payload ,loading: false}}))
    .handleAction(actions.submitPartnerFormAsync.request, (state) => ({...state, partnerForm: { ...state.partnerForm, loading: true}}))
    .handleAction(actions.submitPartnerFormAsync.success, (state, action) => ({...state, partnerForm: { ...state.partnerForm, data: action.payload ,loading: false}}))