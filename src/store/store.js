import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		bookInput:[]
	},
	mutations: {
		setContents(state, data){
			state.bookInput = data;
		},
		addContent(state, data){
			state.bookInput.push(data);
		}
	},
	actions: {
		DATA_READ: ((context) => {
			return axios.get('https://etravel-f011c.firebaseio.com/data.json').then((res) => {
				context.commit('setContents', res.data)
			})
		}),
	},
	// strict: true
})