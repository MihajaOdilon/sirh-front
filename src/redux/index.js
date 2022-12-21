import { configureStore } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";
import { userLoginReducer } from "./reducers/userReducer";

const initialState = {
    auth: {
        me: localStorage.getItem('accessToken') ? decodeToken(localStorage.getItem('accessToken')) : null
    }
};

export const store = configureStore({
    reducer: {
        auth: userLoginReducer
    },
    preloadedState: initialState
});