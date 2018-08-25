<template>
	<div class="twobet">
		<div class="header">
			<div class="pn_title" style="display: flex;">
				<div style="flex: 1 1 0%;"></div>
				<div style="flex: 1 1 0%;">
					<div style="color: white;">
						<!-- <div class="world-cup"><i class="icon icon-sport_worldcup"></i>世界杯</div> -->
					</div>
				</div>
				<div style="flex: 1 1 0%;">
					<div>
						<div class="menus" @click.stop="showAside"></div>
					</div>
				</div>
			</div>
		</div>
		<div class="main-content">
			<div style="height: 100%;">
				<div class="pk10_count_div" tabindex="1">
					<div class="lottery-balance remove">
						<a  style="color: rgb(255, 255, 255);">{{userDetails.accountBalance}}</a>
					</div>
					<div class="betting_Navigation" tabindex="1">
						<a>
							<div class="betting_go betting_go1" @click.stop="showAside2">{{kindName}}<span class="bottom_icon"></span></div>
						</a>
					</div>
				</div>
				<div>
					<div class="user_quota" :class="{show:block}">
						<div class="uq_div">
							<div class="quota_font">额度</div>
							<div class="font_color1">{{userDetails.accountBalance}}</div>
						</div>
						<div class="uq_div">
							<div class="quota_font">未结算金额</div>
							<div class="font_color2">{{orderAmount}}</div>
						</div>
						<div class="uq_div">
							<div class="quota_font">今日输赢</div>
							<div class="font_color2">{{allRealAmount}}</div>
						</div>
						<div class="lines_quota1"></div>
						<div class="lines_quota2"></div>
					</div>
					<div class="rough_lines1">
						<div class="uq_icon" @click="user_quota_show">
							<div class="uq_icon2" v-show = '!block'></div>
						</div>
					</div>
				</div>
				<ClockView @clockView="clockView"></ClockView>
				<div class="bet_page bet_page_min_height" :class="{bet_page_height:block}">
					<Menu @menu="chanel"  @showpopup="popup" :keys='key'></Menu>
					<div class="bet_choice_number lm_lottery num-PK10" ref="wrapper">
						<div class="content">
							<BetMain :betData="betData" @callback="getRowCol" @open="setIsOpen" :odds="odds"  ></BetMain>
						</div>
					</div>
				</div>
			</div>
		</div>
		<!-- <Footer></Footer> -->
		<!-- <Aside :show="show" @close="closeAside"></Aside> -->
		<KindAside :show="show2" @close="closeAside2"></KindAside>
		<yd-popup v-model="show4" position="right" width="100%" height="100%">
            <!-- <yd-button type="danger" style="margin: 30px;" @click.native="show4 = false">Close Right Popup</yd-button> -->
			<div class="sidebar active bet-page">
				<div class="header ">
					<div class="pn_title" style="display: flex;">
						<a><div class="lb_back" @click="noneShow"></div></a>
						<div style="flex: 1 1 0%;"></div>
						<div style="flex: 1 1 0%;">
							<div id="lottery_result">
								<div class="lrd_data" style="margin:0px;color:#fff;">
									<!-- <div class="lrdd_font1" style="color:#fff; margin: 0px 10px 0px 0px;">封盘: <i>{{stopTime}}</i></div> -->
									<div class="lrdd_font2" style="color:#fff;">开奖: <i>{{time}}</i></div>
								</div>
							</div>
						</div>
						<div style="flex: 1 1 0%;">
							<a><div style="float: right; margin: 0px 10px auto; color: white; cursor: pointer;">
								<span class="btn-outline" @click="showSel">{{sel_BUT}}</span>
								</div>
								</a>
						</div>
					</div>
				</div>
				<div class="betting_list"  ref="wrapperII">
					<div  class="content">
						<div v-for="(item,index) in shopList">
							<div>
								<div class="bet-item">
									<div class="rc-swipeout">
										<div class="rc-swipeout-cover"></div>
										<transition  name='slide-fade'>
											<div class="rc-swipeout-actions rc-swipeout-actions-right" v-if="sel"  @click="delecte(index,item.key)">
												<div class="rc-swipeout-btn " role="button" style="background-color: rgb(244, 51, 60); color: white; width: 80px;">
													<div class="rc-swipeout-btn-text">删除</div>
												</div>
											</div>
										</transition>
										<transition  name='fade'>
										<div class="rc-swipeout-content" :class="{twobet_sel:sel}" style="touch-action: pan-y;">
										<!-- <div class="rc-swipeout-content"  style="touch-action: pan-y;"> -->
											<div class="li_lines" style="height: 63px;">
												<div class="already_betting">
													<div class="betting-wrapper">
														<input type="number" min="0" class="betting-input" v-model="item.amount"  placeholder="">
														<div class="ab_type">
															<div class="ab_name">{{kindName}}</div>
															<div class="abt_1">{{item.name}}</div>
															<div class="abt_2">
																<div style="font-size: 14px;">
																	<div style="display: block; white-space: nowrap;">{{item.content}}</div>
																</div>
															</div>
															<div class="abt_3" >{{item.keyNum}}</div>
															<!-- <div class="abt_3" v-if="stopTime!='00:00'">{{item.keyNum}}</div> -->
															<!-- <div class="abt_3" v-if="stopTime =='00:00'">--</div> -->
														</div>
													</div>
												</div>
											</div>
										</div>
										</transition>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="resize-triggers">
						<div class="expand-trigger"><div style="width: 100%; height: 90%;"></div></div>
						<div class="contract-trigger"></div>
					</div>
				</div>
				<div class="betting_set">
					<div class="rough_lines"></div>
					<div class="payment-footer">
						<div class="bs_money">
							<input type="number" step="1" min="0" class="bsm_minimum placeholder_color" placeholder="请输入金额" pattern="[0-9]*" v-model="betNumber">
							<div class="bsm_pull"></div>
							<div class="bet-setup"><button class="betton_betting" :class="{bet_but:stopActive}" id="betBtn" value="确认" @click="twobet">{{palyBut}}</button></div>
						</div>
						<div class="count_betting">
							<div class="ct_count">总组数 <span> {{cenNum}}</span></div>
							<div class="ct_balance">余额:<span id="ct_balance">{{userDetails.accountBalance}}</span></div>
							<div class="ct_win">总投注 <span>¥ {{allBetNumber}}</span></div>
						</div>
					</div>
				</div>
				<div class="overlay hide"></div>
			</div>
        </yd-popup>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import Bscroll from 'better-scroll';
	// import Footer from './footer.vue';
	// import Aside from './aside.vue';
	import KindAside from './dome/kindAside.vue';
	import ClockView from './dome/clockView.vue';
	import Menu from './dome/menu.vue';
	import BetMain from './dome/betMain.vue';
	import { betData } from './dome/twobet.js'
	import { odds } from './dome/odds.js'
	export default {
		data() {
			return {
				show: false,
				show2: false,
				bet: null,
				classId: 'SSC',
				kindId: '',
				betData: [],
				odds:{},
				scroll:null,
				kindName:'75秒赛车',
				block:false,
				// list:[]
				show4:false,
				cenNum:0,
				betList:{},
				keyList:[],
				sel:false,
				sel_BUT:'删除',
				allBetNumber:0,
				betNumber:0,
				num:'0',
				shopList:[],
				tname:'',
				time:null,
				stopTime:null,
				awarPeriodI:null,
				palyBut:'确认',
				stopActive:false,
				key:null,
				allRealAmount:'0',
				orderAmount:0,
			}
		},
		components: {
			// Footer,
			// Aside,
			KindAside,
			ClockView,
			Menu,
			BetMain
		},
		created() {
			this.chanel('pk10')
			// console.log(this.userDetails)
			this.clockView();
			if(this.userDetails.account){
				this.getTodayAndWin()
			}
		},
		computed:{
			...mapState('twobet', [
				'twoGameList'
			]),
			 ...mapState('login',[
        		'userDetails'
      		]),
		},
		mounted() {
			setTimeout(() => {
				this.scroll = new Bscroll(this.$refs.wrapper, {
					click: true,
					stop: 0
				})
			}, 200)
			setTimeout(() => {
				this.scroll = new Bscroll(this.$refs.wrapperII, {
					click: true,
					stop: 0
				})
			}, 200)
		},
		methods: {
			...mapActions('twobet', [
				'twoGameOdd',
				'twoBet'
			]),
			...mapActions( [
				'queryMemberReport',
				'queryMemberReportAll'
			]),
			...mapMutations('twobet',[
				'twoGameOddList'
			]),
			...mapActions("login", ["getUserDetails"]),
			showList(){
				// console.log(this.shopList)
			},
			showAside() {
				this.show = true
			},
			closeAside() {
				this.show = false
			},
			showAside2() {
				this.show2 = true
			},
			closeAside2(name) {
				// console.log(name,'name')
				this.show2 = false;
				if(name == undefined){
					this.kindName = this.kindName
				}else{
					this.kindName = name;
				}				
			},
			user_quota_show(){
				
				this.block = !this.block;
				if(this.block == true){
					this.getTodayAndWin();
					this.getqueryMemberReportAll();
				}
			},
			//获取选择的行与列
			getRowCol(obj){
				// console.log(obj);
				this.betList = obj;
				this.keyList = obj.key;
				this.changeBtnColor(obj.row,obj.col,obj.key);
			},
			//改变按钮状态 根据selected判断是否选中
			changeBtnColor(row,col){
				this.betData[row].list[col]['selected'] = !this.betData[row].list[col]['selected']
			},
			//展开收缩子玩法
			setIsOpen(obj){
				this.betData[obj.index].open = !this.betData[obj.index].open
				this.betData[obj.index].itemHeight = obj.itemHeight
				setTimeout(()=>{
					if(this.scroll){
					this.scroll.refresh()
					}
				},300)
				
			},
			chanel(listShow){
				// console.log(listShow,'00')
				this.classId = listShow;
				// this.classId = this.$route.params.kindId.split('-')[0];
				this.kindId = this.$route.params.kindId.split('-')[1];
				this.betData = betData[this.classId];
				this.odds = odds;
			},
			clockView(time,stopTime,awarPeriodI){
				// console.log(time,stopTime,'6666666');
				this.time = time;
				this.stopTime = stopTime;
				this.awarPeriodI = awarPeriodI;
			},
			popup(t,num,shopList){
				this.cenNum = num;
				this.show4 = t;
				this.shopList = shopList;
				this.betNumber = '';
			},
			// 显示删除按钮
			showSel(){
				this.sel = !this.sel;
				if(this.sel_BUT == '删除'){
					this.sel_BUT = '完成'
				}else{
					this.sel_BUT = '删除'					
				}
			},
			// 删除单条数据
			delecte(i,key){
				// console.log(i,key)
				// this.key = key;
				// this.keyNums.splice( this.keyNums.indexOf( keyNum ), 1 );
				this.shopList.splice(i,1);
				this.cenNum = this.shopList.length;
				if(this.cenNum == 0){
					this.show4 = false;
					this.key = true;
					this.betNumber = '';
				};
			},
			// 两面盘投注
			twobet(){
				// console.log(this.shopList);
				let twobetlist = [];
				// this.key = false;
				this.shopList.forEach( item => {
					let obj = {}
					obj.amount = item.amount;
					obj.content = item.content;
					obj.gameId = item.gameId;
					twobetlist.push(obj)
				})

				let that = this;
				let data = {
					 "bets":twobetlist,
					"lotteryId": that.kindId,
					"orderFrom": that.cenNum+"",
					"periodNo": that.awarPeriodI+"",
				}
				that.twoBet(data).then( res => {
					if(res.code == '0'){
						that.shopList = [];
						that.show4 = false;
						this.$dialog.toast({
								mes: '投注成功',
								timeout: 1500,
								icon: 'success'
							});
							// this.unfinished += this.allBetNumber*1;
							this.key = true;
					}else if(res.code == '666'){
						this.$dialog.toast({
								mes: '登录超时',
								timeout: 1500,
								icon: 'error'
							});
							this.key = false;
					}else{
						this.$dialog.toast({
								mes: res.msg,
								timeout: 1500,
								icon: 'error'
							});
							this.key = false;
					}
				})
			},
			// 关闭侧边栏投注页面
			noneShow(){
				this.show4 = false;
			},
			Time(now) {
				let self = this;
				let year = new Date(now).getFullYear();
				let month = new Date(now).getMonth() + 1;
				let date = new Date(now).getDate();
				let hours = new Date(now).getHours();
				let minutes = new Date(now).getMinutes();
				let seconds = new Date(now).getSeconds();
				if(hours < 10) hours = '0' + hours;
				if(minutes < 10) minutes = '0' + minutes;
				if(seconds < 10) seconds = '0' + seconds;
				if(month < 10) month = '0' + month;
				if(date < 10) date = '0' + date;
				self.nowTime = hours + ':' + minutes + ':' + seconds;
				return year + '-' + month + '-' + date
			},
			// 今日输赢
			getTodayAndWin(){
				// console.log(this.userDetails.account,this.kindId,'555555')
				let data = {
						account:this.userDetails.account,
						baseLotteryId:this.kindId,
						endTime:this.Time(new Date()),
						startTime:this.Time(new Date()),
					}
						this.queryMemberReport(data).then((res)=>{
							// console.log(res)
						if(res.data.length!=0){
							this.allRealAmount = res.data[0].allRealAmount;
						}else{
							this.allRealAmount = 0;
						}
					})
			},
			// 今日未结
			getqueryMemberReportAll(){
				let data = {
						account:this.userDetails.account,
						baseLotteryId:this.kindId,
						dayTime:this.Time(new Date()),
						page:1,
						statusWin:'2'
					}
					this.queryMemberReportAll(data).then( res => {
						// console.log(res);
						this.orderAmount = res.data.sumMax.orderAmount;
					})
			}

		},
		watch: {
			$route(to, from) {
			this.classId = this.$route.params.kindId.split('-')[0];
			this.kindId = this.$route.params.kindId.split('-')[1];
			this.betData = betData[this.classId]
			},
			kindId(){
				this.block = false;
			},
			betData(){
				setTimeout(()=>{
					if(this.scroll){
						this.scroll.refresh()
					}
				},200)
			},
			betNumber(){
				if(this.betNumber == ''){
					this.allBetNumber = 0;
					this.shopList.forEach(item => {
							item.amount = 0;	
					});
				}else{
					if(this.shopList){
						this.shopList.forEach(item => {
							item.amount = this.betNumber*1;
							this.allBetNumber += parseInt(item.amount*1) 
						});
						return this.allBetNumber;
					}else{
						this.allBetNumber = 0;
					}
				}	
			},
			shopList:{
				handler(newValue){
					this.allBetNumber = 0;
					// console.log(newValue);
					newValue.forEach(item => {
						if(item.amount == ''){
							this.allBetNumber += parseInt(item.amount*1+0) 
						}else{
							this.allBetNumber += parseInt(item.amount) 
						}
						
					});
					// console.log(this.allBetNumber)
				},
				deep: true
			},
			// stopTime(){
			// 	if(this.stopTime == '00:00'){
			// 		this.palyBut = '已封盘';
			// 		this.stopActive = true;
			// 	}else{
			// 		this.palyBut = '确认';
			// 		this.stopActive = false;
			// 	}
			// },
		},
	}
