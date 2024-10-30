<template>
  <div class="background-top">
    <BaseNavBar class="navBar">
      <template #Left>
        <span class="logo" @click="$router.push('/')">ROUPAS DO AMANHÃ</span>
      </template>
      <template #Right>
        <ul class="nav-links">
          <li>
            <a href="">NOVIDADES</a>
            <a href="">INFANTIL</a>
            <a href="">PROMOÇÕES</a>
            <button class="cart-btn" @click="$router.push('/Favorites')">
              <Counter class="Counter" :children="store.favoritesCounter" />
              <FontAwesomeIcon
                icon="fa-solid fa-heart"
                class="ic_cart-shopping"
              />
            </button>

            <button class="cart-btn" @click="$router.push('/Cart')">
              <Counter class="Counter" :children="store.cartCounter" />
              <FontAwesomeIcon
                icon="fa-solid fa-cart-shopping"
                class="ic_cart-shopping"
              />
            </button>
            <button class="btn-login" @click="setBtnFunction">
              {{ buttonText }}
            </button>
          </li>
        </ul>
      </template>
    </BaseNavBar>
    <Cookies v-show="store.cookieAcceptanceModal" />
  </div>
</template>

<script lang="ts">
import { baseStore } from '@/stores/baseStore'
import { Options, Vue } from 'vue-class-component'

// Components.
import Cookies from '@/components/Cookies.vue'
import BaseNavBar from '@/components/base/BaseNavBar.vue'
import Counter from '@/components/Counter.vue'

@Options({
  components: { BaseNavBar, Counter, Cookies },
  watch: {
    'store.user.uid': function (current, previous) {
      this.buttonText = previous === '' && current ? 'Sair' : 'Logar'
    }
  }
})
export default class NavBar extends Vue {
  public store = baseStore()
  public pageTitle = ''
  public buttonText = 'Logar'

  public async setBtnFunction() {
    if (!this.store.user.uid) {
      this.store.showLoginScreen = true
    } else {
      localStorage.clear()
      this.store.user.uid = ''
      setTimeout(() => window.location.reload(), 2000)
    }
  }
}
</script>

<style lang="less" scoped>
.navBar {
  list-style: none;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  background-color: var(--color-primary);

  .logo {
    font-size: 22px;
    font-weight: 600;
    cursor: pointer;
    -webkit-text-stroke: 1px #737373;
  }

  .nav-links {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 120px;
    list-style: none;

    a {
      padding: 10px 5px;
      margin: 0 5px;
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

    .Counter {
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
      padding: 10px 15px;
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
}

@media (max-width: 768px) {
  .navBar {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-direction: column;
    width: 100%;

    a,
    .cart-btn,
    .btn-login {
      width: 100%;
      text-align: center;
      padding: 15px 0;
    }
  }

  .logo {
    padding: 20px 0;
  }
}
</style>
