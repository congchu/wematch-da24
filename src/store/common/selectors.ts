import { createSelector } from 'reselect'
import { RootState } from '../index'

const getCommonState = (state: RootState) => state.commonState

export const getAddressList = createSelector(getCommonState, state => state.addressList);
export const getPhoneVerified = createSelector(getCommonState, state => state.phoneVerify);
export const getMoveIdx = createSelector(getCommonState, state => state.insertInfo);