<template>
	<div class="redPacket">
		<yd-flexbox direction="vertical">
			<div class="redPacket_head">
				<Header v-if="this.isLogin == false"></Header>
				<HeaderII v-if="this.isLogin == true"></HeaderII>
			</div>
			<yd-flexbox-item class="redPacket_nav">
				<div ref="wrapper" class="wrapper">
					<div class="content">
						<div class="navlist" v-for="(item,indexI) in list">
							<h1>{{item.className}}</h1>
							<ul>
								<li :kindId="childList.kindId" :classId="list.classId" v-for="(childList,indexII) in list[indexI].kindList" @click="goBettingHall(childList.kindId,item.classId)">
									<img style="margin-top:0.2rem;margin-bottom:0.05rem" v-if="item.classId == 1" src="../../../static/img/home/allKind/ftc.png" alt="">
									<img style="margin-top:0.25rem;margin-bottom:0.1rem" v-if="item.classId == 3" src="../../../static/img/home/allKind/ssc.png" alt="">
									<img style="margin-top:0.25rem;margin-bottom:0.25rem" v-if="item.classId == 4" src="../../../static/img/home/allKind/ks.png" alt="">
									<img style="margin-top:0.37rem;margin-bottom:0.37rem" v-if="item.classId == 5" src="../../../static/img/home/allKind/11×5.png" alt="">
									<img style="margin-top:0.35rem;margin-bottom:0.35rem" v-if="item.classId == 6" src="../../../static/img/home/allKind/pk10.png" alt="">
									<img style="margin-top: 0.1rem;margin-bottom: 0.05rem;" v-if="item.classId == 2" src="../../../static/img/home/allKind/hk6.png" alt="">
									<span>{{childList.kindName}}</span>
								</li>
							</ul>
						</div>

					</div>
				</div>

				<!-- <div class="redPacket_nav"> -->
				<!-- <div class="activity" v-if="isLogin == false" >
          <img class="img" src="../../../static/img/home/yhhd_01.png" alt="" @click="activity_details('')" >
        </div>
        <div class="activity" v-if="isLogin == false" >
          <img class="img" src="../../../static/img/home/yhhd_02.png" alt="" @click="activity_details('')" >
        </div>
        <div class="activity" v-if="isLogin == false" >
          <img class="img" src="../../../static/img/home/yhhd_03.png" alt="" @click="activity_details('')" >
        </div> -->

				<!-- <div class="activity" v-for="(item,index) in activityList" >
          <img class="img" :src="item.documentImageNewname" alt="" @click="activity_details(index)"> -->
				<!-- <img class="img" src="http://202.153.198.80/upload/20171202174109134.jpg" alt="" @click="activity_details(index)"> -->
				<!-- <div class="activities" v-show="show && idx == index">
            <div v-html="item.documentConetnt" class="activity_text">{{item.documentConetnt}}</div>
            <div >
              <yd-button type="danger" @click.native="toPash('/recharge/companyIncome')">参加活动</yd-button>
            </div>
          </div>
        </div> -->

				<!-- <div class="one">
          <div @click="toPash('/createRoom')">
            <img src="../../../static/img/home/home_content_create_a_room_@2x.png" alt="">
            <p>创建房间</p>
          </div>
          <div class="one_img">
            <img  src="../../../static/img/home/home_content_fast_join_@2x.png" alt="">
            <p>快速加入</p>
          </div>
        </div>
        <div class="two">
          <div class="two_img">
            <img  src="../../../static/img/home/home_content_solitaire_@2x.png" alt="">
            <p>红包接龙</p>
          </div>
          <div @click="toPash()">
            <p>红包游戏</p>
            <img src="../../../static/img/home/home_content_game@2x.png" alt="">
          </div>
        </div>
        <div class="three">
          <div @click="toPash()">
            <img src="../../../static/img/home/home_content_fa_@2x.png" alt="">
            <p>可发可抢</p>
          </div>
          <div class="right" @click="toPash()">
            <img src="../../../static/img/home/home_centent_qiang_@2x.png" alt="">
            <p>可发禁抢</p>
          </div>
        </div> -->
			</yd-flexbox-item>
			<!-- </div> -->
			<div class="redPacket_bottom">
				<Footer></Footer>
			</div>
		</yd-flexbox>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll';
	import Header from '../home/dome/home_head.vue'
	import HeaderII from '../home/dome/home_headII.vue';
	import Footer from '../home/dome/home_foot.vue'
	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		data() {
			return {
				msg: '',
				show: false,
				idx: '',
				list: []
			}
		},
		created() {
			this.list = this.kindList;
			if(this.list.length == 0 ){
				this.kind().then(res => {
					this.list = this.kindList;
				});
			}else{
				this.list = this.kindList;
			}
			// this._queryDocumentContentList();
			// console.log(this.activityDocumentList,'000')

		},
		mounted() {
			this.$nextTick(() => {
				let scroll = new Bscroll(this.$refs.wrapper, {
					scrollbars: true,
					listenX: true,
					click: true,
				})
				scroll.on('scrollEnd', this.scrollEnd);
				scroll.on('scrollStart', this.scrollStart);
			})
		},
		computed: {
			...mapState([
				'isLogin'
			]),
			...mapState('home', [
				'kindList'
			]),
			// ...mapState('activity', ["activityDocumentList"]),
		},
		// computed: mapState('activity',["activityDocumentList"]),
		methods: {
			...mapMutations('bet', [
				"setClassId",
				"setKindId",
				'cacheHistoryData'
			]),
			...mapActions('activity', [
				'queryDocumentContentList'
			]),
			...mapActions('home', [
				'kind'
			]),
			// _queryDocumentContentList() {
			// 	this.queryDocumentContentList().then(res => {
			// 		this.activityList = this.activityDocumentList.data;
			// 	})
			// },
			activity_details(index) {
				// console.log(index);
				if(this.isLogin == false) {
					this.$dialog.toast({
						mes: '未登录',
						timeout: 1000,
						// icon: 'success'
					});
				} else {
					if(this.idx == index) {
						this.idx = index;
						this.show = !this.show;
					} else if(this.idx != index) {
						this.idx = index;
						for(var i = 0; i <= this.activityList.length; i++) {
							if(i == index) {
								this.idx = index;
								this.show = true;
							}
						}
					}
				}
			},
			toPash(name) {
				if(this.isLogin == false) {
					this.$dialog.toast({
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
			//跳转到相应的投注页面
			goBettingHall(kindId,classId) {
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
					sessionStorage.setItem('classId', JSON.stringify(classId));
					sessionStorage.setItem('kindId', JSON.stringify(kindId));
					sessionStorage.setItem('prevPath', "/redPacket");
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
		},
		watch: {

		}
	}
</script>

<style lang="less">
	.redPacket {
		height: 100%;
		width: 100%;
		background: url("../../../static/img/home/home_bg@2x.png") no-repeat;
		background-size: cover;
		box-sizing: border-box;
		color: #c5cad0;
		font-size: 0.28rem;
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		.wrapper {
			position: absolute;
			top: 1rem;
			bottom: 1.2rem;
			overflow: hidden;
			width: 100%
		}
		.redPacket_head {
			height: 1rem;
			width: 100%;
			box-sizing: border-box;
			padding: 0 0.15rem;
			margin-bottom: 0.07rem;
		}
		.redPacket_bottom {
			height: 1.2rem;
			width: 100%;
			box-sizing: border-box;
			opacity: 1;
			.redPacket_bottom_item {
				height: 1.2rem;
				box-sizing: border-box;
				padding: 0.08rem 0.1rem;
				color: #ffffff;
				opacity: 0.7;
				img {
					width: 0.8rem;
					margin-left: 55%;
				}
				div {
					text-align: left;
				}
			}
		}
	}
	
	.active {
		opacity: 1 !important;
	}
	
	.redPacket_nav {
		height: 100%;
		text-align: center;
		color: #ffffff;
		overflow: hidden;
		div {
			margin-bottom: 3%;
		}
		.one {
			height: 45%;
			div {
				float: left;
				width: 33%;
				/*background-color: #3b5999;*/
				height: 100%;
				position: relative;
				img {
					position: absolute;
					left: 0;
					bottom: 0;
					width: 100%;
					height: 100%;
				}
				p {
					position: absolute;
					left: 0.2rem;
					bottom: 0;
					font-size: 0.28rem;
					height: 12%;
					z-index: 10;
				}
			}
			.one_img {
				float: right;
				width: 63%;
				height: 100%;
				img {
					width: 100%;
					height: 100%;
				}
			}
		}
		.two {
			height: 23%;
			div {
				float: right;
				width: 32%;
				height: 100%;
				background-color: #db7521;
				position: relative;
				img {
					position: absolute;
					right: 0.6rem;
					top: 0.7rem;
					width: 1rem;
					height: 1rem;
				}
				p {
					position: absolute;
					left: 0.2rem;
					bottom: 0.15rem;
					font-size: 0.28rem;
					height: 12%;
					z-index: 10;
				}
			}
			.two_img {
				float: left;
				width: 64%;
				height: 100%;
				background: #409aa3;
				img {
					width: 2.2rem;
					height: 1.2rem;
					right: 0.4rem;
				}
			}
		}
		.three {
			height: 23%;
			width: 100%;
			div {
				float: left;
				height: 100%;
				width: 48%;
				background-color: #565dc5;
				position: relative;
				img {
					position: absolute;
					top: 0.6rem;
					right: 0.5rem;
					width: 1rem;
				}
				p {
					position: absolute;
					left: 0.2rem;
					bottom: 0.1rem;
					text-align: left;
					color: #ffffff;
					font-size: 0.3rem;
				}
			}
			.right {
				float: right;
				background: #e16160;
			}
		}
		.activity {
			width: 100%;
			margin-bottom: 0.2rem;
			// background: #ffffff;
			color: #fff;
			padding: 0;
			// margin: 0;
			.activity_text {
				text-align: left;
				box-sizing: border-box;
				padding: 0.2rem;
			}
			.img {
				display: block;
				height: 2.5rem;
				width: 100%;
				padding: 0;
				margin: 0;
			}
			.activities {
				width: 100%;
				box-sizing: border-box;
				padding: 0.15rem;
				margin: 0;
				background: rgba(255, 255, 255, 0.05);
				.redPacket_nav {
					div {
						margin-bottom: 0;
					}
				}
			}
		}
		.navlist {
			padding: 0.05rem 0.25rem;
			// position: absolute;
		}
		.navlist h1 {
			text-align: left;
			padding: 0.2rem 0;
			color: #ffffff;
			font-size: 0.28rem;
		}
		.navlist ul {
			display: -webkit-flex;
			/* Safari */
			flex-wrap: wrap;
			display: flex;
			pad: 0.1rem 0.2rem;
			box-sizing: border-box;
		}
		.navlist ul li {
			flex-direction: column-reverse;
			width: 23%;
			height: 1.7rem;
			background: #489cff;
			margin: 1%;
			/* margin-bottom: 2% */
		}
		.navlist ul li img {
			display: block;
			margin: auto;
			width: 65%;
		}
		.navlist ul li:nth-child(6n+1) {
			background: #0094ff;
		}
		.navlist ul li:nth-child(6n+2) {
			background: #ff2121;
		}
		.navlist ul li:nth-child(6n+3) {
			background: #00ae8b;
		}
		.navlist ul li:nth-child(6n+4) {
			background: #e82cfe;
		}
		.navlist ul li:nth-child(6n+5) {
			background: #ffa31f;
		}
		.navlist ul li:nth-child(6n+6) {
			background: #ff5400;
		}
	}
</style>