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
      <div v-for="item in dataItems.slice(0, 12)" :key="item">
        <CardItem :item="item" @click="showDetails(item.id)" />
      </div>
    </section>
  </main>
</template>


<script lang="ts">
import CardItem from "@/components/base/CardItem.vue";
import { Vue, Options } from "vue-class-component";

@Options({
  components: {
    CardItem,
  },
  props: {
    title: { type: String, required: true },
    dataItems: { type: Array, required: true },
  },
  emits: ["getItems"],
  watch: {
    "$store.state.getDone": function () {
      this.getItems();
    },
  },
})
export default class ProductCarousel extends Vue {
  $store: any;

  public moveScroll(distance: number) {
    const container = this.$refs.myScrollX as HTMLElement;
    container.style.scrollBehavior = "smooth";
    container.style.scrollSnapType = "x mandatory";
    container.scrollLeft += distance;
  }

  public showDetails(id: number) {
    this.$router.push("/Details");
    this.$store.state.itemIdInDetail = id;
  }

  private getItems() {
    this.$emit("getItems");
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

    &:hover {
      color: var(--color-primary);
      transform: translateX(10px);

      .ic-arrow {
        animation: scale-fade 1s infinite ease-in-out;
      }
    }
  }
  .move-scroll {
    font-size: 13px;
    margin: 0 6px;
    padding: 10px 12px;

    &:hover {
      transform: translateZ(10px) scale(1.1);
      background-color: var(--color-primary);
    }
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
    width: auto;
    display: flex;
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