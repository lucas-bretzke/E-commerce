<template>
  <section></section>
</template>


<script lang="ts">
import axios from "axios";
import { Vue, Options } from "vue-class-component";

@Options({})
export default class ProductCarousel extends Vue {
  public dataItems = [];

  async getItems() {
    try {
      const response = await axios.get("http://localhost:3000/");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  created() {
    this.getItems;
  }
}
</script>


<style scoped lang="less">
</style>