<template>
  <main class="home">
    <div class="background-top">
      <NavBar class="navBar">
        <template #Left> <span class="logo">FASHION AVENUE</span> </template>
        <template #Right>
          <li>
            <a href="">NEWS</a>
            <a href="">TEEN</a>
            <a href="">ABOUT</a>
            <a href="">PROMOTIONS</a>
            <button class="cart-btn">
              <ValueMarker
                v-if="$store.state.itemsInCart > 0"
                :value="0"
                class="ValueMarker"
              />
              <font-awesome-icon
                icon="fa-solid fa-cart-shopping"
                class="ic_cart-shopping"
              />
            </button>
            <button class="btn-login">LOGIN</button>
          </li>
        </template>
      </NavBar>
      <header class="center header-block">
        <ImageSlider
          :images="images"
          :progressionBar="true"
          :sliderControls="false"
          :setInterval="5000"
        />
      </header>
    </div>
    <ProductCarousel />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavBar from "@/components/baseNavBar/BaseNavBar.vue";
import InputLarge from "./components/InputLarge.vue";
import ImageSlider from "../../components/ImageSlider.vue";
import ValueMarker from "../../components/ValueMarker.vue";
import ProductCarousel from "@/components/productCarousel/ProductCarousel.vue";

@Options({
  components: {
    NavBar,
    InputLarge,
    ImageSlider,
    ValueMarker,
    ProductCarousel,
  },
})
export default class HomeView extends Vue {
  images = [
    {
      url: "/img/roupas03.jpg",
      alt: "Imagem 1",
    },
    {
      url: "/img/roupas01.webp",
      alt: "Imagem 2",
    },
    {
      url: "/img/roupas02.jpg",
      alt: "Imagem 3",
    },
  ];
}
</script>

<style scoped lang="less">
.center {
  max-width: 1000px;
  min-width: 300px;
  margin: 0 auto;
}

.background-top {
  width: 100%;
  height: 500px;
  margin: 0 0 200px 0;
  align-items: center;
  background-color: var(--color-primary);
}

.home {
  display: flex;
  flex-direction: column;

  .navBar {
    list-style: none;
    // position: fixed;
    width: 1000px;
    max-width: 1000px;
    margin: 0 auto;
    background-color: var(--color-primary);

    .logo {
      padding: 50px 0;
      font-size: 22px;
      font-weight: 600;
      -webkit-text-stroke: 1px #737373;
    }

    a {
      padding: 10px 0;
      margin: 0 10px;
      font-size: 17px;
      color: var(--color-secundary);
      text-decoration: none;
      cursor: pointer;
    }

    a:hover {
      color: white;
      transition: 0.5s;
    }

    .cart-btn {
      margin: 0 10px;
      border: none;
      background: transparent;
    }
    .cart-btn:hover {
      cursor: pointer;
      transition: 0.5s;
      color: white;
    }

    .ValueMarker {
      position: absolute;
      margin-left: 15px;
      margin-top: 14px;
      z-index: 2;
    }

    .ic_cart-shopping {
      padding-top: 1px;
      width: 25px;
      height: 25px;
      margin-right: 5px;
      z-index: 1;
    }

    .btn-login {
      padding: 10px 35px;
      font-size: 16px;
      color: var(--color-secundary);
      cursor: pointer;
      border-radius: 5px;
      border: solid 1px black;
      background-color: var(----color-primary);
    }

    .btn-login:hover {
      transition: 0.5s;
      color: white;
      background-color: var(--color-secundary);
    }
  }

  .header-block {
    width: 100%;
    height: 450px;
    display: flex;
    box-shadow: 10px 10px 40px black;
    border-radius: 5px;
    background-color: var(--color-secundary);
  }
}
</style>