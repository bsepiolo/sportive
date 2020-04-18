import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from './views/Home.vue'
import {AuthRoutes} from './modules/auth/routes'
import {EventsRoutes} from './modules/events/routes'
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
  routes
})

export default router
