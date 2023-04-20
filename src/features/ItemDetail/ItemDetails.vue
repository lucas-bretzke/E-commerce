<template>
  <div class="item-details">
    <img :src="item.img" />
    <h2>{{ item.name }}</h2>
    <p>{{ item.collection }}</p>
    <p v-if="item.discount > 0">
      Preço com desconto: R$ {{ item.price - item.discount }}
    </p>
    <p v-else>Preço: R$ {{ item.price }}</p>
    <!-- <p>Tamanhos disponíveis: {{ item.sizes.join(", ") }}</p> -->
  </div>
</template>

<script lang="ts">
import productService from "@/services/productService";
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    itemId: { type: Number, required: true },
  },
})
export default class ItemDetails extends Vue {
  public item = {};
  public itemTeste = {};

  private async getItemById(itemId: number) {
    try {
      const response = await productService.getBlousesById(itemId);
      // this.itemTeste = response;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
    console.log('itemId');
    console.log(itemId);
  }

  mounted() {
    this.getItemById;
  }
}
</script>


<style scoped lang="less">
.item-details {
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1000;

  img {
    max-width: 100%;
    margin-bottom: 1rem;
  }

  h2 {
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  p {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .discount {
    color: red;
    font-weight: bold;
  }

  .sizes {
    margin-top: 1rem;

    &::before {
      content: "Tamanhos disponíveis: ";
    }

    span {
      display: inline-block;
      margin-right: 0.5rem;
      padding: 0.25rem 0.5rem;
      background-color: #eee;
      border-radius: 0.25rem;

      &.selected {
        background-color: #007bff;
        color: #fff;
      }
    }
  }
}
</style>