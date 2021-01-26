import { ActionType, createReducer } from "typesafe-actions";
import { IOrder } from "./types";
import * as actions from './actions';



export type Actions = ActionType<typeof actions>

const initialState: UserState = {
    auth: {
        token: null,
        loading: false,
    },
    consult: {
        data: {
            name: '',
            phone: '',
            clean_orders: [],
            move_orders: [],
            past_orders: [],
        },
        loading: false
    }
}


export interface UserState {
    auth: {
        token: string | null;
        loading: boolean; 
    };
    consult: {
        data: {
            name: string;
            phone: string;
            clean_orders: IOrder[];
            move_orders: IOrder[];
            past_orders: IOrder[];
        }
        loading: boolean;
    }
}

export default createReducer<UserState, Actions>(initialState)
    .handleAction(actions.fetchUserConsultAsync.request, (state) => ({...state, consult: {...state.consult, loading: true}}))
    .handleAction(actions.fetchUserConsultAsync.success, (state, action) => ({...state, consult: { data: {...action.payload}, loading: false}}))