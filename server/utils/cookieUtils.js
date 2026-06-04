export const setAuthCookie = (res, token) => {
    res.cookie('authToken', token, { 
        httpOnly: true, 
        secure: true,
        sameSite: 'None',
        maxAge: 3600000
    });
}
export const clearAuthCookie = (res) => {
    res.clearCookie('authToken', {
        httpOnly: true,
        secure: true
    });
};