import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import firebase from 'firebase/app'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faHeart as regularHeart, faEye, faEyeSlash } from '@fortawesome/free-regular-svg-icons'
import { faCartShopping, faArrowRight, faHeart as solidHeart, faChevronRight, faChevronLeft, faCaretUp, faSpinner, faG } from '@fortawesome/free-solid-svg-icons'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(
    faCartShopping, faArrowRight, solidHeart, regularHeart, faChevronRight, faChevronLeft,
    faCaretUp, faSpinner, faEye, faEyeSlash, faG
)


createApp(App).component("FontAwesomeIcon", FontAwesomeIcon).use(createPinia()).use(router).mount('#app')
