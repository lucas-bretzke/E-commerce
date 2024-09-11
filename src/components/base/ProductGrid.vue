<template>
  <main>
    <nav>
      <div class="categories">
        <button
          :class="{ active: selectedCategory === 'all' }"
          @click="selectCategory('all')"
        >
          TODOS OS PRODUTOS
        </button>
        <button
          :class="{ active: selectedCategory === 't-shirts' }"
          @click="selectCategory('t-shirts')"
        >
          CAMISETAS
        </button>
        <button
          :class="{ active: selectedCategory === 'mugs' }"
          @click="selectCategory('mugs')"
        >
          CANECAS
        </button>
      </div>
      <div>Organizar por ></div>
    </nav>

    <section>
      <CardItem
        v-for="product in filteredProducts"
        :key="product.id"
        :item="product"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { ref } from 'vue'
import { Options, Vue } from 'vue-class-component'
import CardItem from './CardItem.vue'

interface Product {
  name: string
  category: string
  // Add other properties as needed
}

@Options({
  components: { CardItem },
  props: {
    products: {
      type: Array as () => Product[],
      required: true
    }
  }
})
export default class ProductGrid extends Vue {
  public selectedCategory = 'all'
  products!: Product[]

  get filteredProducts() {
    console.log(this.selectedCategory)
    const category = this.selectedCategory

    if (category === 'all') {
      return this.products
    }
    return this.products.filter(product => product.category === category)
  }

  selectCategory(category: string) {
    this.selectedCategory = category
  }
}
</script>

<style lang="less" scoped>
main {
  background-color: #9595951a;
  width: 100%;
  height: auto;
  padding-bottom: 200px;
  padding-top: 50px;

  nav {
    height: 100px;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;
    margin: 0px auto;
    border: 1px solid red;

    .categories {
      width: 500px;
      display: flex;
      border: 1px solid green;

      button {
        width: auto;
        height: 30px;
        padding: 0 12px;
        font-size: 14px;
        font-weight: 400;
        text-align: center;
        border: none;
        border-bottom: 3px solid transparent;
        background-color: transparent;
        cursor: pointer;

        &.active {
          border-bottom: 3px solid var(--color-primary);
        }
      }
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
