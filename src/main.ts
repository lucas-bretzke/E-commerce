import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCartShopping)


createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).mount('#app')
