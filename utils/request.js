import Vue from 'vue'
import axios from 'axios'
import common from '../src/common.vue'
import router from '../src/router/index.js';
import store from '../src/store/index';
Vue.prototype.$http=axios;
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
let baseURL = common.baseUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json';
var axiosURL = {
  queryChildBill: '/inter/user/queryChildBill', //帐变记录
  touristLogin: "/inter/user/visitorLogin", //游客登录
  getGamePlayList: "/inter/ticket/gamePlay", //彩类玩法列表
  memberLogin: "/inter/user/userLogin", //会员登录
  getUserDetails: '/inter/user/userDetail',
  queryLotteryOrderOwn: "/inter/user/queryLotteryOrderOwn", //查询我的投注
  kind: "/inter/ticket/kind", //所有彩种
  queryMemberReportOne: '/inter/user/queryMemberReportOne', //查看投注详情
  cancelOrder: '/inter/ticket/cancelOrder', //撤单
  queryMemberReport: '/inter/user/queryMemberReport', //个人报表
  queryMemberReportAll: '/inter/user/queryMemberReportAll', //个人报表—全部，中奖，退码等
  queryMemberReportOne: '/inter/user/queryMemberReportOne', //个人报表明细
  myCash: '/inter/user/myCash/', //金流记录
  queryLotteryReport: '/inter/user/queryLotteryReport', //彩票报表
  queryLoginInfo: '/inter/user/queryLoginInfo', //登入记录
  updateLoginPassword: '/inter/user/updateLoginPassword', //修改登录密码
  updateTradePassword: '/inter/user/updateTradePassword', //修改资金密码
  saveSafeQuestion: '/inter/user/saveSafeQuestion', //保存安全问题
  signOut: '/inter/user/userLogOut', //登出
  queryIncome: '/inter/money/queryIncome', //获取充值说明
  queryBank: '/inter/money/queryBank', //查询银行卡
  winHistory: '/inter/ticket/winHistory/', //开奖历史1
  winsDragon: "/inter/ticket/winsDragon/", //开奖历史2(长龙)
  registerMember: '/inter/user/registerMember', //会员注册
  saveMoneyOrder: '/inter/money/saveMoneyOrder', //会员生成订单
  updateMoneyOrder: '/inter/money/updateMoneyOrder', //会员更新订单
  memberIfBind: '/inter/user/memberIfBind', //银行卡
  saveMemberOtherBank: "/inter/user/saveMemberOtherBank", //新增银行卡
  saveMemberBank: '/inter/user/saveMemberBank', //绑定首张银行卡
  saveThreeOrder: '/inter/money/saveThreeOrder', //三方生成订单
  updateThreeOrder: '/inter/money/updateThreeOrder', //三方更新订单
  queryDocumentContentList: '/notice/queryDocumentContentList/?documentListId=402880435f948968015f948c1c8a0000', // 优惠活动
  queryMemberNoticeList: '/notice/queryMemberNoticeList', // 获取公告
  queryNoticeAlertList: '/notice/queryNoticeAlertList', // 获取消息
  deleteNoticeAlert: '/notice/deleteNoticeAlert',
  updateNoticeAlert: '/notice/updateNoticeAlert',
  queryDrawCondition:'/inter/money/queryDrawCondition',//出款查询
  saveDrawMoneyInfo:'/inter/money/saveDrawMoneyInfo',//出款保存  
  getWinsDragon:'/inter/ticket/winsDragon',//获取开奖长龙及历史
  chipIn:'/inter/ticket/chipIn',//投注
  getTimes :'/inter/ticket/timeLeft',//获取彩种开奖倒计时
  feedback: '/inter/user/feedback', //帮助与反馈
  timeLeft: '/inter/ticket/timeLeft/', // 获取倒计时
  queryDrawCondition: '/inter/money/queryDrawCondition', //出款查询
  saveDrawMoneyInfo: '/inter/money/saveDrawMoneyInfo', //出款保存  
  getSubGames: '/inter/ticket/subGames', //获取玩法列表
  helpService: '/collect/helpService', //在线客服
  saveDiy: '/inter/user/diy',
  twoGameOdd: '/inter/ticket/twoGameOdd/',  //两面盘赔率
  twoBet: '/inter/ticket/bet',  //两面投注
  queryRegister: '/inter/user/queryRegister',  //两面投注

  queryAgentMemberInfo: '/inter/user/queryAgentMemberInfo', // 下级会员查询
  queryMemberInfoEdit: '/inter/user/queryMemberInfoEdit', // 查询下级配额
  updateOwnInfo: '/inter/user/updateOwnInfo', // 修改当前账号详细信息
  queryTeamQutaType: '/inter/user/queryTeamQutaType', // 详细配额
  updateTeamRebet: '/inter/user/updateTeamRebet', // 修改反水配额
  updateMemberAgent: '/inter/user/updateMemberAgent', // 转为代理
  agentRegisterMember: '/inter/user/agentRegisterMember', // 新增会员
  queryPromoteUrl: '/inter/user/queryPromoteUrl', //推广链接
  savePromoteUrl: '/inter/user/savePromoteUrl', //保存推广链接
}


export function request(type = 'POST', name = '', data = ''){
	return new Promise(function (resolve, reject) {
var result
type = type.toUpperCase()
if (type === 'GET') {
    axios.get(baseURL+axiosURL[name] + data)
      .then(res => {
        result = res.data
        if(result.code == '666'&&router.history.current.name!='allKinds'){
            router.push({name:"login"});
            sessionStorage.setItem("chartLogin", "2");
//          store.state.chart.chartsocket.close();
        	}
        resolve(result)
      })
} else if (type === 'POST') {
    axios.post(baseURL+axiosURL[name], data)
      .then(res => {
        result = res.data
        if(result.code == '666'&&router.history.current.name!='allKinds'){
            router.push({name:"login"});
            sessionStorage.setItem("chartLogin", "2");
//          store.state.chart.chartsocket.close();
        	}
         resolve(result)
      })
}
    });

}
