import types from './actionsConstants.js';

export const setCursor = (cursor) => ({
    type: types.SET_CURSOR,
    cursor: cursor
});

export const getData = (dataLength) => dispatch => dispatch({
    type: types.GET_DATA_CALL,
    data: Promise.resolve([]).then(() => { dispatch(setDisplayedData(dataLength)) })
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