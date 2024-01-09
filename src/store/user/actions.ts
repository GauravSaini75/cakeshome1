import AsyncStorage from "@react-native-async-storage/async-storage"
import { LOGOUT, SET_TOKEN, SET_USER, UserThunk } from "./types"

export function checkUser(cb: () => void): UserThunk{
    return async (dispatch, getState)=>{
        try {
            const data = await AsyncStorage.multiGet(['user', 'accesstoken']);
            if(data && data[1][1]){
                let accessToke = JSON.parse(data[1][1])
                dispatch({ type: SET_TOKEN, payload: accessToke.token });
            } else {
                cb();
                return
            }
            if(data && data[0][1]){
                let userData = JSON.parse(data[0][1])
                dispatch({ type: SET_USER, payload: userData})
            } else {
                dispatch({ type: LOGOUT })
            }
            cb();
        } catch (error) {
            console.log(error);
            cb();
        }
    }
}