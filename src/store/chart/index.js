import {request} from '../../../utils/chartRequest.js'
export default {
	namespaced: true,
	state: {
		//所有未读消息条数(包括通知)
		messageList: [],
		//某个会员/群发送的消息
		historyMessage: [],
		//查询的会员或群
		member: {},
		//聊天socket
		chartsocket: '',
		//聊天消息总条数
		countAll: '',
		sendStatus: '1',
		applyRecord: [],
		//所有申请记录（包括已回复）
		allRecord: [],
		//朋友列表
		friends: [],
		//查询的用户信息
		UserByAccount: '',
		//群列表
		groups: [],
		//群资料
		groupInfo: '',
		//群内好友
		groupFriend: [],
		//群内成员
		groupMembers: [],
		//表情包
		faces: ['[微笑]', '[嘻嘻]', '[哈哈]', '[可爱]', '[可怜]', '[挖鼻]', '[吃惊]', '[害羞]', '[挤眼]', '[闭嘴]', '[鄙视]', '[爱你]', '[泪]', '[偷笑]', '[亲亲]', '[生病]', '[太开心]', '[白眼]', '[右哼哼]', '[左哼哼]', '[嘘]', '[衰]', '[委屈]', '[吐]', '[哈欠]', '[抱抱]', '[怒]', '[疑问]', '[馋嘴]', '[拜拜]', '[思考]', '[汗]', '[困]', '[睡]', '[钱]', '[失望]', '[酷]', '[色]', '[哼]', '[鼓掌]', '[晕]', '[悲伤]', '[抓狂]', '[黑线]', '[阴险]', '[怒骂]', '[互粉]', '[心]', '[伤心]', '[猪头]', '[熊猫]', '[兔子]', '[ok]', '[耶]', '[good]', '[NO]', '[赞]', '[来]', '[弱]', '[草泥马]', '[神马]', '[囧]', '[浮云]', '[给力]', '[围观]', '[威武]', '[奥特曼]', '[礼物]', '[钟]', '[话筒]', '[蜡烛]', '[蛋糕]'
		]
	},
	getters: {
		//处理未读消息，让通知放在第一位
		noticeList(state) {
			let arr = Array.of();
			for (let item of state.messageList) {
				if (item.messageType === '4') {
					arr.unshift(item);
				} else {
					arr.push(item);
				}
			}
			return arr;
		},
		//把获取的消息记录倒过来
		messagesRecord(state) {
			let arr = Array.of();
			for (let item of state.historyMessage) {
				arr.unshift(item);
			}
			return arr
		},
		//未读消息条数
		noticeNum(state) {
			let num = 0;
			for (let item of state.messageList) {
				num += item.cnt
			}
			return num
		},
		inviteFriend(state) {
			for (let item of state.friends) {
				if (state.groupFriend.length !== 0) {
					for (let item1 of state.groupFriend) {
						if (Object.is(item.friendAccount, item1.memberAccount)) {
							item['Ingroup'] = '1'
							break;
						} else {
							item['Ingroup'] = '2'
						}
					}
				} else {
					item['Ingroup'] = '2'
				}
			}
			return state.friends
		},
		//群主
		groupLoader(state) {
			let master;
			if (!state.groupInfo) {
				master = JSON.parse(sessionStorage.getItem('groupInfo'));
			} else {
				master = state.groupInfo
			}
			if (state.groupMembers.length !== 0) {
				for (let item of state.groupMembers) {
					if (Object.is(item.memberAccount, master.group_master_account)) {
						return item
					}
				}
			}
		},
		//除群主以外的成员
		groupLeaguer(state, getters) {
			let arr = Array.of();
			let index = state.groupMembers.findIndex(value => {
				return Object.is(value, getters.groupLoader)
			})
			for (let item of state.groupMembers) {
				if (item !== state.groupMembers[index]) {
					arr.push(item)
				}

			}
			return arr

		}
	},
	mutations: {
		queryMessage(state, data) {
			state.messageList = data;
		},
		queryMessageRead(state, data) {
			state.historyMessage = data.messageList;
			state.sendStatus = '1';
			state.countAll = data.countAll;
		},
		//向消息数组中向前扔消息 （用于发送，接收消息）
		throwMessage(state, data) {
			state.historyMessage.unshift(data);
			state.sendStatus = '1';
		},
		//向后扔消息  （用于下拉加载消息）
		toBackThrowMessage(state, data) {
			state.historyMessage.push(data);
			state.sendStatus = '2';
		},
		//存入聊天socket
		saveSocket(state, data) {
			state.chartsocket = data;
		},
		//申请记录
		applyRecord(state, data) {
			state.applyRecord = data;
		},
		//所有申请记录
		queryRecordAll(state, data) {
			state.allRecord = data
		},
		queryFriend(state, data) {
			state.friends = data
		},
		//用户信息
		UserByAccount(state, data) {
			state.UserByAccount = data
		},
		//查询群列表
		queryGroup(state, data) {
			state.groups = data
		},
		//群资料
		queryGroupInfo(state, data) {
			state.groupInfo = data
		},
		//群内好友
		queryGroupFriend(state, data) {
			state.groupFriend = data
		},
		queryGroupMember(state, data) {
			state.groupMembers = data.member
		}
	},
	actions: {
		//登入聊天室
		chartLogin({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'chartLogin', params).then((res) => {
					resolve(res)
				})
			})
		},
		//查询所有未读消息条数
		queryMessage({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'queryMessage').then((res) => {
					commit('queryMessage', res);
					resolve(res)
				})
			})
		},
		//查询某个会员/群发送的消息
		queryMessageRead({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'queryMessageRead', params).then((res) => {
					if (params.page === 1) {
				commit('queryMessageRead', res);
			 }
					resolve(res)
				})
			})
		},
		//阅读消息
		readMessage({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'readMessage', params).then((res) => {
					resolve(res)
				})
			})
		},
		//发送消息
		sendMessage({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'sendMessage', params).then((res) => {
					resolve(res)
				})
			})
		},
		//接收信息时回调
		callbackMessage({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'callbackMessage', params).then((res) => {
					resolve(res)
				})
			})
		},
		//发送群消息
		sendMessageGroup({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'sendMessageGroup', params).then((res) => {
					resolve(res)
				})
			})
		},
		//查询所有未处理申请记录
		queryApplyRecord({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'queryApplyRecord').then((res) => {
					commit('applyRecord', res)
					resolve(res)
				})
			})
		},
		//申请加好友/群
		applyFriend({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'applyFriend', params).then((res) => {
					resolve(res)
				})
			})
		},
		replyApply({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'replyApply', params).then((res) => {
					resolve(res)
				})
			})
		},
		queryApplyRecordAll({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'queryApplyRecordAll').then((res) => {
					commit('queryRecordAll', res)
					resolve(res)
				})
			})
		},
		//查询好友
		queryFriend({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'queryFriend').then((res) => {
					commit('queryFriend', res)
					resolve(res)
				})
			})
		},
		// 查询用户信息
		queryUserByAccount({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'queryUserByAccount', params).then((res) => {
					commit('UserByAccount', res)
					resolve(res)
				})
			})
		},
		//查询群列表
		queryGroup({
			commit
		}) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'queryGroup').then((res) => {
					commit('queryGroup', res)
					resolve(res)
				})
			})
		},
		//查询群资料
		queryGroupInfo({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'queryGroupInfo', params).then((res) => {
					commit('queryGroupInfo', res)
					sessionStorage.setItem('groupInfo', JSON.stringify(res));
					resolve(res)
				})
			})
		},
		//建群
		createGroup({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'createGroup', params).then((res) => {
					resolve(res)
				})
			})
		},
		//删除好友
		delFriend({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'delFriend', params).then((res) => {
					resolve(res)
				})
			})
		},
		//修改好友资料
		updateFriendInfo({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'updateFriendInfo', params).then((res) => {
					resolve(res)
				})
			})
		},
		//修改个人资料
		updateUser({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'updateUser', params).then((res) => {
					resolve(res)
				})
			})
		},
		//邀请好友入群
		inviteGroup({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'inviteGroup', params).then((res) => {
					resolve(res)
				})
			})
		},
		//退群
		outGroup({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'outGroup', params).then((res) => {
					resolve(res)
				})
			})
		},
		//查询已在群内的好友
		queryGroupFriend({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'queryGroupFriend', params).then((res) => {
					commit('queryGroupFriend', res);
					resolve(res)
				})
			})
		},
		//查询是否有邀请群的权限
		queryIsMaster({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'queryIsMaster', params).then((res) => {
					resolve(res)
				})
			})
		},
		//修改群内昵称
		updateUserGroup({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'updateUserGroup', params).then((res) => {
					resolve(res)
				})
			})
		},
		//踢人
		propose({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'propose', params).then((res) => {
					resolve(res)
				})
			})
		},
		//查询群内所有成员
		queryGroupMember({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('get', 'queryGroupMember', params).then((res) => {
					if (res.code === 0) {
				commit('queryGroupMember', res);
			}
					resolve(res)
				})
			})
		},
		//修改群资料
		updateGroupInfo({
			commit
		}, params) {
			return new Promise(function(resolve, reject) {
				let res = request('post', 'updateGroupInfo', params).then((res) => {
					resolve(res)
				})
			})
		},
	}
}
