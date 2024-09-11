<template>
  <div class="card">
    <div
      class="img"
      :style="{ backgroundImage: `url(${item.image_url})` }"
    ></div>

    <span class="container-buttons">
      <button @click.stop="toggleFavoriteItem(item)">
        <FontAwesomeIcon
          v-if="!item.favorite"
          icon="fa-regular fa-heart"
          class="ic"
        />
        <FontAwesomeIcon v-else icon="fa-solid fa-heart" class="ic" />
      </button>

      <button @click.stop="toggleCartItem(item)">
        <FontAwesomeIcon
          v-if="!item.cart"
          :icon="['fas', 'cart-shopping']"
          class="ic"
        />
        <FontAwesomeIcon v-else :icon="['fas', 'cart-plus']" class="ic" />
      </button>
    </span>

    <section class="description">
      <p>{{ item.name }}</p>
      <div class="line"></div>
      <div style="display: flex; justify-content: space-between">
        <p class="price">R${{ item.price }}</p>
        <p v-if="item.discount >= 1" class="promotion">-{{ item.discount }}%</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { baseStore } from '@/stores/baseStore'
import { IBlouse, IShoe } from '@/types'
import { Vue, Options } from 'vue-class-component'
import productApi from '@/services/productApi'

@Options({
  props: {
    item: { type: Object, required: true }
  }
})
export default class CardItems extends Vue {
  item!: IBlouse | IShoe
  public store = baseStore()
  private user = {
    uid: 1,
    name: 'Lucas Bretzke',
    email: 'lucasbretzke@example.com',
    favoriteItems: [],
    cartItems: [],
    isAuthenticated: true
  }

  public toggleFavoriteItem(item: any) {
    if (this.user.isAuthenticated) {
      !item.favorite
        ? this.addToFavorites(item)
        : this.removeFromFavorites(item)
    } else {
      this.store.isLogin = true // Exibe modal de login
    }
  }

  public toggleCartItem(item: any) {
    if (this.user.isAuthenticated) {
      !item.cart ? this.addToCart(item) : this.removeFromCart(item)
    } else {
      this.store.isLogin = true // Exibe modal de login
    }
  }

  // Adiciona o item aos favoritos
  public async addToFavorites(item: IBlouse | IShoe) {
    try {
      item.favorite = true
      await this.editItem(item)
      await productApi.postItemInFavorites(item)
    } catch (error) {
      console.error('Error adding to favorites:', error)
    } finally {
      this.store.getDone = !this.store.getDone
    }
  }

  // Remove o item dos favoritos
  public async removeFromFavorites(item: any) {
    try {
      item.favorite = false
      await this.editItem(item)
      await productApi.deleteItemFromFavorites(item.id)
    } catch (error) {
      console.error('Error removing from favorites:', error)
    } finally {
      this.store.getDone = !this.store.getDone
    }
  }

  // Emite o evento para adicionar ao carrinho
  public addToCart(item: any) {
    console.log('adicionando do carrinho')
  }

  // Emite o evento para remover do carrinho
  public removeFromCart(item: any) {
    console.log('removendo do carrinho')
  }

  // Edita o item no sistema
  public async editItem(item: IBlouse | IShoe) {
    try {
      await productApi.putBlouse(item)
    } catch (error) {
      console.error('Error updating item:', error)
    }
  }
}
</script>

<style scoped lang="less">
.card {
  width: 256px;
  height: 300px;

  position: relative;

  opacity: 0px;
  cursor: pointer;
  border-radius: 8px 8px 0px 0px;

  .img {
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    display: flex;
    align-items: flex-end;
    border: 3px solid white;
    border-radius: 8px 8px 0 0;

    &:hover {
      border: 3px solid var(--color-primary);
    }
  }
}

.container-buttons {
  width: auto;
  height: 53px;
  padding: 5px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;

  border-radius: 4px;
  background-color: rgba(255, 255, 255, 0.663);

  button {
    border: none;
    cursor: pointer;
    background-color: transparent;

    &:hover {
      scale: 1.2;
    }

    .ic {
      height: 16px;
      width: 16px;
    }
  }
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

  .promotion {
    color: rgb(18, 167, 18);
    font-weight: 600;
    margin-left: 10px;
  }

  .line {
    width: 100%;
    border: 1px solid #9595951a;
  }
}
</style>
