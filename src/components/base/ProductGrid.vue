<template>
  <main>
    <nav>
      <container class="categories">
        <span>
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
        </span>
        <div class="dropdown">
          <button class="dropdown-button">
            {{ buttonDropdownLabel }}
            <FontAwesomeIcon icon="chevron-down" style="padding-left: 4px" />
          </button>
          <div class="dropdown-content">
            <button class="btn" @click="updateSort('Novidades', 'newest')">
              Novidades
            </button>
            <button
              class="btn"
              @click="updateSort('Preço: Maior - menor', 'price-desc')"
            >
              Preço: Maior - menor
            </button>
            <button
              class="btn"
              @click="updateSort('Preço: Menor - maior', 'price-asc')"
            >
              Preço: Menor - maior
            </button>
            <button
              class="btn"
              @click="updateSort('Mais vendidos', 'best-sellers')"
            >
              Mais vendidos
            </button>
          </div>
        </div>
      </container>

      <container
        style="display: flex; flex-direction: column; align-items: flex-end"
      >
        <span class="input">
          <input
            v-model="search"
            placeholder="Procurando por algo específico?"
            class="search-tab"
          />
          <FontAwesomeIcon icon="search" class="fa-search" />
        </span>

        <paginate
          :page-count="totalPages"
          :click-handler="changePage"
          :prev-text="'<'"
          :next-text="'>'"
          :container-class="'pagination'"
          :page-class="'page-item'"
          :page-link-class="'page-link'"
          :prev-class="'page-item'"
          :next-class="'page-item'"
          :active-class="'active'"
        />
      </container>
    </nav>

    <section class="container-grid">
      <CardItem
        v-for="product in paginatedProducts"
        @click="viewProductDetails(product)"
        :key="product.id"
        :item="product"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import Paginate from 'vuejs-paginate-next'

// Components.
import CardItem from './CardItem.vue'

// Types.
interface Product {
  price: any
  id: number
  name: string
  category: string
}

// Componment.
@Options({
  components: {
    CardItem,
    Paginate
  },
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
  public currentPage = 1
  public itemsPerPage = 10
  public selectedSortOrder = 'price-asc'
  public buttonDropdownLabel = 'Organizar por'

  get filteredProducts() {
    const category = this.selectedCategory
    const sortOrder = this.selectedSortOrder

    // Filtrar por categoria
    const filteredByCategory =
      category === 'all'
        ? this.products
        : this.products.filter(product => product.category === category)

    // Filtrar por busca no nome
    const filteredByName = filteredByCategory.filter(item =>
      item.name.toUpperCase().includes(this.search.toUpperCase())
    )

    // Ordenar por preço, se necessário
    if (sortOrder === 'price-asc') {
      return filteredByName.sort((a, b) => a.price - b.price) // Preço: Menor - maior
    } else if (sortOrder === 'price-desc') {
      return filteredByName.sort((a, b) => b.price - a.price) // Preço: Maior - menor
    }

    // Retornar o array filtrado sem ordenação de preço
    return filteredByName
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredProducts.slice(start, end)
  }

  viewProductDetails(product: any) {
    localStorage.setItem('selectedProduct', JSON.stringify(product))
    this.$router.push('ProductPage')
  }

  updateSort(label: string, order: string) {
    this.buttonDropdownLabel = label
    this.selectedSortOrder = order
  }
  selectCategory(category: string) {
    this.selectedCategory = category
    this.currentPage = 1
  }

  changePage(page: number) {
    this.currentPage = page
  }
}
</script>

<style lang="less" scoped>
main {
  background-color: #9595951a;
  width: 100%;
  height: auto;
  padding-bottom: 100px;
  padding-top: 35px;

  nav {
    height: 110px;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;

    .categories {
      width: 500px;
      display: flex;
      flex-direction: column;

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
    align-items: center;
    justify-content: center;
    display: grid;
    grid-template-columns: repeat(4, minmax(150px, 3fr));
    gap: 10px 2vw;
  }

  .input {
    display: flex;
    align-items: center;
    border: none;
    border-radius: 20px;
    padding: 8px;
    background-color: #f9f9f9;

    width: 350px;
    height: 42px;
    padding: 9px 16px 9px 16px;
    border-radius: 8px;
    border: 1px solid rgb(216, 216, 216);

    &:hover {
      border-color: #d2b48c;
    }

    input {
      caret-color: #d2b48c;
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
    margin-top: 30px;

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
    width: 170px;
    height: auto;
    padding: 5px;
    border-radius: 4px;
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.201);
    z-index: 1;

    .btn {
      width: 100%;
      color: black;
      text-align: left;
      text-decoration: none;
      display: block;
      font-size: 14px;
      font-weight: 500;
      color: rgb(104, 104, 104);

      &:hover {
        background-color: #f1f1f1;
      }
    }
  }

  .dropdown:hover .dropdown-content {
    display: block;
  }

  ::v-deep .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: center;
    max-width: 250px;
    margin-top: 30px;
  }

  .page-item {
    margin: 0 8px;
  }

  ::v-deep .page-link {
    padding: 6px 10px;
    margin: 0 2px;
    background: #e9e9f0;
    border-radius: 8px;
    border: 1px solid #ddd;
    color: #737380;
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-size: 16px;

    &:hover {
      background-color: #f1f1f1;
      border-color: #ffa585;
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  }

  ::v-deep .page-item.active .page-link {
    font-weight: 600;
    color: #ffa585;
    border-color: #ffa585;
    background-color: white;
  }
}
</style>
