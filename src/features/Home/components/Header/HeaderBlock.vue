<template>
  <div class="header-block">
    <div class="text">
      <h1>The perfect car for you</h1>
      <br />
      <p>
        Lorem ipsum dolor sit amet <br />
        consectetur adipisicing elit. Officia, <br />
        asperiores?
      </p>
    </div>

    <div style="width: 50%">
      <img :src="carroAmarelo" class="img-Header" />
    </div>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({})
export default class HeaderBlock extends Vue {
  public carroAmarelo = "/img/car-header.png";
}
</script>


<style >
:root {
  --orange: #f78b00;
  --blue: #00285f;
  --gray: #ededed;
}

.header-block {
  width: 100%;
  height: 450px;

  display: flex;

  box-shadow: 10px 10px 40px black;
  border-radius: 5px;
  background-color: var(--blue);
}

.header-block .text {
  width: 43%;
  padding: 19% 5% 0% 0%;

  text-align: right;
  color: white;
}

.img-Header {
  width: 100%;
  padding: 30% 0%;
}
</style>