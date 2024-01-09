import { SET_MATCH_LIST, SET_MATCH, LOADING, ERROR, MatchActionTypes, MatchState } from "./types";

const initialState: MatchState = {
  matchs: [],
  match: null,
  error: '',
  loading: false
}

export function matchReducer(
  state = initialState,
  action: MatchActionTypes
): MatchState {
  switch (action.type) {
    case SET_MATCH_LIST:
      return { ...state, matchs: action.payload }
    case SET_MATCH:
      return { ...state, match: action.payload }
    case ERROR:
      return { ...state, error: action.payload }
    case LOADING:
      return { ...state, loading: action.payload }
    default:
      return state
  }
}