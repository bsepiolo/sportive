import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/home.vue'
import {AuthRoutes} from './modules/auth/routes'
import {EventsRoutes} from './modules/events/routes'
import * as firebase from "firebase/app";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  ...AuthRoutes,
  ...EventsRoutes
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const isAuthenticated = firebase.auth().currentUser
  if (requiresAuth && !isAuthenticated) {
    next('/auth')
  } else {
    next()
  }
})

export default router
