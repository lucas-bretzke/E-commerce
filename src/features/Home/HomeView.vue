<template>
  <main class="home">
    <div class="background-top">
      <NavBar class="navBar">
        <template #Left> <span class="logo">Fashion Avenue</span> </template>
        <template #Right>
          <li style="">
            <a href="" style="cursor: pointer">Ajuda</a>
            <a href="">Contato</a>
            <a href="">About</a>
            <a href="">Carrinho</a>
            <button>Contato</button>
          </li>
        </template>
      </NavBar>
      <Header class="center" />
    </div>

    <!-- <InputLarge class="center" /> -->
  </main>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import NavBar from "@/components/baseNavBar/BaseNavBar.vue";
import Header from "./components/Header.vue";
import InputLarge from "./components/InputLarge.vue";

@Options({
  components: {
    Header,
    InputLarge,
    NavBar,
  },
})
export default class HomeView extends Vue {}
</script>

<style scoped lang="less">
.center {
  max-width: 1000px;
  min-width: 300px;
  margin: 0px auto;
}

.background-top {
  width: 100%;
  height: 500px;
  margin: 0px 0px 200px 0px;
  align-items: center;
  background-color: #f78b00;
}

.home {
  display: flex;
  flex-direction: column;

  .navBar {
    list-style: none;
    // position: fixed;
    width: 1000px;
    max-width: 1000px;
    margin: 0px auto;
    background-color: var(--orange);

    .logo {
      padding: 50px 0px;
      font-size: 22px;
    }

    a {
      padding: 10px 20px;
      font-size: 16px;
      color: var(--blue);
      text-decoration: none;
      cursor: pointer;
      transition: 0.5s;
    }

    a:hover {
      color: white;
    }

    button {
      padding: 10px 35px;
      font-size: 16px;
      color: var(--blue);
      cursor: pointer;
      border-radius: 5px;
      border: solid 1px black;
      background-color: var(--orange);
    }

    button:hover {
      transition: 0.5s;
      color: white;
      background-color: var(--blue);
    }
  }
}
</style>