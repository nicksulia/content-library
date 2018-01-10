'use strict';

import { combineReducers } from 'redux';

import initReducer from './initReducer.js';
import authReducer from './authReducer.js';
import errorReducer from './errorReducer.js';

export default combineReducers({
    initReducer,
    authReducer,
    errorReducer
});
