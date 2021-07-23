import { ActionType, createReducer } from 'typesafe-actions'
import * as actions from './actions'
import { Juso, JusoType } from 'store/common/types'
import { ResponseCleanAutoMatch } from './types'
export type Actions = ActionType<typeof actions>

export interface CleanState {
  form: {
    type: '입주청소' | '거주청소' | undefined
    date: string[]
    address: Juso | null
    addressType: JusoType | null
    livingType: string
    houseSpace: number
    selectOptionItem: string[]
    cleanMemo: string
  }
  result: {
    loading: boolean
    data: ResponseCleanAutoMatch | null
    error: boolean
  }
}

const initialState: CleanState = {
  form: {
    type: undefined,
    date: [],
    address: null,
    addressType: null,
    livingType: '',
    houseSpace: 0,
    selectOptionItem: [],
    cleanMemo: ''
  },
  result: {
    loading: false,
    data: null,
    error: false
  }
}

export default createReducer<CleanState, Actions>(initialState)
  .handleAction(actions.setCleanType, (state, action) => ({ ...state, form: { ...state.form, type: action.payload } }))
  .handleAction(actions.setCleanDate, (state, action) => ({ ...state, form: { ...state.form, date: action.payload } }))
  .handleAction(actions.setCleanAddress, (state, action) => ({ ...state, form: { ...state.form, address: action.payload.address, addressType: action.payload.addressType } }))
  .handleAction(actions.setLivingType, (state, action) => ({ ...state, form: { ...state.form, livingType: action.payload } }))
  .handleAction(actions.setHouseSpace, (state, action) => ({ ...state, form: { ...state.form, houseSpace: action.payload } }))
  .handleAction(actions.setSelectOptionItem, (state, action) => ({ ...state, form: { ...state.form, selectOptionItem: action.payload } }))
  .handleAction(actions.setCleanMemo, (state, action) => ({ ...state, form: { ...state.form, cleanMemo: action.payload } }))
  .handleAction(actions.setResetCleanFormData, (state) => ({ ...state, form: { ...initialState.form } }))
  .handleAction(actions.fetchCleanAutoMatch.request, (state) => ({ ...state, result: { ...state.result, loading: true } }))
  .handleAction(actions.fetchCleanAutoMatch.success, (state, action) => ({ ...state, result: { loading: false, data: action.payload, error: false } }))
  .handleAction(actions.fetchCleanAutoMatch.failure, (state, action) => ({ ...state, result: { ...state.result, loading: false, error: true } }))
  .handleAction(actions.resetCleanForm, (state) => ({ ...state, form: { ...initialState.form } }))
