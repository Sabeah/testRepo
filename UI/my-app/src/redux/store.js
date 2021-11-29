import { combineReducers, createStore } from "redux";

import dataReducer from "./reducers";

const store = createStore(
    combineReducers({
        data: dataReducer,
    })
);

export default store;
