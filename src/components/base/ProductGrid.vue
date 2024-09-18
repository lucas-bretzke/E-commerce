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

        <span style="display: flex">
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
          <!-- Componente de paginação -->
          <paginate
            :page-count="totalPages"
            :click-handler="changePage"
            :prev-text="'<<'"
            :next-text="'>>'"
            :container-class="'pagination'"
            :page-class="'page-item'"
            :page-link-class="'page-link'"
            :prev-class="'page-item'"
            :next-class="'page-item'"
            :active-class="'active'"
          />
        </span>
      </container>
    </nav>

    <section class="container-grid">
      <CardItem
        v-for="product in paginatedProducts"
        :key="product.id"
        :item="product"
      />
    </section>
  </main>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import CardItem from './CardItem.vue'
import Paginate from 'vuejs-paginate-next'

interface Product {
  id: number
  name: string
  category: string
  // Adicionar outras propriedades conforme necessário
}

@Options({
  components: {
    CardItem,
    Paginate // Registre o componente de paginação
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
  public itemsPerPage = 5

  get filteredProducts() {
    const category = this.selectedCategory

    const filteredByCategory =
      category === 'all'
        ? this.products
        : this.products.filter(product => product.category === category)

    return filteredByCategory.filter(item =>
      item.name.toUpperCase().includes(this.search.toUpperCase())
    )
  }

  get totalPages() {
    return Math.ceil(this.filteredProducts.length / this.itemsPerPage)
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage
    const end = start + this.itemsPerPage
    return this.filteredProducts.slice(start, end)
  }

  selectCategory(category: string) {
    this.selectedCategory = category
    this.currentPage = 1 // Reset to page 1 when category changes
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

  ::v-deep .pagination {
    display: flex;
    list-style: none;
    padding: 0;
    justify-content: center;
    margin-top: 20px;
  }

  .page-item {
    margin: 0 8px;
  }

  ::v-deep .page-link {
    padding: 10px 16px;
    background-color: #f9f9f9;
    border-radius: 6px;
    border: 1px solid #ddd;
    color: #007bff;
    font-weight: 500;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .page-link:hover {
    background-color: #f1f1f1;
    border-color: #ccc;
    transform: translateY(-2px); /* Efeito de levantar ao passar o mouse */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15); /* Aumenta a sombra ao passar o mouse */
  }

  .page-item.active .page-link {
    background-color: #007bff;
    color: white;
    border-color: #007bff;
    box-shadow: 0 4px 8px rgba(0, 123, 255, 0.3); /* Sombra mais forte para o item ativo */
  }

  .page-link:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.2); /* Efeito ao focar */
    transform: translateY(-1px); /* Leve elevação ao focar */
  }

  .pagination .disabled .page-link {
    background-color: #e9ecef;
    color: #6c757d;
    cursor: not-allowed;
    border-color: #dee2e6;
  }

  .pagination .disabled .page-link:hover {
    transform: none; /* Desativa o efeito hover no item desativado */
    box-shadow: none; /* Remove a sombra do item desativado */
  }
}
</style>
