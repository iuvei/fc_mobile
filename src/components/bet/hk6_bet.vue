<template>
	<div class="hk6bet">
		<yd-popup v-model="showKind" position="center" style="z-index: 9999;" class="selKind">
			<div style="display: flex;background: #FFFFFF;border-radius:3px" v-if="kindList.length>0">
				<ul style="background: #f7f7f7;" class="left">
					<li v-for="(item,index) in kindList" @click="selClassId(item.classId)" :class="cache_classId==item.classId?'active':''" :key="index"><img style="width: 0.5rem;" :src="'../../../static/img/home/allKind/'+item.classId+'.png'"><span>{{item.className}}</span><img style="width: 0.3rem;" src="../../../static/img/xiangyou.png" /></li>
				</ul>
				<ul class="right">
					<li v-for="(item,index) in kindList[sel_kind_idx].kindList" :key="index" @click="selKindId(item.kindId)" :class="cache_kindId==item.kindId?'active':''">{{item.kindName}}</li>
				</ul>
			</div>
			<div style="display: flex;background: #FFFFFF;border-radius:3px;height:7rem;width: 6.2rem;flex-direction: column;justify-content: center;align-items: center;padding-bottom: .5rem;" v-else>
				<img src="../../../static/img/wlcw.png" /> 网络错误！请稍后刷新重试
			</div>
		</yd-popup>
		<transition name="fade">
			<div class="popover-menu" v-show="rightPopup" ref="rightPopup" v-clickoutside2="closeModal">
				<ul class="rightPopup" style="">
					<li class="first_li"><img src="../../../static/img/yonghu.png" class="icon" /><span>{{userDetails.account}}</span></li>
					<li><img src="../../../static/img/img_pig.png" class="icon" /><span style="color: #d81d38;">{{userDetails.accountBalance}}</span></li>
					<li @click="switchKind"><img src="../../../static/img/qiehuan.png" class="icon" /><span>切换彩种</span></li>

					<li v-if="userDetails.type=='0'" @click="recharge"><img src="../../../static/img/chongzhi.png" class="icon" />充值</li>
					<li v-if="userDetails.type=='0'" @click="putForward"><img src="../../../static/img/tixian.png" class="icon" />提现</li>
					<li @click="myBet"><img src="../../../static/img/img_min_pop.png" class="icon" />投注记录</li>
					<li @click="award"><img src="../../../static/img/img_last_open.png" class="icon" />开奖历史</li>
					<li @click="showGameHple"><img src="../../../static/img/shuoming.png" class="icon" style="width: 0.5rem;" />玩法说明</li>
				</ul>
			</div>
		</transition>

		<yd-navbar v-stopSlide>
			<router-link :to=url slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
			<div slot="center" v-stopPropagation style="display: flex;font-size: 12px;" v-stopSlide>
				<span style="width:0.285rem;display: inline-block;">玩法</span>
				<div class="select_game hk6" style="color: #FFFFFF;">
					六合彩
				</div>
			</div>
			<div slot="right" @click="showRightPopup" ref="showRightPopup">
				小助手
			</div>
		</yd-navbar>
		<BetPanel :kindId="kindId" :classId="classId" :betDataList="betDataList" @resultData="getBetData" :subGameList="subGameList" @selectSubGameId="selectSubGameId" @selHk6Index="selHk6Index" :standGameList="standGameList"></BetPanel>
		<BetFooter v-stopSlide :kindId="kindId" :ticketCount="ticketCount" :newNumbers="newNumbers" @initStyle="initStyle" :classId="classId" :subGameList="subGameList"></BetFooter>
	</div>
</template>

