import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "..";

export interface LastKnownLocation {
    id: number;
    user_name: string;
    user_mobile: string;
    address: string;
    address2: string;
    type: string;
    pincode: string;
    city_name: string;
    state_name: string;
    country_name: string;
}

export interface User {
    user_id: string;
    user_name: string;
    user_gender: "M" | "F";
    user_email: string;
    dial_code: string;
    user_mobile: string;
    member_since: string;
    email_verified: boolean;
    mobile_verified: boolean;
    user_username: string | null;
    password: string;
    last_password_update: string;
    user_source: string;
    user_image: string;
    dob: string | null;
    first_order: boolean;
    refer_code: string;
    favorite: any;
    food_tags: any;
    workmode: any;
    country_id: any;
    last_known_location: LastKnownLocation[];
    token: string;
    refresh_token: string;
    is_new_user: boolean;
}

export interface TokenInfo {
    accessToken: string;
}

export interface UserState {
    loading: boolean;
    user: User | null;
    error: string;
    message: string;
    token: TokenInfo | null;
}

export const SET_TOKEN = 'set_token';
export const SET_USER = 'set_user';
export const MESSAGE = 'message';
export const LOGOUT = 'logout';
export const LOGGING = 'logging'

interface LoggingAction {
    type: typeof LOGGING,
    payload: boolean
}

interface MessageAction {
    type: typeof MESSAGE,
    payload: string
}
  
interface LoginAction {
    type: typeof SET_USER,
    payload: User
}

interface SetTokenAction {
    type: typeof SET_TOKEN,
    payload: TokenInfo | null
}
  
interface LogoutAction {
    type: typeof LOGOUT
}

export type UserActionTypes = LoginAction | SetTokenAction | LogoutAction  | MessageAction | LoggingAction

export type UserThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>