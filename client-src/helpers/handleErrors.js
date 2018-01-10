export const handleServerErrors = (error, setAuthStatus) => {
    if (error.code === 'no.token') {
        setAuthStatus(false);
    } else if (error.code === 'token.expired') {
        sessionStorage.token = '';
        sessionStorage.username = '';
        setAuthStatus(false);
    }
};