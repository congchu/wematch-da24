import { createSelector } from "reselect";
import { RootState } from "../index";

const getFormState = (state: RootState) => state.formState;

export const getType = createSelector(getFormState, (state) => state.type);
export const getDate = createSelector(getFormState, (state) => state.date);
export const getAddress = createSelector(getFormState, (state) => state.address);
export const getFloor = createSelector(getFormState, (state) => state.floor);
export const getName = createSelector(getFormState, (state) => state.name);
export const getPhone = createSelector(getFormState, (state) => state.phone);
export const getIsMoveStore = createSelector(getFormState, (state) => state.isMoveStore);
export const getAgree = createSelector(getFormState, (state) => state.agree);
export const getContents = createSelector(getFormState, (state) => state.contents);
export const getFormData = createSelector(getFormState, (state) => state.formData);
export const getSubmittedForm = createSelector(getFormState, (state) => state.submittedForm);
export const getSelectedSubmitType = createSelector(getFormState, (state) => state.selectedSubmitType);
export const getDbdbDeep = createSelector(getFormState, (state) => state.callDbdbDepp);
