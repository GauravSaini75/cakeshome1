import { UserActionTypes, SET_USER, UserState, SET_TOKEN, LOGOUT, LOGGING, MESSAGE } from "./types";

const initialState: UserState = {
    user: null,
    error: '',
    message: '',
    token: null,
    loading: false
}

export function userReducer(
    state = initialState,
    action: UserActionTypes
): UserState {
    switch (action.type) {
        case SET_USER:
            return { ...state, user: action.payload }
        case MESSAGE:
            return { ...state, message: action.payload }
        case LOGOUT:
            return { ...state, user: null }
        case SET_TOKEN:
            return { ...state, token: action.payload }
        case LOGGING:
            return { ...state, loading: action.payload }
        default:
            return state
    }
}