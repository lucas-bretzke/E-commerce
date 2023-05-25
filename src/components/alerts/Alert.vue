<template>
  <div class="container">
    <section :class="`alert ${newClass}`">
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
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    description: { type: String, required: true },
    messageType: { type: String, required: true },
  },
})
export default class Alert extends Vue {
  private messageType!: string;
  public title = "";
  public icon = "";
  public newClass = "";

  private setType() {
    const type = this.messageType;
    if (type === "success") {
      (this.title = "Sucesso"), (this.newClass = "success"), (this.icon = "fa-circle-check");
    }
    if (type === "error") {
      (this.title = "Error"), (this.newClass = "error"), (this.icon = "fa-circle-xmark");
    }
    if (type === "info") {
      (this.title = "Info"), (this.newClass = "info"), (this.icon = "fa-circle-info");
    }
    if (type === "warning") {
     (this.title = "Aviso"), (this.newClass = "warning"), (this.icon = "fa-triangle-exclamation");
    }
  }

  icStyles() {
    if (this.messageType === "success") return { color: "#00aa52" };
    if (this.messageType === "error") return { color: "#ff342c" };
    if (this.messageType === "info") return { color: "#0071ff" };
    if (this.messageType === "warning") return { color: "#ffa301" };
  }

  mounted() {
    this.setType();
  }
}
</script>

<style scoped lang="less">
.success {
  background-color: #b5eacc;
  border-bottom: 3px solid #00ab4e;
}
.error {
  background-color: #ffe3e0;
  border-bottom: 3px solid #fb4a1f;
}
.info {
  background-color: #c3ecff;
  border-bottom: 3px solid #0072fc;
}
.warning {
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