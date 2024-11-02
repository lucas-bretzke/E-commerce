import productApi from '@/services/productApi'
import { defineStore } from 'pinia'
import { Product, Order } from '@/types'

// Definindo a interface para os métodos de pagamento
interface PaymentMethod {
  id: number
  name: string
}

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
    cookieAcceptanceModal: false,
    paymentMethods: [] as PaymentMethod[], // Métodos de pagamento com o tipo definido
    orderHistory: [] as Order[], // Histórico de pedidos
    couponCode: '', // Código do cupom
    appliedCoupon: null // Detalhes do cupom aplicado
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

    calculateShipping(cep: any) {
      const faixasDeFrete = [
        { minCep: 1000000, maxCep: 1999999, valorFrete: 10.0 },
        { minCep: 2000000, maxCep: 2999999, valorFrete: 15.0 },
        { minCep: 3000000, maxCep: 3999999, valorFrete: 20.0 },
        { minCep: 4000000, maxCep: 4999999, valorFrete: 25.0 },
        { minCep: 5000000, maxCep: 5999999, valorFrete: 30.0 },
        { minCep: 6000000, maxCep: 6999999, valorFrete: 35.0 },
        { minCep: 7000000, maxCep: 7999999, valorFrete: 40.0 },
        { minCep: 8000000, maxCep: 8999999, valorFrete: 45.0 },
        { minCep: 9000000, maxCep: 9999999, valorFrete: 50.0 },
        { minCep: 10000000, maxCep: 19999999, valorFrete: 55.0 }
      ]

      const cepNumerico = parseInt(cep.replace(/\D/g, ''), 10)

      for (let i = 0; i < faixasDeFrete.length; i++) {
        const faixa = faixasDeFrete[i]
        if (cepNumerico >= faixa.minCep && cepNumerico <= faixa.maxCep) {
          return faixa.valorFrete.toFixed(2)
        }
      }

      const defaul = 55
      return defaul.toFixed(2)
    },

    applyCoupon(code: string) {
      this.couponCode = code
      if (code === 'PROMO10') {
        const discount = (this.totalCartValue() * 0.1).toFixed(2)
        this.appliedCoupon = { code, discount }
      } else {
        this.appliedCoupon = null
        console.error('Cupom inválido!')
      }
    },

    addOrder(order: Order) {
      this.orderHistory.push(order)
    },

    listPaymentMethods() {
      this.paymentMethods = [
        { id: 1, name: 'Cartão de Crédito' },
        { id: 2, name: 'Boleto' },
        { id: 3, name: 'PayPal' }
      ]
    }
  }
})
