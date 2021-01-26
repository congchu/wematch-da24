import { createSelector } from "reselect";
import { RootState } from "store";


const getUserState = (state: RootState) => state.userState

export const getConsult = createSelector(getUserState, state => state.consult)