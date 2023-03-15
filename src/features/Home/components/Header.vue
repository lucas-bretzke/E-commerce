<template>
  <section class="header-block">
    <div class="container-text">
      <h1>The perfect car for you</h1>
      <br />
      <p>
        Lorem ipsum dolor sit amet <br />
        consectetur adipisicing elit. Officia, <br />
        asperiores?
      </p>
    </div>

    <div class="container-img">
      <img src="/img/car-header.png" class="img-header" />
    </div>
  </section>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class Header extends Vue {}
</script>


<style scoped lang="less">
.header-block {
  width: 100%;
  height: 450px;
  display: flex;
  box-shadow: 10px 10px 40px black;
  border-radius: 5px;
  background-color: var(--blue);

  .container-text {
    width: 43%;
    padding: 19% 5% 0% 0%;
    text-align: right;
    line-height: 22px;
    color: white;
  }

  .container-img {
    width: 50%;
    .img-header {
      width: 100%;
      padding: 30% 0%;
    }
  }
}
</style>