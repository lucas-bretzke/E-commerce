<template>
  <div class="card">
    <section class="container">
      <div class="img-item" :style="`background-image: url(${item.img})`">
        <div class="container-text">
          <p v-if="item.discount >= 1" class="promotion">
            -{{ item.discount }} %
          </p>
          <p class="price">R${{ item.price }}</p>
        </div>
      </div>

      <button class="btn-add-to-favorite" @click.stop="checkUser">
        <FontAwesomeIcon
          v-if="!item.favorite"
          icon="fa-regular fa-heart"
          class="ic-heart"
        />
        <FontAwesomeIcon v-else icon="fa-solid fa-heart" class="ic-heart" />
      </button>

      <button class="btn-add-to-cart" @click.stop="addCart(item)">
        <p v-if="!item.cart" class="is-heart">cart +</p>
        <p v-else class="is-heart">cart -</p>
      </button>
    </section>
    <section class="description">
      <h5>{{ item.name }}</h5>
      <h5>{{ item.colection }}</h5>
      <p>{{ item.brand }}</p>
      <div class="sizes">
        <span :class="item.sizes[0] ? 'size' : ''">{{ item.sizes[0] }}</span>
        <span :class="item.sizes[1] ? 'size' : ''">{{ item.sizes[1] }}</span>
        <span :class="item.sizes[2] ? 'size' : ''">{{ item.sizes[2] }}</span>
        <span :class="item.sizes[3] ? 'size' : ''">{{ item.sizes[3] }}</span>
        <span :class="item.sizes[4] ? 'size' : ''">{{ item.sizes[4] }}</span>
      </div>
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
    if (user?.uid) {
      this.addOrRemoveFromFavorites(this.item)
    } else {
      this.store.isLogin = true
    }
  }

  public async addOrRemoveFromFavorites(item: IBlouse | IShoe) {
    if (!item.favorite) {
      this.addToFavorite(item)
    } else {
      this.deleteToFavorite(item)
    }
  }

  public async addToFavorite(item: IBlouse | IShoe) {
    try {
      item.favorite = !item.favorite
      this.editItem(item)
      await productApi.postItemInFavorites(item)
    } catch (error) {
      console.log('POST ERROR', error)
    } finally {
      this.store.getDone = !this.store.getDone
    }
  }

  public async deleteToFavorite(item: IBlouse | IShoe) {
    try {
      item.favorite = !item.favorite
      await this.editItem(item)
      await productApi.deleteItemFromFavorites(item.id)
    } catch (error) {
      console.log('DELETE ERROR', error)
    } finally {
      this.store.getDone = !this.store.getDone
    }
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
  width: 300px;
  height: 368px;
  margin: 0 10px;
  text-align: left;
  border: 1px solid transparent;

  .container {
    width: 100%;
    height: 270px;
    display: flex;
    background-color: rgb(220, 220, 220);
    padding: 10px;

    .img-item {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: cover;
      display: flex;
      align-items: flex-end;

      .container-text {
        font-size: 14px;
        margin-bottom: -10px;
        margin-left: -4px;

        .promotion {
          display: flex;
          align-items: center;
          justify-content: center;
          width: auto;
          max-width: 41px;
          padding: 2px 2px 2px 2px;
          margin-bottom: 4px;
          font-weight: bold;
          color: rgba(0, 0, 0, 0.569);
          background-color: white;
        }
        .price {
          width: auto;
          padding: 4px 4px 0 4px;
          background-color: white;
        }
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
  }

  .description {
    width: 100%;
    height: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      font-size: 14px;
    }

    .sizes {
      position: relative;
      display: flex;
      justify-content: flex-start;
      bottom: -15px;
      .size {
        padding: 5px;
        margin-right: 7px;
        font-size: 13px;
        margin-bottom: 5px;
        border: 1px solid black;
      }
    }
  }
}

.card:hover {
  cursor: pointer;
  border: 1px solid black;

  .container .img-item .container-text {
    transform: translateY(-10px);
    -webkit-transform: translateY(-10px);
    -moz-transform: translateY(-10px);
    transition: 0.3s ease-out;
  }
}
</style>
