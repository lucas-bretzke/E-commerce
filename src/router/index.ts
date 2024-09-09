import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../features/Home/HomeView.vue'
import Favorites from '../features/Favorites/Favorites.vue'
import Cart from '../features/Cart/Cart.vue'
import ItemDetail from '../features/ItemDetail/ItemDetails.vue'

// function isAuthenticated() {
//   return !!Auth.currentUser
// }

// const requireAuth = (to: any, from: any, next: () => void) => {
//   isAuthenticated() ? next() : alert('Você precisa fazer o login primeiro.')
// }

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Favorites',
    name: 'Favorites',
    component: Favorites,
    // beforeEnter: requireAuth
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart,
    // beforeEnter: requireAuth
  },
  {
    path: '/Details',
    name: 'Details',
    component: ItemDetail
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
