<template>
  <main>
    <span>
      <h1>RESUMO DO PEDIDO</h1>
      <p class="productSubtotal">
        <span>Subtotal de produtos</span>
        <span>R$ {{ store.totalCartValue() }}</span>
      </p>

      <p class="delivery">
        <span>Entrega</span>
        <span>R$ {{ store.totalCartValue() }}</span>
      </p>

      <span class="line"></span>

      <h2 class="totalCartValue">
        <span>Total</span>
        <span>R$ {{ store.totalCartValue() }}</span>
      </h2>

      <button>Finalizar compra</button>
    </span>

    <li>
      <a href="">AJUDA</a>
      <a href="">REEMBOLSOS</a>
      <a href="">ENTREGAS E FRETE</a>
      <a href="">TROCAS E DEVOLUÇÕES</a>
    </li>
  </main>
</template>

<script lang="ts">
import { baseStore } from '@/stores/baseStore'
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class OrderSummary extends Vue {
  public store = baseStore()
}
</script>

<style lang="less" scoped>
main {
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 352px;
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h1 {
    color: #333;
    margin-bottom: 25px;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 20px;
    font-weight: 600;
    line-height: 30px;
    text-align: left;
  }

  p {
    color: #666;
    margin-bottom: 15px;

    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: left;
  }

  .productSubtotal,
  .delivery {
    display: flex;
    justify-content: space-between;
    color: rgb(105, 105, 105);
    font-size: 16px;
    font-weight: 600;
  }

  .line {
    display: block;
    width: 100%;
    height: 2px;
    background-color: #eee;
    margin: 25px 0;
  }

  .totalCartValue {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
    margin-top: 15px;
    color: rgb(105, 105, 105);
    font-size: 16px;
    font-weight: 600;
    color: black;

    span {
      width: auto;
    }
  }

  button {
    width: 304px;
    height: 44px;
    font-size: 12px;
    background: #51b853;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 10%;
    text-transform: uppercase;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
      background: #47a148;
      transform: translateY(-2px);
    }

    &:active {
      transform: translateY(1px);
    }
  }

  li {
    padding-top: 20px;
    border-top: 1px solid #ddd;
    display: block;
    width: 100%;

    a {
      display: block;
      text-decoration: none;
      color: #007bff;
      transition: color 0.3s ease;
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      text-align: left;
      margin-bottom: 10px;
      color: #737380;

      &:hover {
        color: #0056b3;
      }
    }
  }

  @media (min-width: 768px) {
    li {
      flex-direction: row;
      justify-content: space-between;
    }

    button {
      font-size: 22px;
    }
  }
}
</style>
