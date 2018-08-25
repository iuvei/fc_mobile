<template>
	<div class="allKinds">
		<yd-flexbox direction="vertical">
			<div class="allKinds_head">
				<Header v-if="this.isLogin == false"></Header>
				<HeaderII v-if="this.isLogin == true"></HeaderII>
			</div>
			<yd-flexbox-item class="allKinds_center">
				<div class="nav_A">
					<div class="nav_A_left">
						<div class="nav_A_left_top" @click="goBettingHall('3','cqssc')">
							<img src="../../../static/img/home/allKind/home_content_cqssc@2x.png" alt="">
							<p>重庆时时彩</p>
						</div>
						<div class="nav_A_left_bot" @click="goBettingHall('4','jsk3')">
							<p>江苏快三</p>
							<img src="../../../static/img/home/allKind/home_content_ahks@2x.png" alt="">
						</div>
					</div>
					<div class="nav_A_right"></div>
				</div>
				<div class="nav_B">
					<div class='nav_B_left' @click="goBettingHall('6','bjpk10')">
						<div>
							<p>PK10</p>
							<p>北京赛车</p>
						</div>
					</div>
					<div class='nav_B_right' @click="goBettingHall('5','gd11x5')">
						<img src="../../../static/img/home/allKind/home_content_11x5@2x.png" alt="">
						<p>广东11选5</p>
					</div>
				</div>
				<div class="nav_c">
					<div class="nav_c_left">
						<div class="one" @click="goBettingHall('3','m5ffc')">
						</div>
						<div class="two" @click="goBettingHall('3','m53fc')">
							<img src="../../../static/img/home/allKind/home_content_sfc@2x.png" alt="">
						</div>
						<div class="therr" @click="goBettingHall('3','m55fc')">
							<img src="../../../static/img/home/allKind/home_content_wfc@2x.png" alt="">
						</div>
						<div class="four" @click="goBettingHall('1','fc3d')">
							<img src="../../../static/img/home/allKind/home_content_ftc@2x.png" alt="">
						</div>
					</div>
					<div class="nav_c_center" @click="goBettingHall('1','pl3')">
						<p>PL3</p>
					</div>
					<div @click="toPash('/redPacket')" class="nav_c_right">
					</div>
				</div>

			</yd-flexbox-item>
			<div class="allKinds_bottom">
				<Footer></Footer>
			</div>
		</yd-flexbox>
	</div>
</template>

<script>
	import Header from '../home/dome/home_head.vue'
	import HeaderII from '../home/dome/home_headII.vue'
	import Footer from '../home/dome/home_foot.vue'
	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		data() {
			return {
				msg: ''
			}
		},
		created() {
			this.queryDocumentContentList()
			this.kind();
			//   console.log(this.isLogin)
		},
		computed: {
			...mapState([
				'isLogin'
			])
		},
		methods: {
			...mapActions('bet', [
				"getWinsDragon",
			]),
			...mapMutations('bet', [
				"setClassId",
				"setKindId",
				'cacheHistoryData'
			]),
			...mapActions('home', [
				'kind'
			]),
			...mapActions('activity', [
				'queryDocumentContentList'
			]),
			//   _queryDocumentContentList(){
			//     this.queryDocumentContentList().then(res=>{
			//       this.activityList = this.activityDocumentList.data;
			//     })
			//   },
			toPash(name) {
				let that = this;
				if(that.isLogin == false) {
					that.$dialog.toast({
						mes: '未登录',
						timeout: 1000,
						// icon: 'success'
					});
				} else {
					this.$router.push({
						path: name
					})
				}
			},
			goBet() {
				this.$router.push({
					name: "bet"
				})
			},
			//跳转到相应的投注页面
			goBettingHall(classId, kindId) {
				let path = '/bet/'
				if(classId=='2'){
					path = '/hk6bet/'
				}
				let that = this;
				if(that.isLogin == false) {
					that.$dialog.toast({
						mes: '未登录',
						timeout: 1000,
						// icon: 'success'
					});
				} else {
					this.$http.get(this.global.baseUrl + '/inter/ticket/winsDragon/' + kindId, {
						timeout: 500
					}).then((res) => {
						this.cacheHistoryData(res.data)
						this.$router.push({
							path: path + classId + '/' + kindId,
						})
					}).catch((error) => {
						if(error.response) {} else if(error.request) {
							if(error.request.readyState == 4 && error.request.status == 0) {
								this.cacheHistoryData(null)
								this.$router.push({
									path: path + classId + '/' + kindId,
								})
							}
						} else {
							console.log('Error', error.message);
						}
					})
					if(JSON.parse(sessionStorage.getItem(kindId))){
						let obj = {};
						let kindList = JSON.parse(sessionStorage.getItem(kindId))
						kindList.forEach((item)=>{
							item.gameSons.forEach((item2)=>{
								obj[item2.subGameId] = item2.odd;
							})
							
						})
					}
					sessionStorage.setItem('classId', JSON.stringify(classId));
					sessionStorage.setItem('kindId', JSON.stringify(kindId));
					sessionStorage.setItem('prevPath', "/allKinds");
					// that.setClassId(classId)
					// that.setKindId(kindId)
					// that.$router.push({name:'bet'})

				}

			},
		},
		components: {
			Header,
			HeaderII,
			Footer
		}
	}
