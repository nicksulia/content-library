import types from './actionsConstants.js';
import { registerUser as registerUserCall, authenticateUser as authenticateUserCall } from '../api/configAPI.js';
import { setServerError } from './errorActions.js';

export const setAuthStatus = (status) => dispatch => {
    dispatch({
        type: types.SET_AUTHORIZATION_STATUS,
        isAuth: status
    });
    dispatch(setServerError(null));
};

export const registerUser = () => dispatch => {
    registerUserCall().then(result => {
        alert(`name: ${result.name} \n password: ${result.password}`);
        dispatch(setUsername(result.name));
    })
};

export const authenticateUser = (credentials) => dispatch => {
    authenticateUserCall(credentials).then(result => {
        dispatch(setToken(result.token));
        dispatch(setUsername(credentials.name));
        dispatch(setAuthStatus(true));
    }, error => {
        dispatch(setServerError(error));
        dispatch(setAuthStatus(false));
    })
};

export const setUsername = (username) => ({
    type: types.SET_USERNAME,
    username
});

export const setToken = token => ({
    type: types.SET_TOKEN,
    token
});
