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
    async queryChildBill({commit},params){
      let res = await request('post','queryChildBill',params)
      commit("queryChildBill", res.data)
      return res
    },
    //个人报表
    async queryMemberReport({commit},params){
      let res = await request('post','queryMemberReport',params)
      return res
    },
    //个人报表—全部，中奖，退码等
    async queryMemberReportAll({commit},params){
      let res = await request('post','queryMemberReportAll',params)
      return res
    },
    //个人报表明细
    async queryMemberReportOne({commit},params){
      let res = await request('post','queryMemberReportOne',params)
      return res
    },
    //金流记录
    async myCash({commit},params){
      let res = await request('get','myCash',params)
      return res
    },

    //彩票报表
    async queryLotteryReport({commit},params){
      let res = await request('post','queryLotteryReport',params);
      if(res.code===0){
        commit('lotteryReport',res.data);
      }
      return res
    },

    //登入记录
    async queryLoginInfo({commit},params){
      let res = await request('post','queryLoginInfo',params);
      // commit('savequeryLoginInfo',res)
      return res
    },
    // 登出
    async signOut({commit}){
      let res = await request('get','signOut');
      commit('savesignOut',res)
      return res
    },
    // 修改登录密码
    async updateLoginPassword({commit},params){
      let res = await request('post','updateLoginPassword',params);
      commit('updateLoginPassword',res);
      return res
    },
    // 修改登录密码
    async updateTradePassword({commit},params){
      let res = await request('post','updateTradePassword',params);
      commit('updateTradePassword',res);
      return res
    },
    // 保存安全问题
    async saveSafeQuestion({commit},params){
      let res = await request('post','saveSafeQuestion',params);
      commit('saveSafeQuestion',res);
      return res
    },

    // 下级账号
    async queryAgentMemberInfo({commit},params){
      let res = await request('post','queryAgentMemberInfo',params);
      commit('queryAgentMemberInfo',res);
      return res
    },
   // 下级账号详情
   async queryMemberInfoEdit({commit},params){
    let res = await request('get','queryMemberInfoEdit',params);
    commit('queryMemberInfoEdit',res);
    return res
  },
  // 修改账号信息
  async updateOwnInfo({commit},params){
    let res = await request('post','updateOwnInfo',params);
    commit('updateOwnInfo',res);
    return res
  },
   // 详细配额
   async queryTeamQutaType({commit},params){
    let res = await request('post','queryTeamQutaType',params);
    commit('queryTeamQutaType',res);
    return res
  },
  
  // 修改反水配额
  async updateTeamRebet({commit},params){
    let res = await request('post','updateTeamRebet',params);
    commit('updateTeamRebet',res);
    return res
  },
  // 转为代理
  async updateMemberAgent({commit},params){
    let res = await request('get','updateMemberAgent',params);
    commit('updateMemberAgent',res);
    return res
  },
  // 新增会员
  async agentRegisterMember({commit},params){
    let res = await request('post','agentRegisterMember',params);
    commit('agentRegisterMember',res);
    return res
  },
  //推广链接
  async queryPromoteUrl({commit}){
    let res = await request('get','queryPromoteUrl');
    commit('queryPromoteUrl',res.data);
    return res
  },
  async savePromoteUrl({commit},params){
    let res = await request('post','savePromoteUrl',params);
    return res
  },
  
  }
}
