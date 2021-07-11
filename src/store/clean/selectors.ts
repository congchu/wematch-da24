import { createSelector } from 'reselect'
import { RootState } from 'store'

const getCleanState = (state: RootState) => state.cleanState

export const getCleanType = createSelector(getCleanState, ({ form }) => form.type)
export const getCleanDate = createSelector(getCleanState, ({ form }) => form.date)
export const getCleanAddress = createSelector(getCleanState, ({ form }) => form.address)
export const getCleanAddressType = createSelector(getCleanState, ({ form }) => form.addressType)
export const getCleanLivingType = createSelector(getCleanState, ({ form }) => form.livingType)
export const getCleanHouseSpace = createSelector(getCleanState, ({ form }) => form.houseSpace)
export const getCleanSelectOptionItem = createSelector(getCleanState, ({ form }) => form.selectOptionItem)
export const getCleanMemo = createSelector(getCleanState, ({ form }) => form.cleanMemo)

export const getCleanForm = createSelector(getCleanState, ({ form }) => form)
