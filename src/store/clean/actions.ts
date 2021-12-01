import { Juso, JusoType } from "store/common/types";
import { createAction, createAsyncAction } from "typesafe-actions";
import { ResponseCleanAutoMatch } from "./types";

export type CleanTypeProp = "입주청소" | "거주청소" | undefined;

export const setCleanType = createAction("SET_CLEAN_TYPE")<CleanTypeProp>();
export const setCleanDate = createAction("SET_CLEAN_DATE")<string[]>();
export const setCleanAddress = createAction("SET_CLEAN_ADDRESS")<{ address: Juso | null; addressType: JusoType | null }>();
export const setLivingType = createAction("SET_LIVING_TYPE")<string>();
export const setHouseSpace = createAction("SET_HOUSE_SPACE")<number>();
export const setSelectOptionItem = createAction("SET_SELECT_OPTION_ITEM")<string[]>();
export const setCleanMemo = createAction("SET_CLEAN_MEMO")<string>();
export const setResetCleanFormData = createAction("SET_RESET_CLEAN_FORM_DATA")();

export const fetchCleanAutoMatch = createAsyncAction("FETCH_CLEAN_AUTO_MATCH_REQUEST", "FETCH_CLEAN_AUTO_MATCH_SUCCESS", "FETCH_CLEAN_AUTO_MATCH_FAILURE")<undefined, ResponseCleanAutoMatch, undefined>();

export const resetCleanForm = createAction("RESET_CLEAN_FORM")();
