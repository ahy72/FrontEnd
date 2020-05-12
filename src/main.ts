import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost/api/VirtualMachineStatus/'
axios.defaults.baseURL = 'http://systrialsvr/api/VirtualMachineStatus/'
axios.defaults.baseURL = "https://virtualmachinestatusbackend.azurewebsites.net/VirtualMachineStatus/";

// axios.defaults.responseType = "json";
// axios.defaults.headers.common['Accept'] = "application/json";
// axios.defaults.headers.common['Content-Type'] = "application/json";

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