<script>
	import clickoutside2 from '../../directives/clickoutside2'
	import { mapState, mapActions, mapMutations } from "vuex";
	import { renderingData } from "./bet.js";
	import { bus } from "./bus.js";
	import BetPanel from './child/HK6.vue';
	import BetFooter from './child/betFooter.vue';
	export default {
		directives: {
			clickoutside2
		},
		data() {
			return {
				btn_style: 'bet_selected',
				show: false,
				select_game_css: {},
				specialGameId: ["4001", "3014", "6005", "2003", "2005", "2006", "2008", '2007'],
				rightPopup: false,
				init_css: {
					opacity: '0'
				},
				showKind: false,
				sel_kind_idx: 0,
				cache_classId: '',
				cache_kindId: '',
				url: '/allKinds',
				el: '',
				newNumbers: [],
				ticketCount: 0,
				classId: '',
				kindId: '',
				betDataList: {},
				standGameList: [],
				standGameList2: [],
				subGameList: [],
			}
		},
		created() {
			this.init()
			this.url = sessionStorage.getItem('prevPath')
		},
		mounted() {

		},
		computed: {
			...mapState("bet", ["subGameId", "gameName", "rightName", "leftName", "gameId", "standGameLists"]),
			...mapState('home', [
				'kindList'
			]),
			...mapState('login', [
				'userDetails'
			]),

		},
		methods: {
			...mapActions('home', [
				'kind'
			]),
			...mapActions("bet", ["getGamePlayList", "getSubGames"]),
			...mapMutations('bet', [
				"setClassId",
				"setKindId",
				"saveDataOrSubGameList",
				"saveStandGameList",
				"cacheHistoryData",
				"saveSubGameList"
			]),
			selectSubGameId(obj) {
				let gamePlayList = this.standGameList2[obj.index]
				let leftName = this.standGameList[obj.index].gameSons[0][obj.name][0].leftName
				let rightName = this.standGameList[obj.index].gameSons[0][obj.name][0].rightName
				let subGameId = this.standGameList[obj.index].gameSons[0][obj.name][0].subGameId
				let gameId = this.standGameList[obj.index].gameId
				let gameName = this.standGameList[obj.index].gameName;
				let str = leftName + '-' + rightName + '-' + subGameId;
				renderingData(str, gamePlayList).then((res1) => {
					this.betDataList = res1.data;
					let data = {
						leftName: leftName,
						rightName: rightName,
						subGameId: subGameId,
						gameName: gameName,
						gameId: gameId,
						gamePlayList: [gamePlayList]
					}
					this.setDataOrSubGameList(res1, data)
					this.getSubGames({
						gameIds: res1.subGameIds
					}).then((res2) => {
						this.subGameList = res2.data
						this.saveSubGameList(this.subGameList)
					})
					
				})

			},
			selHk6Index(index) {
                this.initStyle()
				this.standGameList2 = JSON.parse(sessionStorage.getItem(this.kindId));
				let gamePlayList = this.standGameList2[index]
				let gameId = this.standGameList2[index].gameId;
				let gameName = this.standGameList2[index].gameName;
				let leftName = this.standGameList2[index].gameSons[0].leftName;
				let rightName = this.standGameList2[index].gameSons[0].rightName;
				let subGameId = this.standGameList2[index].gameSons[0].subGameId;
				let str = leftName + '-' + rightName + '-' + subGameId;
				renderingData(str, gamePlayList).then((res1) => {
					this.betDataList = res1.data;
					let data = {
						leftName: leftName,
						rightName: rightName,
						subGameId: subGameId,
						gameName: gameName,
						gameId: gameId,
						gamePlayList: [gamePlayList]
					}
					this.setDataOrSubGameList(res1, data)
					this.getSubGames({
						gameIds: res1.subGameIds
					}).then((res2) => {
						this.subGameList = res2.data
						this.saveSubGameList(this.subGameList)
					})
					

				})

			},
			showGameHple() {
				this.rightPopup = false;
				bus.$emit("showHelp", true)
			},
			init() {
				this.kindId = this.$route.params.kindId;
				this.classId = this.$route.params.classId;
				if(JSON.parse(sessionStorage.getItem(this.kindId))) {
					this.standGameList2 = JSON.parse(sessionStorage.getItem(this.kindId))
					this.standGameList = this.dataStructure(JSON.parse(sessionStorage.getItem(this.kindId)));
					let gameName = this.standGameList[0].gameName;
					let gameId = this.standGameList[0].gameId;
					let leftName = this.standGameList2[0].gameSons[0].leftName;
					let rightName = this.standGameList2[0].gameSons[0].rightName;
					let subGameId = this.standGameList2[0].gameSons[0].subGameId;
					let gamePlayList = this.standGameList2[0];
					let str = leftName + '-' + rightName + '-' + subGameId;
					renderingData(str, gamePlayList).then((res1) => {
						this.betDataList = res1.data;
						let data = {
							leftName: leftName,
							rightName: rightName,
							subGameId: subGameId,
							gameName: gameName,
							gameId: gameId,
							gamePlayList: [gamePlayList]
						}
						this.setDataOrSubGameList(res1, data)
						this.getSubGames({
							gameIds: res1.subGameIds
						}).then((res2) => {
							this.subGameList = res2.data;
							this.saveSubGameList(this.subGameList)
						})
					})
				} else {
					this.getGamePlayList(`/${this.classId}/${this.kindId}`).then((res) => {
						this.betDataList = res.data;
						this.standGameList2 = res.data.standGameList
						this.standGameList = this.dataStructure(res.data.standGameList);
						let gameName = this.standGameList[0].gameName;
						let gameId = this.standGameList[0].gameId;
						let leftName = this.standGameList2[0].gameSons[0].leftName;
						let rightName = this.standGameList2[0].gameSons[0].rightName;
						let subGameId = this.standGameList2[0].gameSons[0].subGameId;
						let gamePlayList = this.standGameList2[0];
						let str = leftName + '-' + rightName + '-' + subGameId;
						renderingData(str, gamePlayList).then((res1) => {
							let data = {
								leftName: leftName,
								rightName: rightName,
								subGameId: subGameId,
								gameName: gameName,
								gameId: gameId,
								gamePlayList: [gamePlayList]
							}
							this.setDataOrSubGameList(res, data)
							this.getSubGames({
								gameIds: res1.subGameIds
							}).then((res2) => {
								this.subGameList = res2.data
								this.saveSubGameList(this.subGameList)
							})
							
						})
						this.saveStandGameList({
							standGameList: res.data.standGameList,
							kindId: this.kindId
						})
					})
				}
				this.cache_classId = this.classId;
				this.cache_kindId = this.kindId;
				this.setClassId(this.cache_classId)
				this.setKindId(this.cache_kindId)
			},
			closeModal(e) {
				if(e.target !== this.$refs.showRightPopup) {
					this.rightPopup = false;
				}
			},
			getBetData(data) {
				this.newNumbers = data.newNumbers;
				this.ticketCount = data.ticketCount;
			},
			recharge() {
				this.$router.push({
					path: "/recharge/companyIncome",
				})
			},
			//样式重置
			initStyle() {
				if(!this.betDataList.inputFormat) {
					if(this.betDataList.numbers) {
						this.betDataList.numbers.forEach((item1) => {
							item1.cols.forEach((item2) => {
								item2.data_selected = false;
							})
						})
					}
				}

				this.newNumbers = [];
				this.ticketCount = 0;
			},
			//格式化玩法导航
			dataStructure(data) {
				var newData = new Array();
				data.forEach((item1, index) => {
					let obj = {},
						b = [],
						c = {};
					obj.gameName = item1.gameName;
					obj.gameId = item1.gameId;
					item1.gameSons.forEach((obj) => {
						var array = c[obj['leftName']] || [];
						array.push(obj);
						c[obj['leftName']] = array;

					})
					b.push(c);
					obj.gameSons = b;
					if(this.specialGameId.indexOf(obj.gameId) != -1) {
						for(var key in obj.gameSons[0]) {
							let leftName = '';
							let ary = [];
							obj.gameSons[0][key].forEach((item2, index2) => {
								if(item2.leftName != leftName) {
									ary.push(item2)
									leftName = item2.leftName
								}
							})
							obj.gameSons[0][key] = ary
						}
					}
					newData.push(obj)
				})
				return newData
			},
			setDataOrSubGameList(res, res2) {
				let data = {};
				data.betDataList = res.data;
				data.subGameList = res.subGameList;
				data.newNumbers = this.newNumbers;
				data.ticketCount = this.ticketCount;
				data.leftName = res.leftName;
				data.rightName = res.rightName;
				data.subGameId = res.subGameId;
				data.gamePlayList = res2.gamePlayList;
				data.gameId = res2.gameId;
				data.gameName = res2.gameName
				this.saveDataOrSubGameList(data)
			},
			putForward() {
				this.$router.push({
					path: "/withdraw",
				})

			},
			selClassId(classId) {
				this.kindList.forEach((item, index) => {
					if(item.classId == classId) {
						this.cache_classId = classId;
						return this.sel_kind_idx = index
					}
				})
			},
			selKindId(kindId) {
				let path;
				this.cache_kindId = kindId;
				this.setClassId(this.cache_classId)
				this.setKindId(kindId)
				this.showKind = false;
				if(this.cache_classId != '2') {
					path = '/bet/'
				} else {
					path = '/hk6bet/'
				}
				this.$http.get(this.global.baseUrl + '/inter/ticket/winsDragon/' + this.cache_kindId, {
					timeout: 500
				}).then((res) => {
					this.cacheHistoryData(res.data)
					this.$router.push({
						path: path + this.cache_classId + '/' + this.cache_kindId,
					})
				}).catch((error) => {
					if(error.response) {} else if(error.request) {
						if(error.request.readyState == 4 && error.request.status == 0) {
							this.cacheHistoryData(null)
							this.$router.push({
								path: path + this.cache_classId + '/' + this.cache_kindId,
							})
						}
					} else {
						console.log('Error', error.message);
					}
				})
				if(JSON.parse(sessionStorage.getItem(kindId))) {
					let obj = {};
					let kindList = JSON.parse(sessionStorage.getItem(kindId))
					kindList.forEach((item) => {
						item.gameSons.forEach((item2) => {
							obj[item2.subGameId] = item2.odd;
						})
					})
				}
				
				sessionStorage.setItem('classId', JSON.stringify(this.cache_classId));
				sessionStorage.setItem('kindId', JSON.stringify(this.cache_kindId));

			},
			select() {
				this.btn_style = "bet_unchecked"
			},
			myBet() {
				this.$router.push({
					name: "noterecord"
				})
			},
			award() {
				this.$router.push({
					name: "award"
				})
			},
			selectSubGame() {
				this.show = !this.show;
				if(this.show) {
					this.select_game_css = {
						background: "url(../../../static/img/shangla.png) no-repeat scroll right center transparent",

					}
				} else {
					this.select_game_css = {
						background: "url(../../../static/img/xiala.png) no-repeat scroll right center transparent",

					}
				}

			},
			closeMenu() {
				this.show = false;
				this.select_game_css = {
					background: "url(../../../static/img/xiala.png) no-repeat scroll right center transparent",

				}
			},
			showRightPopup() {
				this.init_css = {
					opacity: '1'
				}
				this.rightPopup = true;

			},
			switchKind() {
				this.selClassId(this.classId)
				this.showKind = true;
				this.rightPopup = false
			}
		},
		components: {
			BetPanel,
			BetFooter,
		},
		watch: {
			$route() {
				this.init()
			}
		}

	}
