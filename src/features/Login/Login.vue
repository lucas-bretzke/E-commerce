<template>
  <main class="container-login">
    <button @click="close" class="close">X</button>

    <div class="description">
      <h2>SALVE SUA LISTA DE DESEJOS E APROVEITE OS BENEFÍCIOS DO ADICLUB</h2>
      <p>
        Você tem direito a cupons de desconto, produtos exclusivos e ao
        participar do adiClub
      </p>
    </div>

    <section class="container-inputs">
      <h3>FAÇA O LOGIN</h3>

      <div class="input-container">
        <input placeholder=" " v-model="email" />
        <label>E-mail</label>
        <span class="error" v-show="msgErrorEmail">Ops! email inválido</span>
      </div>

      <div class="input-container">
        <input placeholder=" " v-model="password" @keyup.enter="signIn" />
        <label>Senha</label>
        <span class="error" v-show="msgErrorPassword"
          >Ops! Senha incorreta</span
        >
      </div>
    </section>

    <div class="manter-conection">
      <input type="checkbox" />
      <p>
        Mantenha-me conectado - válido para todos os métodos de log-in abaixo.
        <a href=""> Mais informações. </a>
      </p>
    </div>

    <button @click="signIn" class="btn-start">
      <span> CONTINUAR </span>
      <span>--></span>
    </button>

    <button @click="signIn" class="btn-login-with-google">Google</button>

    <!-- <button @click="deslogar">Delog</button> -->
  </main>
</template>

<script lang="ts">
import { Auth } from "@/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { baseStore } from "@/stores/baseStore";
import { Vue, Options } from "vue-class-component";

@Options({})
export default class Login extends Vue {
  public store = baseStore();
  public email = "";
  public password = "";
  public error = "";
  //   public user = Auth.currentUser;

  get user() {
    return Auth.currentUser;
  }

  public signIn() {
    try {
      signInWithEmailAndPassword(Auth, this.email, this.password);
      // this.close()
      console.log("Login sucess");
      console.log(Auth.currentUser?.displayName);
      console.log(Auth.currentUser?.email);
      console.log(Auth.currentUser?.photoURL);
    } catch (error) {
      console.log("Login error", error);
    }
  }
  public async deslogar() {
    try {
      await signOut(Auth);
      // this.close()
      console.log("Deslog sucess");
    } catch (error) {
      console.log("Login error", error);
    }
  }

  public close() {
    this.store.isLogin = false;
  }
}
</script>

<style lang="less" scoped>
button {
  width: 100%;
  height: 45px;
  padding: 0 15px;
  margin-top: 17px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  cursor: pointer;
}

p {
  font-size: 14px;
}

.container-login {
  width: auto;
  max-width: 420px;
  height: 672px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 45px 20px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  z-index: 10;

  .close {
    width: 45px;
    height: 45px;
    position: absolute;
    top: -40px;
    right: -30px;
    font-size: 36px;
    font-weight: 100;
    transform: translateY(0px) scale(110%);
    border: 1px solid black;
    background-color: white;
  }
  .description {
    line-height: 30px;
    letter-spacing: 2px;

    h2 {
      font-size: 24px;
    }

    p {
      margin: 17px 0;
    }
  }

  .container-inputs {
    margin-top: 20px;

    h3 {
      margin-bottom: 15px;
    }

    .input-container {
      position: relative;
      margin-bottom: 24px;

      input {
        width: 100%;
        padding: 16px;
        border: 1px solid #ccc;
        background-color: transparent;
        color: #333;
        font-size: 16px;
        outline: none;

        &:focus {
          border-color: #000;
        }

        & ~ label {
          position: absolute;
          top: 16px;
          left: 16px;
          font-size: 16px;
          color: #999;
          transition: all 0.3s;

          &.active {
            top: -8px;
            left: 8px;
            font-size: 12px;
            color: #000;
            background-color: #fff;
            padding: 0 4px;
          }
        }

        &:focus ~ label,
        &:not(:placeholder-shown) ~ label {
          top: -8px;
          left: 8px;
          font-size: 12px;
          color: #000;
          background-color: #fff;
          padding: 0 4px;
        }
      }
    }
  }

  .manter-conection {
    display: flex;
    align-items: center;

    input {
      width: 45px;
      height: 45px;
      margin-right: 12px;
    }
    p {
      line-height: 25px;
    }
  }

  .btn-start {
    display: flex;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 2px;
    color: white;
    background-color: black;

    .icon {
      color: red;
    }

    &:hover {
      transition: 0.3s;
      color: #6f6f6f;
    }
  }

  .btn-login-with-google {
    color: white;
    background-color: black;

    &:hover {
      transition: 0.3s;
      color: #6f6f6f;
    }
  }
}
</style>