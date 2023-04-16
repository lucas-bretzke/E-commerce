<template>
  <div class="counter">
    {{ $store.state.counterFavorites }}
  </div>
</template>

<script lang="ts">
import productService from "@/services/productService";
import { IBlusa } from "@/types";
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
export default class MarkTheNumberOfFavorites extends Vue {
  $store: any;

  private async addBlouseNumbers() {
    try {
      this.$store.state.counterFavorites = 0;
      const response = await productService.getBlouses();
      response.forEach((item: IBlusa) => {
        if (item.favorite) this.$store.state.counterFavorites++;
      });
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