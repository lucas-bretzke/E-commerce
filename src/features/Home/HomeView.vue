<template>
  <main class="home">
    <div class="background-top">
      <NavBar class="navBar">
        <template #Left> <span class="logo">FASHION AVENUE</span> </template>
        <template #Right>
          <li>
            <a href="">NOVIDADES</a>
            <a href="">TEEN</a>
            <a href="">ABOUT</a>
            <a href="">PROMOÇÔES</a>
            <button>LOGIN</button>
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
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavBar from "@/components/baseNavBar/BaseNavBar.vue";
import InputLarge from "./components/InputLarge.vue";
import ImageSlider from "../../components/ImageSlider.vue";

@Options({
  components: {
    NavBar,
    InputLarge,
    ImageSlider,
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
  margin: 0px auto;
}

.background-top {
  width: 100%;
  height: 500px;
  margin: 0px 0px 200px 0px;
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
    margin: 0px auto;
    background-color: var(--color-primary);

    .logo {
      padding: 50px 0px;
      font-size: 22px;
      font-weight: 600;
      -webkit-text-stroke: 1px #737373;
    }

    a {
      padding: 10px 20px;
      font-size: 17px;
      color: var(--color-secundary);
      text-decoration: none;
      cursor: pointer;
    }

    a:hover {
      color: white;
      transition: 0.5s;
    }

    button {
      padding: 10px 35px;
      font-size: 16px;
      color: var(--color-secundary);
      cursor: pointer;
      border-radius: 5px;
      border: solid 1px black;
      background-color: var(----color-primary);
    }

    button:hover {
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