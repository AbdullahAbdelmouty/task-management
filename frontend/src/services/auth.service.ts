import api from './axios';
const API_URL = import.meta.env.VITE_API_URL;

export interface LoginPayload {
    email?: string;
    password?: string;
}

export interface LoginResponse {
    accessToken: string;
}

export const loginRequest = async (
    payload: LoginPayload,
): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>(
        `${API_URL}/auth/login`,
        {
            emailOrPhone: payload.email,
            password: payload.password,
        },
    );

    return response.data;
};
