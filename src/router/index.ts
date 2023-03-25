import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../features/Home/HomeView.vue'
import Favorites from '../features/Favorites/Favorites.vue'

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
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
