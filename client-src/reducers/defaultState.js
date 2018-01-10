
export const defaultState = Object.freeze({
    sortingType: '',
    filteringType: '',
    searchingType: '',
    searchingValue: '',
    filteringOptions: {},
    cursor: 1,
    data: [],
    displayedData: []
});

export const authState = Object.freeze({
    isAuth: false,
    username: '',
    token: ''
});

export const errState = Object.freeze({
    serverError: null
});