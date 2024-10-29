<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
import NavBar from '@/features/NavBar/NavBar.vue'
import { baseStore } from '@/stores/baseStore'

import { Options, Vue } from 'vue-class-component'

@Options({
  components: {
    NavBar
  }
})
export default class App extends Vue {
  public store = baseStore()

  mounted() {
    const user = localStorage.getItem('user')
    if (user) this.store.user = JSON.parse(user)
  }
}
</script>

<style lang="less">
:root {
  --color-primary: #d2b48c;
  --color-secundary: black;
  --dark: #151a30;
  --color-terciary: #bc8f8f;
  --gray: #ededed;
}

*,
#app {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.background-top {
  width: 100%;
  height: 120px;
  align-items: center;
  background-color: var(--color-primary);
}
</style>
