
import axios from 'axios'
import common from '../src/common.vue'
import router from '../src/router/index.js'
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/json';

let basurl=common.chart_baseUrl;
var axiosURL={
    chartLogin: '/chat/user/userLogin', //登入聊天室
    sendMessage:'/chat/user/sendMessage',//发送消息
    queryMessage:'/chat/user/queryMessageReadCount',//查询所有未读消息条数
    queryMessageRead:'/chat/user/queryMessageRead',//查询某个会员/群发送的消息
    readMessage:'/chat/user/readMessage',//阅读消息
    callbackMessage:'/chat/user/callBackMessage',//接收消息时回调
    sendMessageGroup:'/chat/user/sendMessageGroup',//发送群消息
    queryApplyRecord:'/chat/user/queryApplyRecord',//查询所有未处理申请记录
    applyFriend:'/chat/user/applyFriend',//申请加好友/群
    replyApply:'/chat/user/replyApply',//回复申请列表
    queryApplyRecordAll:'/chat/user/queryApplyRecordAll',//查询所有申请记录   
    queryFriend:'/chat/user/queryFriend',//查询朋友
    queryUserByAccount:'/chat/user/queryUserByAccount',//查询用户信息
    queryGroup:'/chat/user/queryGroup',//查询群列表
    queryGroupInfo:'/chat/user/queryGroupInfo',//查询群资料
    createGroup:'/chat/user/createGroup',//建群
    delFriend:'/chat/user/delFriend',//删除好友
    updateFriendInfo:'/chat/user/updateFriendInfo',//修改好友资料
    updateUser:'/chat/user/updateUser',//修改个人资料
    inviteGroup:'/chat/user/inviteGroup',//邀请好友入群
    outGroup:'/chat/user/outGroup',//退群
    queryGroupFriend:'/chat/user/queryGroupFriend',//查询已在群内的好友
    queryIsMaster:'/chat/user/queryIsMaster',//查询是否有邀请群的权限
    updateUserGroup:'/chat/user/updateUserGroup',//修改群内昵称
    propose:'/chat/user/propose',//踢人
    queryGroupMember:'/chat/user/queryGroupMember',//查询群内成员
    updateGroupInfo:'/chat/user/updateGroupInfo',//修改群资料
}


export function request(type = 'POST', name = '', data = ''){
	return new Promise(function (resolve, reject) {
		  let result
  type = type.toUpperCase();
  if (type === 'GET') {
    axios.get(basurl+axiosURL[name] + data)
      .then(res => {
        result = res.data;
        if(result.code==666){
          router.push('/login')        
        }
        resolve(result)
      })
  } else if (type === 'POST') {
    axios.post(basurl+axiosURL[name], data)
      .then(res => {
        result = res.data;
        if(result.code==666){
            router.push('/login')    
        }
        resolve(result)
      })
  }
	})

}
