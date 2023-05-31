import { defineStore } from 'pinia'
import { Auth } from "@/firebase";

export const baseStore = defineStore('my-baseStore', {
    state: () => {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                phone: '',
                contactPreference: '',
                address: '',
            },
            isLogin: false,
            itemIdInDetail: 0,
            favoritesCounter: 0,
            cartCounter: 0,
            cookieAcceptanceModal: false,
            getDone: false
        }
    },
    actions: {
        checkUser() {
            const user = Auth.currentUser;
            if (user?.uid) {
                console.log("Usuário logado.");
            } else {
                console.log("Nenhum usuário logado.");
            }
        }
    },
    getters: {}
})