<template>
  <nav>
    <slot class="left" name="Left"></slot>
    <slot class="center" name="Center"></slot>
    <slot class="right" name="Right"></slot>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class NavBar extends Vue {}
</script>

<style scoped lang="less">
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .left,
  .center,
  .right {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>