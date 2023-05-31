<template>
  <div class="background-top">
    <BaseNavBar class="navBar">
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
              icon="fa-solid fa-heart"
              class="ic_cart-shopping"
            />
          </button>
          <button class="cart-btn" @click="$router.push('/Cart')">
            <!-- <ValueMarker class="ValueMarker" /> -->
            <FontAwesomeIcon
              icon="fa-solid fa-cart-shopping"
              class="ic_cart-shopping"
            />
          </button>
          <button class="btn-login" @click="setBtnFunction">
            {{ btnText }}
          </button>
        </li>
      </template>
    </BaseNavBar>
    <Cookies v-show="store.cookieAcceptanceModal" />
  </div>
</template>


<script lang="ts">
import BaseNavBar from "@/components/base/BaseNavBar.vue";
import ValueMarker from "@/components/MarkTheNumberOfFavorites.vue";
import Cookies from "@/components/Cookies.vue";
import { Auth } from "@/firebase";
import { signOut } from "firebase/auth";
import { baseStore } from "@/stores/baseStore";

import { Options, Vue } from "vue-class-component";

@Options({
  components: { BaseNavBar, ValueMarker, Cookies },
  watch: {
    $route: function () {
      this.setPageTitle();
    },
  },
})
export default class NavBar extends Vue {
  public store = baseStore();
  private user = Auth.currentUser;

  public pageTitle = "";

  get btnText() {
    return this.user?.uid != undefined ? "Sair" : "Logar";
  }

  public async setBtnFunction() {
    if (!this.user?.uid) {
      this.store.isLogin = true;
    } else {
      Auth.signOut();
      console.log("Deslogado(a)");
    }
  }

  public setPageTitle() {
    const url: any = window.location.href;
    const baseUrl = "http://localhost:8080";

    if (url === `${baseUrl}/`) this.pageTitle = "FASHION AVENUE";
    if (url === `${baseUrl}/Favorites`) this.pageTitle = "FAVORITOS";
  }

  // mounted() {
  //   console.log(Auth.currentUser?.uid != "");
  //   console.log(Auth.currentUser?.uid != undefined);
  // }
}
</script>

<style lang="less" scoped>
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

    &:hover {
      color: white;
      transition: 0.5s;
    }
  }

  .cart-btn {
    margin: 0 10px;
    border: none;
    background: transparent;

    &:hover {
      cursor: pointer;
      transition: 0.5s;
      color: white;
    }
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

    &:hover {
      transition: 0.5s;
      color: white;
      background-color: var(--color-secundary);
    }
  }
}
</style>