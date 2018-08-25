import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/home.vue'
import RedPacket from '@/components/home/redPacket.vue'
import HomeRecharge from '@/components/home/homeRecharge.vue'
import Login from '@/components/login/login.vue'
import Register from '@/components/register/register.vue'
import Bet from '@/components/bet/bet.vue';
import HkSixBet from '@/components/bet/hk6_bet.vue';
import Security from '@/components/personal/child/security.vue';
import LoginLog from '@/components/personal/child/loginLog.vue';
import BindBank from '@/components/personal/child/BindBank.vue';
import BindData from '@/components/personal/child/BindData.vue';
import Personal from '@/components/personal/personal.vue';
import Recharge from '@/components/personal/child/recharge/recharge.vue'
import CompanyIncome from '@/components/personal/child/recharge/companyIncome.vue'
import noteRecord from '@/components/home/child/node_record.vue'
import Award from '@/components/home/child/award.vue'
import AwardII from '@/components/home/child/awardII.vue'
import Activity from '@/components/activity/activity.vue'
import LotteryReport from '@/components/personal/lotteryReport.vue'
import Cashflow from '@/components/personal/cashflow.vue'
import Setup from '@/components/setup/setup.vue'
import Information from '@/components/information/information.vue'
import HelpFeedback from '@/components/setup/child/helpFeedback.vue'
import Help from '@/components/help/help.vue'
import QuickPayment from '@/components/personal/child/recharge/quickPayment.vue'
import Transfer from '@/components/personal/child/recharge/transfer.vue'
import Payment from '@/components/personal/child/recharge/payment.vue'
import PayScan from '@/components/personal/child/recharge/payScan.vue'
import Withdraw from '@/components/personal/child/withdraw/withdraw.vue'
import AccountBill from '@/components/personal/child/accountBill.vue'
import PersonalReport from '@/components/side/personalReport.vue'
import ReportAll from '@/components/side/reportAll.vue'
import BankCard from '@/components/home/child/bankCard.vue'
import NewBankCard from '@/components/home/child/newBankCard.vue'
import FirstBankCard from '@/components/home/child/firstBankCard.vue'
import Announcement from '@/components/setup/child/announcement.vue'
import ReferralLink from '@/components/personal/child/referralLink.vue'

import ChartRoom from '@/components/personal/child/chatroom/chatroom.vue'
import ChartPage from '@/components/personal/child/chatroom/chartpage.vue'
import ChartMessage from '@/components/personal/child/chatroom/chartmessage.vue'
import ChartMembers from '@/components/personal/child/chatroom/chartmembers.vue'
import AddFriend from '@/components/personal/child/chatroom/addFriend.vue'
import NewFriends from '@/components/personal/child/chatroom/newFriends.vue'
import MemberCenter from '@/components/personal/child/chatroom/memberCenter.vue'
import PersonalMaterial from '@/components/personal/child/chatroom/personalMaterial.vue'
import GroupData from '@/components/personal/child/chatroom/groupData.vue'
import EstablishGroup from '@/components/personal/child/chatroom/establishGroup.vue'
import ChartNotice from '@/components/personal/child/chatroom/chartNotice.vue'
import MemberMore from '@/components/personal/child/chatroom/memberMore.vue'
import InviteGroup from '@/components/personal/child/chatroom/inviteGroup.vue'
import GroupMembers from '@/components/personal/child/chatroom/groupMembers.vue'
import ManageGroup from '@/components/personal/child/chatroom/manageGroup.vue'

import BuyColorBasket from '@/components/bet/buyColorBasket.vue'
import Chase from '@/components/bet/chase.vue'
import CreateRoom from '@/components/redpacket/createRoom.vue'
import AllKinds from '@/components/home/allKinds.vue'
import BettingHall from '@/components/bettingHall/bettingHall.vue'
import About from '@/components/about/aboutM5II.vue'

import Twobet from '@/components/twoSidedDisk/twobet.vue'  
import Members from '@/components/home/child/Members.vue'
import MemberDetail from '@/components/home/child/memberDetail.vue'
import MemberModify from '@/components/home/child/memberModify.vue'
import MemberNew from '@/components/home/child/memberNew.vue'


