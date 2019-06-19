import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'normalize.css/normalize.css'
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-variables.scss'
import '@/styles/index.scss'
import './permission'
import './icons'
import i18n from './lang'

Vue.use(ElementUi,{
	i18n:(key,value)=>i18n.t(key,value)
})
Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
