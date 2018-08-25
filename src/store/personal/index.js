import {
  request
} from '../../../utils/request.js'


export default {

  state: {
    childBill:1,
    // 登入记录
    // queryLoginInfoList:[],
    // 修改登录密码
    updateLoginPasswordList:[],
    updateTradePasswordList:[],
    saveSafeQuestionList:[],
    signOutList:[],
    //彩票报表
    lotteryReport:[],
        // 下级会员列表
        queryAgentMemberInfoList:[],
        // 下级会员反水配额
        queryMemberInfoEditList:[],
         // 修改当前账号信息
        updateOwnInfoList:[],
         // 详细配额
        queryTeamQutaTypeList:[],
        // 修改反水配额
        updateTeamRebetList:[],
        // 转为代理
        updateMemberAgentList:[],
        // 新增会员
        agentRegisterMemberList:[],
        PromoteUrl:{},
    
  },
  getters: {},
  mutations: {
    queryChildBill(state, data){
      state.childBill=data
    },
    // 登入记录
    // savequeryLoginInfo(state, data){
    //   state.queryLoginInfoList = obj;
    // },
    // 修改登录密码
    updateLoginPassword(state,data){
      state.updateLoginPasswordList = data.data
    },
    // 登出
    savesignOut(state,data){
      state.signOutList = data.data
    },
    // 修改资金密码
    updateTradePassword(state,data){
      state.updateTradePasswordList = data.data
    },
    // 保存安全问题
    saveSafeQuestion(state,data){
      state.saveSafeQuestionList = data.data
    },
    lotteryReport(state,data){
      state.lotteryReport=data;
    },
      // 下级账号查询
      queryAgentMemberInfo(state,data){
        state.queryAgentMemberInfoList=data;
      },
       // 下级账号详情查询
      queryMemberInfoEdit(state,data){
        state.queryMemberInfoEditList=data;
      },
      // 修改当前账号详细信息
      
      updateOwnInfo(state,data){
        state.updateOwnInfoList=data;
      },
      // 详细配额
      queryTeamQutaType(state,data){
        state.queryTeamQutaTypeList=data;
      },
      // 修改反水配额 
      updateTeamRebet(state,data){
        state.updateTeamRebetList=data;
      },
      // 转为代理
      updateMemberAgent(state,data){
        state.updateMemberAgentList=data;
      },
      // 新增会员
      agentRegisterMember(state,data){
        state.agentRegisterMemberList=data;
      },
      queryPromoteUrl(state,data){
        state.PromoteUrl=data;
      }
   
  },
  actions: {
    //帐变记录
     queryChildBill({commit},params){
    	return new Promise(function(resolve, reject) {
				let res =  request('post','queryChildBill',params).then((res) => {
					commit("queryChildBill", res.data)
					resolve(res)
				})
			})
    },
    //个人报表
     queryMemberReport({commit},params){
     	return new Promise(function(resolve, reject) {
				let res =  request('post','queryMemberReport',params).then((res) => {
					resolve(res)
				})
			})
    },
    //个人报表—全部，中奖，退码等
     queryMemberReportAll({commit},params){
     		return new Promise(function(resolve, reject) {
				let res =  request('post','queryMemberReportAll',params).then((res) => {
					resolve(res)
				})
			})
    },
    //个人报表明细
     queryMemberReportOne({commit},params){
     	return new Promise(function(resolve, reject) {
				let res =  request('post','queryMemberReportOne',params).then((res) => {
					resolve(res)
				})
			})
    },
    //金流记录
     myCash({commit},params){
     	return new Promise(function(resolve, reject) {
				let res =  request('get','myCash',params).then((res) => {
					resolve(res)
				})
			})
    },

    //彩票报表
     queryLotteryReport({commit},params){
     	return new Promise(function(resolve, reject) {
				let res =  request('post','queryLotteryReport',params).then((res) => {
					if(res.code===0){
        commit('lotteryReport',res.data);
      }
					resolve(res)
				})
			})
    },

    //登入记录
     queryLoginInfo({commit},params){
     	return new Promise(function(resolve, reject) {
				let res =  request('post','queryLoginInfo',params).then((res) => {
      // commit('savequeryLoginInfo',res)
					resolve(res)
				})
			})
     
      
    },
    // 登出
     signOut({commit}){
     		return new Promise(function(resolve, reject) {
				let res =  request('get','signOut').then((res) => {
         commit('savesignOut',res)
					resolve(res)
				})
			})
    },
    // 修改登录密码
     updateLoginPassword({commit},params){
     	return new Promise(function(resolve, reject) {
				let res =  request('post','updateLoginPassword',params).then((res) => {
         commit('updateLoginPassword',res)
					resolve(res)
				})
			})
    },
    // 修改登录密码
     updateTradePassword({commit},params){
     	return new Promise(function(resolve, reject) {
				let res =  request('post','updateTradePassword',params).then((res) => {
         commit('updateTradePassword',res)
					resolve(res)
				})
			})
    },
    // 保存安全问题
     saveSafeQuestion({commit},params){
     	return new Promise(function(resolve, reject) {
				let res =  request('post','saveSafeQuestion',params).then((res) => {
         commit('saveSafeQuestion',res)
					resolve(res)
				})
			})
    },
   
     // 下级账号
     queryAgentMemberInfo({commit},params){
      return new Promise(function(resolve,reject){
        let res = request('post','queryAgentMemberInfo',params).then((res) => {
          commit('queryAgentMemberInfo',res)
          resolve(res)
        })
      })
    },
   // 下级账号详情
   queryMemberInfoEdit({commit},params){
    return new Promise(function(resolve,reject){
      let res = request('get','queryMemberInfoEdit',params).then((res) => {
        commit('queryMemberInfoEdit' ,res)
        resolve(res)
      })
    })
  },
  // 修改账号信息
  updateOwnInfo({commit},params){
    return new Promise(function(resolve,reject){
      let res = request('post','updateOwnInfo',params).then((res) => {
        commit('updateOwnInfo' ,res)
        resolve(res)
      })
    })
  },
   // 详细配额
   queryTeamQutaType({commit},params){
    return new Promise(function(resolve,reject){
      let res = request('post','queryTeamQutaType',params).then((res) => {
        commit('queryTeamQutaType' ,res)
        resolve(res)
      })
    })
  },
  // 修改反水配额
  updateTeamRebet({commit},params){
    return new Promise(function(resolve,reject){
      let res = request('post','updateTeamRebet',params).then((res) => {
        commit('updateTeamRebet' ,res)
        resolve(res)
      })
    })
  },
  // 转为代理
  updateMemberAgent({commit},params){
    return new Promise(function(resolve,reject){
      let res = request('get','updateMemberAgent',params).then((res) => {
        commit('updateMemberAgent' ,res)
        resolve(res)
      })
    })
  },
  // 新增会员
  agentRegisterMember({commit},params){
    return new Promise(function(resolve,reject){
      let res = request('post','agentRegisterMember',params).then((res) => {
        commit('agentRegisterMember' ,res)
        resolve(res)
      })
    })
  },
  //推广链接
  queryPromoteUrl({commit},params){
    return new Promise(function(resolve,reject){
      let res = request('get','queryPromoteUrl',params).then((res) => {
        commit('queryPromoteUrl' ,res)
        resolve(res)
      })
    })
  },

  savePromoteUrl({commit},params){
    return new Promise(function(resolve,reject){
      let res = request('post','savePromoteUrl',params).then((res) => {
        commit('savePromoteUrl' ,res)
        resolve(res)
      })
    })
  },
  }
}