</script>

<style lang="less">
	.allKinds {
		height: 100%;
		width: 100%;
		background: url("../../../static/img/home/home_bg@2x.png") no-repeat;
		background-size: cover;
		box-sizing: border-box;
		color: #ffffff;
		flex-direction: column;
		font-size: 0.28rem;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		.allKinds_head {
			height: 1rem;
			width: 100%;
			box-sizing: border-box;
			padding: 0 0.15rem;
			margin-bottom: 0.07rem;
		}
		.allKinds_bottom {
			height: 1.2rem;
			width: 100%;
			box-sizing: border-box;
		}
		.allKinds_center {
			overflow: auto;
			.nav_A {
				width: 100%;
				height: 46%;
				margin-bottom: 3%;
				.nav_A_left {
					float: left;
					width: 35%;
					height: 100%;
					.nav_A_left_top {
						width: 100%;
						height: 69%;
						background: #015de6;
						margin-bottom: 11%;
						z-index: 0;
						position: relative;
						img {
							width: 75%;
							margin: 12.5%;
						}
						p {
							position: absolute;
							left: 0.15rem;
							bottom: 0.15rem;
						}
					}
					.nav_A_left_bot {
						width: 100%;
						height: 25%;
						background: #04b0c4;
						position: relative;
						img {
							height: 75%;
							float: right;
							margin: 0.15rem;
						}
						p {
							position: absolute;
							left: 0.15rem;
							bottom: 0.15rem;
						}
					}
				}
				.nav_A_right {
					float: right;
					width: 62%;
					height: 100%;
					background: url("../../../static/img/home/allKind/home_content_waittingperson@2x.png") no-repeat;
					background-size: cover;
				}
			}
			.nav_B {
				width: 100%;
				height: 22%;
				.nav_B_left {
					float: left;
					width: 65%;
					height: 100%;
					background: url("../../../static/img/home/allKind/home_content_bjsc@2x.png") no-repeat;
					background-size: cover;
					position: relative;
					div {
						position: absolute;
						left: 0.15rem;
						bottom: 0.15rem;
					}
				}
				.nav_B_right {
					float: right;
					width: 32%;
					height: 100%;
					background: #432887;
					position: relative;
					img {
						width: 60%;
						margin: 10% 10% 10% 20%;
					}
					p {
						position: absolute;
						left: 0.15rem;
						bottom: 0.15rem;
					}
				}
			}
			.nav_c {
				width: 100%;
				height: 25%;
				// background: #10bef1;
				margin-top: 0.22rem;
				.nav_c_left {
					float: left;
					width: 34%;
					height: 100%;
					margin-right: 4%;
					div {
						float: left;
						height: 45%;
						width: 45%;
						img {
							width: 90%;
							// height: 90%;
							margin: 25% 5%;
						}
					}
					.one {
						// background: #008f01;
						background: url("../../../static/img/home/allKind/ffc.png") no-repeat;
						background-size: cover;
						margin-right: 10%;
						margin-bottom: 10%;
					}
					.two {
						background: #bd4c4e;
						margin-bottom: 10%;
					}
					.therr {
						background: #10bef1;
						margin-right: 10%
					}
					.four {
						background: #565dc5;
					}
				}
				.nav_c_center {
					float: left;
					width: 34%;
					height: 100%;
					background: url("../../../static/img/home/allKind/home_content_pl3@2x.png") no-repeat;
					background-size: cover;
					position: relative;
					p {
						position: absolute;
						left: 0.15rem;
						bottom: 0.15rem;
					}
				}
				.nav_c_right {
					float: right;
					width: 24%;
					height: 100%;
					background: url('../../../static/img/home/allKind/more.png') no-repeat;
					background-size: cover;
				}
			}
		}
	}
</style>