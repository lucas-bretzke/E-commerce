<template>
  <div class="card" @click="viewProductDetails(item)">
    <div
      class="img"
      :style="{ backgroundImage: `url(${item.image_url})` }"
    ></div>

    <section class="container-description">
      <span class="top">
        <p class="name">{{ item.name }}</p>
        <button @click.stop="toggleItem(item)">
          <FontAwesomeIcon
            v-if="item.cart"
            :icon="['fas', 'cart-shopping']"
            class="ic"
          />
        </button>
      </span>

      <p class="description">
        Aqui vem um texto descritivo do produto, esta caixa de texto servirá
        apenas de exemplo para que simule algum texto que venha a ser inserido
        nesse campo, descrevendo tal produto.
      </p>

      <sapn class="botton">
        <button @click.stop="console.log('clicou')">count 1</button>
        <p class="price">R${{ item.price }}</p>
      </sapn>
    </section>
  </div>
</template>

<script lang="ts">
import { baseStore } from '@/stores/baseStore'
import { Vue, Options } from 'vue-class-component'

// Types
import { Product } from '@/types'
import productApi from '@/services/productApi'

@Options({
  props: {
    item: { type: Object as () => Product, required: true }
  }
})
export default class CartItems extends Vue {
  public store = baseStore()

  viewProductDetails(item: Product) {
    localStorage.setItem('selectedProduct', JSON.stringify(item))
    this.$router.push('ProductPage')
  }

  async toggleItem(item: Product) {
    const updatedData = {
      ...item,
      cart: !item.cart
    }

    try {
      const updatedProduct = await productApi.setProduct(item.id, updatedData)
      console.log('Produto atualizado:', updatedProduct)
    } catch (error) {
      console.error('Erro ao atualizar o produto:', error)
    }
  }
}
</script>

<style scoped lang="less">
.card {
  position: relative;
  cursor: pointer;
  margin-bottom: 30px;
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 736px;
  height: 211px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  .img {
    width: 256px;
    height: 211px;
    background-position: center;
    background-size: cover;
    border-radius: 8px 0 0 8px;
    transition: border 0.3s ease;
  }
}

button {
  border: none;
  cursor: pointer;
  background-color: transparent;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }

  .ic {
    height: 20px;
    width: 20px;
    color: var(--color-primary);
  }
}

.container-description {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 20px;
  width: 100%;

  .top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    .name {
      font-size: 20px;
      font-weight: bold;
      color: #333;
      flex-grow: 1;
      margin-right: 10px;
    }
  }

  .description {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
    line-height: 1.4;
  }

  .botton {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      padding: 8px 12px;
      background-color: var(--color-primary);
      color: white;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &:hover {
        background-color: var(--color-primary);
      }
    }

    .price {
      font-size: 18px;
      font-weight: bold;
      color: #000;
    }
  }

  .promotion {
    color: #12a712;
    font-weight: 600;
    margin-left: 10px;
  }
}
</style>
