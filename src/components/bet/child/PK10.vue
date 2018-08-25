<template>
	<div class="pk10">
		<div class="clockView">
			<div class="left">
				<p style="display: flex;align-items: center;text-align: center;justify-content: center;"><img src="../../../../static/img/lingdang.png" style="width: 0.3rem;margin-right:0.1rem;" />{{gameConfig[kindId].gameName}}第{{prevAwarPeriod2}}期</p>
				<ul style="margin: 0.2rem 0;">
					<li :class="'open-num '+numColor[item]" v-for="item in awardNum">{{item}}</li>
				</ul>
			</div>
			<div class="lines" style="height: 100%; width: 1px; background: rgb(255, 255, 255); opacity: 0.6;"></div>
			<div class="right">
				<p style="display: flex;align-items: center;text-align: center;justify-content: center;"><img src="../../../../static/img/naozhong.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{currentAwarPeriod2}}期</p>
				<p style="margin: 0.1rem 0;">截止</p>
				<CountDown class="clock-count" :classId="classId" :format="':'" :kindId="kindId" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			</div>
		</div>
		<div style="position: relative;background:#FFFFFF;z-index: 1000;" v-clickoutside3="closeModal">
			<transition name="fade">
				<div :style="listInfo_style" class="listInfo" ref="wrapper3">
					<div>
						<table border="0" cellspacing="0" cellpadding="0" style="width: 100%;" class="content">
							<tr style="background: #f5f6fa;">
								<td>期数</td>
								<td>开奖号码</td>
								<td v-for="(item,index) in gameConfig[kindId].labels">{{item}}</td>
							</tr>

							<tr v-for="(item,index) in winList" v-if="item.awardNum">
								<td>{{item.awarPeriod}}</td>
								<td>{{item.awardNum}}</td>
								<td v-for="(item2,index2) in item.awardNum.split(',')">{{item2}}</td>
							</tr>
						</table>
					</div>

				</div>
			</transition>
			<div class="xiala" style="z-index: 1000;" @click="open" ref="open">
				<img src="../../../../static/img/xiangxia.png" :class="show1?'top':'bottom'" />
			</div>
		</div>
		<div class="betPanel" ref="wrapper">
			<div class="content">
				<div class="info">
					<div style="display: flex;width: 100%;flex-direction: column;height: 100%;">
						<div class="top">
							<div style="display: flex;align-items: center;">
								<img src="../../../../static/img/img_gold_pig.png" /><span>{{userDetails.accountBalance}}</span>
							</div>
							<div v-if="showHotColdOrOmit.indexOf(subGameId)!=-1">
								<yd-radio-group v-model="showType" color="#000000" size="15">
									<yd-radio val="hotCold">冷热</yd-radio>
									<yd-radio val="omit">遗漏</yd-radio>
								</yd-radio-group>
							</div>
						</div>
					</div>
				</div>
				<!--单式面板-->
				<div class="bet_list_ds" v-if="templateType.inputFormat[subGameId]">
					<div style="height: .4rem;text-align: center;font-size: 12px;color: #ca0500;">{{errPrompt}}</div>
					<textarea @input="judgeFromat" v-model="inputTxt"></textarea>
				</div>
				<!--pk10特殊面板-->
				<div class="bet_list_pk10" v-else-if="templateType.pk10Special[subGameId]">
				<div class="top">
					<yd-badge shape="square" bgcolor="#ca0500" color="#ffffff">冠亚和值
						<div class="inner"></div>
					</yd-badge>
				</div>
				<div class="bet_box">
					<div v-for="(item,index) in betDataList.numbers" :key="index" style="display: flex;flex-direction: column;">
						<div :class="item.cols[0].data_selected?'bet_selected':'bet_unchecked'" @touchend="selected_num({row:index,col:0})">
							<p style="">{{item.cols[0].label}}</p>
							<p v-if="leftName=='冠亚合值'" style="color: #000000;font-size: 12px;">{{gamePlayList[0].gameSons[index+2].odd}}</p>
							<p v-if="leftName=='冠亚组合合值'" style="color: #000000;font-size: 12px;">{{gamePlayList[0].gameSons[index+6].odd}}</p>
						</div>
					</div>
				</div>
			</div>
			<!--常规面板-->
				<div class="bet_list_routine" v-else>
					<div class="bet_list_item" v-for="(item1,index1) in betDataList.numbers" :key="index1">
						<div class="top">
							<div v-if="!item1.rowName"></div>
							<yd-badge shape="square" bgcolor="#ca0500" color="#ffffff" v-if="item1.rowName">{{item1.rowName}}
								<div class="inner"></div>
							</yd-badge>
							<ul class="box">
								<li v-for="(item2,index2) in betDataList.quickBtnOption" :key="index2" @touchend="quickBtnSelect({row:index1,value:item2.value})">{{item2.label}}</li>
							</ul>
						</div>
						<div v-for="(item3,index3) in item1.cols" :key="index3">
							<div :class="item3.data_selected?'bet_selected':'bet_unchecked'" @touchend="selected_num({row:index1,col:index3})">{{item3.label}}</div>
							<div v-if="showHotColdOrOmit.indexOf(subGameId)!=-1&&hotCold['1']" style="height: 0.2rem;">
								<div v-if="showType=='hotCold'" style="text-align: center;">{{hotCold[index1+1+''][index3+1].count}}</div>
								<div v-else style="text-align: center;">{{omit[index1+1+''][index3+1].count}}</div>
							</div>
							<div v-else style="height: 0.2rem;">

							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll';
	import CountDown from "./countdown.vue";
	import clickoutside3 from '../../../directives/clickoutside3';
	import { templateType } from './templateType.js';
	import { bus } from "../bus.js";
	import { mapState, mapActions, mapMutations } from "vuex";
	import { calcChooseBetCount, calcInputBetCount } from "../renderPalette.js";
	import { onSelectBtn, quickBtnSelect } from "../bet.js";
	import { renderingData } from "../bet.js";
	import gameConfig from '../gameConfig.js';
	export default {
		directives: {
			clickoutside3
		},
		components: {
			CountDown
		},
		props: ["classId", 'kindId', 'betDataList'],
		data() {
			return {
				numColor: {
					'01': 'yellow',
					'02': 'deepBlue',
					'03': 'gray',
					'04': 'orange',
					'05': 'blue',
					'06': 'lightGray',
					'07': 'darkGrey',
					'08': 'red',
					'09': 'deepRed',
					'10': 'green',
				},
				gameConfig: gameConfig,
				showCurrentAwarPeriod: '',
				showPrevAwarPeriod: '',
				currentAwarPeriod2: '',
				prevAwarPeriod2: '',
				active: false,
				bileCodeArr: [],
				show1: false,
				showType: "hotCold",
				isclick: true,
				templateType: templateType,
				inputTxt: '',
				errPrompt: '',
				scroll1: null,
				scroll2: null,
				showHotColdOrOmit: [
					"100101",
					"100301",
					"100201",
					"100202",
					"300101",
					"300201",
					"300205",
					"300301",
					"300305",
					"300401",
					"300405",
					"300501",
					"300505",
					"300601",
					"300701",
					"301001",
					"301101",
					"301201",
					"500401",
					"500201",
					"500206",
					"500101",
					"500106",
					"500111",
					"600401",
					"600202",
					"600301",
				],
				awardNum: ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'],
				hotCold: {},
				omit: {},
				listInfo_style: {
					width: '100%',
					height: '0',
					transition: 'all .3s',
				},
				winList: [],
			}
		},
		created() {
			let res = this.historyData;
			if(res) {
				this.hotCold = res.data.hotCold
				this.omit = res.data.omit
				this.winList = res.data.winList
				this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
				this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
				this.simplifyAwarPeriod()
				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
				if(res.data.winList[1].awardNum == null) {
					this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
					clearInterval(this.active_pk10)
					this.active_pk10 = setInterval(() => {
						this.shuffle()
					}, 80)

				} else {
					clearInterval(this.active_pk10)
					this.awardNum = res.data.winList[1].awardNum.split(",")
				}
			} else {
				this.getWinsDragon("/" + this.kindId).then((res) => {
					this.hotCold = res.data.hotCold
					this.omit = res.data.omit
					this.winList = res.data.winList
					this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
					this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
					this.simplifyAwarPeriod()
					this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
					if(res.data.winList[1].awardNum == null) {
						this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
						clearInterval(this.active_pk10)
						this.active_pk10 = setInterval(() => {
							this.shuffle()
						}, 80)
					} else {
						clearInterval(this.active_pk10)
						this.awardNum = res.data.winList[1].awardNum.split(",")
					}
				})
			}
			bus.$on("initTxt", () => {
				this.inputTxt = "";
			})
		},
		mounted() {
			
			this.$nextTick(() => {
				this.scroll1 = new Bscroll(this.$refs.wrapper, {
					scrollbars: true,
					listenX: true,
					click: true,
				})
				this.scroll1.on('scrollEnd', this.scrollEnd);
				this.scroll1.on('scrollStart', this.scrollStart);
			})
			
			this.cacheHistoryData(null)
			console.log(this.gamePlayList)
		},
		computed: {
			...mapState("bet", ["subGameId", "leftName", "rightName", "gameId", "gamePlayList", "subGameList", "kindList", "historyData"]),
			...mapState("login", ["userDetails"]),
			...mapState(["msg"]),
		},
		methods: {
			...mapActions('bet', [
				"getSubGames",
				"getWinsDragon",

			]),
			...mapMutations('bet', [
				"setBetOrder",
				"saveDataOrSubGameList",
				"cacheHistoryData",
				"updateAwarPeriod"
			]),
			simplifyAwarPeriod() {
				let lg = String(gameConfig[this.kindId].periodNoAll).length;
				this.showCurrentAwarPeriod = this.currentAwarPeriod2.slice(this.currentAwarPeriod2.length - lg, this.currentAwarPeriod2.length)
				this.showPrevAwarPeriod = this.prevAwarPeriod2.slice(this.prevAwarPeriod2.length - lg, this.prevAwarPeriod2.length)
			},
			countDown() {
				this.active = false;
				this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
				clearInterval(this.active_pk10)
				this.active_pk10 = setInterval(() => {
					this.shuffle()
				}, 80)
				this.$dialog.toast({
					mes: '第' + this.currentAwarPeriod2 + '期已停止销售',
					timeout: 1500
				});
				this.prevAwarPeriod2 = this.currentAwarPeriod2;
				this.currentAwarPeriod2 = this.createChasePeriod(this.currentAwarPeriod2, 1, gameConfig[this.kindId].periodNoAll, this.kindId)
				this.simplifyAwarPeriod()

				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
			},
			shuffle() {
				this.awardNum = _.shuffle(this.awardNum)
			},
			scrollStart() {
				this.isclick = false
			},
			scrollEnd() {
				this.isclick = true
			},
			open() {
				this.show1 = !this.show1
			},
			selected_num(obj) {
				if(!this.isclick) {
					return
				}
				let data = {};
				onSelectBtn(obj, this.subGameId, this.betDataList, this.bileCodeArr, [])
				let result = calcChooseBetCount(this.betDataList, [])
				data.ticketCount = result.ticketCount;
				data.newNumbers = result.newNumbers;
				this.$emit("resultData", data)
			},
			judgeFromat() {
				let result, data = {};
				result = calcInputBetCount(this.betDataList, this.inputTxt, []);
				this.errPrompt = result.msg;
				data.ticketCount = result.ticketCount;
				data.newNumbers = result.numbers;
				this.$emit("resultData", data)
			},
			quickBtnSelect(obj) {
				if(!this.isclick) {
					return
				}
				let result, data = {};
				result = quickBtnSelect(this.betDataList, obj, []);
				data.ticketCount = result.ticketCount;
				data.newNumbers = result.newNumbers;
				this.$emit("resultData", data)
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
			closeModal(e) {
				if(e.target !== this.$refs.open) {
					this.show1 = false;
				}
			},

		},
		watch: {
			msg(newMsg) {
				let awardNews = JSON.parse(newMsg.data)
				if(awardNews.messageType == "3") {
					if(awardNews.lotteryId == this.kindId) {
						this.getWinsDragon("/" + this.kindId).then((res) => {
							this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
							this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
							this.winList = res.data.winList;
							this.simplifyAwarPeriod()
							if(res.data.winList[1].awardNum == null) {
								this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
								clearInterval(this.active_pk10)
								this.active_pk10 = setInterval(() => {
									this.shuffle()
								}, 80)
							} else {
								clearInterval(this.active_pk10)
								this.awardNum = res.data.winList[1].awardNum.split(",")
							}
						})

					}

				}
			},
			show1() {
				if(this.show1) {
					this.listInfo_style = {
						height: '3rem',
					}
					setTimeout(() => {
						let scroll = new Bscroll(this.$refs.wrapper3, {
							scrollbars: true,
						})
					}, 200)
				} else {
					this.listInfo_style = {
						height: '0',
					}
				}
			},
			kindId() {let res = this.historyData;
			if(res) {
				this.hotCold = res.data.hotCold
				this.omit = res.data.omit
				this.winList = res.data.winList
				this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
				this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
				this.simplifyAwarPeriod()
				this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
				if(res.data.winList[1].awardNum == null) {
					this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
					clearInterval(this.active_pk10)
					this.active_pk10 = setInterval(() => {
						this.shuffle()
					}, 80)

				} else {
					clearInterval(this.active_pk10)
					this.awardNum = res.data.winList[1].awardNum.split(",")
				}
			} else {
				this.getWinsDragon("/" + this.kindId).then((res) => {
					this.hotCold = res.data.hotCold
					this.omit = res.data.omit
					this.winList = res.data.winList
					this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
					this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
					this.simplifyAwarPeriod()
					this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
					if(res.data.winList[1].awardNum == null) {
						this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
						clearInterval(this.active_pk10)
						this.active_pk10 = setInterval(() => {
							this.shuffle()
						}, 80)
					} else {
						clearInterval(this.active_pk10)
						this.awardNum = res.data.winList[1].awardNum.split(",")
					}
				})
			}},
		}

	}
</script>

<style lang="less">
	@font-face {
		font-family: clock-number;
		src: url(../../../../fonts/LED.eot?) format("eot");
		src: url(../../../../fonts/LED.woff) format("woff"), url(../../../../fonts/LED.ttf) format("truetype")
	}
	
	@keyframes numberListActivessc {
		from {
			transform: translateY(1.8rem);
		}
		to {
			transform: translateY(-0.9rem)
		}
	}
	
	.pk10 {
		width: 100%;
		.clockView {
			width: 100%;
			height: 1.8rem;
			display: flex;
			background: linear-gradient(135deg, rgba(19, 46, 123, 1) 0, rgba(0, 201, 202, 1) 100%);
			background-size: 100% 100%;
			.left {
				flex: 5;
				background: none;
				p {
					text-align: center;
					font-size: 12px;
					color: #F0F0F0;
					padding: 0.1rem 0;
				}
				ul {
					display: flex;
					justify-content: space-around;
					.circle {
						display: flex;
						justify-content: center;
						position: relative;
						align-items: center;
						font-size: 24px;
						font-weight: 900;
						color: #FFFFFF;
						background: black;
						border-radius: 100%;
						width: .8rem;
						height: .8rem;
						transform: rotate(0deg);
						margin: 0.1rem .1rem;
						/*background-image: url(../../../../static/img/img_recordball.png);*/
						/*background-image: url(../../../../static/img/ball_light.png);*/
						background-size: 100% 100%;
						/*background: radial-gradient(circle at 50% 100%, #750000, red 100%, #ca0500 100%);*/
						/*border: 0.06rem solid #B8860B;*/
						.num {
							width: 100%;
							height: 100%;
							text-align: center;
							line-height: .8rem;
							/*background: url(../../../../static/img/item0.png) no-repeat ;*/
						}
					}
					.circle_ks {
						display: flex;
						justify-content: center;
						position: relative;
						align-items: center;
						font-size: 24px;
						font-weight: 900;
						color: #FFFFFF;
						width: 1.2rem;
						height: 1.2rem;
						/*background-image: url(../../../../static/img/img_recordball.png);*/
						/*background-image: url(../../../../static/img/ball_light.png);*/
						background-size: 100% 100%;
						/*background: radial-gradient(circle at 50% 100%, #750000, red 100%, #ca0500 100%);*/
						/*border: 0.06rem solid #B8860B;*/
					}
				}
			}
			.right {
				flex: 3;
				font-size: 14px;
				color: #F0F0F0;
				padding-top: 0.1rem;
				p {
					text-align: center;
					font-size: 12px;
					color: #F0F0F0;
				}
				.clock-count {
					width: 100%;
					color: #FFFFFF !important;
					display: inline-block;
					white-space: nowrap !important;
					font-size: 26px !important;
					line-height: 35px !important;
					border-radius: 4px !important;
					text-align: center !important;
					font-family: clock-number, "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
				}
				/*	display: flex;*/
			}
			.open-num {
				border-radius: 2px;
				width: 0.44rem;
				height: 0.32rem;
				color: #FFFFFF;
				margin: 0.03rem;
				line-height: 0.32rem;
				text-align: center;
				font-size: 12px;
			}
			.open-num.yellow {
				background: #e5b800;
			}
			.open-num.darkGrey {
				background: #cfc9c9;
			}
			.open-num.deepBlue {
				background: #0278d7;
			}
			.open-num.gray {
				background: #474c50;
			}
			.open-num.green {
				background: #288c06;
			}
			.open-num.red {
				background: #ea075f;
			}
			.open-num.deepRed {
				background: #7e0209;
			}
			.open-num.orange {
				background: #f17403;
			}
			.open-num.lightGray {
				background: #003e92;
			}
			.open-num.blue {
				background: #25b5cb;
			}
		}
		/*.active_ul {
			transform: translateY(1.8rem);
			animation: numberListActivessc .25s infinite linear;
		}*/
		.xiala {
			position: absolute;
			background: #FFFFFF;
			bottom: -0.38rem;
			width: 1.2rem;
			height: 0.4rem;
			z-index: 1;
			margin-top: 2.8rem;
			border: 1px solid #C5CAD0;
			border-top: none;
			border-radius: 0 0 4px 4px;
			position: absolute;
			left: 50%;
			margin-left: -0.6rem;
			img {
				margin-left: 0.4rem;
				width: 0.4rem;
				height: 0.4rem;
			}
			img.top {
				-moz-transform: rotate(180deg);
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
				filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
			}
		}
		.listInfo {
			width: 100%;
			z-index: 100;
			background: #FFFFFF;
			transition: all .3s;
			overflow: hidden;
			border-bottom: 1px solid #CCCCCC;
			tr {
				height: 0.4rem;
				td {
					text-align: center;
					font-size: 12px;
					border-left: 1px solid #C5CAD0;
					border-bottom: 1px solid #C5CAD0;
				}
			}
		}
		/*过度动画*/
		.fade-enter-active,
		.fade-leave-active {
			transition: all .3s;
		}
		.fade-enter-active {
			background: #D91D36;
			width: 100%;
			height: 3rem;
		}
		.fade-leave-active {
			background: #D91D36;
			width: 100%;
			height: 0;
		}
		.fade-enter {
			background: #D91D36;
			width: 100%;
			height: 0;
		}
	}
</style>