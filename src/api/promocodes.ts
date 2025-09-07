import { api } from "./apiClient.ts";

export interface PromoFormData {
    user_id: number;
    admin_user_id: number;
}

export interface Promocode {
    id: number;
    userId: number;
    name: string;
    description: string;
    promoCount: number;
    status: boolean;
    tokenHash: string;
    createdAt: Date;
}

export type PromocodeResponse = Promocode[];

// --------------------------------

export async function getPromocodesByUser(user_id: number, admin_user_id: number): Promise<Promocode[]> {
    return (await api.post<Promocode[]>(
        "/coupon/get_by_any_user_id",
        {},
        {
            params: { user_id, admin_user_id },
            headers: { "Content-Type": "application/json" },
        }
    )).map(p => ({ ...p, createdAt: new Date(p.createdAt) }));
}