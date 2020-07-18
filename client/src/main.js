import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import 'vue2-animate/dist/vue2-animate.min.css'
import './assets/iconfont/iconfont.js'
import axios from 'axios'
import ElementUI from 'element-ui'
Vue.prototype.$Axios=axios
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
