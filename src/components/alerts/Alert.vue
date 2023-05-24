<template>
  <div class="my-alert" :style="`background-color: ${bgColor}`">
    <FontAwesomeIcon :icon="icon" class="ic" id="icon" />

    <p class="msg-alert">{{ title }}</p>

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
  public bgColor = "";

  private setType() {
    const el = document.getElementById("icon") as HTMLElement;

    if (this.messageType == "succes") {
      this.bgColor = "#b5eacc";
      this.icon = "fa-regular fa-circle-check";

      this.$nextTick(() => {
        const iconElement = this.$refs.iconElement as any;
        iconElement.class = "succes";
      });
    }
  }

  mounted() {
    this.setType();
    console.log(this.messageType);
  }
}
</script>

<style scoped lang="less">
:root {
  --primary: #0676ed;
  --background: #222b45;
  --warning: #f2a600;
  --success: #12c99b;
  --error: #e41749;
}
.warning {
  background-color: #ffe4c8;
}
.info {
  background-color: #c3ecff;
}
.succes {
  background-color: #00aa52;
}
.error {
  background-color: #ffe3e0;
}
.my-alert {
  width: 90%;
  position: fixed;
  top: 5px;
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