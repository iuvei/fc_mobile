import {request} from "../../../utils/request.js"
export default{
    namespaced: true,
    state:{
        twoGameList:[]
    },
    getters:{

    },
    mutations:{
        twoGameOddList(state,obj){
            state.twoGameList = obj.data;
        },

    },
    actions:{
        twoGameOdd({commit},params){
        	return new Promise(function(resolve, reject) {
				let res = request('get','twoGameOdd',params).then((res) => {
                 commit("twoGameOddList",res);
				 resolve(res)
				})
			})
        },
        twoBet({commit},params){
        	return new Promise(function(resolve, reject) {
				 let res = request('post','twoBet',params).then((res) => {
                 // commit("twoGameOddList",res);
				 resolve(res)
				})
			})
        }
    }

}