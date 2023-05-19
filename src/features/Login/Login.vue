<template>
  <main class="container-login">
    <h1>FAÇA O LOGIN</h1>

    <button @click="close" class="close">X</button>

    <label for="email">E-mail</label>
    <input v-model="email" placeholder="email" type="text" />

    <br />

    <label for="password">Senha</label>
    <input v-model="password" placeholder="senha" type="text" />
  </main>
</template>

<script lang="ts">
import { baseStore } from "@/stores/baseStore";
import { Vue, Options } from "vue-class-component";

@Options({})
export default class Login extends Vue {
  public store = baseStore();

  public close() {
    this.store.isLogin = false;
  }
}
</script>

<style lang="less" scoped>
.container-login {
  width: 450px;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;

  .close {
    width: 60px;
    height: 60px;
    position: absolute;
    top: -25px;
    right: -25px;
    font-size: 36px;
    border: 1px solid black;
    background-color: white;
  }
  input {
    width: 100%;
    height: 40px;
    padding: 7px;
  }
}
</style>