import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";

import Register from "../pages/Register.vue";
import Statistics from "../pages/Statistics.vue";

export const RouteNames = {
    Register: "Register",
    Statistics: "Statistics",
} as const;

const routes: RouteRecordRaw[] = [
    { path: "/registration", name: RouteNames.Register, component: Register },
    { path: "/", name: RouteNames.Statistics, component: Statistics }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
export type RouteName = typeof RouteNames[keyof typeof RouteNames];