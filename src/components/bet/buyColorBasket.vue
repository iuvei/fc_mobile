<template>
	<div class="buyColorBasket">
		<yd-navbar :title="gameConfig[kindId].gameName">
			<router-link :to="'/bet/'+classId+'/'+kindId" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
		<div class="countdown">
			<span class="title">第{{currentAwarPeriod2}}期  截止倒数:</span>
			<CountDown :classId="classId" class="clock-count" :format="'chinese'" :kindId="kindId" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			<!--<yd-countdown v-if="!stopCountDown" :time="time2" timetype="second" style="font-size: 14px;color:#e43a45;" :callback="countDown2" done-text="00:00:00">
				<em>{%h}时{%m}分{%s}秒</em>
			</yd-countdown>-->
		</div>
		<div class="gold">
			<yd-button @click.native="clearList">清空列表</yd-button>
			<yd-button>随机一注</yd-button>
			<div class="gold_icon">
				<img src="../../../static/img/img_gold_pig.png" /><span>{{userDetails.accountBalance}}</span>
			</div>
		</div>
		<div class="list" ref="wrapper">
			<div class="content">
				<div class="list-item" v-for="(item,index) in lotteryDatas">
					<div class="left" @click="delete_single(index)"><img src="../../../static/img/shanchu.png" /></div>
					<div class="center">
						<p style="color: #d91d36;">{{item.selecteNum}}</p>
						<p><span style="margin-right: 1px;">{{item.subGames}}</span>
							<span>{{item.ticketCount}}注</span></p>
						<p><span>{{item.price}}倍</span> <span>{{item.price*item.ticketCount*item.unite}}金币</span></p>
					</div>
					<div class="right">
						<div class="item" style="display: flex;align-items: center;justify-content: center;" v-if="classId!='1'&&classId!='2'">追
							<numberInput :max="1000" :min="1" v-model="item.chaseNum"></numberInput>期</div>
						<div class="item" style="display: flex;align-items: center;justify-content: center;">投
							<numberInput :max="10000" :min="1" v-model="item.price" @on-change="onchange"></numberInput>倍</div>
						<div class="item" style="display: flex;align-items: center;justify-content: center;" v-if="classId!='1'&&classId!='2'">
							<yd-button @click.native="chase(item,index)">追号</yd-button>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="order">
			<p v-if="lotteryData.length>0">共<span style="color: rgb(217, 29, 54);">{{total_notes}}</span>注，共<span style="color: rgb(217, 29, 54);">{{total_amount}}</span>元</p>
			<p v-else><span style="color: rgb(217, 29, 54);">您尚未选择投注</span></p>
		</div>
		<div class="footer">
			<yd-button :style="lotteryData.length<1?{backgroundColor:'#cccccc'}:''" :disabled="lotteryData.length<1?true:false" @click.native="bet">确认投注</yd-button>
		</div>
	</div>
</template>

