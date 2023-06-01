import { defineStore } from 'pinia'
import { Auth } from "@/firebase";

export const baseStore = defineStore('my-baseStore', {
    state:  () => ({
        user: {
            name: '',
            email: '',
            password: '',
            phone: '',
            contactPreference: '',
            address: '',
            uid: ''
        },
        isLogin: false,
        itemIdInDetail: 0,
        favoritesCounter: 0,
        cartCounter: 0,
        cookieAcceptanceModal: false,
        getDone: false

    }),
    getters: {},
    actions: {
        checkUser() {
            const user = Auth.currentUser;
            user?.uid ? console.log("User logged in.") : console.log("No user logged in.");
        }
    }
})