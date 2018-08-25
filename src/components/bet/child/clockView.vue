<template>
	<div class="exhibition" v-if="gameConfig[kindId]">
		<!--时时彩-->
		<div class="clockView" v-if="classId=='3'">
			<div class="left">
				<p>{{gameConfig[kindId].gameName}}第{{kindId!='azssc'?showPrevAwarPeriod:prevAwarPeriod}}期</p>
				<ul>
					<li class="circle" v-for="(item,index) in awardNum" style="overflow: hidden;" :key="index">
						<div class="num" :style="{background:'url(../../../../static/img/item'+item+'.png) no-repeat',backgroundPosition: 'center',
							backgroundSize: '45% 65%'}" v-if="active"></div>
						<ul style="height: 4.5rem;width: 0.9rem;display: block;" class="active_ul" v-else>
							<li class="num" v-for="item in 4" :style="{background:'url(../../../../static/img/k'+item+'.png) no-repeat',backgroundPosition: 'center',
							backgroundSize: '100% 100%',height:'.9rem'}">
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="right">
				<p>第{{kindId!='azssc'?showCurrentAwarPeriod:currentAwarPeriod}}期</p>
				<p style="margin: 0.1rem 0;">截止</p>
				<CountDown class="clock-count" :format="':'" :classId="classId" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			</div>
		</div>
		<!--六合彩-->
		<div class="clockView hk6" v-else-if="classId=='2'">
			<div class="left">
				<div style="display: flex;justify-content: center;align-items: center;height: .6rem;"><img src="../../../../static/img/lingdang.png" style="width: 0.3rem;margin-right:0.1rem;" /><span style="color: #FFFFFF;">第{{prevAwarPeriod2}}开奖</span></div>
				<div>
					<ul style="display: flex;justify-content: space-around;" v-if="active">
						<li v-for="item in awardNum">
							<div :style="{background: 'url(../../../../static/img/bo_'+num_color[item]+'_bg.png) 0% 0% / 100% 100%',width: '.7rem',height:' .7rem',backgroundSize:'100% 100%' ,textAlign: 'center',lineHeight:' .8rem',fontSize:' 14px'}">{{item}}</div>
							<div style="font-size: 14px;color: #6ccae3;text-align: center;">{{num_type[item]}}</div>
						</li>
					</ul>
					<ul style="display: flex;justify-content: space-around;" v-else>
						<li v-for="item in awardNum">
							<div :style="{background: 'url(../../../../static/img/bo_grey_bg.png) 0% 0% / 100% 100%',width: '.7rem',height:' .7rem',backgroundSize:'100% 100%' ,textAlign: 'center',lineHeight:' .8rem',fontSize:' 14px'}">{{item}}</div>
							<div style="font-size: 14px;color: #6ccae3;text-align: center;">-</div>
						</li>
					</ul>
				</div>

			</div>
			<div class="lines" style="height: 100%;width: 1px;background: #FFFFFF;opacity: .6;"></div>
			<div class="right" style="padding: 0;">
				<p style="height: .6rem;display: flex;justify-content: center;align-items: center;"><img src="../../../../static/img/naozhong.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{currentAwarPeriod}}期截止</p>
				<CountDown class="clock-count" :format="':'" :classId="classId" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			</div>
		</div>
		<!--福体彩-->
		<div class="clockView" v-else-if="classId=='1'">
			<div class="left">
				<p>{{gameConfig[kindId].gameName}}第{{prevAwarPeriod2}}期</p>
				<ul>
					<li class="circle" v-for="(item,index) in awardNum" style="overflow: hidden;" :key="index">
						<div class="num" :style="{background:'url(../../../../static/img/item'+item+'.png) no-repeat',backgroundPosition: 'center',
							backgroundSize: '45% 65%'}" v-if="active"></div>
						<ul style="height: 4.5rem;width: 0.9rem;display: block;" class="active_ul" v-else>
							<li class="num" v-for="item in 4" :style="{background:'url(../../../../static/img/k'+item+'.png) no-repeat',backgroundPosition: 'center',
							backgroundSize: '100% 100%',height:'.9rem'}">
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="right">
				<p>第{{currentAwarPeriod2}}期</p>
				<p style="margin: 0.1rem 0;">截止</p>
				<CountDown class="clock-count" :format="':'" :classId="classId" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			</div>
		</div>
		<!--11选5-->
		<div class="clockView" v-else-if="classId=='5'">
			<div class="left">
				<p>{{gameConfig[kindId].gameName}}第{{showPrevAwarPeriod}}期</p>
				<ul>
					<li class="circle" v-for="(item,index) in awardNum" style="overflow: hidden;" :key="index">
						<div class="num" v-if="active" style="display: flex;">
							<div :style="{background:'url(../../../../static/img/item'+item[0]+'.png) no-repeat',backgroundPosition: 'right',
							backgroundSize: '60% 45%',flex:'1'}"></div>
							<div style="width: 0.05rem;"></div>
							<div :style="{background:'url(../../../../static/img/item'+item[1]+'.png) no-repeat',backgroundPosition: 'left',
							backgroundSize: '60% 45%',flex:'1'}"></div>
						</div>
						<ul style="height: 4.5rem;width: 0.9rem;display: block;" class="active_ul" v-else>
							<li class="num" v-for="item in 4" :style="{background:'url(../../../../static/img/k'+item+'.png) no-repeat',backgroundPosition: 'center',
							backgroundSize: '100% 100%',height:'.9rem'}">
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div class="right">
				<p>第{{showCurrentAwarPeriod}}期</p>
				<p style="margin: 0.1rem 0;">截止</p>
				<CountDown class="clock-count" :classId="classId" :format="':'" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			</div>
		</div>
		<!--pk10-->
		<div class="clockView pk10" v-else-if="classId=='6'">
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
				<CountDown class="clock-count" :classId="classId" :format="':'" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			</div>
		</div>
		<!--快三-->
		<div class="clockView" v-else>
			<div class="left">
				<p>{{gameConfig[kindId].gameName}}第{{showPrevAwarPeriod}}期</p>
				<ul style="padding: 0 .5rem;" v-if="active">
					<li class="circle_ks" v-for="(item,index) in awardNum" :key="item+index" :style="{backgroundImage: 'url(../../../../static/img/fast'+item+'.png)'}">

					</li>
				</ul>
				<ul style="padding: 0 .5rem;" v-else>
					<li class="circle_ks" v-for="(item,index) in awardNum" :key="item+index" :style="{backgroundImage: 'url(../../../../static/img/dice_gif_01.gif)',height:'0.9rem',width:'0.9rem'}">

					</li>
				</ul>
			</div>
			<div class="right">
				<p>第{{showCurrentAwarPeriod}}期</p>
				<p style="margin: 0.1rem 0;">截止</p>
				<CountDown class="clock-count" :classId="classId" :format="':'" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
			</div>
		</div>
		<!--<div style="position: relative;background:#FFFFFF;z-index: 1000;" v-clickoutside3="closeModal" >
			<transition name="fade">
				<div :style="listInfo_style" class="listInfo" ref="wrapper3">
					<div class="content">
						<table border="0" cellspacing="0" cellpadding="0" style="width: 100%;">
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
				<img src="../../../../static/img/xiangxia.png" />
			</div>
		</div>-->
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
		<!--<div ref="show" style="position: relative;"  v-stopSlide>
			<transition name="fade">
				<div class="listInfo" :style="listInfo_style">
						<div>
							开奖历史
						</div>

					<div class="xiala">
						<img src="../../../../static/img/xiangxia.png" />
					</div>
				</div>
			</transition>

		</div>-->

	</div>

