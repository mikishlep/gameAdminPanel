import { api } from "./apiClient.ts";

// oauth_client - telegram-app (получаем юзеров из тг)

export interface UsersFormData {
    id_user: number;
    offset: number;
    limit: number;
}

export interface AuthResponse {
    success: boolean;
    message?: string;
}

// --------------------------------

export async function getUsers(formData: UsersFormData): Promise<AuthResponse> {
    return api.post<AuthResponse>("/auth/get_users", formData, {
        params: { oauth_client: "telegram-app" },
        headers: { "Content-Type": "application/json" },
    });
}