<template>
  <div class="card" @click="viewProductDetails(item)">
    <div
      class="img"
      :style="{ backgroundImage: `url(${item.image_url})` }"
    ></div>

    <span class="container-buttons">
      <button @click.stop="toggleFavoriteItem(item)">
        <FontAwesomeIcon
          v-if="!item.favorites"
          icon="fa-regular fa-heart"
          class="ic"
        />
        <FontAwesomeIcon v-else icon="fa-solid fa-heart" class="ic" />
      </button>

      <button @click.stop="toggleCartItem(item)">
        <FontAwesomeIcon
          v-if="item.cart"
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
import { Vue, Options } from 'vue-class-component'

// Types
import { Product } from '@/types'

@Options({
  props: {
    item: { type: Object, required: true }
  }
})
export default class CardItems extends Vue {
  public store = baseStore()

  viewProductDetails(item: Product) {
    localStorage.setItem('selectedProduct', JSON.stringify(item))
    this.$router.push('ProductPage')
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
  margin-bottom: 100px;

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
