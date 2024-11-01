<template>
  <main>
    <button class="scroll-to-top" @click="scrollToTop">
      <FontAwesomeIcon icon="fa-solid fa-caret-up" /> Topo
    </button>
    <section class="center">
      <section class="container-cards">
        <p v-if="store.favoritesCounter === 0" class="msg-error">
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            class="ic_cart-shopping"
          />
          SEU CARRINHO ESTÁ VAZIO!
        </p>
        <CartItems
          v-else
          v-for="item in dataItems"
          :key="item.id"
          :item="item"
        />
      </section>
      <section class="order-summary"></section>
    </section>
  </main>
</template>

<script lang="ts">
import { baseStore } from '@/stores/baseStore'
import { Options, Vue } from 'vue-class-component'

// Components.
import CartItems from './components/CartProduct.vue'

// Types
import { Product } from '@/types'

@Options({ components: { CartItems } })
export default class Cart extends Vue {
  public store = baseStore()

  get dataItems(): Product[] {
    return this.store.baseProducts.filter(
      (product: Product) => product.cart === true
    )
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
</script>

<style lang="less" scoped>
main {
  background-color: #f5f5f5;
}

.scroll-to-top {
  position: fixed;
  width: 76px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  bottom: 80px;
  right: 20px;
  padding: 8px 13px;
  background-color: #e6e6e6;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #d7d7d7;
  }
}

h1 {
  width: 1200px;
  margin: 0 auto;
  padding: 40px 0;
  display: flex;
  font-size: 32px;
  font-weight: 600;
  -webkit-text-stroke: 1px #737373;
}
.center {
  max-width: 1200px;
  display: flex;
  margin: 30px auto;
  justify-content: space-between;

  .order-summary {
    width: 228px;
    height: auto;
    max-height: 1000px;
    background-color: #4444;
  }
  .container-cards {
    max-width: 970px;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    flex-wrap: wrap;

  }

  .msg-error {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 26px;
    padding: 4px 7px;
    border-bottom: 1px solid black;
  }
}
</style>
