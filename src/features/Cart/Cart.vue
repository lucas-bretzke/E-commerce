<template>
  <main>
    <section class="center">
      <span style="display: flex; flex-direction: column">
        <buttom class="back-button" @click="$router.go(-1)"></buttom>
        <h1>SEU CARRINHO</h1>
        <h2>
          Total ({{ store.productsInCart.length }} produtos)
          <span class="totalCartValue">R${{ store.totalCartValue() }}</span>
        </h2>

        <div class="container-cards">
          <p v-if="!store.productsInCart" class="msg-error">
            <FontAwesomeIcon
              icon="fa-solid fa-cart-shopping"
              class="ic_cart-shopping"
            />
            SEU CARRINHO ESTÁ VAZIO!
          </p>
          <CartItems
            v-else
            v-for="item in store.productsInCart"
            :key="item.id"
            :item="item"
          />
        </div>
      </span>

      <OrderSummary />
    </section>

    <button class="scroll-to-top" @click="scrollToTop">
      <FontAwesomeIcon icon="fa-solid fa-caret-up" /> Topo
    </button>
  </main>
</template>

<script lang="ts">
import { baseStore } from '@/stores/baseStore'
import { Options, Vue } from 'vue-class-component'

// Components.
import CartItems from './components/CartProduct.vue'
import OrderSummary from './components/OrderSummary.vue'

@Options({ components: { CartItems, OrderSummary } })
export default class Cart extends Vue {
  public store = baseStore()

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

  .back-button {
    width: 72px;
    height: 24px;
    margin-bottom: 20px;

    background-image: url('../../assets/back-button.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    cursor: pointer;
    outline: none;
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

  .center {
    max-width: 1200px;
    display: flex;
    margin: 0 auto;
    padding-top: 30px;
    justify-content: space-between;

    h1 {
      max-width: 300px;
      margin: 0;
      padding: 0;
      display: flex;
      font-size: 32px;
      font-weight: 500;
      color: #41414d;
      justify-content: flex-start;
    }

    h2 {
      width: 201px;
      height: 24px;
      font-size: 16px;
      font-weight: 300;
      margin: 20px 0;
      margin-top: 15px;
      color: rgb(105, 105, 105);

      .totalCartValue {
        font-size: 16px;
        font-weight: 600;
        line-height: 24px;
        color: black;
      }
    }

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
}
</style>
