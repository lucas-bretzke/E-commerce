import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
    state: () => {
        return {
            count: 0,
            itemIdInDetail: 0,
            favoritesCounter: 0,
            cartCounter: 0,
            cookieAcceptanceModal: false,
            getDone: false
        }
    },
})