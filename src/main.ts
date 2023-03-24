import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faArrowRight, faHeart as solidHeart, faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCartShopping, faArrowRight, solidHeart, regularHeart, faChevronRight, faChevronLeft)


createApp(App).component("FontAwesomeIcon", FontAwesomeIcon).use(store).use(router).mount('#app')
