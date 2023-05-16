import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import DocumentReducer from "../Redux/States/DocumentData";
import InfoDataReducer from "../Redux/States/InfoData";

const rootReducer = combineReducers({
    documentary: DocumentReducer,
    dataState: InfoDataReducer,
})

export default function generateStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
    return store;
}