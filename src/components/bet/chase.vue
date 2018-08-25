<template>
	<div class="chase" v-if="show">
		<yd-popup v-model="show3" position="center" width="90%" :close-on-masker="false">
			<div class="set_chase">
				<div class="header">
					修改追号方案
				</div>
				<div class="conent">
					<div class="item1">
						<p>连续追号
							<yd-spinner :max="maxChase" unit="1" width="1.4rem" height=".5rem" v-model="chasePeriods"></yd-spinner>期</p>
						<p>起始倍数
							<yd-spinner max="10000" unit="1" width="1.4rem" height=".5rem" v-model="chaseTimes"></yd-spinner>倍</p>
					</div>
					<div style="background: #FFFFFF;line-height: .6rem;text-align: center;border-top:1px solid #7e7e7e;">
						预期盈利
					</div>
					<yd-radio-group class="radio_sel" v-model="chaseWinType" color="#d91d36">
						<yd-radio val="1">全程最低盈利率
							<yd-spinner max="10000" unit="1" width="1.4rem" height=".5rem" v-model="chaseMinPercent"></yd-spinner>%</yd-radio>
						<yd-radio val="3">全程最低盈利
							<yd-spinner max="10000" unit="1" width="1.4rem" height=".5rem" v-model="chaseMinNumber"></yd-spinner>元</yd-radio>
						<yd-radio val="2">前
							<yd-spinner max="10000" unit="1" width="1.4rem" height=".5rem" v-model="chaseBeforePeriod"></yd-spinner>期
							<yd-spinner max="10000" unit="1" width="1.4rem" height=".5rem" v-model="chaseBeforePercent"></yd-spinner>% &nbsp;之后盈利率
							<yd-spinner max="10000" unit="1" width="1.4rem" height=".5rem" v-model="chaseAfterPercent"></yd-spinner>
						</yd-radio>
					</yd-radio-group>

				</div>
				<div class="footer">
					<yd-button type="warning" style="width: 1rem;" @click.native="cancel">取消</yd-button>
					<yd-button style="background: #d91c32;width: 1rem;" @click.native="generationScheme">生成方案</yd-button>
				</div>
			</div>
		</yd-popup>
		<yd-navbar>
			<router-link :to="'/buyColorBasket/'+classId+'/'+kindId" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
			<div slot="center">
				<ul class="recharge_tab">
					<li :class="confirmBetType=='2'?'active':''" @click="changeType('2')">平倍追号</li>
					<li :class="confirmBetType=='3'?'active':''" @click="changeType('3')">智能追号</li>
				</ul>

			</div>
		</yd-navbar>
		<div class="timeView">
			<div class="left">
				<span>第{{currentAwarPeriod2}}期 截止倒数：</span>
				<CountDown :classId="classId" class="clock-count" :kindId="kindId" :format="'chinese'" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			</div>
			<div class="gold_icon">
				<img src="../../../static/img/img_gold_pig.png" /><span>{{userDetails.accountBalance}}</span>
			</div>
		</div>
		<div class="setup" v-show="confirmBetType=='2'">
			<div class="left">
				追号
				<yd-spinner :max="maxChase" unit="1" v-model="chasePeriods"></yd-spinner>期
			</div>
			<div class="right">
				起始倍数
				<yd-spinner max="10000" unit="1" v-model="chaseTimes"></yd-spinner>
			</div>
		</div>
		<div class="setup_gj" v-show="confirmBetType=='3'">
			<div class="left">
				<p>追号
					<yd-spinner max="10000" unit="1" v-model="chasePeriods"></yd-spinner>期</p>
				<p>全程最低盈利率{{chaseMinPercent}}%</p>
			</div>
			<div class="right">
				<span style="color:#16a4d6;" @click="show_setModal">修改追号方案></span>
			</div>
		</div>
		<div class="bet_num">
			<p><span>投注号码：</span><span style="color:#e01936 ;">{{orderNum}}</span></p>
		</div>
		<div class="table_list" ref="wrapper">
			<div class="content">
				<table cellspacing='0' cellpadding='0'>
					<tr class="table_head">
						<th style="border-left:none;width: 0.4rem;">&nbsp;&nbsp;</th>
						<th>期号</th>
						<th>累计投入</th>
						<th>中奖盈利</th>
						<th>盈利率</th>
					</tr>
					<tr v-for="(item,index) in chaseList">
						<td>{{index+1}}</td>
						<td>
							<div>{{item.periodNo}}</div>
							<div style="display: flex; justify-content: center; align-items: center;">投
								<span class="yd-spinner" style="height: 0.5rem; width: 1.4rem;"><input type="number" pattern="[0-9]*" placeholder="" class="yd-spinner-input" @blur="changeTimes(index)" v-model="chaseList[index].times"></span>倍</div>
						</td>
						<td>{{item.hasPay}}</td>
						<td>{{item.profit}}</td>
						<td>{{item.profitRate}}</td>
					</tr>
				</table>
			</div>

		</div>
		<div class="footer_box">
			<div class="set_checkbox">
				<span style="color:#e43a45">注：</span><span style="margin-right: 0.1rem;">中奖停追</span>
				<yd-radio-group v-model="chaseStop" size="14" color="#7d7d7d">
					<yd-radio val="true">是</yd-radio>
					<yd-radio val="false">否</yd-radio>
				</yd-radio-group>
			</div>
			<div class="footer">
				<span>共{{chaseList.length}}期</span>
				<span>总投注{{chaseList[chaseList.length-1].hasPay}}元</span>
				<yd-button @click.native="bet">立即投注</yd-button>
			</div>
		</div>
	</div>
