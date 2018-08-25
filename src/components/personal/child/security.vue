<template>
	<div class="security">
		<yd-navbar :title="title[swiperIndex]">
			<!-- <router-link to="/home" slot="left"> -->
			<yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
			<!-- </router-link> -->
		</yd-navbar>
		<div class="security_main">
			<swiper :options="swiperOption" ref="swiper">
				<swiper-slide>
					<img src="../../../../static/img/Modify-the-login-password-@2x.png" />
					<div>
						<img src="../../../../static/img/home/home_content_Login_password_@2x.png" alt="">
						<p>登录密码</p>
					</div>
				</swiper-slide>
				<swiper-slide>
					<img src="../../../../static/img/Amend-the-capital-cipher-@2x.png" />
					<div>
						<img src="../../../../static/img/home/home_content_Capital_cipher_@2x.png" alt="">
						<p>资金密码</p>
					</div>
				</swiper-slide>
				<swiper-slide>
					<img src="../../../../static/img/Setting_security_issues_@2x.png" />
					<div>
						<img src="../../../../static/img/home/home_content_safety_problem_@2x.png" alt="">
						<p>安全问题</p>
					</div>
				</swiper-slide>
				
				<div class="swiper-pagination" slot="pagination"></div>
			</swiper>
			<div class="safety_problem" v-if="swiperIndex==0||swiperIndex==3">
				<h1 class="title">修改登录密码</h1>
				<yd-cell-group>
					<yd-cell-item>
						<yd-input slot="right" type="password" v-model="log_password_old" placeholder="输入旧登录密码"></yd-input>
					</yd-cell-item>
					<yd-cell-item>
						<yd-input slot="right" type="password" v-model="log_password_newI" placeholder="请输入新登录密码"></yd-input>
					</yd-cell-item>
					<yd-cell-item>
						<yd-input slot="right" type="password" v-model="log_password_newII" placeholder="请再次输入新登录密码"></yd-input>
					</yd-cell-item>
				</yd-cell-group>
				<p class="security_prompt">建议您使用数字和字母组合，最好是8位数以上</p>
				<yd-button size="large" type="danger" @click.native="_updateLoginPassword">确认修改</yd-button>
			</div>
			<div class="capital_cipher" v-else-if="swiperIndex==1">
				<h1 class="title">修改资金密码</h1>
				<yd-cell-group>
					<yd-cell-item>
						<yd-input slot="right" type="password" v-model="money_password_old" placeholder="输入旧资金密码"></yd-input>
					</yd-cell-item>
					<yd-cell-item>
						<yd-input slot="right" type="password" v-model="money_password_newI" placeholder="请输入新资金密码"></yd-input>
					</yd-cell-item>
					<yd-cell-item>
						<yd-input slot="right" type="password" v-model="money_password_newII" placeholder="请输入新资金密码"></yd-input>
					</yd-cell-item>
				</yd-cell-group>
				<p class="security_prompt">建议您使用数字和字母组合，最好是8位数以上</p>
				<yd-button size="large" type="danger" @click.native="_updateTradePassword">确认修改</yd-button>
			</div>
			<div class="login_password" v-else>
				<h1 class="title">请设置安全问题</h1>
				<yd-cell-group>
					<yd-cell-item arrow type="label">
						<select slot="right" v-model="security_problem">
							<option value="">请选择安全问题</option>
							<option :value=item[1] v-for="(item,index) in SecurityQuestion" :key="index">{{item[0]}}</option>
						</select>
					</yd-cell-item>
					<yd-cell-item>
						<yd-input slot="right" type="text" v-model="security_answer" placeholder="安全问题答案"></yd-input>
					</yd-cell-item>
				</yd-cell-group>
				<yd-button size="large" type="danger" @click.native="_saveSafeQuestionList">保存</yd-button>
			</div>
		</div>

	</div>
