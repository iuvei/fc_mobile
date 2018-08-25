import { request } from "../../../utils/request.js"
export default {
	namespaced: true,
	state: {
		//我的投注记录
		queryLotteryOrderOwnList: {},
		// 所有彩种
		kindList: [],
		// 查看详情
		queryMemberReportOneList: [],
		// 撤单
		cancelOrderList: [],
		// 开奖历史1
		winHistoryList: [],
		// 开奖历史2(长龙)
		winsDragonList: [],
		// 银行卡
		memberIfBindList: [],
		// 新增银行卡
		saveMemberOtherBankList: [],
		// 公告
		NoticeList1: [],
		NoticeList2: [],
		deleteNotice: []
	},
	getters: {

	},
	mutations: {
		// 我的投注记录
		savequeryLotteryOrderOwn(state, obj) {
			state.queryLotteryOrderOwnList = obj;
		},
		//所有彩种
		savekind(state, obj) {
			state.kindList = obj.data;
		},
		//查看详情
		savequeryMemberReportOne(state, obj) {
			state.queryMemberReportOneList = obj;
		},
		//撤单
		savecancelOrder(state, obj) {
			state.cancelOrderList = obj;
		},
		//开奖历史1
		savewinHistory(state, obj) {
			state.winHistoryList = obj
		},
		//开奖历史2
		savewinsDragon(state, obj) {
			state.winsDragonList = obj
		},
		// 银行卡
		savememberIfBind(state, obj) {
			state.memberIfBindList = obj;
		},
		// 新增银行卡
		save_MemberOtherBank(state, obj) {
			state.saveMemberOtherBankList = obj
		},
		// 公告
		queryMemberNoticeList1(state, obj) {
			state.NoticeList1 = obj;
		},
		queryMemberNoticeList2(state, obj) {
			state.NoticeList2 = obj;
		},
		deleteNoticeAlert(state, obj) {
			state.deleteNotice = obj;
		},
	},
	actions: {
		//我的投注记录
		queryLotteryOrderOwn({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'queryLotteryOrderOwn', params).then((res) => {
					commit('savequeryLotteryOrderOwn', res.data)
					resolve(res)
				})
			})
		},
		//所有彩种
		kind({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'kind').then((res) => {
					commit('savekind', res)
					resolve(res)
				})
			})
		},
		//查看投注详情
		queryMemberReportOne({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'queryMemberReportOne', params).then((res) => {
					commit('savequeryMemberReportOne', res)
					resolve(res)
				})
			})
		},
		//撤单
		cancelOrder({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'cancelOrder', params).then((res) => {
					commit('savecancelOrder', res)
					resolve(res)
				})
			})
		},
		//开奖历史1
		winHistory({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'winHistory', params).then((res) => {
					commit('savewinHistory', res)
					resolve(res)
				})
			})
		},
		//开奖历史2
		winsDragon({
			commit
		}, patams) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'winsDragon', patams).then((res) => {
					commit('savewinsDragon', res)
					resolve(res)
				})
			})
		},
		//银行卡
		memberIfBind({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'memberIfBind').then((res) => {
					commit('savememberIfBind', res)
					resolve(res)
				})
			})
		},
		// 新增银行卡
		saveMemberOtherBank({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'saveMemberOtherBank', params).then((res) => {
					commit('save_MemberOtherBank', res)
					resolve(res)
				})
			})
		},
		// 绑定首张银行卡
		saveMemberBank({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res =  request('post', 'saveMemberBank', params).then((res) => {
					commit('save_MemberBank', res)
					resolve(res)
				})
			})
		},
		// 登出
		 signOut({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res =  request('get', 'signOut').then((res) => {
					// commit('save_MemberOtherBank',res);
					resolve(res)
				})
			})
		},
		//获取公告
		 queryMemberNoticeList({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res =  request('get', 'queryMemberNoticeList', params).then((res) => {
					if(params === '?notice_type=3') {
				commit("queryMemberNoticeList1", res.data)
			} else if(params === "?notice_type=2&type=1") {
				commit("queryMemberNoticeList2", res.data)
				resolve(res)
			} else if(params === "?notice_type=2&type=2") {
				resolve(res)
			}
					
				})
			})
			
		},
		 queryNoticeAlertList({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res =  request('get', 'queryNoticeAlertList', params).then((res) => {
					commit("queryNoticeAlertList", res.data);
					resolve(res)
				})
			})
		},
		// 帮助与反馈
		 feedback({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res =  request('post', 'feedback', params).then((res) => {
					commit("feedback", res.data);
					resolve(res)
				})
			})
		},
		// 帮助与反馈
		 helpService({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res =  request('get', 'helpService').then((res) => {
					commit("helpService", res.data);
					resolve(res)
				})
			})
		},
	}
}