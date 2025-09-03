import { api } from "./apiClient.ts";

export interface RegisterFormData {
    userName: string;
    passUser: string;
    email: string;
    firstName: string;
    lastName: string;
}

export interface RegisterResponse {
    success: boolean;
    message?: string;
}

export async function register(formData: RegisterFormData): Promise<RegisterResponse> {
    return api.post<RegisterResponse>("/auth/register", formData, {
        params: { oauth_client: "my-admin_panel" },
        headers: { "Content-Type": "application/json" },
    });
}