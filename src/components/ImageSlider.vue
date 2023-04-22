<template>
  <section class="image-slider">
    <div class="slider-container">
      <img
        v-for="(image, index) in images"
        :key="index"
        :src="image.url"
        :alt="image.alt"
        :class="{ active: index === currentIndex }"
      />
      <div v-show="sliderControls" class="slider-controls">
        <button @click="prevImage">
          <FontAwesomeIcon icon="fa-solid fa-chevron-left" size="xl" />
        </button>
        <button @click="nextImage">
          <FontAwesomeIcon icon="fa-solid fa-chevron-right" size="xl" />
        </button>
      </div>
      <span
        v-show="progressionBar"
        v-for="(image, index) in images"
        :key="index"
        class="cheackpointing"
        :style="checkpointStyle(index)"
      ></span>
    </div>
  </section>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    images: { type: Array, required: true },
    sliderControls: { type: Boolean, require: false, default: false },
    progressionBar: { type: Boolean, require: false, default: false },
    setInterval: { type: Number, require: false, default: false },
  },
})
export default class ImageSlider extends Vue {
  public currentIndex = 0;
  public images!: [];
  public setInterval?: number;
  public sliderControls?: boolean;
  public progressionBar?: boolean;

  get checkpointStyle() {
    return (index: number) => {
      return {
        background: index === this.currentIndex ? "rgb(122, 122, 122)" : "",
      };
    };
  }

  prevImage() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
  }
  nextImage() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  created() {
    setInterval(() => {
      this.nextImage();
    }, this.setInterval);
  }
}
</script>

<style scoped lang="less">
.image-slider {
  position: relative;
}

.slider-container {
  width: 1005px;
  height: 455px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 5px;
    opacity: 0;
    transition: opacity 0.5s;
  }

  img.active {
    opacity: 1;
  }
}

.slider-controls {
  position: absolute;
  width: 100%;
  display: flex;
  justify-content: space-between;

  button {
    width: 40px;
    height: 40px;
    margin: 0 5px;
    padding: 5px 10px;
    opacity: 0.4;
    border-radius: 50%;
    color: white;
    background-color: var(--color-secundary);
    cursor: pointer;
    border: none;
    z-index: 1;
    
    &:hover {
      opacity: 0.2;
    }
  }
}

.cheackpointing {
  position: relative;
  top: 42%;
  width: 15px;
  height: 15px;
  margin: 3px;
  background-color: black;
  border-radius: 50%;
  opacity: 0.5;
  z-index: 1;
}
</style>