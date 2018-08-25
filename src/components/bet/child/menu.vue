<template>
	<div class="menu" v-if="show">
		<div :class="show?'overlay show':'overlay hide'" @click.stop="closeAside"></div>
		<ul class="level_1">
			<li v-for="(item1,index1) in standGameList" :key="index1" :class="selected_index1===index1?'selected_one':''" @click="selectLevelOne(index1,item1.gameId,item1.gameName)">{{item1.gameName}}</li>
		</ul>
		<div class="level_2" v-for="(val, key,index2) of standGameList[selected_index1].gameSons[0]" :key="index2" v-if="specialGameId.indexOf(standGameList[selected_index1].gameId)==-1">
			<div class="leftTitle">{{key}}</div>
			<ul class="rightList">
				<li v-for="(item3,index3) in val" @click="selectLevelTwo(item3.leftName,item3.rightName,item3.subGameId,index2,index3)" :class="selected_index2===index2&&selected_index3===index3?'selected_two':''">{{item3.rightName}}</li>
			</ul>
		</div>
		<div class="level_2" v-for="(item2,index2) in standGameList[selected_index1].gameSons" :key="index2" v-if="specialGameId.indexOf(standGameList[selected_index1].gameId)!=-1">
			<div class="leftTitle">{{standGameList[selected_index1].gameName}}</div>
			<ul class="rightList">
				<li v-for="(val3, key3,index3) of standGameList[selected_index1].gameSons[0]" @click="selectLevelTwo(val3[0].leftName,val3[0].rightName,val3[0].subGameId,index2,index3)" :class="selected_index2===index2&&selected_index3===index3?'selected_two':''">{{val3[0].leftName}}</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import { renderingData } from "../bet.js";
	export default {
		props: ["show", "standGameList","standGameList2"],
		data() {
			return {
//				gameId: "",
//				leftName: "",
//				rightName: "",
//				subGameId: "",
				selected_index1: 0,
				selected_index2: 0,
				selected_index3: 0,
				specialGameId: ["4001", "3014", "6005", "2003", "2005", "2006", "2008", '2007'],
			}
		},
		created() {
			//			this.init()
		},
		computed: mapState("bet", ["newNumbers", "ticketCount"]),
		methods: {
			...mapActions("bet", ["getGamePlayList"]),
			...mapMutations("bet", ["saveDataOrSubGameList"]),
			selectLevelOne(index, gameId, gameName) {
				this.selected_index1 = index;
				this.selected_index2 = 0;
				this.selected_index3 = 0;
				this.gameId = gameId;
				this.gameName = gameName
				this.leftName = this.standGameList2[index].gameSons[0].leftName;
				this.rightName = this.standGameList2[index].gameSons[0].rightName;
				this.subGameId = this.standGameList2[index].gameSons[0].subGameId;
				this.gamePlayList = this.standGameList2[this.selected_index1];
				this.$emit("changeSubGame", {
					leftName:this.leftName,
					rightName:this.rightName,
					subGameId:this.subGameId,
					gameName:this.gameName,
					gameId:this.gameId,
					gamePlayList:this.gamePlayList
				})
			},
			selectLevelTwo(leftName, rightName, subGameId, index2, index3) {
				this.selected_index2 = index2;
				this.selected_index3 = index3;
				this.leftName = leftName;
				this.rightName = rightName;
				this.subGameId = subGameId;
				this.gamePlayList = this.standGameList2[this.selected_index1];
				this.$emit("changeSubGame", {
					leftName:leftName,
					rightName:rightName,
					subGameId:subGameId,
					gameName:this.gameName,
					gameId:this.gameId,
					gamePlayList:this.gamePlayList
				})
				this.$emit("close")
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
			//获取对象的长度
			countProperties(obj) {
				var count = 0;
				for(var property in obj) {
					if(Object.prototype.hasOwnProperty.call(obj, property)) {
						count++;
					}
				}
				return count;
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
			closeAside() {
				this.$emit("close")
			}

		},
		watch: {
			kindId() {
				this.selected_index1 = 0;
				this.selected_index2 = 0;
				this.selected_index3 = 0;
			}
		}

	}
</script>

<style lang="less">
	.menu {
		width: 100%;
		min-height: 4rem;
		max-height: 7rem;
		overflow: scroll;
		/*-webkit-overflow-scrolling: touch;*/
		position: fixed;
		top: 1rem;
		left: 0;
		background: #f7f7f7;
		z-index: 1001;
		border-bottom: 1px solid #ff5151;
		.level_1 {
			display: flex;
			flex-wrap: wrap;
			justify-content: flex-start;
			margin-bottom: 0.1rem;
			li {
				width: 1.59rem;
				height: 0.7rem;
				display: inline-block;
				margin: 0.1rem 0.14rem;
				line-height: 0.7rem;
				font-size: 14px;
				color: #5c5c5c;
				text-align: center;
				border-radius: 2px;
				background: #fff;
			}
			.selected_one {
				color: #ffffff;
				background: #ff5151;
			}
		}
		.level_2 {
			padding: 0.2rem 0.1rem;
			display: flex;
			background: #FFFFFF;
			align-items: center;
			border-bottom: 1px solid #e6e6e6;
			.leftTitle {
				height: 0.6rem;
				padding: 0 0.1rem;
				font-size: 14px;
				line-height: 0.6rem;
				border: 1px solid #FFFFFF;
				color: #5c5c5c;
			}
			.rightList {
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				flex: 1;
				li {
					font-size: 14px;
					height: 0.6rem;
					width: 1.8rem;
					text-align: center;
					/*padding: 0 0.14rem;*/
					line-height: 0.6rem;
					color: #9b9b9b;
					border-radius: 2px;
					margin: 0.1rem 0.06rem;
					border: 1px solid #e6e6e6;
				}
				.selected_two {
					color: #ff5151;
					border: 1px solid #ff5151;
				}
			}
		}
		.overlay.hide {
			opacity: 0;
			visibility: hidden;
		}
		.overlay.show {
			visibility: visible;
		}
		.overlay.show {
			opacity: 0;
		}
		.overlay {
			position: fixed;
			background-color: rgba(55, 55, 55, .7);
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: 2;
			-webkit-transition: all .2s ease-in-out;
			-o-transition: all .2s ease-in-out;
			transition: all .2s ease-in-out;
			cursor: pointer;
		}
		.overlay {
			height: 100%;
			top: 0px;
			z-index: -1;
		}
	}
</style>