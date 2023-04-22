<template>
  <div class="body">
    <button class="scroll-to-top" @click="scrollToTop">
      <FontAwesomeIcon icon="fa-solid fa-caret-up" /> Topo
    </button>
    <main class="center">
      <section class="catalog-filters"></section>
      <section class="container-cards">
        <p v-if="$store.state.counterFavorites === 0" class="msg-error">
          <FontAwesomeIcon
            icon="fa-solid fa-cart-shopping"
            class="ic_cart-shopping"
          />
          SEU CARRINHO ESTÁ VAZIO!
        </p>
        <div v-else v-for="item in dataItems" :key="item">
          <CardItems v-if="item.favorite" :item="item" class="card" />
        </div>
      </section>
    </main>
  </div>
</template>


<script lang="ts">
import { IBlouse } from "@/types";
import productService from "@/services/productService";
import CardItems from "@/components/base/CardItem.vue";
import { Options, Vue } from "vue-class-component";

@Options({ components: { CardItems } })
export default class Favorites extends Vue {
  public dataItems: IBlouse[] = [];

  private async getItems() {
    try {
      const response = await productService.getBlouses();
      this.dataItems = response;
    } catch (error) {
      console.log(error);
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  mounted() {
    this.getItems();
  }
}
</script>


<style lang="less" scoped>

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