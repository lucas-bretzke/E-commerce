<template>
  <main>
    <nav>
      <container class="categories">
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
      </container>

      <container style="display: flex">
        <span class="input">
          <input
            v-model="search"
            placeholder="Procurando por algo específico?"
            class="search-tab"
          />
          <FontAwesomeIcon icon="search" class="fa-search" />
        </span>

        <div class="dropdown">
          <button class="dropdown-button">
            Organizar por
            <FontAwesomeIcon icon="chevron-down" style="padding-left: 4px" />
          </button>
          <div class="dropdown-content">
            <button>Novidades</button>
            <button>Preço: Maior - menor</button>
            <button>Preço: Menor - maior</button>
            <button>Mais vendidos</button>
          </div>
        </div>
      </container>
    </nav>

    <section class="container-grid">
      <CardItem
        v-for="product in filteredProducts"
        :key="product.id"
        :item="product"
      />
    </section>
  </main>
</template>

<script lang="ts">
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
  public products!: Product[]
  public search = ''

  get filteredProducts() {
    const category = this.selectedCategory

    const filteredByCategory =
      category === 'all'
        ? this.products
        : this.products.filter(product => product.category === category)

    return filteredByCategory.filter(item => {
      return item.name.toUpperCase().includes(this.search.toUpperCase())
    })
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

  .container-grid {
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

  .input {
    display: flex;
    align-items: center;
    border: none;
    border-radius: 20px;
    padding: 8px;
    background-color: #f9f9f9;

    width: 300px;
    height: 42px;
    padding: 9px 16px 9px 16px;
    border-radius: 8px;

    &:hover {
      border-color: #888;
    }
  }

  .search-tab {
    border: none;
    outline: none;
    font-size: 14px;
    width: 100%;
    background-color: transparent;
  }

  .input .fa-search {
    color: #999;
    font-size: 17px;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    z-index: 3;

    .dropdown-button {
      background-color: transparent;
      color: #8a8a8a;
      padding: 10px 16px;
      border: none;
      cursor: pointer;
      align-items: center;

      font-size: 14px;
      font-weight: 400;
      line-height: 22px;
    }
  }

  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }

  .dropdown-content button {
    width: 100%;
    color: black;
    padding: 12px 16px;
    text-align: left;
    text-decoration: none;
    display: block;
    cursor: pointer;
    border: none;

    background-color: #f9f9f9;
  }

  .dropdown-content button:hover {
    background-color: #f1f1f1;
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }
}
</style>
