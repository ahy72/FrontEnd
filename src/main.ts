import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import axios from 'axios'
// axios.defaults.baseURL = "https://127.0.0.1:5002/";
axios.defaults.baseURL = "https://virtualmachinestatusbackend.azurewebsites.net/";

axios.defaults.responseType = "json";
axios.defaults.headers.common['Content-Type'] = "application/json";

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')