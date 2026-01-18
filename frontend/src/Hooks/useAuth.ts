import { useState } from 'react';
import { loginRequest, registerRequest } from '../services/auth.service';
import type {
    LoginPayload,
    RegisterPayload,
} from '../types/auth.types';
import { useNavigate } from 'react-router';

const TOKEN_KEY = 'accessToken';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const login = async (payload: LoginPayload) => {
        setLoading(true);
        try {
            const data = await loginRequest(payload);
            localStorage.setItem(TOKEN_KEY, data.accessToken);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const register = async (payload: RegisterPayload) => {
        setLoading(true);
        try {
            const data = await registerRequest(payload);
            localStorage.setItem(TOKEN_KEY, data.accessToken);
            return data;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        navigate('/login');
    };

    const isAuthenticated = Boolean(localStorage.getItem(TOKEN_KEY));

    return {
        login,
        register,
        logout,
        isAuthenticated,
        loading,
    };
};

export default useAuth;