</template>

<script>
	import Bscroll from 'better-scroll';
	import clickoutside3 from '../../../directives/clickoutside3'
	import CountDown from "./countdown.vue"
	import gameConfig from '../gameConfig.js'
	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		directives: {
			clickoutside3
		},
		components: {
			CountDown
		},
		data() {
			return {
				num_color: num_color,
				radio1: "冷热",
				show1: false,
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
				listInfo_style: {
					width: '100%',
					height: '0',
					transition: 'all .3s',
				},
				showCurrentAwarPeriod: '',
				showPrevAwarPeriod: '',
				currentAwarPeriod2: '',
				prevAwarPeriod2: '',
				time: 0,
				stopCountDown: false,
				gameConfig: gameConfig,
				active: false,
				active_pk10: null,
				awardNum: [],
				num_type: {},
			}
		},
		created() {
			let kindId, classId;
			if(JSON.parse(sessionStorage.getItem('kindId'))) {
				kindId = JSON.parse(sessionStorage.getItem('kindId'))
			} else {
				kindId = this.kindId;
			}
			if(JSON.parse(sessionStorage.getItem('classId'))) {
				classId = JSON.parse(sessionStorage.getItem('classId'))
			} else {
				classId = this.classId;
			}
			if(classId == '6') {
				this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
			} else if(classId == '1') {
				this.awardNum = ['_ask', '_ask', '_ask'];
			} else if(classId == '2') {
				this.awardNum = ['?', '?', '?', '?', '?', '?', '?'];
			} else if(classId == '4') {
				this.awardNum = ['3_ask', '3_ask', '3_ask'];
			} else {
				this.awardNum = ['_ask', '_ask', '_ask', '_ask', '_ask'];
			}
			this.awardNum = ['_ask', '_ask', '_ask', '_ask', '_ask'];
			this.getWinsDragon("/" + kindId).then((res) => {
				this.currentAwarPeriod2 = this.currentAwarPeriod;
				this.prevAwarPeriod2 = this.prevAwarPeriod;
				this.simplifyAwarPeriod()
				clearInterval(this.active_pk10)
				if(classId == '6') {
					if(this.winList[1].awardNum == null) {
						this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
						clearInterval(this.active_pk10)
						this.active_pk10 = setInterval(() => {
							this.shuffle()
						}, 80)
					} else {
						this.awardNum = this.winList[1].awardNum.split(",")
						clearInterval(this.active_pk10)
					}
				} else if(classId == '1') {
					if(this.winList[1].awardNum == null) {
						this.awardNum = ['_ask', '_ask', '_ask'];
						this.active = false;
					} else {
						this.active = true;
						this.awardNum = this.winList[1].awardNum.split(",")
					}
				} else if(classId == '2') {
					if(this.winList[1].awardNum == null) {
						this.awardNum = ['?', '?', '?', '?', '?', '?', '?'];
						this.active = false;
					} else {
						this.active = true;
						this.awardNum = this.winList[1].awardNum.split(",")
					}
				} else if(classId == '4') {
					if(this.winList[1].awardNum == null) {
						this.awardNum = ['3_ask', '3_ask', '3_ask'];
						this.active = false;
					} else {
						this.active = true;
						this.awardNum = this.winList[1].awardNum.split(",")
					}
				} else {
					if(this.winList[1].awardNum == null) {
						this.awardNum = ['_ask', '_ask', '_ask', '_ask', '_ask'];
						this.active = false;

					} else {
						this.active = true;
						this.awardNum = this.winList[1].awardNum.split(",")
					}
				}
			})
			this.judgeAnimal()
		},
		mounted() {

		},
		destroyed() {
			this.stopCountDown = true;
		},
		computed: {
			...mapState("bet", ["kindId", "currentAwarPeriod", 'prevAwarPeriod', 'classId', 'winList', 'dragons']),
			...mapState(["msg"]),
		},
		methods: {
			...mapActions('home', [
				'winHistory'
			]),
			...mapActions('bet', [
				"getWinsDragon",
			]),
			...mapMutations('bet', [
				"updateAwarPeriod"
			]),
			closeModal(e) {
				if(e.target !== this.$refs.open) {
					this.show1 = false;
				}

			},
			open() {
				this.show1 = !this.show1
			},
			shuffle() {
				this.awardNum = _.shuffle(this.awardNum)
			},
			simplifyAwarPeriod() {
				let lg = String(gameConfig[this.kindId].periodNoAll).length;
				this.showCurrentAwarPeriod = this.currentAwarPeriod2.slice(this.currentAwarPeriod2.length - lg, this.currentAwarPeriod2.length)
				this.showPrevAwarPeriod = this.prevAwarPeriod2.slice(this.prevAwarPeriod2.length - lg, this.prevAwarPeriod2.length)
			},
			countDown() {
				this.active = false;
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
			judgeAnimal() {
				let names = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
				let obj = {};
				let labels = Array(12);
				let year = (new Date()).getFullYear();
				let animal = year % 12 + 8;
				let number_arr = new Array(12);
				for(var i = 0; i < 12; i++) {
					if(i == animal) {
						let first_number = 1;
						let item = [String(first_number), String(first_number + 12), String(first_number + 24), String(first_number + 36), String(first_number + 48)];

						labels.fill(item, i, i + 1);
					} else {
						let first_number = i < animal ? (animal - i) + 1 : 13 - (i - animal);

						let item = [String(first_number), String(first_number + 12), String(first_number + 24), String(first_number + 36)];
						labels.fill(item, i, i + 1);
					}
				}
				labels.forEach((item1, index1) => {
					item1.forEach((item2) => {
						obj[item2] = names[index1]
					})
				})
				for(var key in obj) {
					if(key * 1 < 10) {
						obj['0' + key] = obj[key]
					}
				}
				this.num_type = obj;
			},
		},
		watch: {
			msg(newMsg) {
				let awardNews = JSON.parse(newMsg.data)
				if(awardNews.messageType == "3") {
					if(awardNews.lotteryId == this.kindId) {
						this.getWinsDragon("/" + this.kindId).then((res) => {

							this.currentAwarPeriod2 = this.currentAwarPeriod;
							this.prevAwarPeriod2 = this.prevAwarPeriod;
							this.simplifyAwarPeriod()
							clearInterval(this.active_pk10)
							if(this.classId == '6') {
								if(this.winList[1].awardNum == null) {
									this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
									clearInterval(this.active_pk10)
									this.active_pk10 = setInterval(() => {
										this.shuffle()
									}, 80)
								} else {
									this.awardNum = this.winList[1].awardNum.split(",")
									clearInterval(this.active_pk10)
								}
							} else if(this.classId == '1') {
								if(this.winList[1].awardNum == null) {
									this.awardNum = ['_ask', '_ask', '_ask'];
									this.active = false;
								} else {
									this.active = true;
									this.awardNum = this.winList[1].awardNum.split(",")
								}
							} else if(this.classId == '2') {
								if(this.winList[1].awardNum == null) {
									this.awardNum = ['?', '?', '?', '?', '?', '?', '?'];
									this.active = false;
								} else {
									this.active = true;
									this.awardNum = this.winList[1].awardNum.split(",")
								}
							} else if(this.classId == '4') {
								if(this.winList[1].awardNum == null) {
									this.awardNum = ['3_ask', '3_ask', '3_ask'];
									this.active = false;
								} else {
									this.active = true;
									this.awardNum = this.winList[1].awardNum.split(",")
								}
							} else {
								if(this.winList[1].awardNum == null) {
									this.awardNum = ['_ask', '_ask', '_ask', '_ask', '_ask'];
									this.active = false;

								} else {
									this.active = true;
									this.awardNum = this.winList[1].awardNum.split(",")
								}
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
					this.$nextTick(() => {
						let scroll = new Bscroll(this.$refs.wrapper3, {
							scrollbars: true,
						})
					})
				} else {
					this.listInfo_style = {
						height: '0',
					}
				}
			},
			kindId() {
				this.active = false;
				this.getWinsDragon("/" + this.kindId).then((res) => {
					this.currentAwarPeriod2 = this.currentAwarPeriod;
					this.prevAwarPeriod2 = this.prevAwarPeriod;
					this.simplifyAwarPeriod()
					clearInterval(this.active_pk10)
					if(this.classId == '6') {
						if(this.winList[1].awardNum == null) {
							this.awardNum = ['01', '02', '03', '06', '09', '10', '08', '05', '04', '07'];
							clearInterval(this.active_pk10)
							this.active_pk10 = setInterval(() => {
								this.shuffle()
							}, 80)
						} else {
							this.awardNum = this.winList[1].awardNum.split(",")
							clearInterval(this.active_pk10)
						}
					} else if(this.classId == '1') {
						if(this.winList[1].awardNum == null) {
							this.awardNum = ['_ask', '_ask', '_ask'];
							this.active = false;
						} else {
							this.active = true;
							this.awardNum = this.winList[1].awardNum.split(",")
						}
					} else if(this.classId == '2') {
						if(this.winList[1].awardNum == null) {
							this.awardNum = ['?', '?', '?', '?', '?', '?', '?'];
							this.active = false;
						} else {
							this.active = true;
							this.awardNum = this.winList[1].awardNum.split(",")
						}
					} else if(this.classId == '4') {
						if(this.winList[1].awardNum == null) {
							this.awardNum = ['3_ask', '3_ask', '3_ask'];
							this.active = false;
						} else {
							this.active = true;
							this.awardNum = this.winList[1].awardNum.split(",")
						}
					} else {
						if(this.winList[1].awardNum == null) {
							this.awardNum = ['_ask', '_ask', '_ask', '_ask', '_ask'];
							this.active = false;

						} else {
							this.active = true;
							this.awardNum = this.winList[1].awardNum.split(",")
						}
					}
				})
			},
			currentAwarPeriod() {
				//				console.log(this.currentAwarPeriod)
			},
			winList() {
				//				console.log(this.winList)
			}

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
	
	.exhibition {
		width: 100%;
		.clockView.hk6,
		.clockView.pk10 {
			background-image: url(../../../../static/img/bg2.png);
			.left {
				flex: 1;
			}
			.right {}
		}
		.clockView {
			width: 100%;
			height: 1.8rem;
			display: flex;
			background-image: url(../../../../static/img/bg.png);
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
						width: .9rem;
						height: .9rem;
						transform: rotate(0deg);
						margin: 0.1rem .1rem;
						background-image: url(../../../../static/img/img_recordball.png);
						/*background-image: url(../../../../static/img/ball_light.png);*/
						background-size: 100% 100%;
						/*background: radial-gradient(circle at 50% 100%, #750000, red 100%, #ca0500 100%);*/
						/*border: 0.06rem solid #B8860B;*/
						.num {
							width: 100%;
							height: 100%;
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
		.active_ul {
			transform: translateY(1.8rem);
			animation: numberListActivessc .25s infinite linear;
		}
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