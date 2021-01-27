import { createSelector } from "reselect";
import { RootState } from "store";


const getUserState = (state: RootState) => state.userState

export const getConsult = createSelector(getUserState, state => state.consult)
export const getSelectedOrder = createSelector(getUserState, state => state.consult.selected)