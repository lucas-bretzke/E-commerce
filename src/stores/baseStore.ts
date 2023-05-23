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
            isLogin: true,
            itemIdInDetail: 0,
            favoritesCounter: 0,
            cartCounter: 0,
            cookieAcceptanceModal: false,
            getDone: false
        }
    },
    actions: {
        checkUser() {
            Auth.onAuthStateChanged((user) => {
                if (user) {
                    console.log("Usuário logado.");
                    this.user.name === user.displayName
                    this.user.email === user.email
                    this.isLogin = false;
                } else {
                    console.log("Nenhum usuário logado.");
                }
            });
        }
    },
    getters: {}
})