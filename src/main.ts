import Vue, { VNode } from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import router from './router'
function hundleError(details: string): void {
  console.log(details)
  router.push({ name: 'Error', params: { details } })
}
Vue.config.errorHandler = (err, vm, info): void => {
  hundleError(`Captured in Vue.config.errorHandler: ${info}\n${err}`)
}
window.addEventListener('error', (event) => {
  hundleError(`Captured in error EventListener: ${event.error}`)
})
window.addEventListener('unhandledrejection', (event) => {
  hundleError(`Captured in unhandledrejection EventListener: ${event.reason}`)
})

new Vue({
  router,
  render: (h): VNode => h(App),
}).$mount('#app')
