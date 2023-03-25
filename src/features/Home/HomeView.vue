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
    <ProductCarousel title="NOVIDADES" />
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import ImageSlider from "../../components/ImageSlider.vue";
import ProductCarousel from "@/components/productCarousel/ProductCarousel.vue";

@Options({
  components: {
    ImageSlider,
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