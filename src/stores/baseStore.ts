import { defineStore } from 'pinia'

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
})