Vue.use(Router)
export default new Router({
  routes: [{
      path: '/',
      redirect: '/allKinds'
    },
    // 主页个人中心
    {
      path: '/home',
      name: 'home',
      component: Home,

    },
    // 主页充值提现
    {
      path: '/homeRecharge',
      name: 'homeRecharge',
      component: HomeRecharge,
   
    },
    // 主页红包系统
    {
      path: '/redPacket',
      name: 'redPacket',
      component: RedPacket,
   
    },
    // 主页全部彩种
    {
      path: '/allKinds',
      name: 'allKinds',
      component: AllKinds,
   
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/bet/:classId/:kindId',
      name: 'bet',
      component: Bet
    },
    {
      path: '/hk6bet/:classId/:kindId',
      name: 'hk6bet',
      component: HkSixBet
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/security',
      name: 'security',
      component: Security
    },
    {
      path: '/loginLog',
      name: 'loginLog',
      component: LoginLog
    },
    {
      path: '/bindBank',
      name: 'bindBank',
      component: BindBank
    },
    {
      path: '/bindData',
      name: 'bindData',
      component: BindData
    },
    {
      path: '/referralLink',
      name: 'referralLink',
      component: ReferralLink
    },
    //  充值
    {
      path: '/recharge',
      component: Recharge,

      children: [{
          path: '/',
          redirect: 'companyIncome'
        },
        // 公司入款
        {
          path: 'companyIncome',
          component: CompanyIncome,
        },
        // 快捷支付
        {
          path: 'quickPayment',
          component: QuickPayment

        }
      ]
    },
    // 注单查询
    {
      path: '/noterecord',
      name: 'noterecord',
      component: noteRecord
    },
    // 开奖历史
    {
      path: '/award',
      name: 'award',
      component: Award
    },
    // 开奖结果
    {
      path: '/awardII',
      name: 'awardII',
      component: AwardII
    },
    // 优惠活动
    {
      path: '/activity',
      name: 'activity',
      component: Activity,
      meta: { keepAlive: true }
    },
    // 彩票报表
    {
      path: '/lotteryReport',
      name: 'lotteryReport',
      component: LotteryReport
    },
    // 金流记录
    {
      path: '/cashflow',
      name: 'cashflow',
      component: Cashflow
    },
    // 设置
    {
      path: '/setup',
      name: 'setup',
      component: Setup
    },
    // 账号详情
    {
      path: '/information',
      name: 'information',
      component: Information
    },
    // 帮助中心
    {
      path: '/help',
      name: 'help',
      component: Help
    },
    // 帮助与反馈
    {
      path: '/helpFeedback',
      name: 'helpFeedback',
      component: HelpFeedback
    },
    {
      path: '/transfer/:id',
      component: Transfer,
      name:'transfer'
    },
    //一般支付页面
    {
      path: '/payment',
      component: Payment
    },
    //扫码支付页面
    {
      path: '/payScan',
      component: PayScan
    },
    //提现
    {
      path: '/withdraw',
      component: Withdraw
    },
    //帐变记录
    {
      path: '/accountBill',
      component: AccountBill,
      name: 'accountBill'

    },
    //个人报表
    {
      path: '/personalReport',
      component: PersonalReport,
      name: 'personalReport'
    },
    //个人报表—全部，中奖，退码等
    {
      path: '/reportAll',
      component: ReportAll,
      name: 'reportAll'
    },
    // 我的银行卡
    {
      path: '/bankCard',
      name: 'bankCard',
      component: BankCard
    },
    // 新增银行卡
    {
      path: '/newBankCard',
      name: 'newBankCard',
      component: NewBankCard
    },
     // 绑定第一张银行卡
     {
      path: '/firstBankCard',
      name: 'firstBankCard',
      component: FirstBankCard
    },
    // 站内信
    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    },
    //聊天室
    {
      path: '/chartroom',
      component: ChartRoom,
      children:[
        {
          path: '/',
          redirect: 'chartmessage'
        },
        {
          path:'chartmessage',
          component:ChartMessage,
          meta:{order:0}
        },
        {
          path:'chartmembers',
          component:ChartMembers,
          meta:{order:1}
        },
        {
          path:'personalMaterial',
          component:PersonalMaterial,
          meta:{order:2}
        }
      ]
    },
      {
        path: '/chartpage',
        name: 'chartpage',
        component: ChartPage
      },
     //购彩蓝
    {
      path: '/buyColorBasket/:classId/:kindId',
      name: 'buyColorBasket',
      component: BuyColorBasket
    },
    //追号
    {
      path: '/chase',
      name: 'chase',
      component: Chase
    },
    // 创建房间
    {
      path: '/createRoom',
      name: 'createRoom',
      component: CreateRoom
    },
    // 投注大厅
    {
      path: '/bettingHall',
      name: 'bettingHall',
      component: BettingHall
    },
    // 关于M5II
    {
      path: '/about',
      name: 'about',
      component: About
    },
    //加好友
    {
      path:'/addFriend',
      name:'addFriend',
      component:AddFriend
    },
    //新朋友列表
    {
      path:'/newFriends',
      name:'newFriends',
      component:NewFriends
    },
    //个人资料页面
    {
      path:'/memberCenter',
      name:'memberCenter',
      component:MemberCenter
    },
     //群资料
     {
       path:'/groupData',
       name:'groupData',
       component:GroupData
     },
     //创建群聊
     {
      path:'/establishGroup',
      name:'establishGroup',
      component:EstablishGroup
     },
     //通知
     {
       path:'/chartNotice',
       name:'chartNotice',
       component:ChartNotice
     },
     //个人资料（更多）
     {
      path:'/memberMore',
      name:'memberMore',
      component:MemberMore
     },
     //邀请好友入群
     {
       path:'/inviteGroup',
       name:'inviteGroup',
       component:InviteGroup
     },
     //群聊成员界面
     {
       path:'/groupMembers/:groupId',
       name:'groupMembers',
       component:GroupMembers
     },
     //编辑群资料
     {
       path:'/manageGroup',
       name:'manageGroup',
       component:ManageGroup
     },
     // 两面盘
     {
       path: '/twobet/:kindId',
       name: 'twobet',
       component: Twobet
     },
      // 代理会员
      {
        path: '/members',
        name: 'members',
        component: Members,
      },
      // 会员详情
      {
        path: '/memberDetail',
        name: 'memberDetail',
        component: MemberDetail,
      },
        // 详细信息
        {
          path: '/memberModify',
          name: 'memberModify',
          component: MemberModify,
        },
         // 新增会员
         {
          path: '/memberNew',
          name: 'memberNew',
          component: MemberNew,
        },


        
  ]
})
