import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import AuthForm from "../pages/AuthForm.vue";
import Dashboard from "../pages/Dashboard.vue";
import Users from "../pages/Users.vue";

export const RouteNames = {
    Auth: "Auth",
    Dashboard: "Dashboard",
    Users: "Users",
} as const;

const routes: RouteRecordRaw[] = [
    { path: "/auth", name: RouteNames.Auth, component: AuthForm },
    { path: "/", name: RouteNames.Dashboard, component: Dashboard },
    { path: "/users", name: RouteNames.Users, component: Users },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
export type RouteName = typeof RouteNames[keyof typeof RouteNames];