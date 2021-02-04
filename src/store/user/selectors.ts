import { createSelector } from "reselect";
import { RootState } from "store";


const getUserState = (state: RootState) => state.userState

export const getConsult = createSelector(getUserState, state => state.consult)
export const getSelectedOrder = createSelector(getUserState, state => state.consult.selected)
export const getUser = createSelector(getUserState, state => state.auth)
export const getPhoneVerified = createSelector(getUserState, state => state.phoneVerify);