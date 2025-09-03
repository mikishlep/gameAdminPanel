import { api } from "./apiClient.ts";

export interface RegisterFormData {
    userName: string;
    passUser: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface LoginFormData {
    userName: string;
    passUser: string;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
}

// --------------------------------

export async function register(formData: RegisterFormData): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/register", formData, {
        params: { oauth_client: "my-admin_panel" },
        headers: { "Content-Type": "application/json" },
    });
}

export async function login(formData: LoginFormData): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/login", formData, {
        params: { oauth_client: "my-admin_panel" },
        headers: { "Content-Type": "application/json" },
    })
}