<script>
	import CountDown from "./child/countdown.vue"
	import { quickBets } from "./bet.js";
	import Bscroll from 'better-scroll';
	import gameConfig from './gameConfig.js'
	import { mapState, mapMutations, mapActions } from "vuex";
	export default {
		components: {
			CountDown
		},
		data() {
			return {
				times: '1',
				periods: '1',
				currentAwarPeriod2: '',
				total_notes: 0,
				total_amount: 0,
				stopCountDown: false,
				lotteryDatas: [],
				gameConfig: gameConfig,
				noClick:false,
				classId:'',
				kindId:'',
				
			}
		},
		created() {
			this.kindId = this.$route.params.kindId;
			this.classId = this.$route.params.classId;
			if(this.lotteryData.length == 0) {
				this.$router.push({
					path: "/bet/"+this.classId+'/'+this.kindId,
				})
			}
			this.lotteryDatas = this.lotteryData;
			this.getWinsDragon("/" + this.kindId).then(() => {
				this.currentAwarPeriod2 = this.currentAwarPeriod
			})
			this.getNoteOrAmount()
		},
		mounted() {
			this.$nextTick(() => {
				let scroll = new Bscroll(this.$refs.wrapper, {
					click: true,
					scrollbars: true,
					listenX: true,
				})
			})
		},
		computed: {
			...mapState('bet', [
				'lotteryData',
				'currentAwarPeriod',
			]),
			...mapState("login", ["userDetails"]),
		},
		destroyed() {
			this.stopCountDown = true;
		},
		methods: {
			...mapActions('login', [
				"getUserDetails"
			]),
			...mapActions('bet', [
				"getWinsDragon",
				"quickBet"
			]),
			...mapMutations('bet', [
				"saveLotteryData",
				"deleteLotteryData",
				"updateAwarPeriod"
			]),
			onchange() {
				this.getNoteOrAmount()
			},
			chase(item, index) {
				this.$router.push({
					name: "chase",
					query: {
						id: index,
						data: item,
						classId:this.classId,
						kindId:this.kindId
					}
				})
			},
			bet() {
				if(this.noClick){
					return false;
				}
				this.noClick = true;
				let params = quickBets({
					lotteryData: this.lotteryData,
					kindId: this.kindId,
					orderFrom: "1",
					orderType: "0",
					periodNo: this.currentAwarPeriod,
					noState: true
				})
				this.quickBet(params).then((res) => {
					this.noClick = false;
					if(res.code == 0) {
						this.$dialog.toast({
							mes: '下注成功',
							timeout: 1500,
							icon: 'success'
						})
						this.getUserDetails()
						this.saveLotteryData([])
					} else {
						this.$dialog.toast({
							mes: '下注失败！ ' + res.msg,
							timeout: 1500,
							icon: 'error',

						});
					}
				})
			},
			clearList() {
				this.saveLotteryData([])
			},
			delete_single(index) {
				this.deleteLotteryData(index)
			},
			countDown() {
				this.$dialog.toast({
                    mes:'第'+this.currentAwarPeriod2 +'期已停止销售',
                    timeout: 1500
                });
				this.currentAwarPeriod2 = this.createChasePeriod(this.currentAwarPeriod2, 1, gameConfig[this.kindId].periodNoAll, this.kindId)
				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2
				})

			},
			getNoteOrAmount() {
				this.total_notes = 0;
				this.total_amount = 0;
				this.lotteryDatas.forEach((item, index) => {
					let totalPrice = item.price * item.ticketCount * item.unite
					this.total_notes += item.ticketCount;
					this.total_amount += totalPrice;
				})
			},
			createChasePeriod(period, offset, periodNoAll, kindId) {
				let kindIdAry = ['bjpk10', 'azssc', 'xylhc', 'speed', 'azpk10', 'klft']
				if(kindIdAry.indexOf(this.kindId) != -1) {
					return parseInt(period) + offset + '';
				} else {
					if(kindId == "fc3d" || kindId == "pl3" || kindId == 'hk6') {
						var digit = period.length - 4;
						// 当前期号的日期
						var periodTime = period.substr(0, 4);
						// 转化为moment型，方便后面计算
						var momentTime = moment(periodTime, 'YYYY');
						var nowPeriodString = period.substr(4, digit);
						// 当前期号
						var nowPeriod = parseInt(period.substr(4, digit));
						// 目标期号
						var targetPeriod = nowPeriod + offset;
						var targetTime = void 0;
						if(targetPeriod > periodNoAll) {
							targetPeriod -= periodNoAll;
							targetTime = momentTime.add(1, 'y').format('YYYY');
						} else {
							targetTime = periodTime;
						}
						var targetPeriodString = targetPeriod + '';
						return targetTime + targetPeriodString.padStart(digit, '0');
					} else {
						var digit = period.length - 8;
						// 当前期号的日期
						var periodTime = period.substr(0, 8);
						// 转化为moment型，方便后面计算
						var momentTime = moment(periodTime, 'YYYYMMDD');
						var nowPeriodString = period.substr(8, digit);
						// 当前期号
						var nowPeriod = parseInt(period.substr(8, digit));
						// 目标期号
						var targetPeriod = nowPeriod + offset;
						var targetTime = void 0;
						if(targetPeriod > periodNoAll) {
							targetPeriod -= periodNoAll;
							targetTime = momentTime.add(1, 'd').format('YYYYMMDD');
						} else {
							targetTime = periodTime;
						}
						var targetPeriodString = targetPeriod + '';
						return targetTime + targetPeriodString.padStart(digit, '0');
					}
				}

			},

		},
		watch: {
			lotteryData() {
				this.getNoteOrAmount()
				this.lotteryDatas = this.lotteryData;
			},
			lotteryDatas() {
				this.saveLotteryData(this.lotteryDatas)
			}
		}
	}
