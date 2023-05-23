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

      <InputText v-model="email" :msgError="emailError" label="E-mail" />
      <InputPassword
        v-model="password"
        :msgError="passwordError"
        label="Senha"
      />
    </section>

    <div class="manter-conection">
      <input type="checkbox" />
      <p>
        Mantenha-me conectado - válido para todos os métodos de log-in abaixo.
        <a href=""> Mais informações. </a>
      </p>
    </div>

    <button @click="signIn" class="continue-btn">
      <p>CONTINUAR</p>
      <span
        ><FontAwesomeIcon icon="fa-solid fa-arrow-right" class="icon"
      /></span>
    </button>

    <button class="btn-login-with-google">
      <FontAwesomeIcon icon="fa-brands fa-google" />
    </button>

    <h3 style="position: absolute; top: 0px" @click="logout">Delog</h3>
    <h3 style="position: absolute; top: 20px" @click="store.checkUser">
      checkUser
    </h3>
  </main>
</template>

<script lang="ts">
import InputText from "@/components/Input/InputText.vue";
import InputPassword from "@/components/Input/InputPassword.vue";
import { Auth } from "@/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { baseStore } from "@/stores/baseStore";
import { Vue, Options } from "vue-class-component";

@Options({ components: { InputPassword, InputText } })
export default class Login extends Vue {
  public store = baseStore();
  public user = Auth.currentUser;
  public email = "";
  public password = "";
  public emailError = "";
  public passwordError = "";

  public async signIn() {
    try {
      await signInWithEmailAndPassword(Auth, this.email, this.password);
    } catch (error) {
      if (error instanceof Error) {
        const msg = error.message;
        console.log("Login error", msg);

        this.emailError = msg.includes("auth/user-not-found")
          ? "E-mail inválido"
          : "";

        this.passwordError = msg.includes("auth/wrong-password")
          ? "Senha inválida"
          : "";
      } else {
        console.log("Erro desconhecido ao fazer login.");
      }
    } finally {
      this.store.checkUser;
    }
  }

  public async logout() {
    try {
      await signOut(Auth);
      console.log("User logout");
    } catch (error) {
      console.log("Logout error", error);
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
  height: 50px;
  padding: 0 17px;
  margin-top: 17px;
  font-size: 15px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  color: black;
  background-color: var(--color-primary);
}

p {
  font-size: 14px;
}

.container-login {
  width: auto;
  max-width: 420px;
  height: auto;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 45px 20px;
  padding-bottom: 25px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid black;
  border-radius: 3px;
  z-index: 10;
  box-shadow: 10px 10px 10px 1200px rgba(0, 0, 0, 0.614);

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

  .continue-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    letter-spacing: 2px;
    .icon {
      width: 20px;
      height: auto;
    }

    &:hover {
      transition: 0.3s;
      color: #6f6f6f;
    }
  }

  .btn-login-with-google {
    font-size: 23px;

    &:hover {
      transition: 0.3s;
      transform: translateY(0) scale(102%);
    }
  }
}
</style>