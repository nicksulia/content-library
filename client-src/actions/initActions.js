import types from './actionsConstants.js';
import { getDataApi } from '../api/configAPI.js';
import { setServerError } from './errorActions.js';

export const setCursor = (cursor) => ({
    type: types.SET_CURSOR,
    cursor: cursor
});

export const getData = (body, length = 50) => dispatch => {
    getDataApi(body).then(data => {
        dispatch(setData(data));
        dispatch(setDisplayedData(length));
    }, error => {
        dispatch(setServerError(error));
    });
};

export const setData = (data) => ({
    type: types.SET_DATA,
    data
});


export const setSearchingValue = (searchingValue) => ({
    type: types.SET_SEARCHING_VALUE,
    searchingValue
});

export const setSearchingType = (searchingType) => ({
    type: types.SET_SEARCHING_TYPE,
    searchingType
});

export const setSortingType = (sortingType) => ({
    type: types.SET_SORTING_TYPE,
    sortingType
});

export const setFilteringType = (filteringType) => ({
    type: types.SET_FILTERING_TYPE,
    filteringType
});

export const setFilteringOptions = (filteringOptions) => ({
    type: types.SET_FILTERING_OPTIONS,
    filteringOptions
});

export const setDisplayedData = (dataLength) => ({
    type: types.SET_DISPLAYED_DATA,
    dataLength
});