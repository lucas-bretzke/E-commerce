import productApi from '@/services/productApi'
import { defineStore } from 'pinia'
import { Product } from '@/types'

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
    baseProducts: [] as Product[],
    productsInCart: [] as Product[],
    showLoginScreen: false,
    favoritesCounter: 0,
    cartCounter: 0,
    cookieAcceptanceModal: false
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

        this.updateCounters()
        this.dataCartItems()
      } catch (error) {
        console.error('Erro ao obter produtos:', error)
      }
    },

    dataCartItems() {
      this.productsInCart = this.baseProducts.filter(
        (product: Product) => product.cart === true
      )
    },

    totalCartValue() {
     return this.productsInCart
        .reduce((total, product) => total + product.price, 0)
        .toFixed(2)
    },

    updateCounters() {
      const favorites = this.baseProducts.filter(
        product => product.favorites
      ).length
      const cart = this.baseProducts.filter(product => product.cart).length

      this.favoritesCounter = favorites
      this.cartCounter = cart
    }
  }
})
