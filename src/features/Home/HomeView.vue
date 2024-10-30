<template>
  <main class="home">
    <Alert
      v-show="isAlert"
      :description="alertDescription"
      :messageType="alertMessageType"
    />
    <div class="background-top">
      <header class="center header-block">
        <ImageSlider
          :images="images"
          :progressionBar="true"
          :sliderControls="true"
          :setInterval="5000"
        />
      </header>
    </div>
    <!-- <ProductCarousel
      title="NOVIDADES"
      :dataItems=""
      @getItems=""
    /> -->

    <ProductGrid :products="store.baseProducts" />

    <BackToTopButton />
    <Login v-show="store.showLoginScreen" />
  </main>
</template>

<script lang="ts">
import { baseStore } from '@/stores/baseStore'
import { Options, Vue } from 'vue-class-component'

// Components.
import Login from '@/features/Login/Login.vue'
import Alert from '@/components/alerts/Alert.vue'
import ProductGrid from '@/components/base/ProductGrid.vue'
import ImageSlider from '../../components/ImageSlider.vue'
import ProductCarousel from '@/components/ProductCarousel.vue'
import BackToTopButton from '@/components/BackToTopButton.vue'

@Options({
  components: {
    Login,
    Alert,
    ImageSlider,
    ProductGrid,
    ProductCarousel,
    BackToTopButton
  },
  watch: {
    'store.user.uid': function (current, previous) {
      this.arrowLoggedUserMsg(current, previous)
    }
  }
})
export default class HomeView extends Vue {
  public store = baseStore()
  public images = [
    {
      url: '/img/HomeBanner/roupas03.jpg',
      alt: 'Imagem 1'
    },
    {
      url: '/img/HomeBanner/roupas01.webp',
      alt: 'Imagem 2'
    },
    {
      url: '/img/HomeBanner/roupas02.jpg',
      alt: 'Imagem 3'
    }
  ]
  public isAlert = false
  public alertDescription = ''
  public alertMessageType = ''

  showAlert(description: string, msgType: string) {
    this.alertDescription = description
    this.alertMessageType = msgType
    this.isAlert = true
  }

  arrowLoggedUserMsg(current: any, previous: any) {
    if (!previous && current) {
      this.showAlert('Usuário logado com sucesso', 'success')
    } else if (previous && !current) {
      this.showAlert('Você não está mais logado!', 'warning')
    }
    setTimeout(() => (this.isAlert = false), 3500)
  }

  mounted() {
    this.store.getAllProducts()
  }
}
</script>

<style scoped lang="less">
.center {
  max-width: 1000px;
  min-width: 300px;
  margin: 0 auto;
}

.background-top {
  width: 100%;
  height: 370px;
  margin: 0 0 130px 0;
  align-items: center;
  background-color: var(--color-primary);
}

.home {
  display: flex;
  flex-direction: column;

  .header-block {
    width: 100%;
    height: 450px;
    display: flex;
    box-shadow: 10px 10px 40px black;
    border-radius: 5px;
    background-color: var(--color-secundary);
  }
}
</style>