</script>

<style lang="less">
	.hk6bet {
		display: flex;
		flex-direction: column;
		overflow: hidden;
		width: 100%;
		height: 100%;
		/*position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;*/
		background: #FFFFFF;
		.yd-navbar {
			position: relative !important;
		}
		.popover-menu {
			position: absolute;
			z-index: 9998;
			background: #ffffff;
			top: 1rem;
			right: 0;
			width: 3rem;
			height: 6rem;
			box-shadow: 1px 1px 7px 2px #aaa;
			.first_li {
				font-size: 12px;
				padding: 0.2rem 0.2rem;
				display: flex;
				justify-content: center;
				align-items: center;
				border-bottom: 1px solid #acacac;
				.icon {
					margin-right: 0.1rem;
				}
			}
			li {
				font-size: 12px;
				padding: 0.1rem;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #acacac;
				.icon {
					width: 0.5rem;
					margin-right: 0.1rem;
				}
			}
		}
		.yd-navbar {
			z-index: 1000;
			background: #011935 !important;
			color: #FFFFFF;
			.yd-back-icon:before,
			.yd-next-icon:before {
				color: #FFFFFF;
			}
		}
		.select_game {
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 5px;
			border: 1px solid #ccc;
			line-height: 0.68rem;
			padding-right: 0.2rem;
			padding-left: 0.2rem;
			color: #fff;
			img {
				width: 0.4rem;
			}
			.top {
				-moz-transform: rotate(180deg);
				-webkit-transform: rotate(180deg);
				transform: rotate(180deg);
				filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
			}
			/*background: url(../../../static/img/xiala.png) no-repeat scroll right center transparent;*/
			/*background-size: 0.4rem 0.4rem !important;*/
		}
		.fade-enter-active,
		.fade-leave-active {
			transition: opacity .5s;
		}
		.fade-enter,
		.fade-leave-to/* .fade-leave-active below version 2.1.8 */
		{
			opacity: 0;
		}
		.selKind {
			.yd-popup-center {
				width: 6.2rem !important;
				height: 7rem !important;
				color: #5c5c5c;
				font-size: 14px;
				.yd-popup-content {
					height: 100%;
					.left {
						padding: 0.2rem;
						border-radius: 3px 0 0 3px;
						width: 50%;
						height: 6.2rem;
						display: flex;
						flex-direction: column;
						justify-content: space-around;
						li {
							padding: 0.1rem;
							flex: 1;
							display: flex;
							align-items: center;
							border-bottom: 1px dotted #C5CAD0;
							justify-content: space-between;
						}
						.active {
							color: #ff5151;
						}
					}
					.right {
						padding: 0.2rem;
						border-radius: 0px 3px 3px 0px;
						width: 50%;
						height: 6.2rem;
						display: flex;
						flex-direction: column;
						align-items: center;
						overflow: auto;
						li {
							width: 2rem;
							height: .7rem;
							border-radius: 4px;
							border: 1px solid #e6e6e6;
							line-height: .7rem;
							text-align: center;
							margin: 0.1rem;
						}
						.active {
							color: #ff5151;
							border-color: rgba(255, 0, 0, 0.1);
						}
					}
				}
			}
		}
	}
</style>