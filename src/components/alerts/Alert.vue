<template>
  <div :class="`my-alert ${newClass}`">
    <FontAwesomeIcon
      :icon="`fa-solid ${icon}`"
      class="ic"
      :style="icStyles()"
    />

    <h2 class="msg-alert">{{ title }}</h2>

    <button class="close">
      <FontAwesomeIcon icon="fa-solid fa-xmark" />
    </button>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  props: {
    title: { type: String, required: true },
    messageType: { type: String, required: true },
  },
})
export default class Alert extends Vue {
  public messageType!: string;
  public icon = "";
  public newClass = "";

  private setType() {
    if (this.messageType == "success") {
      this.newClass = "success";
      this.icon = "fa-circle-check";
    } else if (this.messageType === "error") {
      this.newClass = "error";
      this.icon = "fa-circle-xmark";
    } else if (this.messageType === "info") {
      this.newClass = "info";
      this.icon = "fa-circle-info";
    } else if (this.messageType === "warning") {
      this.newClass = "warning";
      this.icon = "fa-triangle-exclamation";
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
    console.log(this.messageType);
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

.my-alert {
  width: 90%;
  position: fixed;
  top: 5px;
  left: 10px;
  display: flex;
  margin: 0px auto;
  align-items: center;
  text-align: center;
  border-radius: 5px;
  z-index: 2;
  animation: slide-bottom 0.6s;

  .ic {
    width: 26px;
    height: 26px;
    margin: 10px;
    border-radius: 50%;
  }
  .msg-alert {
    font-size: 18px;
    font-weight: bold;
    padding: 25px 0;
    border: none;
    margin-left: 10px;
  }

  .close {
    width: 35px;
    height: 35px;
    font-size: 23px;
    position: absolute;
    right: 30px;
    border: none;
    background-color: transparent;

    &:hover {
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.438);
      cursor: pointer;
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