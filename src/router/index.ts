import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import { useUserStore } from "@/stores/user.ts";

import AuthForm from "../pages/AuthForm.vue";
import Dashboard from "../pages/Dashboard.vue";
import Users from "../pages/Users.vue";
import Promocodes from "../pages/Promocodes.vue";

export const RouteNames = {
    Auth: "Auth",
    Dashboard: "Dashboard",
    Users: "Users",
    Promocodes: "Promocodes",
} as const;

const routes: RouteRecordRaw[] = [
    { path: "/auth", name: RouteNames.Auth, component: AuthForm },
    { path: "/", name: RouteNames.Dashboard, component: Dashboard },
    { path: "/users", name: RouteNames.Users, component: Users },
    { path: "/promocodes", name: RouteNames.Promocodes, component: Promocodes },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// не дает без логина пройти дальше
router.beforeEach((to, _from, next) => {
    const userStore = useUserStore();
    userStore.restoreSession(); // восстанавливаем всегда

    if (!userStore.isLoggedIn && to.name !== RouteNames.Auth) {
        return next({ name: RouteNames.Auth });
    }

    if (userStore.isLoggedIn && to.name === RouteNames.Auth) {
        return next({ name: RouteNames.Dashboard });
    }

    next();
});

export default router;
export type RouteName = typeof RouteNames[keyof typeof RouteNames];