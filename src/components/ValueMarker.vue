<template>
  <div class="counter">
    {{ $store.state.counterFavorites }}
  </div>
</template>

<script lang="ts">
import productService from "@/services/productService";
import { Options, Vue } from "vue-class-component";

@Options({
  watch: {
    "$store.state.getDone": function () {
      setTimeout(() => {
        this.addBlouseNumbers();
      }, 2000);
    },
  },
})
export default class ValueMarker extends Vue {
  $store: any;

  private async addBlouseNumbers() {
    try {
      const response = await productService.get();
       this.$store.state.counterFavorites = 0
      const favoriteItems = response.filter((item) => item.favorite);
      this.$store.state.counterFavorites += favoriteItems.length;
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