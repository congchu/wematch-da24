import { createSelector } from 'reselect'
import { RootState } from '../index'

const getCommonState = (state: RootState) => state.commonState

export const getAddressList = createSelector(getCommonState, state => state.addressList);
export const getPhoneVerified = createSelector(getCommonState, state => state.phoneVerify);
export const getMoveIdxData = createSelector(getCommonState, state => state.moveIdxData);