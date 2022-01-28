import Vue from 'vue'
import router from './router/router'
import store from './store/store'
import App from './App.vue'
import axios from 'axios'
import './registerServiceWorker'
import './assets/css/style.sass'


var VueScrollTo = require('vue-scrollto');
Vue.use(VueScrollTo, {
	container: "body",
	duration: 600,
	easing: "[0.1, 0.0, 0.9, 1.0]",
	offset: -60,
	force: true,
	cancelable: true,
	onStart: false,
	onDone: false,
	onCancel: false,
	x: false,
	y: true
})

Vue.config.productionTip = false

new Vue({
	router,
	store,
	axios,
	render: h => h(App)
}).$mount('#app')
