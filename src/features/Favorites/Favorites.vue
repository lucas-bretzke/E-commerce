<template>
  <div class="body">
    <BackToTopButton />
    <main class="center">
      <section class="catalog-filters"></section>
      <section class="container-cards">
        <p v-if="store.favoritesCounter === 0" class="msg-error">
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            class="ic_cart-shopping"
          />
          NENHUM ITEM SALVO!
        </p>
        <div v-else v-for="item in dataFavorites" :key="item">
          <CardItems :item="item" class="card" />
        </div>
      </section>
    </main>
  </div>
</template>


<script lang="ts">
import { baseStore } from "@/stores/baseStore";

import productApi from "@/services/productApi";
import CardItems from "@/components/base/CardItem.vue";
import BackToTopButton from "@/components/BackToTopButton.vue"; // Adicionado o sinal de igual (=)
import { Options, Vue } from "vue-class-component";

@Options({ components: { CardItems, BackToTopButton } })
export default class Favorites extends Vue {
  public dataFavorites = [];
  public store = baseStore();

  private async getFavorites() {
    try {
      const response = await productApi.getFavorites();
      this.dataFavorites = response;
    } catch (error) {
      console.log(error);
    }
  }

  mounted() {
    this.getFavorites();
  }
}
</script>


<style lang="less" scoped>
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

  .catalog-filters {
    width: 228px;
    height: auto;
    max-height: 1000px;
    background-color: #4444;
  }
  .container-cards {
    max-width: 970px;
    height: auto;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    .card {
      margin-bottom: 20px;
      border-bottom: 1px solid black;
      border-radius: 2px;
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