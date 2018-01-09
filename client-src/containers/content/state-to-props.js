export default (state) => {
    const sortingType = state.initReducer.sortingType || '';
    const filteringType = state.initReducer.filteringType || '';
    const searchingType = state.initReducer.searchingType || '';
    const searchingValue = state.initReducer.searchingValue || '';
    const filteringOptions = state.initReducer.filteringOptions || {};
    const cursor = state.initReducer.cursor || 1;
    const displayedData = state.initReducer.displayedData || [];
    const dataLength = state.initReducer.data.length || 0;
    return {
        sortingType,
        filteringType,
        searchingType,
        searchingValue,
        filteringOptions,
        cursor,
        displayedData,
        dataLength
    };
};