<template>
  <div class="background-top">
    <NavBar class="navBar">
      <template #Left>
        <span class="logo" @click="$router.push('/')">{{ pageTitle }}</span>
      </template>
      <template #Right>
        <li>
          <a href="">NOVIDADES</a>
          <a href="">INFANTIL</a>
          <a href="">MARCAS</a>
          <a href="">PROMOÇÕES</a>
          <button class="cart-btn" @click="$router.push('/Favorites')">
            <ValueMarker class="ValueMarker" />
            <FontAwesomeIcon
              icon="fa-solid fa-cart-shopping"
              class="ic_cart-shopping"
            />
          </button>
          <button class="btn-login">LOGIN</button>
        </li>
      </template>
    </NavBar>
    <Cookies v-show="$store.state.cookieAcceptanceModal" />
  </div>
  <router-view />
</template>


<script lang="ts">
import NavBar from "@/components/base/NavBar.vue";
import ValueMarker from "@/components/MarkTheNumberOfFavorites.vue";
import Cookies from "@/components/Cookies.vue";

import { Options, Vue } from "vue-class-component";

@Options({
  components: { NavBar, ValueMarker, Cookies },
  watch: {
    $route: function () {
      this.setPageTitle();
    },
  },
})
export default class App extends Vue {
  public pageTitle = "";

  private setPageTitle() {
    const url: any = window.location.href;
    const baseUrl = "http://localhost:8080";

    if (url === `${baseUrl}/`) this.pageTitle = "FASHION AVENUE";
    if (url === `${baseUrl}/Favorites`) this.pageTitle = "FAVORITOS";
  }
}
</script>

<style lang="less">
:root {
  --color-primary: #d2b48c; //Marrom Rosado
  --color-secundary: black;
  --color-terciary: #bc8f8f; //Marrom Coral
  --gray: #ededed;
  //   #F0E68C - Amarelo Areia
  // #8B4513 - Marrom Tabaco
  // #6B8E23 - Verde Oliva
  // #228B22 - Verde Floresta
}

*,
#app {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.background-top {
  width: 100%;
  height: auto;
  align-items: center;
  background-color: var(--color-primary);
}
.navBar {
  list-style: none;
  // position: fixed;
  width: 1000px;
  max-width: 1000px;
  margin: 0 auto;
  background-color: var(--color-primary);

  .logo {
    padding: 50px 0;
    font-size: 22px;
    font-weight: 600;
    cursor: pointer;
    -webkit-text-stroke: 1px #737373;
  }

  a {
    padding: 10px 0;
    margin: 0 10px;
    font-size: 17px;
    color: var(--color-secundary);
    text-decoration: none;
    cursor: pointer;
  }

  a:hover {
    color: white;
    transition: 0.5s;
  }

  .cart-btn {
    margin: 0 10px;
    border: none;
    background: transparent;
  }
  .cart-btn:hover {
    cursor: pointer;
    transition: 0.5s;
    color: white;
  }

  .ValueMarker {
    position: absolute;
    margin-left: 15px;
    margin-top: 14px;
    z-index: 2;
  }

  .ic_cart-shopping {
    padding-top: 1px;
    width: 25px;
    height: 25px;
    margin-right: 5px;
    z-index: 1;
  }

  .btn-login {
    padding: 10px 35px;
    font-size: 16px;
    color: var(--color-secundary);
    cursor: pointer;
    border-radius: 5px;
    border: solid 1px black;
    background-color: var(--color-primary);
  }

  .btn-login:hover {
    transition: 0.5s;
    color: white;
    background-color: var(--color-secundary);
  }
}
</style>
