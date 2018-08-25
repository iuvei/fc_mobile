import {request} from "../../../utils/request.js";
export default{
	namespaced: true,
	state:{
    activityDocumentList:[]
	},
    getters: {
    },
    mutations: {
      DocumentContent (state, obj) {
        state.activityDocumentList = obj.data
      }
	},
  actions:{
    // 优惠活动
    queryDocumentContentList ({commit}) {
    	return new Promise(function(resolve, reject) {
				let res = request ('get','queryDocumentContentList').then((res) => {
					commit('DocumentContent', res)
					resolve(res)
				})

			})
    }
  }
}
