import Vue from 'vue'
import Vuex from 'vuex'
import activity_module from './activity/index.js'
import bet_module from './bet/index.js'
import chart_module from './chart/index.js'
import help_module from './help/index'
import personal_module from './personal/index.js'
import report_module from './report/index.js'
import home_module from './home/index.js'
import login_module from './login/index.js'
import register_module from './register/index.js'
import twobet_module from './twobet/index.js'
import {request} from '../../utils/request.js'
import common from '../common.vue'
Vue.use(Vuex)
const state = {
  //查询银行获得的所有公司入款数据
  dataList: sessionStorage.getItem('_datas') ? JSON.parse(sessionStorage.getItem('_datas')) : [], //当sessiion里有数据时，默认为session里的数据；防止刷新后数据为空
  //充值说明
  income: sessionStorage.getItem('Income') ? JSON.parse(sessionStorage.getItem('Income')) : [],
  //充值订单数据
  PaymentOrder: sessionStorage.getItem('PaymentType') ? JSON.parse(sessionStorage.getItem('PaymentType')) : [],
  //三方充值二维码相关数据
  qrCode: sessionStorage.getItem('qrCode') ? JSON.parse(sessionStorage.getItem('qrCode')) : {},
  //三方充值类型
  serviceType: '',
  //提现查询
  drawCondition: '',
  isLogin: false, //登陆状态
  msg:'',//ws消息
}
const getters = {
  //通过条件判断获取各数据列表
  datas(state) {
    return function (routerId) {
      let arr = [];
      for (let item of state.dataList) {
        if (routerId === 'bank') {
          if (!common.BankNo.includes(item.bankNo)) {
            arr.push(item);
          }
        } else if (routerId === "alipayTransfer") {
          if (item.bankNo === common.BankNo[1]) {
            arr.push(item);
          }
        } else if ((routerId === "qqTransfer")) {
          if (item.bankNo === common.BankNo[0]) {
            arr.push(item);
          }
        } else if ((routerId === "wechatTransfer")) {
          if (item.bankNo === common.BankNo[2]) {
            arr.push(item);
          }
        } else if ((routerId === "wechatScan")) {
          if (item.serviceType === common.BankNo[3]) {
            arr.push(item);
          }
        } else if ((routerId === "qqScan")) {
          if (item.serviceType === common.BankNo[4]) {
            arr.push(item);
          }
        }
      }
      return arr
    }
  },
  //通过条件判断获取不同充值的说明
  incomeMessage(state) {
    return function (routerId) {
      //公司入款的路由数组
      let routers = ["bank", "qqTransfer", "alipayTransfer", "wechatTransfer", ];
      for (let item of state.income) {
        if (item.id === '0') {
          if (routers.includes(routerId)) {
            return item.remark
          }
        } else if (item.id === '2') {
          if (!routers.includes(routerId)) {
            return item.remark
          }
        }
      }
    }
  }
}
const mutations = {
	sendMessage(state,msg){
		state.msg = msg
	},
  queryBank(state, data) {
    if (data.code === 2) {
      state.dataList = data.data
    } else if (data.code === 1) {
      state.PaymentOrder = data.data

    }

  },
  queryIncome(state, data) {
    state.income = data
  },
  updateThreeOrder(state, data) {
    state.qrCode = data
  },

  //存入三方存款类型
  serviceType(state, data) {
    state.serviceType = data.type
  },
  queryDrawCondition(state, data) {
    state.drawCondition = data
  },
  setIsLogin(state, data) {
    state.isLogin = data
  }
}
const actions = {
	//保存头像
	saveDiy({
    commit
  }, params) {
  	return new Promise(function(resolve, reject) {
				 let res = request('post', 'saveDiy', params).then((res) => {
				 resolve(res)
				})
			})
  },
  //查询银行卡
  queryBank({
    commit
  }, params) {
  	return new Promise(function(resolve, reject) {
				 let res = request('post', 'queryBank', params).then((res) => {
				 if (res.code === 2) {
      sessionStorage.setItem('_datas', JSON.stringify(res.data))
      commit('queryBank', res)
    } else if (res.code === 1) {
      sessionStorage.setItem('PaymentType', JSON.stringify(res.data))
      commit('queryBank', res)
    }
				 resolve(res)
				})
			})
  },
  //获取充值说明 
  queryIncome({
    commit
  }) {
  	return new Promise(function(resolve, reject) {
				 let res = request('get', 'queryIncome').then((res) => {
				 if (res.code === 0) {
      sessionStorage.setItem('Income', JSON.stringify(res.data))
      commit('queryIncome', res.data)
    }
				 resolve(res)
				})
			})
  },
  //会员生成订单 
  saveMoneyOrder({
    commit
  }, params) {
  	return new Promise(function(resolve, reject) {
				 let res = request('post', 'saveMoneyOrder', params).then((res) => {
				 resolve(res)
				})
			})
  },
  //会员更新订单
  updateMoneyOrder({
    commit
  }, params) {
  	return new Promise(function(resolve, reject) {
				 let res = request('post', 'updateMoneyOrder', params).then((res) => {
				 resolve(res)
				})
			})
  },
  //三方生成订单
  saveThreeOrder({
    commit
  }, params) {
  	return new Promise(function(resolve, reject) {
				 let res = request('post', 'saveThreeOrder', params).then((res) => {
				 resolve(res)
				})
			})
  },
  //三方更新订单
  updateThreeOrder({
    commit
  }, params) {
  	return new Promise(function(resolve, reject) {
				 let res = request('post', 'updateThreeOrder', params).then((res) => {
				 sessionStorage.setItem('qrCode', JSON.stringify(res.data))
         commit('updateThreeOrder', res.data)
				 resolve(res)
				})
			})
  },
  //出款查询
  queryDrawCondition({
    commit
  }) {
  	return new Promise(function(resolve, reject) {
				 let res = request('get', 'queryDrawCondition').then((res) => {
				if (res.code === 0) {
      commit('queryDrawCondition', res.data)
    }
				 resolve(res)
				})
			})
  },
  //出款保存
  saveDrawMoneyInfo({
    commit
  }, params) {
  	return new Promise(function(resolve, reject) {
				 let res = request('post', 'saveDrawMoneyInfo', params).then((res) => {
				 resolve(res)
				})
			})
  },
  //websocket连接
  websocketLink({
    commit,
    state
  }, params) {
  	return new Promise(function(resolve, reject) {
  		let accord = window.location.protocol;
    let str,socket,url;
    if (accord == "https:") {
      str = "wss:";
      url=params.url.slice(6);
    } else if (accord == "http:") {
      str = "ws:";
      url=params.url.slice(5);
    }   
    let user=state.login.userDetails.account;
       socket = new ReconnectingWebSocket(
        encodeURI(str + url + params.type + user)
      ); 
      resolve(socket);
			})
    

  }

}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules: {
    activity: activity_module,
    bet: bet_module,
    chart: chart_module,
    help: help_module,
    personal: personal_module,
    report: report_module,
    home: home_module,
    login: login_module,
    register: register_module,
    twobet: twobet_module
  }
})
