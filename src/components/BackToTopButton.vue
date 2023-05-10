<template>
  <button class="scroll-to-top" @click="scrollToTop">
    <FontAwesomeIcon icon="fa-solid fa-caret-up" /> Topo
  </button>
</template>

<script lang='ts'>
import { Vue, Options } from "vue-class-component";

@Options({})
export default class BackToTopButton extends Vue {
  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}
</script>


<style lang="less" scoped>
.scroll-to-top {
  position: fixed;
  width: 76px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  bottom: 80px;
  right: 20px;
  padding: 8px 13px;
  background-color: #e6e6e6;
  border-radius: 3px;
  border: none;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #d7d7d7;
  }
}
</style>