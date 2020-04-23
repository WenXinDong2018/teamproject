import * as ActionTypes from './ActionTypes';
import { auth } from '../firebase/firebase';
let initialState = {
    isLoading: false,
    isAuthenticated: false,
    user: null,
    errMess: null,
    position: null,
}



if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
        // console.log({ lat: position.coords.latitude, lng: position.coords.longitude });s
        initialState.position = { lat: position.coords.latitude, lng: position.coords.longitude };
    });
}


// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.


auth.onAuthStateChanged(function (user) {
    if (!user) {
        return;
    }
    else {
        initialState.isAuthenticated = true;
        initialState.user = user

    }
})


export const Auth = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: false,
            };
        case ActionTypes.LOGIN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                errMess: '',
                user: action.user
            };
        case ActionTypes.LOGIN_FAILURE:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                errMess: action.message
            };
        case ActionTypes.LOGOUT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isAuthenticated: true
            };
        case ActionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                token: '',
                user: null
            };
        default:
            return state
    }
}