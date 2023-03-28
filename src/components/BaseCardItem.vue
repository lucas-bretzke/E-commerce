<template>
  <div class="card">
    <section class="container-img">
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
    </section>
    <section class="description">
      <h5>{{ item.name }}</h5>
      <p>{{ item.collection }}</p>
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
import axios from "axios";
import { Vue, Options } from "vue-class-component";
import { IBlusa } from "@/types";

@Options({
  props: {
    item: { type: Object, required: true },
  },
})
export default class BaseCardItems extends Vue {
  $store: any;
  item: any;

  public async addFavorite(item: IBlusa) {
    try {
      if (!item.favorite) item.favorite = true;
      else item.favorite = false;
      await axios.put(`http://localhost:3000/blusas/${item.id}`, item);
      this.$store.state.getDone = !this.$store.state.getDone;
    } catch (error) {
      console.log(error);
    }
  }
}
</script>




<style scoped lang="less">
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
</style>