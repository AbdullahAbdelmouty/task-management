import { useEffect, useState } from 'react';
import { loginRequest } from '../services/auth.service';
import type { LoginPayload } from '../services/auth.service';

const TOKEN_KEY = 'accessToken';

const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        setIsAuthenticated(!!localStorage.getItem(TOKEN_KEY));
    }, []);

    const login = async (values: LoginPayload) => {
        const data = await loginRequest(values);
        localStorage.setItem(TOKEN_KEY, data.accessToken);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setIsAuthenticated(false);
    };

    return {
        isAuthenticated,
        login,
        logout,
    };
};

export default useAuth;
