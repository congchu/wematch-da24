import { createSelector } from "reselect";
import { RootState } from "../index";

const getBackofficeState = (state: RootState) => state.backofficeState;

export const getNoticeList = createSelector(getBackofficeState, (state) => state.notice);
export const getFaqList = createSelector(getBackofficeState, (state) => state.faq);
export const getContactForm = createSelector(getBackofficeState, (state) => state.contactForm.data);
export const getContactStatus = createSelector(getBackofficeState, (state) => state.contactForm.status);
export const getPartnerForm = createSelector(getBackofficeState, (state) => state.partnerForm.data);
export const getPartnerStatus = createSelector(getBackofficeState, (state) => state.partnerForm.status);
