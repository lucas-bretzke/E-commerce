import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping, faArrowRight, faHeart as solidHeart, faChevronRight, faChevronLeft, faCaretUp, } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'


library.add(faCartShopping, faArrowRight, solidHeart, regularHeart, faChevronRight, faChevronLeft, faCaretUp)


createApp(App).component("FontAwesomeIcon", FontAwesomeIcon).use(store).use(router).mount('#app')
