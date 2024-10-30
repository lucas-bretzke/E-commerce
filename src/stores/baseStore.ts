import productApi from '@/services/productApi'
import { defineStore } from 'pinia'

export const baseStore = defineStore('my-baseStore', {
  state: () => ({
    user: {
      name: '',
      email: '',
      password: '',
      phone: '',
      contactPreference: '',
      address: '',
      uid: ''
    },
    baseProducts: [],
    showLoginScreen: false,
    itemIdInDetail: 0,
    favoritesCounter: 0,
    cartCounter: 0,
    cookieAcceptanceModal: false,
    getDone: false
  }),
  getters: {},
  actions: {
    checkUser() {
      this.user?.uid
        ? console.log('User logged in.')
        : console.log('No user logged in.')
    },

    setUserData(user: any) {
      this.user = user
    },

    async getAllProducts() {
      try {
        const data = await productApi.getBaseProducts()
        this.baseProducts = data
      } catch (error) {
        console.log({ error })
      }
    }
  }
})
