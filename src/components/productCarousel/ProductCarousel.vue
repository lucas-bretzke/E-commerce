<template>
  <div class="see-more-buttons">
    <button class="see-news-button">
      {{ title }}
      <FontAwesomeIcon icon="fa-solid fa-arrow-right" class="ic-arrow" />
    </button>
    <div class="view-more-buttons">
      <button class="move-scroll" @click="moveScroll(-942)">
        <FontAwesomeIcon icon="fa-solid fa-chevron-left" size="xl" />
      </button>
      <button class="move-scroll" @click="moveScroll(+942)">
        <FontAwesomeIcon icon="fa-solid fa-chevron-right" size="xl" />
      </button>
    </div>
  </div>
  <main class="container" ref="myScrollX">
    <section class="container_cards">
      <div v-for="item in dataItems" :key="item" class="card">
        <div class="container-img">
          <img :src="item.img" alt="" />
          <button class="btn-add-to-cart" @click="addFavorite(item)">
            <FontAwesomeIcon
              v-if="!item.favorite"
              icon="fa-regular fa-heart"
              class="ic-heart"
            />
            <FontAwesomeIcon v-else icon="fa-solid fa-heart" class="ic-heart" />
          </button>
          <div class="container-text">
            <p class="promotion">-{{ item.promotion }} %</p>
            <p class="price">R${{ item.price }}</p>
          </div>
        </div>
        <div class="description">
          <h5>{{ item.name }}</h5>
          <p>{{ item.collection }}</p>
          <div class="sizes">
            <span :class="item.sizes[0] ? 'size' : ''">{{
              item.sizes[0]
            }}</span>
            <span :class="item.sizes[1] ? 'size' : ''">{{
              item.sizes[1]
            }}</span>
            <span :class="item.sizes[2] ? 'size' : ''">{{
              item.sizes[2]
            }}</span>
            <span :class="item.sizes[3] ? 'size' : ''">{{
              item.sizes[3]
            }}</span>
            <span :class="item.sizes[4] ? 'size' : ''">{{
              item.sizes[4]
            }}</span>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>


<script lang="ts">
import axios from "axios";
import productService from "@/services/productService";
import { IBlusa } from "@/types";
import { Vue, Options } from "vue-class-component";

@Options({
  props: {
    title: { type: String, required: true },
  },
  watch: {
    "$store.state.getDone": function () {
      setTimeout(() => {
        this.getItems();
      }, 2000);
    },
  },
})
export default class ProductCarousel extends Vue {
  public dataItems: IBlusa[] = [];
  $store: any;

  public moveScroll(distance: number) {
    const container = this.$refs.myScrollX as HTMLElement;
    container.scrollLeft += distance;
  }

  public async addFavorite(item: IBlusa) {
    try {
      if (!item.favorite) item.favorite = true;
      else item.favorite = false;
      this.$store.state.getDone = !this.$store.state.getDone;
      await axios.put(`http://localhost:3000/blusas/${item.id}`, item);
    } catch (error) {
      console.log(error);
    }
  }

  private async getItems() {
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
  width: 1200px;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  margin-bottom: 30px;

  button {
    background-color: transparent;
    border: none;
    font-weight: 600;
    cursor: pointer;
    transition: 0.3s;
  }

  .see-news-button {
    font-size: 22px;

    .ic-arrow {
      transition: transform 0.3s ease-out;
    }
  }
  .move-scroll {
    font-size: 13px;
    margin: 0px 6px;
    padding: 10px 12px;
  }
  .see-news-button:hover {
    color: var(--color-primary);
    transform: translateX(10px);

    .ic-arrow {
      animation: scale-fade 1s infinite ease-in-out;
    }
  }
  .move-scroll:hover {
    transform: translateZ(10px) scale(1.1);
    background-color: var(--color-primary);
  }
}
.container {
  height: auto;
  min-height: 380px;
  padding-left: 9vw;
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
      height: 368px;
      margin: 0 10px;
      text-align: left;
      border: 1px solid transparent;

      .container-img {
        width: 100%;
        height: 270px;
        background-color: rgb(220, 220, 220);
        display: flex;

        img {
          width: 100%;
          height: 100%;
        }

        .btn-add-to-cart {
          height: 30px;
          margin-left: -30px;
          margin-top: 15px;
          border: none;
          cursor: pointer;
          background-color: transparent;
          .ic-heart {
            height: 15px;
            width: 15px;
          }
          .ic-heart:hover {
            transform: translateZ(0px) scale(105%);
          }
        }

        .container-text {
          margin-left: -245px;
          margin-top: 228px;
          font-size: 13px;

          .promotion {
            width: 80%;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2px 2px 2px 2px;
            margin-bottom: 4px;
            font-weight: bold;
            background-color: white;
          }
          .price {
            padding: 4px 4px 0 4px;
            background-color: white;
          }
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

      .container-img {
        .container-text {
          transform: translateY(-10px);
          -webkit-transform: translateY(-10px);
          -moz-transform: translateY(-10px);
          transition: 0.3s ease-out;
        }
      }
    }
  }
}
.container::-webkit-scrollbar {
  display: none;
}

@keyframes scale-fade {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.25);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>