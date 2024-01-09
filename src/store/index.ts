import { combineReducers } from "redux";
import { createLogger } from 'redux-logger';
import { matchReducer } from "./matchs/reducers";
import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./user/reducers";

const logger = createLogger({
    level: 'error',
    duration: false,
    timestamp: false,
    predicate: (getState, action, logEntry) => false,
});

const appReducer = combineReducers({
    matchs : matchReducer,
    auth: userReducer
})
  
const rootReducer = (state: any, action: any) => {
    return appReducer(state, action)
}
  
export type RootState = ReturnType<typeof rootReducer>
  
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false
    }).concat(logger)
})
  
export type AppDispatch = typeof store.dispatch