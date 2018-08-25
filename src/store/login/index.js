import { request } from "../../../utils/request.js"
export default {
	namespaced: true,
	state: {
		userDetails: [], //用户详情

	},
	getters: {},
	mutations: {
		saveUserDetails(state, obj) {
			state.userDetails = obj;
		}
	},
	actions: {
		//游客试玩
		touristLogin({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'touristLogin', params).then((res) => {
					commit('saveUserDetails', res.data)
					resolve(res)
				})
			})

		},
		//会员登录
		memberLogin({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'memberLogin', params).then((res) => {
					commit('saveUserDetails', res.data)
					resolve(res)
				})
			    

			})
			
			
		},
		getUserDetails({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'getUserDetails').then((res) => {
					commit('saveUserDetails', res.data)
					resolve(res)
				})
			})
		},
	}
}