</script>

<style lang="less">
	.buyColorBasket {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		.yd-navbar {
			position: relative !important;
			width: 100%;
			z-index: 1000;
			background: #011935 !important;
			color: #FFFFFF;
			.yd-navbar-center-title {
				color: #FFFFFF !important;
			}
			.yd-back-icon:before,
			.yd-next-icon:before {
				color: #FFFFFF;
			}
		}
		.countdown {
			/*position: fixed;*/
			/*left: 0;*/
			background: #FFFFFF;
			width: 100%;
			top: 1rem;
			height: 1rem;
			display: flex;
			justify-content: center;
			align-items: center;
			line-height: 1rem;
			text-align: center;
			z-index: 1000;
			.title {
				display: flex;
				margin-right: 0.1rem;
				align-items: center;
				font-size: 14px;
			}
		}
		.gold {
			display: flex;
			align-items: center;
			/*position: fixed;*/
			z-index: 1000;
			/*left: 0;*/
			width: 100%;
			/*top: 2rem;*/
			height: 1rem;
			background: #fff6e7;
			.yd-btn {
				background-color: #d91d36;
				margin: 0 0.2rem;
			}
			.gold_icon {
				margin-left: 2rem;
				font-size: 12px;
				color: #e43a45;
				display: flex;
				align-items: center;
				img {
					width: .8rem;
					height: 0.73rem;
					margin-right: 0.2rem;
				}
			}
		}
		.list {
			flex: 1;
			overflow: auto;
			/*position: absolute;*/
			width: 100%;
			/*bottom: 1.8rem;*/
			/*top: 3.2rem;*/
			.list-item {
				font-size: 14px;
				height: auto;
				min-height: 2.4rem;
				background: #FFFFFF;
				box-shadow: 1px 1px 7px 2px #aaa;
				border-bottom: 1px dotted #e6e6e6;
				display: flex;
				align-items: center;
				padding: 0 0.1rem;
				.left {
					flex: 1;
				}
				.center {
					flex: 4;
				}
				.right {
					flex: 2;
					.item {
						margin-top: 0.1rem;
					}
					.yd-btn {
						margin-top: .1rem;
						width: .8rem;
						height: .5rem;
						background: #d91d36;
					}
				}
			}
		}
		.footer {
			/*position: fixed;*/
			/*bottom: 0;*/
			width: 100%;
			padding: 0 0.2rem;
			height: 1rem;
			display: flex;
			background: #011935 !important;
			justify-content: center;
			align-items: center;
			.yd-btn {
				width: 3rem;
				background: #d91d36;
			}
		}
		.order {
			z-index: 10;
			/*position: fixed;*/
			/*bottom: 1rem;*/
			width: 100%;
			display: flex;
			font-size: 12px;
			overflow: hidden;
			background: #f7f3e7;
			height: .8rem;
			opacity: .8;
			flex-direction: column;
			justify-content: center;
			align-items: center;
		}
	}
</style>