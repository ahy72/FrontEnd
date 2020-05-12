import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Machines from '../views/Machines.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/Machines',
    name: 'Machines',
    component: Machines,
  },
  {
    path: '/Message',
    name: 'Message',
    component: () => import('../views/Message.vue'),
  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
