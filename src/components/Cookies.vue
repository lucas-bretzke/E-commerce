<template>
  <section class="cookie-modal">
    <h1 class="title">Este site usa Cookies</h1>
    <button class="btn-close" @click="closeModal">X</button>
    <p>
      Utilizamos cookies para melhorar sua experiência em nosso site e podermos
      sugerir conteúdo relevante para você. Ao continuar, você concorda e aceita
      nossa
    </p>
    <a @click="pageFake">Política de Privacidade</a>
    <button class="btn-accept" @click="toCcept">Aceitar</button>
    <button class="btn-refuse">Recusar</button>
  </section>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Cookies extends Vue {
  $store: any;

  public closeModal() {
    this.$store.state.cookieAcceptanceModal = false;
  }

  public toCcept() {
    alert("Cookies aceitos!");
    this.closeModal();
  }

  public pageFake() {
    alert("Este link não o leva a lugar algum!");
  }
}
</script>


<style lang="less" scoped>
@base-btn: {
  padding: 7px;
  font-weight: bold;

  &:hover {
    cursor: pointer;
    transform: translateZ(0px) scale(101%);
    transition: 0.3s;
  }
};
.cookie-modal {
  width: 400px;
  height: auto;
  position: fixed;
  bottom: 1%;
  left: 1%;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-radius: 1px;
  background-color: white;
  box-shadow: 5px 10px 20px;
  z-index: 10;

  .title {
    font-weight: bold;
    margin-bottom: 15px;
  }
  .btn-close {
    font-size: 20px;
    border: none;
    background-color: transparent;
    position: absolute;
    left: 90%;
    top: 3%;

    &:hover {
      cursor: pointer;
      transform: translateZ(0) scale(120%);
    }
  }
  p {
    font-size: 14px;
  }
  a {
    width: 52%;
    margin: 10px 0px;
    font-weight: bold;
    border-bottom: 1px solid transparent;
    color: rgb(1, 115, 201);

    &:hover {
      cursor: pointer;
      border-bottom: 1px solid rgb(1, 115, 201);
    }
  }

  .btn-accept {
    @base-btn();
    background-color: white;
    border: 2px solid black;
    margin-bottom: 10px;
  }

  .btn-refuse {
    @base-btn();
    color: white;
    background-color: black;
    border: 2px solid black;
  }
}
</style>