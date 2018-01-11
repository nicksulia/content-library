'use strict';

import fetchAPI from '../helpers/fetchAPI.js'

const freeAPI = '/apis';
const register = '/register';
const authenticate = '/api/authenticate';
const securedAPI = '/api/findData';
const checkAPI = '/api/check';

/**
 * Test API handler for unsecured work with data
 * @param body - {Object}
 */
export const getFreeDataApi = (body) => {
    return fetchAPI.post(freeAPI, body)
};

/**
 * API handler for token validation
 */
export const checkAccess = () => {
    return fetchAPI.get(checkAPI,{
        headers:{
            'Authorization': `Bearer ${sessionStorage.token}`
        },
    })
};
/**
 * Secured API handler for work with data
 * @param body - Object
 * @returns {Promise.<*>}
 */
export const getDataApi = (body) => {
    if (sessionStorage.token) {
        return fetchAPI.post(securedAPI, body, {
            headers:{
                'Authorization': `Bearer ${sessionStorage.token}`
            },
        })
    } else return Promise.reject({
        code: 'no.saved.token',
        message: 'No token provided. Please register and authenticate first.'
    })
};
/**
 * Authentication API handler
 * @param body - Object
 */
export const authenticateUser = (body) => {
    return fetchAPI.post(authenticate, body);
};
/**
 * Register user API handler
 * returns {Object} with user credentials
 */
export const registerUser = () => {
    return fetchAPI.get(register);
};