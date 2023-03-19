import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCartShopping, faArrowRight, faHeart)


createApp(App).component("FontAwesomeIcon", FontAwesomeIcon).use(store).use(router).mount('#app')
