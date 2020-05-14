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
    component: () => import('../views/Message.vue'), // eslint-disable-line
  },
  {
    path: '/Error',
    name: 'Error',
    component: () => import('../views/Error.vue'), // eslint-disable-line
  },
  {
    path: '*',
    component: () => import('../views/NotFound.vue'), // eslint-disable-line
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