</template>
<script>
	import 'swiper/dist/css/swiper.css'
	import { swiper, swiperSlide } from 'vue-awesome-swiper'
	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		components: {
			swiper,
			swiperSlide
		},
		mounted(){
			
			if(this.$router.history.current.query.id*1==0){
				this.swiperIndex = 3
			}else{
				this.swiperIndex = this.$router.history.current.query.id*1;
			}
			this.$refs.swiper.swiper.activeIndex = this.swiperIndex
		},
		data() {
			let that = this;
			return {
				title: ["登录密码", "资金密码", "安全问题","登录密码",],
				swiperIndex: 1,
				swiperOption: {
					effect: 'coverflow',
					grabCursor: true,
					centeredSlides: true,
					slidesPerView: 'auto',
					loop: true,
					slideToClickedSlide: true,
					coverflowEffect: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: true
					},
					pagination: {
						el: '.swiper-pagination',
						dynamicBullets: true,
					},
					on: {
						slideChangeTransitionEnd: function() {
							that.swiperIndex = this.activeIndex % 3;
						},
					}
				},
				SecurityQuestion: [
					[
						"您的母亲姓名是？",
						"1"
					],
					[
						"您配偶的生日是？",
						"2"
					],
					[
						"您的学号()或工号是？",
						"3"
					],
					[
						"您母亲的生日是？",
						"4"
					],
					[
						"您高中班主任的姓名是？",
						"5"
					],
					[
						"您父亲的姓名是？",
						"6"
					],
					[
						"您小学班主任的姓名是？",
						"7"
					],
					[
						"您父亲的生日是？",
						"8"
					],
					[
						"您配偶的姓名是？",
						"9"
					],
					[
						"您初中班主任的姓名是？",
						"10"
					],
					[
						"您最熟悉的童年好友姓名是？",
						"11"
					],
					[
						"您最熟悉的学校宿舍室友姓名是？",
						"12"
					],
					[
						"对您影响最大的人的姓名是？",
						"13"
					]
				],
				//登录密码
				log_password_old: '',
				log_password_newI: '',
				log_password_newII: '',
				// 资金密码
				money_password_old: '',
				money_password_newI: '',
				money_password_newII: '',
				// 安全问题
				
				security_problem: '',
				security_answer: ''
			}
		},
		methods: {
			...mapActions([
				'updateLoginPassword',
				'signOut',
				'updateTradePassword',
				'saveSafeQuestion'
			]),
			...mapMutations([
				'updateLoginPasswordList'
			]),
			// 修改登录密码
			_updateLoginPassword() {
				let that = this;
				let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
				if(that.log_password_old == '') {
					that.$dialog.alert({
						mes: '请输入旧密码进行修改操作'
					});
				} else if(that.log_password_newI == '') {
					that.$dialog.alert({
						mes: '请输入新密码进行修改操作'
					});
				} else if(!reg.test(that.log_password_newI)) {
					that.$dialog.alert({
						mes: '请填写新登录密码。密码6-20位，至少包含数字和字母'
					});
				} else if(that.log_password_newII != that.log_password_newI) {
					that.$dialog.alert({
						mes: '您两次输入的新密码必须相同，请重新输入！'
					});
				} else {
					this.updateLoginPassword({
						oldPassword: hex_md5(that.log_password_old),
						newPassword: hex_md5(that.log_password_newI)
					}).then(res => {
						if(res.code === 0) {
							that.$dialog.alert({
								mes: res.msg
							});
							that.outLonin()
						} else {
							that.$dialog.alert({
								mes: res.msg
							});
							that.empty_input()
						}
					})
				}
			},
			// 修改资金密码
			_updateTradePassword() {
				let that = this;
				let reg = /(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
				if(that.money_password_old == '') {
					that.$dialog.alert({
						mes: '请输入旧资金密码进行修改操作'
					});
				} else if(that.money_password_newI == '') {
					that.$dialog.alert({
						mes: '请输入新资金密码进行修改操作'
					});
				} else if(!reg.test(that.money_password_newI)) {
					that.$dialog.alert({
						mes: '请填写新资金密码。密码6-20位，至少包含数字和字母'
					});
				} else if(that.money_password_newI != that.money_password_newII) {
					that.$dialog.alert({
						mes: '您两次输入的新密码必须相同，请重新输入！'
					});
				} else {
					this.updateTradePassword({
						oldPassword: hex_md5(that.money_password_old),
						newPassword: hex_md5(that.money_password_newI)
					}).then(res => {
						if(res.code === 0) {
							that.$dialog.alert({
								mes: res.msg
							});
						} else {
							that.$dialog.alert({
								mes: res.msg
							});
						}
						that.empty_input()
					})
				}
			},
			// 保存安全问题
			_saveSafeQuestionList() {
				let that = this;
				console.log(that.security_problem);
				console.log(that.security_answer);
				if(that.security_problem == '') {
					that.$dialog.alert({
						mes: '请选择安全问题'
					});
				} else if(that.security_answer == '') {
					that.$dialog.alert({
						mes: '请填写你的安全问题答案'
					});
				} else {
					this.saveSafeQuestion({
						safeQuestion: that.security_problem,
						safeQuestionAnswer: that.security_answer
					}).then(res => {
						if(res.code === 0) {
							that.$dialog.alert({
								mes: res.msg
							});
						} else {
							that.$dialog.alert({
								mes: res.msg
							});
						}
						that.empty_input()
					})
				}

			},
			// 登出
			outLonin() {
				this.signOut().then((res) => {
					if(res.code === 0) {
						this.$router.push({
							path: '/login'
						})
					}
				})
			},
			// 清空输入框
			empty_input() {
				//登录密码
				this.log_password_old = '';
				this.log_password_newI = '';
				this.log_password_newII = '';
				// 资金密码
				this.money_password_old = '';
				this.money_password_newI = '';
				this.money_password_newII = '';
				this.security_answer = ''
			}
		},
		watch: {
			
		}
	}
</script>

<style lang="less">
	.security {
		font-size: 0.28rem;
		height: 100%;
		display: flex;
		flex-direction: column;
		.yd-navbar {
			background: #011935 !important;
			/*background: linear-gradient(0, #272a32, #4b4e58)!important;*/
			color: #FFFFFF;
			.yd-back-icon:before,
			.yd-navbar-center-title {
				color: #FFFFFF !important;
			}
		}
		.security_main {
			padding-top: 1rem;
			overflow: auto;
    		flex: 1;
			.title {
				text-align: left;
				padding-left: 0.2rem;
				margin: 0.3rem 0;
			}
			.security_prompt {
				color: rgba(0, 0, 0, .5);
				// font-size: 8px;
				/*px*/
				text-align: left;
				padding-left: 0.2rem;
			}
			.yd-cell-box {
				margin-bottom: .15rem;
			}
			.swiper-slide {
				position: relative;
				background-position: center;
				background-size: cover;
				width: 250px;
				height: 200px;
				img {
					display: block;
					width: 250px;
					height: 200px;
				}
				div {
					position: absolute;
					left: 0.25rem;
					bottom: 0.25rem;
					width: 2rem;
					height: 0.77rem;
					z-index: 10;
					color: #ffffff;
					img {
						width: 0.4rem;
						height: 0.45rem;
					}
					p {
						font-size: 0.32rem;
					}
				}
			}
		}
	}
</style>