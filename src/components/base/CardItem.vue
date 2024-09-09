<template>
  <div class="card">
    <div class="img" :style="`background-image: url(${item.image_url})`"></div>

    <!-- <button class="btn-add-to-favorite" @click.stop="checkUser">
        <FontAwesomeIcon
          v-if="!item.favorite"
          icon="fa-regular fa-heart"
          class="ic-heart"
        />
        <FontAwesomeIcon v-else icon="fa-solid fa-heart" class="ic-heart" />
      </button>

      <button class="btn-add-to-cart" @click.stop="addCart(item)">
        <FontAwesomeIcon
          v-if="!item.cart"
          :icon="['fas', 'cart-shopping']"
          class="ic-cart"
          @click="addToCart"
        />
        <FontAwesomeIcon
          v-else
          :icon="['fas', 'cart-plus']"
          class="ic-cart"
          @click="removeFromCart"
        />
      </button> -->

    <section class="description">
      <p>{{ item.name }}</p>

      <div class="line"></div>

      <p class="price">R${{ item.price }}</p>
      <!-- <p v-if="item.discount >= 1" class="promotion">
          -{{ item.discount }} %
        </p> -->

      <!-- <p>{{ item.brand }}</p> -->
    </section>
  </div>
</template>

<script lang="ts">
import { baseStore } from '@/stores/baseStore'
import { IBlouse, IShoe } from '@/types'
import { Vue, Options } from 'vue-class-component'
import productApi from '@/services/productApi'
import axios from 'axios'

@Options({
  props: {
    item: { type: Object, required: true }
  }
})
export default class CardItems extends Vue {
  item!: IBlouse | IShoe
  public store = baseStore()

  public checkUser() {
    const user = {
      uid: 1, // Id do usuário (um número único)
      name: 'Lucas Bretzke', // Nome do usuário
      email: 'lucasbretzke@example.com', // Email do usuário
      favoriteItems: [], // Lista de itens favoritos (pode ser preenchida com ids de itens, por exemplo)
      cartItems: [], // Lista de itens no carrinho
      isAuthenticated: true // Defina se o usuário está autenticado
    }

    user?.uid
      ? this.addOrRemoveFromFavorites(this.item)
      : (this.store.isLogin = true)
  }

  public async addOrRemoveFromFavorites(item: IBlouse | IShoe) {
    !item.favorite ? this.addToFavorite(item) : this.deleteToFavorite(item)
  }

  public async addToFavorite(item: any) {
    try {
      item.favorite = true
      this.editItem(item)
      await productApi.postItemInFavorites(item)
    } catch (error) {
      console.log('POST ERROR', error)
    } finally {
      this.store.getDone = !this.store.getDone
    }
  }

  public async deleteToFavorite(item: any) {
    try {
      item.favorite = false
      await this.editItem(item)
      await productApi.deleteItemFromFavorites(item.id)
    } catch (error) {
      console.log('DELETE ERROR', error)
    } finally {
      this.store.getDone = !this.store.getDone
    }
  }

  public addToCart() {
    // Adicione lógica para adicionar o item ao carrinho
    this.$emit('add-to-cart', this.item)
  }
  public removeFromCart() {
    // Adicione lógica para remover o item do carrinho
    this.$emit('remove-from-cart', this.item)
  }

  public async editItem(item: IBlouse | IShoe) {
    try {
      await productApi.putBlouse(item)
    } catch (error) {
      console.log('PUT ERROR', error)
    }
  }
}
</script>

<style scoped lang="less">
.card {
  width: 256px;
  height: 300px;

  cursor: pointer;

  top: 224px;
  left: 160px;
  gap: 0px;
  border-radius: 8px 8px 0px 0px;
  opacity: 0px;

  .img {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    border-radius: 8px 8px 0 0;
  }
}

.btn-add-to-favorite {
  height: 30px;
  margin-left: -30px;
  margin-top: 5px;
  border: none;
  cursor: pointer;
  background-color: transparent;

  .ic-heart {
    height: 16px;
    width: 16px;

    &:hover {
      transform: translateZ(0px) scale(105%);
    }
  }
}
.btn-add-to-cart {
  height: 30px;
  margin-left: -30px;
  margin-top: 30px;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.description {
  width: 256px;
  height: 78px;
  padding: 5px 12px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  border-radius: 0px 0px 4px 4px;
  background-color: white;

  p {
  }

  .price {
    font-weight: bold;
  }

  .line {
    width: 100%;
    border: 1px solid #9595951a;
  }
}
</style>
