import * as actionTypes from '../actions/actionTypes'
import axios from 'axios';
export const authenticationStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authenticationSuccess = (token, userid) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userid
    }
}

export const authenticationFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logoutUser = () => {
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const expireUserToken = (expirtaionTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logoutUser())
        }, expirtaionTime*1000)
    }
}


export const authenticateUser = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authenticationStart())
        const userLoginData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDsmxAuaVJLs30X7C4w8dSol5NMoFMQNKM';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDsmxAuaVJLs30X7C4w8dSol5NMoFMQNKM';
        }
        axios.post(url, userLoginData)
            .then((response) => {
                dispatch(authenticationSuccess(response.data.idToken, response.data.localId));
                dispatch(expireUserToken(response.data.expiresIn));
            }).catch((err) => {
                dispatch(authenticationFail(err.response.data.error))
            })
    }
}