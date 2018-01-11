import types from './actionsConstants.js';

/**
 * @param serverError - Object. { success: {bool}, code: {string} , message: {string} }
 */
export const setServerError = serverError => ({
    type: types.SET_SERVER_ERROR,
    serverError
});