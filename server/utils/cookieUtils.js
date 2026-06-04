const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax'
};

export const setAuthCookie = (res, token) => {
    res.cookie('authToken', token, { 
        ...cookieOptions,
        maxAge: 3600000
    });
}
export const clearAuthCookie = (res) => {
    res.clearCookie('authToken', cookieOptions);
};