import { handleActions } from 'redux-actions';

import ACTIONS from '../actions/actionsConstants';
import { authState } from './defaultState.js';

export default handleActions({
    default: state => state,


    [ACTIONS.SET_SERVER_ERROR]: (state, { serverError }) => ({
        ...state,
        serverError
    })

}, authState);
