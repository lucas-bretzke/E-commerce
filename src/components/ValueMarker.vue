<template>
  <div class="counter">
    {{ $store.state.counterFavorites }}
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
})
export default class Counter extends Vue {}
</script>

<style scoped lang="less">
.counter {
  width: 17px;
  height: 17px;
  padding: 2px;
  border: 0;
  border-radius: 50%;
  color: black;
  background-color: white;
  font-weight: 600;
}
</style>