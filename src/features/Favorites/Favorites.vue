<template>
  <div class="favorites-page">
    <BackToTopButton />
    <main class="content-wrapper">
      <!-- <section class="catalog-filters"></section> -->
      <section class="favorites-list">
        <p v-if="favoritesCount === 0" class="msg-error">
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            class="ic_cart-shopping"
          />
          NENHUM ITEM SALVO!
        </p>

        <CardItems
          v-else
          v-for="item in dataFavorites"
          :key="item.id"
          :item="item"
          class="card"
        />
      </section>
    </main>
  </div>
</template>

<script lang="ts">
import { baseStore } from '@/stores/baseStore'
import { Options, Vue } from 'vue-class-component'

// Components
import CardItems from '@/components/base/CardItem.vue'
import BackToTopButton from '@/components/BackToTopButton.vue'

// Types
import { Product } from '@/types'

@Options({ components: { CardItems, BackToTopButton } })
export default class Favorites extends Vue {
  public store = baseStore()

  get dataFavorites(): Product[] {
    return this.store.baseProducts.filter(
      (product: Product) => product.favorites === true
    )
  }

  get favoritesCount(): number {
    return this.dataFavorites.length
  }
}
</script>

<style lang="less" scoped>
.favorites-page {
  width: 100%;
  height: calc(100vh - 120px);
  padding: 30px 0;
  background-color: #f5f5f5;
}

.content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;

  .catalog-filters {
    width: 228px;
    background-color: #444;
    max-height: 1000px;
    padding: 20px;
  }

  .favorites-list {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .card {
      width: auto;
    }
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
