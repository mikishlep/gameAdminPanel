import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import AuthForm from "../pages/AuthForm.vue";
import Statistics from "../pages/Statistics.vue";

export const RouteNames = {
    Auth: "Auth",
    Statistics: "Statistics",
} as const;

const routes: RouteRecordRaw[] = [
    { path: "/auth", name: RouteNames.Auth, component: AuthForm },
    { path: "/", name: RouteNames.Statistics, component: Statistics }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
export type RouteName = typeof RouteNames[keyof typeof RouteNames];