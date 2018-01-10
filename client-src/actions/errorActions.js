import types from './actionsConstants.js';

export const setServerError = serverError => ({
    type: types.SET_SERVER_ERROR,
    serverError
});