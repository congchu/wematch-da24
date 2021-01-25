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
            orders: []
        },
        loading: false
    }
}


interface UserState {
    auth: {
        token: string | null;
        loading: boolean; 
    };
    consult: {
        data: {
            name: string;
            phone: string;
            orders: IOrder[];
        }
        loading: boolean;
    }
}

export default createReducer<UserState, Actions>(initialState)
    .handleAction(actions.fetchUserConsultAsync.request, (state) => ({...state, consult: {...state.consult, loading: true}}))
    .handleAction(actions.fetchUserConsultAsync.success, (state, action) => ({...state, consult: { data: {...action.payload}, loading: false}}))