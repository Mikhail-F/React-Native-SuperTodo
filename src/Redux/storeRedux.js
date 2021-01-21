import {applyMiddleware, combineReducers, createStore} from "redux";
import MiddleWare from 'redux-thunk'
import todoReducer from "./todoReducer";
import AuthReducer from "./AuthReducer";

const reducers = combineReducers({
    todo: todoReducer,
    auth: AuthReducer
})

const store = createStore(reducers, applyMiddleware(MiddleWare))

export default store