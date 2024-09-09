import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { createPinia } from 'pinia'
import VueCookies from './vue-cookies'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faHeart as regularHeart,
  faEye,
  faEyeSlash
} from '@fortawesome/free-regular-svg-icons'
import {
  faCartShopping,
  faArrowRight,
  faHeart as solidHeart,
  faChevronRight,
  faChevronLeft,
  faCaretUp,
  faSpinner,
  faXmark,
  faCircleCheck,
  faCircleXmark,
  faCartPlus,
  faCircleInfo,
  faTriangleExclamation
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(
  faCartShopping,
  faCartPlus,
  faCartShopping,
  faArrowRight,
  solidHeart,
  regularHeart,
  faChevronRight,
  faChevronLeft,
  faCaretUp,
  faSpinner,
  faEye,
  faEyeSlash,
  faGoogle,
  faXmark,
  faCircleCheck,
  faCircleXmark,
  faCircleInfo,
  faTriangleExclamation
)

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(createPinia())
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
