import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../features/Home/HomeView.vue'
import Favorites from '../features/Favorites/Favorites.vue'
import Cart from '../features/Cart/Cart.vue'
import ItemDetail from '../features/ItemDetail/ItemDetails.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Favorites',
    name: 'Favorites',
    component: Favorites
  },
  {
    path: '/Cart',
    name: 'Cart',
    component: Cart
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
