export default (state) => {
    const sortingType = state.initReducer.sortingType || '';
    const filteringType = state.initReducer.filteringType || '';
    const searchingType = state.initReducer.searchingType || '';
    const searchingValue = state.initReducer.searchingValue || '';
    const filteringOptions = state.initReducer.filteringOptions || {};
    const cursor = state.initReducer.cursor || 1;
    return {
        sortingType,
        filteringType,
        searchingType,
        searchingValue,
        filteringOptions,
        cursor
    };
};