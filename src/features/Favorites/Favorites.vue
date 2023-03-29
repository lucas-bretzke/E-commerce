<template>
  <div class="body">
    <button class="scroll-to-top" @click="scrollToTop">
      <FontAwesomeIcon icon="fa-solid fa-caret-up" /> Topo
    </button>
    <h1>Favorites</h1>
    <main class="center">
      <section class="catalog-filters"></section>
      <section class="container-cards">
        <div v-for="item in dataItems" :key="item">
          <BaseCardItems v-if="item.favorite" :item="item" class="card" />
        </div>
      </section>
    </main>
  </div>
</template>


<script lang="ts">
import { IBlusa } from "@/types";
import productService from "@/services/productService";
import { Options, Vue } from "vue-class-component";
import BaseCardItems from "@/components/base/CardItem.vue";

@Options({ components: { BaseCardItems } })
export default class Favorites extends Vue {
  public dataItems: IBlusa[] = [];

  private async getItems() {
    try {
      const response = await productService.get();
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
.body {
  // background-color: #e8e7e3;
}

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
  font-size: 35px;
  font-weight: 600;
  -webkit-text-stroke: 1px #737373;
}
.center {
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
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
}
</style>