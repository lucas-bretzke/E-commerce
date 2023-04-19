<template>
  <div class="alert" :class="{ active: activeAlert }">
    <p class="msg_alert">{{ msgAlert }}</p>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class HomeView extends Vue {}
</script>

<style scoped lang="less">
.alert {
  position: fixed;
  top: 20px;
  left: 0;
  z-index: 2;
  width: 100%;
  text-align: center;
  display: none;
}
.alert.active {
  display: block;
  animation: fadeInDown 0.3s forwards;
}
.msg_alert {
  background: #fff;
  display: inline-block;
  padding: 20px 40px;
  border: 2px solid #000;
  box-shadow: 0 3px 4px rgba(0, 0, 0, 0.1), 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>