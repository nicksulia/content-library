import { handleActions } from 'redux-actions';

import ACTIONS from '../actions/actionsConstants';
import { authState } from './defaultState.js';

export default handleActions({
    default: state => state,


    [ACTIONS.SET_USERNAME]: (state, { username }) => {
        sessionStorage.username = username;
        return {
            ...state,
            username
        };
    },

    [ACTIONS.SET_TOKEN]: (state, { token }) => {
        sessionStorage.token = token;
        return {
            ...state,
            token
        };
    },

    [ACTIONS.SET_AUTHORIZATION_STATUS]: (state, { isAuth }) => {
        return {
            ...state,
            isAuth
        };
    },

}, authState);
