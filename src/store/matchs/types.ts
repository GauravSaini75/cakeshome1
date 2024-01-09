import { ThunkAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import type { } from 'redux-thunk'
import { RootState } from "..";

export interface Match {
    id: number;
    matchTitle: string;
    createdAt?: string;
    updatedAt?: string;
    description?: string;
    startTime: string;
    endTime: string;
    active: false;
}

export interface MatchState {
    matchs: Match[],
    match: Match | null,
    error: string,
    loading: boolean
}

export const SET_MATCH_LIST = 'set_match_list';
export const SET_MATCH = 'set_match';
export const LOADING = 'loading';
export const ERROR = 'error';
export const CLEAR = 'clear';

interface SetMatchList {
    type: typeof SET_MATCH_LIST,
    payload: Match[]
}

interface SetMatch {
    type: typeof SET_MATCH,
    payload: Match
}

interface ErrorAction {
    type: typeof ERROR
    payload: string
}

interface LoadingAction {
    type: typeof LOADING,
    payload: boolean
  }

interface ClearStoreAction {
    type: typeof CLEAR
}

export type MatchActionTypes =  SetMatchList | SetMatch | ClearStoreAction | LoadingAction | ErrorAction

export type MatchThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>