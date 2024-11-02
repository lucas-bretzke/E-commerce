import productApi from '@/services/productApi'
import { defineStore } from 'pinia'
import { Product, PaymentMethod, Order } from '@/types'

export const baseStore = defineStore('my-baseStore', {
  state: () => ({
    user: {
      name: '',
      email: '',
      phone: '',
      address: {
        city: '',
        state: '',
        street: '',
        country: '',
        postalCode: '323444'
      },
      uid: '',
      contactPreference: ''
    },
    order: JSON.parse(localStorage.getItem('orderData') || '{}') as Order,
    password: '',
    couponCode: '',
    cartCounter: 0,
    cookieAcceptanceModal: false,
    orderHistory: [] as Order[],
    baseProducts: [] as Product[],
    appliedCoupon: null as { code: string; discount: string } | null,
    paymentMethods: [] as PaymentMethod[],
    productsInCart: JSON.parse(
      localStorage.getItem('cartItems') || '[]'
    ) as Product[],
    showLoginScreen: false,
    favoritesCounter: 0
  }),

  actions: {
    setUserData(user: Partial<typeof this.user>) {
      this.user = { ...this.user, ...user }
    },

    updateLocalStorage() {
      localStorage.setItem('cartItems', JSON.stringify(this.productsInCart))
      localStorage.setItem('orderData', JSON.stringify(this.order))
    },

    async getAllProducts(forceUpdate = false) {
      if (!forceUpdate && this.baseProducts.length) {
        this.dataCartItems()
        this.updateCounters()
        this.calculateTotalOrder()
        return
      }

      try {
        const cachedProducts = JSON.parse(
          localStorage.getItem('baseProducts') || '[]'
        )
        if (cachedProducts.length && !forceUpdate) {
          this.baseProducts = cachedProducts
        } else {
          const data = await productApi.getBaseProducts()
          this.baseProducts = data
          localStorage.setItem('baseProducts', JSON.stringify(data))
        }

        this.dataCartItems()
        this.updateCounters()
        this.calculateTotalOrder()
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },

    dataCartItems() {
      this.productsInCart = this.baseProducts.filter(
        (product: Product) => product.cart
      )
      this.calculateTotalCartValue()
    },

    async toggleProduct(item: Product, type: 'favorites' | 'cart') {
      try {
        const updatedProduct = { ...item, [type]: !item[type] }
        await productApi.setProduct(item.id, updatedProduct)
        this.updateProductLocally(item.id, updatedProduct)
        this.updateCounters()
      } catch (error) {
        console.error(`Error updating product ${item.id}:`, error)
      }
    },

    updateProductLocally(productId: number, updatedData: Product) {
      const index = this.baseProducts.findIndex(
        product => product.id === productId
      )
      if (index !== -1) {
        this.baseProducts[index] = updatedData
        this.dataCartItems()
        this.calculateTotalOrder()
      }
    },

    calculateTotalCartValue() {
      const total = this.productsInCart.reduce(
        (sum, product) => sum + product.price,
        0
      )
      this.order.totalCartValue = parseFloat(total.toFixed(2))
      this.updateLocalStorage()
    },

    calculateTotalOrder() {
      this.calculateTotalCartValue()
      const shippingCost = parseFloat(this.calculateShipping())
      this.order.deliveryValue = shippingCost
      this.order.total = parseFloat(
        (this.order.totalCartValue + shippingCost).toFixed(2)
      )
      this.updateLocalStorage()
    },

    updateCounters() {
      this.favoritesCounter = this.baseProducts.filter(
        product => product.favorites
      ).length
      this.cartCounter = this.baseProducts.filter(
        product => product.cart
      ).length
    },

    loadCartData() {
      const savedProducts = JSON.parse(
        localStorage.getItem('cartItems') || '[]'
      )
      const savedOrder = JSON.parse(localStorage.getItem('orderData') || '{}')

      if (savedProducts.length) this.productsInCart = savedProducts
      if (savedOrder && Object.keys(savedOrder).length) this.order = savedOrder

      this.calculateTotalCartValue()
    },

    calculateShipping() {
      const cep = this.user.address.postalCode
      const shippingRates = [
        { minCep: 1000000, maxCep: 1999999, value: 10.0 },
        { minCep: 2000000, maxCep: 2999999, value: 15.0 },
        { minCep: 3000000, maxCep: 3999999, value: 20.0 },
        { minCep: 4000000, maxCep: 4999999, value: 25.0 },
        { minCep: 5000000, maxCep: 5999999, value: 30.0 },
        { minCep: 6000000, maxCep: 6999999, value: 35.0 },
        { minCep: 7000000, maxCep: 7999999, value: 40.0 },
        { minCep: 8000000, maxCep: 8999999, value: 45.0 },
        { minCep: 9000000, maxCep: 9999999, value: 50.0 },
        { minCep: 10000000, maxCep: 19999999, value: 55.0 }
      ]

      const numericCep = parseInt(cep.replace(/\D/g, ''), 10)

      const shipping = shippingRates.find(
        range => numericCep >= range.minCep && numericCep <= range.maxCep
      )
      return (shipping ? shipping.value : 55.0).toFixed(2)
    },

    addOrder(order: Order) {
      this.orderHistory.push(order)
      this.updateLocalStorage()
    },

    listPaymentMethods() {
      this.paymentMethods = [
        { id: 1, name: 'Credit Card' },
        { id: 2, name: 'Boleto' },
        { id: 3, name: 'PayPal' }
      ]
    }
  }
})
