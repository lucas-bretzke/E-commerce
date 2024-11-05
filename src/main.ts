import './registerServiceWorker'
import App from './App.vue'
import router from './router'
import { createApp } from 'vue'

import VueCookies from './vue-cookies'
import { createPinia } from 'pinia'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faEye,
  faEyeSlash,
  faHeart as regularHeart
} from '@fortawesome/free-regular-svg-icons'
import {
  faXmark,
  faSearch,
  faCaretUp,
  faSpinner,
  faCartPlus,
  faTrashCan,
  faCircleInfo,
  faArrowRight,
  faChevronDown,
  faChevronLeft,
  faCircleCheck,
  faCircleXmark,
  faCartShopping,
  faChevronRight,
  faHeart as solidHeart,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'

library.add(
  faEye,
  faXmark,
  faGoogle,
  faSearch,
  faSpinner,
  faCaretUp,
  faCartPlus,
  solidHeart,
  faEyeSlash,
  faTrashCan,
  faArrowRight,
  faCircleInfo,
  regularHeart,
  faChevronDown,
  faCircleCheck,
  faCircleXmark,
  faChevronLeft,
  faChevronRight,
  faCartShopping,
  faTriangleExclamation
)

const app = createApp(App)
app.use(router)
app.use(VueCookies)
app.use(createPinia())
app.component('FontAwesomeIcon', FontAwesomeIcon)
app.mount('#app')
