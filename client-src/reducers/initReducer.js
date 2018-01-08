import { handleActions } from 'redux-actions';

import ACTIONS from '../actions/actionsConstants';
import { defaultState } from './defaultState.js';

export default handleActions({
    default: state => state,

    [ACTIONS.SET_CURSOR]: (state, { cursor }) => ({
        ...state,
        cursor
    }),


    [`${ACTIONS.GET_DATA_CALL}_FULFILLED`]: (state, { data }) => ({
        ...state,
        data
    }),

    // [`${ACTIONS.GET_DATA_CALL}_REJECTED`]: (state, { licenseTypeInit }) => ({
    //     ...state,
    //     licenseTypeInit
    // }),

    // [`${ACTIONS.GET_DATA_CALL}_PENDING`]: (state, { licenseTypeInit }) => ({
    //     ...state,
    //     licenseTypeInit
    // }),



    [ACTIONS.SET_DISPLAYED_DATA]: (state, { dataLength }) => {
        const displayedData = [];
        for (let i = 0; i < dataLength; i++) {
            displayedData[i] = state.data[i];
        }
        return {
            ...state,
            displayedData
        };
    },

//--------------------------------------------------------------------
    [ACTIONS.SET_FILTERING_TYPE]: (state, { filteringType }) => ({
        ...state,
        filteringType
    }),

    [ACTIONS.SET_FILTERING_OPTIONS]: (state, { filteringOptions }) => ({
        ...state,
        filteringOptions
    }),

    [ACTIONS.SET_SORTING_TYPE]: (state, { sortingType }) => ({
        ...state,
        sortingType
    }),

    [ACTIONS.SET_SEARCHING_TYPE]: (state, { searchingType }) => ({
        ...state,
        searchingType
    }),

    [ACTIONS.SET_SEARCHING_VALUE]: (state, { searchingValue }) => ({
        ...state,
        searchingValue
    })

}, defaultState);
