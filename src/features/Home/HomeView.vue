<template>
  <main class="home">
    <div class="background-top">
      <header class="center header-block">
        <ImageSlider
          :images="images"
          :progressionBar="true"
          :sliderControls="true"
          :setInterval="5000"
        />
      </header>
    </div>
    <ProductCarousel
      title="NOVIDADES"
      :dataItems="dataBlouses"
      @getItems="getBlouses"
    />
    <BackToTopButton />
    <Login v-show="store.isLogin" />
    <AlertTeste title="Logado com sucesso" messageType="success" />
  </main>
</template>

<script lang="ts">
import AlertTeste from "@/components/alerts/Alert.vue";
import ImageSlider from "../../components/ImageSlider.vue";
import ProductCarousel from "@/components/ProductCarousel.vue";
import BackToTopButton from "@/components/BackToTopButton.vue";
import productApi from "@/services/productApi";
import { IBlouse } from "@/types";
import Login from "@/features/Login/Login.vue";
import { baseStore } from "@/stores/baseStore";

import { Options, Vue } from "vue-class-component";

@Options({
  components: {
    ImageSlider,
    ProductCarousel,
    BackToTopButton,
    Login,
    AlertTeste,
  },
  // watch: {
  //   "this.store.user.email": function () {
  //     if (this.store.user.email) {
  //       this.isAlert = true;
  //       setTimeout(() => {
  //         this.isAlert = false;
  //       }, 3000);
  //     }
  //   },
  // },
})
export default class HomeView extends Vue {
  public store = baseStore();
  public images = [
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
  public dataBlouses: IBlouse[] = [];
  public isAlert = false;

  public async getBlouses() {
    try {
      const response = await productApi.getBlouses();
      this.dataBlouses = response;
    } catch (error) {
      console.log(error);
    }
  }
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
  height: 370px;
  margin: 0 0 170px 0;
  align-items: center;
  background-color: var(--color-primary);
}

.home {
  display: flex;
  flex-direction: column;

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