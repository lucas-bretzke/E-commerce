<template>
  <div class="see-more-buttons">
    <button class="see-news-button">NOVIDADES</button>
    <button class="see-all-button">VER TUDO</button>
  </div>
  <main class="container">
    <section class="container_cards">
      <div v-for="item in dataItems.blusas" :key="item" class="card">
        <div class="container-img"><img src="" alt="" />IMG</div>

        <div class="container-text">
          <p>{{ item.nome }}</p>
          <p>{{ item.marca }}</p>
          <p>{{ item.preco }}</p>
        </div>
      </div>
    </section>
  </main>
</template>


<script lang="ts">
import productService from "@/services/productService";
import { IBlusa } from "@/types";
import { Vue, Options } from "vue-class-component";

@Options({ props: {} })
export default class ProductCarousel extends Vue {
  public dataItems: IBlusa[] = [];

  async getItems() {
    try {
      const response = await productService.get();
      this.dataItems = response;
    } catch (error) {
      console.log(error);
    }
  }

  mounted() {
    this.getItems();
  }
}
</script>


<style scoped lang="less">
.see-more-buttons {
  border: 1px solid green;
  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 30px;

  .see-news-button,
  .see-all-button {
    background-color: transparent;
    border: none;
    font-weight: 600;
    font-size: 15px;
    border-bottom: 1px solid black;
    cursor: pointer;
  }
}

.container {
  width: 100%;
  height: auto;
  margin-bottom: 40px;
  overflow-x: scroll;
  overscroll-behavior-x: smooth;
  overflow-y: hidden;
  white-space: nowrap;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &_cards {
    width: 3500px;
    display: flex;

    .card {
      width: 21vw;
      height: 340px;
      margin: 0px 10px;
      text-align: left;
      border: 1px solid transparent;

      .container-img {
        width: 100%;
        height: 270px;
        background-color: rgb(220, 220, 220);
      }
      .container-text {
        width: 100%;
        height: 270px;
        border: 1px solid blue;
      }
    }

    .card:hover {
      cursor: pointer;
      border: 1px solid black;
    }
  }
}
.container::-webkit-scrollbar {
  display: none;
}
</style>