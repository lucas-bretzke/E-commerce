<template>
  <div class="center">
    <div class="container">
      <input type="text" placeholder="Choose favorite model" />
      <button>Search</button>
    </div>
  </div>
</template>

<script>
import { Options, Vue } from "vue-class-component";

@Options({})
export default class InputLarge extends Vue {}
</script>


<style scoped>
:root {
  --orange: #f78b00;
  --blue: #00285f;
  --gray: #ededed;
}

.center {
  max-width: 1000px;
  min-width: 300px;

  margin: 0px auto;
  padding: 0px;

  border-radius: 5px;
  background-color: var(--gray);
}

.container {
  padding: 40px;

  display: flex;
  border-radius: 5px;
}

input {
  width: 100%;
  padding: 10px;

  border: none;
  border-radius: 5px 0px 0px 5px;

  outline: none;
}

button {
  width: 20%;
  padding: 15px;

  font-size: 16px;

  border: none;
  border-radius: 0px 5px 5px 0px;

  color: white;
  background-color: var(--blue);
  transition: 0.5s;
}

button:hover {
  color: var(--blue);
  background-color: var(--gray);
}
</style>