export interface LoginPayload {
    emailOrPhone: string;
    password: string;
}

export interface RegisterPayload {
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role?: string;
}

export interface AuthResponse {
    accessToken: string;
}
