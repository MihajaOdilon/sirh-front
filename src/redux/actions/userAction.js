import axios from "axios";
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_RESET } from "../constants/userConstant";

const apiEndpont = 'http://localhost:8080/';

export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        });

        const response = await axios.post(`${ apiEndpont }login`, {username, password}, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response.headers)
        const token = response.headers.authorization.split(" ")[1];
         localStorage.setItem('accessToken', token);
        // dispatch({
        //     type: USER_LOGIN_SUCCESS,
        //     payload: decodeToken(token)
        // });
        window.location.href="";

    } catch (error) {
        console.log(error);
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.status === 403 ? "Username or password wrong!" : error.message
        })
    }
}

export const setMe = (me) => (dispatch) => {
    dispatch({
        type: USER_RESET,
        payload: me
    })
}