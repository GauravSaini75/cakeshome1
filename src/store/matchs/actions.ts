import AsyncStorage from "@react-native-async-storage/async-storage";
import { Match, MatchThunk, SET_MATCH_LIST } from "./types";

export function getMatchList(successCb: () => void, errorCb: (arg0: string) => void): MatchThunk {
    return async (dispatch, getState) => {
        try {
            const matchList = await AsyncStorage.getItem('@match_list')
            if(matchList) {
                const matchData: Match[] = JSON.parse(matchList);
                dispatch({type: SET_MATCH_LIST, payload: matchData})
                successCb()
                console.log('success')
            } else {
                errorCb('No items found.')
            }
        } catch (error: any) {
            if (error.response) {
                if (error.response.data.error) {
                    errorCb(error.response?.data?.error || '')
                } else {
                    errorCb('There is some error, please try later.')
                }
            } else if (error.request) {
                errorCb('There is some error, please try later.')
            } else {
                errorCb(error.message)
            }
        }
    }
}

export function createMatch(): MatchThunk {
    return async (dispatch, getState) => {
        try {
            
        } catch (error) {
            
        }
    }
}