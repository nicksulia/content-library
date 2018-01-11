import types from './actionsConstants.js';
import { getDataApi } from '../api/configAPI.js';
import { setServerError } from './errorActions.js';

/**
 * @param cursor - {number}
 */
export const setCursor = (cursor) => ({
    type: types.SET_CURSOR,
    cursor: cursor
});

/**
 *
 * @param body - Object
 * @param length - number. Integer
 */
export const getData = (body, length = 50) => dispatch => {
    getDataApi(body).then(data => {
        dispatch(setData(data));
        dispatch(setDisplayedData(length));
    }, error => {
        dispatch(setServerError(error));
    });
};

/**
 * @param data - {Array}
 */
export const setData = (data) => ({
    type: types.SET_DATA,
    data
});

/**
 * @param searchingValue - {string}
 */
export const setSearchingValue = (searchingValue) => ({
    type: types.SET_SEARCHING_VALUE,
    searchingValue
});

/**
 * @param searchingType - {string}
 */
export const setSearchingType = (searchingType) => ({
    type: types.SET_SEARCHING_TYPE,
    searchingType
});

/**
 *
 * @param sortingType - {string}
 */
export const setSortingType = (sortingType) => ({
    type: types.SET_SORTING_TYPE,
    sortingType
});
/**
 *
 * @param filteringType - {string}
 */
export const setFilteringType = (filteringType) => ({
    type: types.SET_FILTERING_TYPE,
    filteringType
});
/**
 *
 * @param filteringOptions - {Object}
 */
export const setFilteringOptions = (filteringOptions) => ({
    type: types.SET_FILTERING_OPTIONS,
    filteringOptions
});

/**
 *
 * @param dataLength - number
 */
export const setDisplayedData = (dataLength) => ({
    type: types.SET_DISPLAYED_DATA,
    dataLength
});