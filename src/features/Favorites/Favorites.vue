<template>
  <div class="body">
    <h1>Favorites</h1>
    <main class="center">
      <section class="catalog-filters"></section>
      <section class="container-cards">
        <div v-for="item in dataItems" :key="item">
          <BaseCardItems v-if="item.favorite" :item="item" />
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
      console.log("get favorites");
    } catch (error) {
      console.log(error);
    }
  }

  mounted() {
    this.getItems();
  }
}
</script>


<style lang="less" scoped>
.body {
  background-color: #baa67f;
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
  }
}
</style>