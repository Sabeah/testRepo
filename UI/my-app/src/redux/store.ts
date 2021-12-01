import { combineReducers, createStore } from "redux";

import dataReducer from "./reducers";

export const store = createStore(
    combineReducers({
        data: dataReducer,
    })
);
export type RootState = ReturnType<typeof store>;
