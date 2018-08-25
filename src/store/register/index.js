import {request} from "../../../utils/request.js";

export default{
	namespaced: true,
	state:{
    registerMemberList:[]
	},
    getters: {
    },
    mutations: {
      saveregisterMember(state,obj){
        state.registerMemberList = obj;
      }
	},
  actions:{
    //会员注册
    registerMember({commit},params){
    	return new Promise(function(resolve, reject) {
				let res = request('post','registerMember',params).then((res) => {
                 commit('saveregisterMember',res.data)
					resolve(res)
				})
			})
    },
  }
}
