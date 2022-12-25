import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/my-decks',
    name: 'MyDecks',
    component: () => import('../views/MyDecks.vue'),
  },
  {
    path: '/my-decks/:deck_id',
    name: 'Details',
    component: () => import('../views/MyDecksDetails.vue'),
  },
  {
    path: '/my-decks/:deck_id/edit',
    name: 'Manager',
    component: () => import('../views/MyDecksManager.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
