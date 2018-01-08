import types from './actionsConstants.js';

Object.freeze({
    SET_CURSOR: 'SET_CURSOR',
    GET_DATA_CALL: 'GET_DATA_CALL',
    SET_DISPLAYED_DATA: 'SET_DISPLAYED_DATA',
    SET_FILTERING_TYPE: 'SET_FILTERING_TYPE',
    SET_FILTERING_OPTIONS: 'SET_FILTERING_OPTIONS',
    SET_SORTING_TYPE: 'SET_SORTING_TYPE',
    SET_SEARCHING_TYPE: 'SET_SEARCHING_TYPE',
    SET_SEARCHING_VALUE: 'SET_SEARCHING_VALUE'
});

export const setCursor = (cursor) => ({
    type: types.SET_CURSOR,
    cursor: cursor
});

export const getData = () => dispatch => dispatch({
    type: types.GET_DATA_CALL,
    data: Promise.resolve('data')
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