import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UserProfile from '../views/UserProfile.vue'
import AboutNutritious from '../views/AboutNutritious.vue'
import AboutActivities from '../views/AboutActivities.vue'
import AdminPage from '../views/AdminPage.vue'
import checkSession from '../JS/checkSession.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfile,
    meta:{
      userStatus:true
    }
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
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminPage,
    meta:{
      userLevel:1
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


router.beforeEach(async(to)=>{
  if(to.meta.userStatus){
    const res=await checkSession()
    if(!res){
      router.push({name:"home"})
    }
    else{
      if(res.response){
        router.push({name:"home"})
      }
    }
  }
  if(to.meta.userLevel){
    const res=await checkSession()
    if(!res){
      router.push({name:"home"})
    }
    else{
      if(res.response || res.data.res.level===2){
        router.push({name:"home"})
      }
    }
  }
})

export default router
