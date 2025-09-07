import { defineStore } from "pinia";

interface UserState {
    userName: string | null;
    isLoggedIn: boolean;
    firstName: string | null;
    lastName: string | null;
    accessToken: string | null;
    userId: string | null;
}

export const useUserStore = defineStore("user", {
    state: (): UserState => ({
        userName: null,
        isLoggedIn: false,
        firstName: null,
        lastName: null,
        accessToken: null,
        userId: null,
    }),
    actions: {
        login(userName: string, firstName: string, lastName: string, token: string, userId: string) {
            this.userName = userName;
            this.firstName = firstName;
            this.lastName = lastName;
            this.accessToken = token;
            this.userId = userId;
            this.isLoggedIn = true;

            localStorage.setItem("access_token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("isLoggedIn", "true");
        },
        logout() {
            this.userName = null;
            this.firstName = null;
            this.lastName = null;
            this.accessToken = null;
            this.userId = null;
            this.isLoggedIn = false;

            localStorage.removeItem("access_token");
            localStorage.removeItem("userId");
            localStorage.removeItem("isLoggedIn");
        },
        restoreSession() {
            const token = localStorage.getItem("access_token");
            const userId = localStorage.getItem("userId");
            const loggedIn = localStorage.getItem("isLoggedIn") === "true";

            if (token && userId && loggedIn) {
                this.accessToken = token;
                this.userId = userId;
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        },
    },
});