import { defineStore } from 'pinia';

interface UserState {
    userName: string | null;
    isLoggedIn: boolean;
    firstName: string | null;
    lastName: string | null;
}

export const useUserStore = defineStore('user', {
    state: (): UserState => ({
        userName: null,
        isLoggedIn: false,
        firstName: null,
        lastName: null,
    }),
    actions: {
        login(userName: string, firstName: string, lastName: string) {
            this.userName = userName;
            this.firstName = firstName;
            this.lastName = lastName;
            this.isLoggedIn = true;
        },
        logout() {
            this.userName = null;
            this.firstName = null;
            this.lastName = null;
            this.isLoggedIn = false;
        }
    }
});