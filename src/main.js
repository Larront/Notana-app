import Vue from 'vue'
import Vuex from 'vuex'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(Buefy)

new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
