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
    },

    calculateShipping(cep: string) {
      const faixasDeFrete = [
        { minCep: 1000000, maxCep: 1999999, valorFrete: 10.0 }, // Exemplo: Região 1
        { minCep: 2000000, maxCep: 2999999, valorFrete: 15.0 }, // Exemplo: Região 2
        { minCep: 3000000, maxCep: 3999999, valorFrete: 20.0 }, // Exemplo: Região 3
        { minCep: 4000000, maxCep: 4999999, valorFrete: 25.0 }, // Exemplo: Região 4
        { minCep: 5000000, maxCep: 5999999, valorFrete: 30.0 } // Exemplo: Região 5
      ]

      const cepNumerico = parseInt(cep.replace(/\D/g, ''), 10)

      // Verificar em qual faixa o CEP se encaixa
      for (let i = 0; i < faixasDeFrete.length; i++) {
        const faixa = faixasDeFrete[i]
        if (cepNumerico >= faixa.minCep && cepNumerico <= faixa.maxCep) {
          return faixa.valorFrete
        }
      }

      return 'CEP fora da área de entrega' 
    }
  }
})
