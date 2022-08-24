import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UserProfile from '../views/UserProfile.vue'
import AboutNutritious from '../views/AboutNutritious.vue'
import AboutActivities from '../views/AboutActivities.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile
  },
  {
    path: '/nutritious',
    name: 'nutritious',
    component: AboutNutritious
  },
  {
    path: '/activities',
    name: 'activities',
    component: AboutActivities
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
