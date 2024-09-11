<template>
  <main>
    <nav>
      <span>
        <h2>TODOS OS PRODUTOS</h2>
        <h2>CAMISETAS</h2>
        <h2>CANECAS</h2>
      </span>
      <span> </span>
    </nav>

    <section>
      <CardItem
        v-for="product in products"
        :key="product.name"
        :item="product"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Options, Vue } from 'vue-class-component'
import CardItem from './CardItem.vue'

@Options({
  components: { CardItem },
  props: {
    products: {
      type: Array,
      required: true
    }
  }
})
export default class ProductGrid extends Vue {
  public products: any
}
</script>

<style lang="less" scoped>
main {
  background-color: #9595951a;
  width: 100%;
  height: auto;
  padding: 200px 0;

  nav {
    display: flex;
    justify-content: space-around;

    h2 {
      font-family: Saira;
      font-size: 18px;
      font-weight: 400;
      line-height: 22px;
      text-align: center;
    }
  }

  section {
    max-width: 1100px;
    width: 100%;
    height: auto;
    margin: 0 auto;

    border: 1px solid rgb(107, 107, 107);
    align-items: center;
    justify-content: center;

    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 3fr));
    gap: 100px 2vw;
  }
}
</style>
