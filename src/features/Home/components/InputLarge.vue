<template>
  <div class="background">
    <section class="container">
      <input type="text" placeholder="Choose favorite model" />
      <button>Search</button>
    </section>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";

@Options({})
export default class InputLarge extends Vue {}
</script>


<style scoped lang="less">
.background {
  max-width: 1000px;
  width: 1000px;
  margin: 0 auto;
  padding: 0;
  border-radius: 5px;
  background-color: var(--gray);

  .container {
    padding: 40px;
    display: flex;
    border-radius: 5px;

    input {
      width: 100%;
      padding: 10px;
      border: none;
      border-radius: 5px 0 0 5px;
      outline: none;
    }

    button {
      width: 20%;
      padding: 15px;
      font-size: 16px;
      border: none;
      border-radius: 0 5px 5px 0;
      color: white;
      background-color: var(--blue);
      transition: 0.5s;
      border: 1px solid transparent;
    }

    button:hover {
      cursor: pointer;
      font-weight: 600;
      border: 1px solid var(--blue);
      color: var(--blue);
      background-color: var(--gray);
    }
  }
}
</style>