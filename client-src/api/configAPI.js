'use strict';

import fetchAPI from '../helpers/fetchAPI.js'

export const getDataApi = (body) => {
    return fetchAPI.post('/apis', body)
}