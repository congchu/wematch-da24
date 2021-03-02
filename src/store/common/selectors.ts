import { createSelector } from 'reselect'
import { RootState } from '../index'

const getCommonState = (state: RootState) => state.commonState

export const getAddressList = createSelector(getCommonState, state => state.addressList);
export const getMoveIdxData = createSelector(getCommonState, state => state.moveIdxData);
export const getDeviceId = createSelector(getCommonState, state => state.deviceId);