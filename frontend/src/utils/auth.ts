export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

export const isAuthenticated = (): boolean => {
    return !!getAccessToken();
};
