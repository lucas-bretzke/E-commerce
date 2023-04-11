<template>
  <section class="cookie-modal">
    <h1 class="title">Este site usa Cookies</h1>
    <button class="close" @click="closeModal">X</button>
    <p>
      Utilizamos cookies para melhorar sua experiência em nosso site e podermos
      sugerir conteúdo relevante para você. Ao continuar, você concorda e aceita
      nossa
    </p>
    <a @click="pageFake">Política de Privacidade</a>
    <button class="btn-aceitar" @click="toCcept">Aceitar</button>
    <button class="btn-recusar">Opcões</button>
  </section>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Cookies extends Vue {
  $store: any;
  public closeModal() {
    this.$store.state.myMod.isCookie = false;
  }

  public toCcept() {
    this.closeModal();
    alert("Cookies aceitos!");
  }

  public pageFake() {
    alert("Este link não o leva a lugar algum!");
  }
}
</script>



<style lang="less" scoped>
.cookie-modal {
  width: 400px;
  height: auto;

  position: fixed;
  top: 50%;
  left: 1%;

  display: flex;
  flex-direction: column;
  padding: 30px;

  border-radius: 1px;
  background-color: white;

  box-shadow: 5px 10px 20px;

  .title {
    font-weight: bold;
    margin-bottom: 15px;
  }
  .close {
    font-size: 20px;
    border: none;
    background-color: transparent;

    position: absolute;
    left: 90%;
    top: 3%;
  }
  .close:hover {
    transform: translateZ(0px) scale(1.3);
    transition: 0.3s;
  }
  p {
    font-size: 14px;
  }
  a {
    margin: 10px 0px;
    font-weight: bold;
    color: rgb(1, 115, 201);
  }
  a:hover {
    cursor: pointer;
    border-bottom: 1px solid;
    width: 52%;
  }

  button {
    padding: 7px;
    font-weight: bold;
  }

  button:hover {
    cursor: pointer;
    transform: translateZ(0px) scale3d(1, 1.1, 1.1);
  }
  .btn-aceitar {
    background-color: white;
    border: 2px solid black;
    margin-bottom: 10px;
  }
  .btn-aceitar:hover {
    text-shadow: 0px 0px 23px 48px rgba(0, 0, 0, 0.22);
  }
  .btn-recusar {
    color: white;
    background-color: black;
    border: 2px solid black;
  }
}
</style>