</script>

<style >
html body{
	height: 100%;
	width: 100%;
}
.twobet{
height: 100%;
	width: 100%;

}
	.twobet .header {
		background: linear-gradient(135deg, rgba(19, 46, 123, 1) 0, rgba(0, 201, 202, 1) 100%);
		height: 45px;
		position: relative;
		width: 100%;
	}
	
	.twobet .pn_title {
		text-align: center;
		line-height: 45px;
		font-size: 18px;
		color: #fff;
	}
	
	.twobet .world-cup {
		width: 55%;
		margin-left: 5px;
		font-size: .9em!important;
		position: relative;
		margin-top: 10px;
		height: 22px;
		line-height: 22px;
		border: 1px #00318e solid;
		border-radius: 3px;
	}
	
	.twobet .world-cup {
		background-image: url('../../../static/img/twobet/worldcup_tab-bg.png'), linear-gradient(to bottom, #2a7dd9, #1d57ac);
		background-position: top left;
		background-repeat: no-repeat;
	}
	
	.twobet .menus {
		cursor: pointer;
		position: absolute;
		background: url(../../../static/img/twobet/moneymgr.png);
		height: 35px;
		border-radius: 50%;
		top: 0;
		bottom: 0;
		right: 10px;
		margin: auto;
	}
	
	.twobet .menus {
		background-position: -263px -160px;
		background-size: 360px 260px;
		width: 35px;
	}
	
	.twobet .btn-hm,
	.twobet .main-content {
		bottom: 35px;
		z-index: 1;
	}
	
	.twobet .main-content {
		height: calc(100% - 45px - 0px);
		position: fixed;
		top: 45px;
		width: 100%;
	}
	
	.twobet .lottery-balance.remove {
		/* background: 0; */
		/* padding-left: 0; */
	}
	
	.twobet .lottery-balance {
		background: url('../../../static/img/twobet/moneyico.png') left center no-repeat;
    	background-size: 0.35rem;
    	padding-left: 22px;
		position: fixed;
		line-height: 45px;
		font-size: 16px;
		color: #fff;
		top: 0;
		right: 1.2rem;
	}
	
	.twobet .betting_Navigation {
		height: 45px;
		position: fixed;
		top: 0;
	}
	
	.twobet .betting_go {
		/*border: 1px solid #fff;*/
		float: left;
		/*padding: 5px 11px 7px 11px;*/
		border-top-left-radius: 20px;
		border-bottom-left-radius: 20px;
		border-top-right-radius: 20px;
		border-bottom-right-radius: 20px;
		/*margin: 16px 0 0 10px;*/
		color: #fff;
		font-size: 16px;
		/*-webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;*/
		user-select: none;
		cursor: pointer;
	}
	
	.twobet .betting_go1 {
		border: none;
		margin: 0;
		padding: 0;
		line-height: 45px;
		margin-left: 10px;
	}
	
	.twobet .bottom_icon,
	.twobet .top_icon {
		background: url('../../../static/img/twobet/setupico.png');
		background-size: 410px 130px;
		width: 20px;
		height: 10px;
		display: inline-block;
		vertical-align: middle;
		background-repeat: no-repeat;
	}
	
	.twobet .bottom_icon {
		background-position: -34px -117px;
	}
	
	.twobet .user_quota {
		height: 0;
		width: 100%;
		position: relative;
		/*-webkit-transition: height .4s;
    -o-transition: height .4s;*/
		transition: height .4s;
		overflow: hidden;
	}
	.twobet .font_color2 {
		/* font-size: .9rem; */
		color: #ff794c;
		height: 50%;
	}
	
	.twobet .user_quota .uq_div {
		float: left;
		text-align: center;
		width: 33.33%;
		height: 100%;
		font-size: 0.27rem;
		color: #666
	}
	.twobet .user_quota.show {
    	height: 40px;
	}
	.twobet .show {
		display: block;
	}
	
	.twobet .rough_lines1 {
		width: 100%;
		height: 15px;
		background-color: #ebebeb;
		/*-webkit-box-shadow: 0 0.5px 1px #bbb inset;*/
		box-shadow: 0 0.5px 1px #bbb inset;
	}
	
	.twobet .uq_icon {
		width: 62px;
		height: 16px;
		background: url('../../../static/img/twobet/setupico.png');
		background-size: 355px 110px;
		background-position: -65px 16px;
		transform: scale(.8);
		transform-origin: top;
		margin: -1px auto 0;
	}
	
	.twobet .uq_icon2 {
		width: 14px;
		height: 6px;
		background: url('../../../static/img/twobet/setupico.png');
		background-size: 355px 110px;
		background-position: -288px 118px;
		margin: 3px 0 0 25px;
		position: absolute;
	}
	
	.twobet .bet_page_min_height {
		height: calc(100% - 105px);
	}
	
	.twobet .bet_page {
		-webkit-transition: all .4s;
		-o-transition: all .4s;
		transition: all .4s;
	}
	.twobet .bet_page_height {
    	height: calc(100% - 145px);
	}
	/* 投注侧边栏 */
	.twobet .sidebar.active.bet-page {
    transform: translate3d(0,0,0);
}
.twobet .sidebar.bet-page {
    /* height: calc(100% - 35px); */
	height: 100%;
}

.twobet .lb_back, .twobet .return {
    background: url('../../../static/img/twobet/moneymgr.png');
    background-position: 20px -51px;
    background-size: 412px 310px;
    width: 0.3rem;
    height: 0.6rem;
    float: left;
    margin: -44px 0 0 15px;
}
.twobet .lb_back {
    z-index: 1;
}
.twobet .lb_back {
    margin: 10px 0 0 12px;
    position: absolute;
    cursor: pointer;
    -ms-user-select: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
}

.twobet .betting_list {
    height: calc(100% - 3rem);
    overflow: auto;
}
.twobet .rc-swipeout {
    overflow: hidden;
    position: relative;
}
.twobet .rc-swipeout-cover {
    position: absolute;
    z-index: 2;
    background: 0 0;
    height: 100%;
    width: 100%;
    top: 0;
    display: none;
}

.rc-swipeout .rc-swipeout-actions, .rc-swipeout .rc-swipeout-content {
    transition: all 250ms;
}
.rc-swipeout-actions-right {
    right: 0;
}

.rc-swipeout-actions {
    position: absolute;
    top: 0;
    bottom: 0;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    overflow: hidden;
    white-space: nowrap;
	transition:width 2s;
}
.rc-swipeout-btn {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

.rc-swipeout-btn-text {
    padding: 0 12px;
}
.rc-swipeout-content {
    position: relative;
    background-color: #fff;
	transition:width 2s;
}
.betting_list .li_lines {
    border-bottom: 1px solid #ccc;
    background-color: #fff;
}
.already_betting {
    height: 63px;
    width: 100%;
    margin: 0 auto;
    position: relative;
    display: table;
    z-index: 2;
    /* -webkit-box-shadow: 0 -5px 10px rgba(100,100,100,.8); */
    box-shadow: 0 -5px 10px rgba(100,100,100,.8);
	
}
.twobet_sel{
	transition: left 2s ease-in-out;
	left: -80px;	
}
.twobet_sel_but{
	width: 80px;
	/* z-index: 10; */
}

.betting-wrapper {
    margin: 0 auto;
    position: relative;
    width: 93%;
}
.betting-input {
    border-radius: 5px;
    border: 1px solid #ccc;
    color: #666!important;
    text-align: center;
    height: 32px;
    display: table-cell;
    position: absolute;
    top: .2rem;
    font-size: .3rem;
    line-height: 32px;
    width: 66px;
    background-color: #fefefe;
    outline: 0;
    -webkit-transition: all .2s ease-in-out;
    -o-transition: all .2s ease-in-out;
    transition: all .2s ease-in-out;
    -webkit-appearance: none;
}

.ab_type {
    display: table;
    position: absolute;
    right: -.3rem;
    width: 80%;
    top: .45rem;
}
.ab_name {
    font-size: 14px;
    color: #9a9a9a;
    position: absolute;
    top: -.3rem;
    left: 1px;
}

.ab_type>div:not(.ab_name) {
    color: #666;
    line-height: 30px;
    font-size: 14px;
    display: table-cell;
}


.ab_type .abt_2 {
    position: absolute;
    right: 1.2rem;
}
.ab_type .abt_3 {
    color: red!important;
    text-align: right;
    padding-right: 0.3rem;
}

.resize-triggers {
    animation: 1ms resizeanim;
    visibility: hidden;
    opacity: 0;
}
.resize-triggers > div {
    background: #eee;
    overflow: auto;
} 
.contract-trigger:before {
    width: 200%;
    height: 200%;
}
.betting_set {
    width: 100%;
    /* margin: 0 auto;
    position: fixed; */
}
.rough_lines {
    width: 100%;
    height: 10px;
    background-color: #ebebeb;
    /* -webkit-box-shadow: 0 1px 1px #bbb inset; */
    box-shadow: 0 1px 1px #bbb inset;
}

.payment-footer {
    width: 93%;
    margin: auto;
    height: 10rem;
}
.payment-footer {
    height: 1.5rem;
}
.bs_money {
    height: 0.8rem;
    margin: 10px 0 5px;
}
.bs_money .bsm_minimum {
    border: 1px solid #ccc;
    width: 2.2rem;
    float: left;
    outline: medium;
    font-size: 16px;
    margin-left: 10px;
    color: #666;
    padding: 0;
    height: 0.7rem;
    -webkit-appearance: none;
	    text-align: center;
    border-radius: 5px;
}
.bs_money .bsm_pull {
    border: 1px solid #ccc;
    width: 0.7rem;
    float: left;
    height: 0.7rem;
    margin-left: 11px;
    background: url('../../../static/img/twobet/pic.png');
    background-repeat: no-repeat;
    background-size: 90%;
    background-position: center center;
}
.bs_money div, .bs_money input {
    float: left;
    padding: 10px 0;
    text-align: center;
    border-radius: 5px;
    font-size: 15px;
    line-height: 0.7rem;
}
.bs_money .bet-setup {
    width: 45%;
    float: right;
    margin: 0;
    padding: 0;
}
.betton_betting {
    background-color: #2061b3;
    color: #fff;
    height: 0.7rem;
    width: 100%;
    border-radius: 4px;
    text-align: center;
    line-height: 0.7rem;
    margin: 0 auto;
    font-size: 18px;
    border: none;
    outline: medium;
}
.count_betting {
    width: 100%;
    margin-top: 8px;
    color: #9a9a9a;
    font-size: 15px;
}

.count_betting .ct_count {
    width: 50%;
    float: left;
    text-align: left;
}
.count_betting .ct_count {
    width: 25%;
}
.count_betting .ct_balance {
    width: 37%;
    float: left;
    text-align: left;
}
.count_betting .ct_balance #ct_balance {
    color: red;
}
.count_betting .ct_win {
    width: 38%;
	float: left;
    text-align: right;
}
.count_betting .ct_win span {
    color: #2061b3;
}
.yd-popup-content{
	height: 100%;
}
.yd-popup-content>div{
	height: 100%;
}
span.btn-outline {
    position: relative;
    z-index: 0;
}
span.btn-outline {
    padding: .05rem .2rem;
    border: 1px solid #fff;
    border-radius: 2rem;
	font-size: 0.3rem;
}



.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
{
  transform: translateX(80px);
  opacity: 0;
}


.fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .slide-fade-leave-to
{
  transform: translateX(-80px);
  opacity: 0;
}
.twobet .bet_but{
	background: #a8a8a8;
}


</style>