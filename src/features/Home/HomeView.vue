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
      :dataItems="dataBlouses"
      @getItems="getBlouses"
    /> -->

    <ProductGrid :products="baseProducts" />

    <BackToTopButton />
    <Login v-show="store.isLogin" />
  </main>
</template>

<script lang="ts">
import Alert from '@/components/alerts/Alert.vue'
import ImageSlider from '../../components/ImageSlider.vue'
import ProductCarousel from '@/components/ProductCarousel.vue'
import BackToTopButton from '@/components/BackToTopButton.vue'
import Login from '@/features/Login/Login.vue'
import productApi from '@/services/productApi'
import { IBlouse } from '@/types'
import { baseStore } from '@/stores/baseStore'

import { Options, Vue } from 'vue-class-component'
import ProductGrid from '@/components/base/ProductGrid.vue'

@Options({
  components: {
    ImageSlider,
    ProductGrid,
    ProductCarousel,
    BackToTopButton,
    Login,
    Alert
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
  public dataBlouses: IBlouse[] = []
  public isAlert = false
  public alertDescription = ''
  public alertMessageType = ''
  public baseProducts = []

  showAlert(description: string, msgType: string) {
    this.alertDescription = description
    this.alertMessageType = msgType
    this.isAlert = true
  }

  async getAllProducts() {
    try {
      const res = await productApi.getBaseProducts()
      this.baseProducts = res
      console.log(res)
    } catch (error) {
      console.log('ERROR')
    }
  }

  arrowLoggedUserMsg(current: any, previous: any) {
    if (!previous && current) {
      this.showAlert('Usuário logado com sucesso', 'success')
    } else if (previous && !current) {
      this.showAlert('Você não está mais logado!', 'warning')
    }
    setTimeout(() => (this.isAlert = false), 3500)
  }

  public async getBlouses() {
    try {
      const response = await productApi.getBlouses()
      this.dataBlouses = response
    } catch (error) {
      console.log(error)
    }
  }

  mounted() {
    this.getAllProducts()
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
  margin: 0 0 170px 0;
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
