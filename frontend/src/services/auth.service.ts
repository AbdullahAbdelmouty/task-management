import axios from 'axios';
import type {
    LoginPayload,
    RegisterPayload,
    AuthResponse,
} from '../types/auth.types';

const API_URL = import.meta.env.VITE_API_URL;

export const loginRequest = async (
    payload: LoginPayload,
): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(
        `${API_URL}/auth/login`,
        payload,
    );
    return data;
};

export const registerRequest = async (
    payload: RegisterPayload,
): Promise<AuthResponse> => {
    const { data } = await axios.post<AuthResponse>(
        `${API_URL}/auth/register`,
        payload,
    );
    return data;
};
