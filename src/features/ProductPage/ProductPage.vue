<template>
  <main>
    <section class="product-page">
      <buttom class="back-button" @click="$router.go(-1)"></buttom>

      <span>
        <div class="image-container">
          <img :src="product.image_url" alt="Product image" />
        </div>

        <div class="container-description">
          <h1>{{ product.name }}</h1>
          <p class="price">{{ product.price }}</p>

          <span class="shipping-info">
            *Frete de R$40,00 para todo o Brasil. Grátis para compras acima de
            R$900,00.
          </span>

          <p class="description-header">DESCRIÇÃO</p>
          <p class="product-description">{{ product.description }}</p>

          <button @click="addToCart">ADICIONAR AO CARRINHO</button>
        </div>
      </span>
    </section>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({
  props: {
    itemId: { type: Number, required: true }
  }
})
export default class ProductPage extends Vue {
  public product: Record<string, any> = {}

  mounted() {
    try {
      const selectedProduct = localStorage.getItem('selectedProduct')
      this.product = selectedProduct ? JSON.parse(selectedProduct) : {}
    } catch (error) {
      console.error('Error parsing product data from localStorage:', error)
      this.product = {}
    }
  }

  addToCart() {
    console.log('Product added to cart:', this.product.name)
  }
}
</script>

<style scoped lang="less">
main {
  width: 100%;
  height: calc(100vh - 120px);
  background-color: #f5f5f5;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 70px;

  .product-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 1200px;
    border: 1px solid #e0e0e0;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 20px;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }

    .back-button {
      width: 72px;
      height: 24px;

      background-image: url('../../assets/back-button.png');
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
      border: none;
      cursor: pointer;
      outline: none;
    }

    .image-container {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;

      img {
        max-width: 100%;
        max-height: 500px;
        object-fit: cover;
        border-radius: 8px;
        border: 1px solid #ddd;
      }
    }

    .container-description {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      padding: 20px;
      max-width: 500px;

      h1 {
        font-size: 32px;
        font-weight: 600;
        color: #333;
        margin-bottom: 20px;
      }

      .price {
        color: #09090a;
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: 600;
        line-height: 30px;
      }

      .shipping-info {
        color: #999;
        margin-bottom: 20px;
        font-size: 12px;
        line-height: 18px;
      }

      .description-header {
        font-size: 16px;
        font-weight: 600;
        color: #999;
        margin-bottom: 10px;
      }

      .product-description {
        color: #666;
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
        text-align: left;
        margin-bottom: 30px;
      }

      button {
        width: 100%;
        height: 50px;
        background-color: #115d8c;
        color: white;
        font-size: 18px;
        font-weight: 600;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 10%;

        &:hover {
          background-color: #146ca2;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .product-page {
      flex-direction: column;

      .image-container,
      .container-description {
        width: 100%;
        max-width: 100%;
        padding: 0;
        margin-bottom: 20px;
      }

      .container-description button {
        margin-top: 20px;
      }
    }
  }
}
</style>