</template>

<script>
	import CountDown from "./child/countdown.vue"
	import gameConfig from './gameConfig.js'
	import { quickBets, chaseBets } from "./bet.js";
	import Bscroll from 'better-scroll';
	import { mapState, mapActions, mapMutations } from "vuex";
	import { createChaseList } from './chase.js'
	export default {
		components: {
			CountDown
		},
		data() {
			return {
				confirmBetType: '2', //type==2为平倍，3为智能
				show3: false,
				chasePeriods: 1,
				chaseTimes: 1,
				show: false,
				orderNum: '',
				chaseList: [],
				isFirst: true,
				chaseStop: 'true',
				maxChase: 1000,
				currentAwarPeriod2: '',
				chasePrePay: 0, //已投入
				chaseMinPercent: 30, //全程最低盈利率
				chaseBeforePeriod: 5, //前?期
				chaseBeforePercent: 50, //前?期盈利率
				chaseAfterPercent: 20, //之后盈利率
				chaseMinNumber: 30, //全程最低盈利
				chaseWinType: '1',
				new_lotteryData: [],
				noClick:false,
				classId:'',
				kindId:'',
				
			}
		},
		created() {
			this.classId = this.$route.query.classId;
			this.kindId = this.$route.query.kindId;
			if(this.lotteryData.length == 0) {
				this.$router.push({
					path: "/bet/"+this.classId+'/'+this.kindId,
				})
			} else {
				this.show = true;
				this.maxChase = gameConfig[this.kindId].periodNoAll;
				this.currentAwarPeriod2 = this.currentAwarPeriod;
				this.new_lotteryData = this.$route.query.data;
				this.orderNum = this.$route.query.data.selecteNum
				this.chasePeriods = this.$route.query.data.chaseNum;
				this.chaseTimes = this.$route.query.data.price;
				this.goChase(true)
			}
		},
		computed: {
			...mapState('bet', [
				'lotteryData',
				'currentAwarPeriod',
				"subGameList"

			]),
			...mapState('home', [
				"kindList"
			]),
			...mapState("login", ["userDetails"]),
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
		methods: {
			...mapActions('home', [
				"kind"
			]),
			...mapActions('login', [
				"getUserDetails"
			]),
			...mapActions('bet', [
				"quickBet"
			]),
			...mapMutations('bet', [
				"updateAwarPeriod",
				"deleteLotteryData"
			]),
			bet() {
				if(this.noClick){
					return false;
				}
				this.noClick = true
				let orderType = "0";
				let lotteryData;
				let params;
				let noState = false;
				if(this.chaseStop) {
					orderType = "2"
				} else {
					orderType = "1"
				}
				lotteryData = chaseBets([this.new_lotteryData], this.chaseList);
				params = quickBets({
					lotteryData: lotteryData,
					kindId: this.kindId,
					orderFrom: "1",
					orderType: orderType,
					periodNo: this.currentAwarPeriod,
					noState: noState
				});
				this.quickBet(params).then((res) => {
					if(res.code == "0") {
						this.deleteLotteryData(this.$route.query.id)
						this.$dialog.toast({
							mes: '追号成功',
							timeout: 1500,
							icon: 'success'
						})
						this.noClick = false;
						this.getUserDetails()
						this.$router.push({
							name: "buyColorBasket",
						})
					} else {
						this.noClick = false;
						this.$dialog.toast({
							mes: '追号失败！ ' + res.msg,
							timeout: 1500,
							icon: 'error',

						});
					}
				})
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
			changeTimes(index) {
				let str = event.target.value;
				let reg = /^[1-9]\d*$/;
				if(!reg.test(str)) {
					this.chaseList[index].times = 1
				}
				this.goChase(false)
			},
			changeType(type) {
				this.confirmBetType = type
			},
			show_setModal() {
				this.show3 = true
			},
			cancel() {
				this.show3 = false
			},
			generationScheme() {
				this.show3 = false
				this.goChase(true)

			},
			async goChase(isFirst1) {
				this.isFirst = isFirst1;
				let gameType, confirmBetFields = {};
				let betList = [],
					chaseList = this.chaseList,
					isFirst = this.isFirst,
					periodNo = this.currentAwarPeriod;
				if(this.confirmBetType == 2) {
					confirmBetFields.chasePeriods = this.chasePeriods;
					confirmBetFields.chaseTimes = this.chaseTimes;
					if(this.chaseStop == 'true') {
						confirmBetFields.chaseStop = true
					} else {
						confirmBetFields.chaseStop = false
					}
					confirmBetFields.confirmBetType = this.confirmBetType * 1;
				} else if(this.confirmBetType == 3) {
					confirmBetFields.chasePeriods = this.chasePeriods;
					confirmBetFields.chasePrePay = this.chasePrePay;
					confirmBetFields.chaseMinPercent = this.chaseMinPercent;
					confirmBetFields.chaseBeforePeriod = this.chaseBeforePeriod;
					confirmBetFields.chaseBeforePercent = this.chaseBeforePercent;
					confirmBetFields.chaseAfterPercent = this.chaseAfterPercent;
					confirmBetFields.chaseMinNumber = this.chaseMinNumber;
					confirmBetFields.chaseWinType = this.chaseWinType * 1;
					confirmBetFields.chaseTimes = this.chaseTimes;
					confirmBetFields.chaseStop = this.chaseStop;
					confirmBetFields.confirmBetType = this.confirmBetType * 1;
				}
				if(this.kindList.length == 0) {
					await this.kind().then(() => {
						this.kindList.forEach((item1) => {
							if(item1.classId == this.classId) {
								item1.kindList.forEach((item2) => {
									if(item2.kindId == this.kindId) {
										gameType = item2
										return false;
									}
								})
								return false;
							}
						})
					})
				} else {
					this.kindList.forEach((item1) => {
						if(item1.classId == this.classId) {
							item1.kindList.forEach((item2) => {
								if(item2.kindId == this.kindId) {
									gameType = item2
									return false;
								}
							})
							return false;
						}
					})
				}

				//				this.lotteryData.forEach((item) => {
				let obj = {}
				obj.Gameplay = this.new_lotteryData.subGames;
				obj.xuanhao = this.new_lotteryData.selecteNum;
				obj.oddMax = this.new_lotteryData.oddMax;
				obj.totalPrice = this.new_lotteryData.totalPrice;
				obj.noteNumber = this.new_lotteryData.ticketCount;
				obj.kindId = this.kindId;
				Object.assign(obj, this.subGameList[0])
				betList.push(obj)
				//				})

				this.chaseList = createChaseList({
					confirmBetFields,
					betList,
					chaseList,
					periodNo,
					gameType,
					isFirst
				})
				if(this.chasePeriods > this.chaseList.length) {
					this.$dialog.toast({
						mes: '您设定的条件只能生成' + this.chaseList.length + "期追号",
						timeout: 1500
					});
				}
			},
			createChasePeriod(period, offset, periodNoAll, kindId) {
				if(kindId == "bjpk10") {
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
			chaseTimes() {
				this.goChase(true)
			},
			chasePeriods() {
				this.goChase(true)
			},
			confirmBetType() {
				this.goChase(true)
			},
			currentAwarPeriod() {
				this.goChase(false)
			}
		}
	}
</script>

<style lang="less">
	.chase {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		color: #000000;
		font-size: 14px;
		.yd-navbar {
			position: relative !important;
			height: 1rem;
			display: flex;
			z-index: 1000;
			background: #011935 !important;
			.yd-navbar-center-title {
				color: #FFFFFF !important;
			}
			.yd-back-icon:before,
			.yd-next-icon:before {
				color: #FFFFFF;
			}
		}
		.recharge_tab {
			width: 3.9375rem;
			height: 0.625rem;
			border-radius: 4px;
			li {
				width: 50%;
				line-height: 0.625rem;
				color: #a8a8b4;
				text-align: center;
				font-size: 16px;
				font-weight: 600;
				float: left;
				border: 1px solid #fff;
			}
			li:nth-child(1) {
				border-radius: 4px 0 0 4px;
			}
			li:nth-child(2) {
				border-radius: 0 4px 4px 0;
			}
		}
		.active {
			color: #d9213b !important;
			background: #fff;
		}
		.timeView {
			z-index: 1000;
			background: #FFFFFF;
			/*	position: fixed;*/
			/*top: 1rem;*/
			font-size: 14px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 0.2rem;
			width: 100%;
			height: .8rem;
			border-bottom: 1px solid #7e7e7e;
			.left{
				display: flex;
				
			}
			.gold_icon {
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
		.setup {
			border-bottom: 1px solid #7e7e7e;
			z-index: 1000;
			background: #FFFFFF;
			font-size: 14px;
			display: flex;
			/*position: fixed;*/
			width: 100%;
			/*top: 1.8rem;*/
			height: 1.2rem;
			.left,
			.right {
				padding-left: 0.2rem;
				flex: 1;
				display: flex;
				align-items: center;
				.yd-spinner {
					margin: 0 0.1rem;
				}
			}
		}
		.setup_gj {
			border-bottom: 1px solid #7e7e7e;
			padding: 0.1rem 0.2rem;
			z-index: 1000;
			background: #FFFFFF;
			font-size: 14px;
			display: flex;
			/*position: fixed;*/
			width: 100%;
			/*top: 1.8rem;*/
			height: 1.2rem;
			.left,
			.right {
				flex: 1;
				p {
					flex: 1;
					display: flex;
					align-items: center;
					.yd-spinner {
						margin: 0 0.1rem;
					}
				}
			}
			.right {
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
		.bet_num {
			z-index: 1000;
			/*position: fixed;*/
			/*top: 3rem;*/
			width: 100%;
			height: .6rem;
			background: #fcf8ef;
			padding-left: 0.2rem;
			line-height: .6rem;
		}
		.table_list {
			/*height: 6rem;*/
			/*overflow: scroll; 
     -webkit-overflow-scrolling: touch;*/
			overflow: auto;
			width: 100%;
			flex: 1;
			/*padding-top: 3.6rem;
			padding-bottom: 1.8rem;*/
			table {
				width: 100%;
				tr:nth-child(even) {
					background: #FFFFFF;
				}
				tr:nth-child(odd) {
					background: #f5f6fa;
				}
				.table_head {
					width: 100%;
					height: 0.6rem;
					background: #fcf8ef !important;
				}
				th {
					border-top: 1px solid #7e7e7e;
					border-left: 1px solid #7e7e7e;
					border-bottom: 1px solid #7e7e7e;
				}
				td,
				th {
					text-align: center;
				}
				td {
					padding: 0.1rem;
				}
				.yd-spinner {
					width: 1rem !important;
					margin: 0 0.1rem;
					border-radius: 4px;
					input {
						width: 1rem;
					}
					a {
						display: none;
					}
				}
			}
		}
		.footer_box {
			width: 100%;
			/*position: fixed;*/
			/*bottom: 0;*/
			/*left: 0;*/
			.set_checkbox {
				padding-left: 0.2rem;
				display: flex;
				align-items: center;
				width: 100%;
				height: 0.7rem;
				background: #fcf8ef;
				border-top: 1px solid #7e7e7e;
			}
			.footer {
				color: #FFFFFF;
				padding: 0 0.2rem;
				display: flex;
				align-items: center;
				width: 100%;
				height: 1rem;
				background: #011935 !important;
				border-top: 1px solid #7e7e7e;
				justify-content: space-between;
				.yd-btn {
					background: #d91c32;
				}
			}
		}
		.yd-popup-center {
			width: 6rem !important;
			.set_chase {
				width: 6rem;
				margin: 0 auto;
				.header {
					color: #000000;
					width: 100%;
					height: .6rem;
					background: #fcf8ef;
					text-align: center;
					line-height: .6rem;
					border-radius: 4px 4px 0 0;
				}
				.conent {
					width: 6rem;
					border-top: 1px solid #7e7e7e;
					.item1 {
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						padding: 0.1rem 0.2rem;
						width: 100%;
						height: 1.4rem;
						background: #FFFFFF;
						p {
							display: flex;
							align-items: center;
						}
					}
				}
				.radio_sel {
					padding-left: 0.2rem;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					border-top: 1px solid #7e7e7e;
					border-bottom: 1px solid #7e7e7e;
					height: 3rem;
					background: #FFFFFF;
					.yd-radio {
						.yd-radio-icon {
							margin-right: 0.1rem;
						}
						display: flex;
						align-items: center;
						.yd-radio-text {
							display: flex;
							align-items: center;
							.yd-spinner {
								margin: 0.05rem;
								border-radius: 4px;
								width: 0.8rem !important;
								a {
									display: none;
								}
								.yd-spinner-input {
									width: 100%;
								}
							}
						}
					}
				}
				.footer {
					width: 100%;
					height: 1rem;
					background: #FFFFFF;
					border-radius: 0 0 4px 4px;
					display: flex;
					justify-content: space-around;
					align-items: center;
				}
			}
		}
	}
</style>