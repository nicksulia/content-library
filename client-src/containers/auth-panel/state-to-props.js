export default (state) => {
    const username = state.authReducer.username || '';
    const isAuth = state.authReducer.isAuth || false;
    const serverError = state.errorReducer.serverError || null;
    return {
        isAuth,
        username,
        serverError
    };
};