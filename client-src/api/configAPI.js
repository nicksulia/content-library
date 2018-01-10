'use strict';

import fetchAPI from '../helpers/fetchAPI.js'

const freeAPI = '/apis';
const register = '/register';
const authenticate = '/api/authenticate';
const securedAPI = '/api/findData';
const checkAPI = '/api/check';

export const getFreeDataApi = (body) => {
    return fetchAPI.post(freeAPI, body)
};

export const checkAccess = () => {
    return fetchAPI.get(checkAPI,{
        headers:{
            'Authorization': `Bearer ${sessionStorage.token}`
        },
    })
};

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

export const authenticateUser = (body) => {
    return fetchAPI.post(authenticate, body);
};

export const registerUser = () => {
    return fetchAPI.get(register);
};