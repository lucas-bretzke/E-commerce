<template>
  <div class="counter">
    {{ store.favoritesCounter }}
  </div>
</template>

<script lang="ts">
import productApi from "@/services/productApi";
import { useCounterStore } from "@/store/counterStores";

import { Options, Vue } from "vue-class-component";

@Options({
  watch: {
    "store.getDone": function () {
      setTimeout(() => {
        this.addBlouseNumbers();
      }, 2000);
    },
  },
})
export default class MarkTheNumberOfFavorites extends Vue {
  public store = useCounterStore();

  private async addBlouseNumbers() {
    try {
      this.store.favoritesCounter = 0;
      const response = await productApi.getFavorites();
      this.store.favoritesCounter = response.length;
    } catch (error) {
      console.log(error);
    }
  }

  mounted() {
    this.addBlouseNumbers();
  }
}
</script>

<style scoped lang="less">
.counter {
  width: 17px;
  height: 17px;
  padding: 2px;
  border: 0;
  border-radius: 50%;
  color: black;
  background-color: white;
  font-weight: 600;
}
</style>