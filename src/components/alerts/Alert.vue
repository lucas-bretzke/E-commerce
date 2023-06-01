<template>
  <div class="container">
    <section class="alert" :class="alertClass()">
      <div class="container-left">
        <FontAwesomeIcon
          :icon="`fa-solid ${icon}`"
          class="ic"
          :style="icStyles()"
        />

        <div class="container-text">
          <h2 class="msg-alert">{{ title }}</h2>
          <p class="description">{{ description }}</p>
        </div>
      </div>

      <button class="close">
        <FontAwesomeIcon icon="fa-solid fa-xmark" />
      </button>
    </section>
  </div>
</template>

<script lang="ts">
type MessageTypeMap = {
  [key: string]: {
    icon: string;
    title: string;
    icStyle: { color: string };
    alertClass: string;
  };
};

import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    description: { type: String, required: true },
    messageType: { type: String, required: true },
  },
})
export default class Alert extends Vue {
  private messageType!: string;
  private messageTypeMap: MessageTypeMap = {
    success: {
      icon: "fa-circle-check",
      title: "Sucesso",
      icStyle: { color: "#00aa52" },
      alertClass: "success-alert",
    },
    error: {
      icon: "fa-circle-xmark",
      title: "Error",
      icStyle: { color: "#ff342c" },
      alertClass: "error-alert",
    },
    info: {
      icon: "fa-circle-info",
      title: "Info",
      icStyle: { color: "#0071ff" },
      alertClass: "info-alert",
    },
    warning: {
      icon: "fa-triangle-exclamation",
      title: "Aviso",
      icStyle: { color: "#ffa301" },
      alertClass: "warning-alert",
    },
  };


  get icon() {
    return this.messageTypeMap[this.messageType]?.icon || "";
  }

  get title() {
    return this.messageTypeMap[this.messageType]?.title || "";
  }

  icStyles() {
    return this.messageTypeMap[this.messageType]?.icStyle || "";
  }

  alertClass() {
    return this.messageTypeMap[this.messageType]?.alertClass || "";
  }


}
</script>

<style scoped lang="less">
.success-alert {
  background-color: #b5eacc;
  border-bottom: 3px solid #00ab4e;
}
.error-alert {
  background-color: #ffe3e0;
  border-bottom: 3px solid #fb4a1f;
}
.info-alert {
  background-color: #c3ecff;
  border-bottom: 3px solid #0072fc;
}
.warning-alert {
  background-color: #ffe3c7;
  border-bottom: 3px solid #fea400;
}

.container {
  width: 100%;
  position: fixed;
  top: 5px;
  display: flex;
  z-index: 2;

  .alert {
    width: 90%;
    max-width: 1300px;
    display: flex;
    padding: 15px 20px 10px 0px;
    margin: 0 auto;
    align-items: center;
    justify-content: space-between;
    text-align: center;
    border-radius: 5px;
    animation: slide-bottom 0.6s;

    .container-left {
      display: flex;
      align-items: center;

      .ic {
        width: 26px;
        height: 26px;
        margin: 10px;
        margin-left: 15px;
      }

      .container-text {
        text-align: left;
        margin-left: 15px;

        .msg-alert {
          font-size: 18px;
          font-weight: bold;
          border: none;
        }
        .description {
          width: auto;
        }
      }
    }

    .close {
      width: 35px;
      height: 35px;
      font-size: 21px;
      border: none;
      background-color: transparent;

      &:hover {
        border-radius: 50%;
        border: 1px solid rgba(0, 0, 0, 0.438);
        cursor: pointer;
      }
    }
  }
}

@keyframes slide-bottom {
  from {
    transform: translateY(-80px);
    opacity: 0.1;
  }
}
</style>