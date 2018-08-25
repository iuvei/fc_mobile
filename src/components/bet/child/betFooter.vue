<template>
	<div style="position: fixed;bottom: 0;left: 0;width: 100%;z-index:1002;" class="box_footer">
		<yd-popup v-model="showHelp" position="center" width="90%">
			<div style="" v-if="subGameList.length!=0">
				<div style="padding: 0.2rem;background-color:#fff;color: #000000;display: flex;border-radius: 4px 4px 0 0;height: .6rem;align-items: center;line-height: .6rem;justify-content: space-between;">
					<div style="text-align: left;font-size: 16px;">
						玩法说明
					</div>
					<img style="width:.3rem;height: 0.3rem;" @click="showHelp=false" src="../../../../static/img/img_delete.png" />
				</div>
				<div style="background: #FFFFFF;padding: 0.2rem;font-size: 12px;">
					{{subGameList[0].gameTip}}
				</div>
				<div style="background: #FFFFFF;padding: 0.2rem;font-size: 12px;border-radius: 0 0 4px 4px">
					<div>{{subGameList[0].gameCase}}</div>
				</div>

			</div>
		</yd-popup>
		<yd-popup v-model="show_title" position="center" width="90%" :close-on-masker="false" class="bet_ts_modal">
			<div class="bet_ts">
				<div class="header">
					下单提示
				</div>
				<div class="conent">
					<div class="item"><span>倍数：</span>
						<div class="input" style="border-radius: 4px;" @click="showKeyBoard('keyboard3')" ref="keyboard3">{{inputValue}}<i v-if="option.show" class="typing-cursor">|</i></div>
					</div>
					<div class="item"><span>单位：</span>
						<yd-radio-group v-model="unitPrice" color="#db1931" size="14">
							<yd-radio val="1">元</yd-radio>
							<yd-radio val="0.1">角</yd-radio>
							<yd-radio val="0.01">分</yd-radio>
						</yd-radio-group>
					</div>
					<div class="item" style="display: block;text-align: center;height: auto;">
						<p style="padding: .1rem 0;">共<span style="color:rgb(217, 28, 50);margin: 0.1rem;">{{ticketCount}}</span>注</p>
						<p>投注<span style="color:rgb(217, 28, 50);margin: 0.1rem;">{{orderOption.totalPrice}}</span>元</p>
					</div>

				</div>
				<div class="footer">
					<yd-button type="warning" style="width: 1rem;" @click.native="show_title=false">取消</yd-button>
					<yd-button style="background: #d91c32;width: 1rem;" @click.native="goBuyColorBasket">提交</yd-button>
				</div>
			</div>
		</yd-popup>
		<yd-popup v-model="show3" position="center" width="90%" :close-on-masker="false">
			<div>
				<div class="header">
					设置
					<img @click="show3=false" src="../../../../static/img/cha.png" />
				</div>
				<div class="conent">
					<div class="item"><span>单位：</span>
						<yd-radio-group v-model="unitPrice" color="#db1931" size="14">
							<yd-radio val="1">元</yd-radio>
							<yd-radio val="0.1">角</yd-radio>
							<yd-radio val="0.01">分</yd-radio>
						</yd-radio-group>
					</div>
					<div class="item"><span>倍数：</span>
						<div class="input" style="border-radius: 4px;" @click="showKeyBoard('keyboard1')" ref="keyboard1">{{inputValue}}<i v-if="option.show" class="typing-cursor">|</i></div>
					</div>
					<div class="item"><span>下单提示：</span>
						<yd-radio-group color="#db1931" size="14" v-model="orderPrompt">
							<yd-radio val="true">开</yd-radio>
							<yd-radio val="false">关</yd-radio>
						</yd-radio-group>
					</div>
				</div>
				<div class="footer">
					<yd-button type="warning" @click.native="init">恢复默认</yd-button>
					<yd-button type="danger" @click.native="show3=false">确认</yd-button>
				</div>
			</div>
		</yd-popup>

		<orderView :option="orderOption" :newNumbers = "newNumbers" :inputValue="inputValue" :unitPrice="unitPrice"></orderView>

		<div class="bet_footer">
			<yd-button bgcolor="#858585" color="#FFF" @click.native="clearStyle">清空</yd-button>
			<div style="display: flex;align-items: center;">
				<div class="company" @click="setUp" v-if="unitPrice=='1'">元</div>
				<div class="company" @click="setUp" v-else-if="unitPrice=='0.1'">角</div>
				<div class="company" @click="setUp" v-else>分</div>
				<!--<p ref="keyboard"  class="input" @click="showKeyBoard" flex="cross:center main:center" class="multiple"><span >{{inputValue}}</span> <i  class="typing-cursor">|</i></p>-->
				<div class="input" @click="showKeyBoard('keyboard')" ref="keyboard">{{inputValue}}<i v-if="option.show" class="typing-cursor">|</i></div>
				<span style="color: #FFFFFF;font-size: 14px;">倍</span>
			</div>
			<yd-button @click.native="quickBets" :bgcolor="ticketCount<1?'#cccccc':'#04be02'" color="#FFF" :disabled="ticketCount<1?true:false">快捷投注</yd-button>
			<yd-button class="bet_btn" :bgcolor="ticketCount<1&&lotteryData.length==0?'#cccccc':'#d91d36'" color="#FFF" @click.native="bet" :disabled="ticketCount<1&&lotteryData.length==0?true:false">{{lotteryData.length==0||ticketCount!=0?'投注':'购物车'}}
				<yd-badge v-if="lotteryData.length>0" style="color:#000000;position: absolute;top: -0.1rem;right: -0.1rem;">{{lotteryData.length}}</yd-badge>
			</yd-button>
		</div>
		<keyboard :option="option" @keyVal="getInputValue" @keyValQk="qkInputValue"></keyboard>
	</div>
</template>

<script>
	import { bus } from "../bus.js";
	import { mapState, mapMutations, mapActions } from "vuex";
	import orderView from './order_view.vue';
	import { getLotteryData, quickBets } from "../bet.js";
	export default {
		props:["kindId",'ticketCount','newNumbers','classId','subGameList'],
		components: {
			orderView
		},
		data() {
			return {
				orderOption: {
					ticketCount: 0,
					totalPrice: 0,
				},
				option: {
					show: false,
					sourceDom: ''
				},
				inputValue: '1',
				show3: false,
				unitPrice: "1",
				radio2: "1分",
				show_title: false,
				orderPrompt: 'true',
				currentOrder: [],
				noClick: false,
				showHelp: false,
			}
		},
		created() {
			bus.$on("showHelp", () => {
				this.showHelp = true
			})
			this.orderOption.unitPrice = this.unitPrice;
			this.orderOption.ticketCount = this.ticketCount;

		},
		computed: {
			...mapState('bet', [
				'leftName',
				'rightName',
				'subGameId',
				'betDataList',
				'currentAwarPeriod',
				'lotteryData',
			])
		},
		methods: {
			...mapActions('bet', [
				"quickBet"
			]),
			...mapActions('login', [
				"getUserDetails"
			]),
			...mapMutations('bet', [
				"saveLotteryData",
			]),
			init() {
				this.unitPrice = '1';
				this.inputValue = '1';
				this.orderPrompt = 'true';
			},
			showKeyBoard(evt) {
				this.option.show = true;
				this.$set(this.option, 'sourceDom', this.$refs[evt])
			},
			getInputValue(val) {
				if(val === 'delete') {
					this.inputValue = this.inputValue.slice(0, this.inputValue.length - 1)
				} else if(val === 'close') {
					this.inputValue == '' || this.inputValue * 1 < 1 ? this.inputValue = '1' : null;
					this.option.show = false;
				} else if(val === 'clear') {
					this.inputValue = '';
				} else {
					if(this.inputValue.length > 4) {
						this.$dialog.toast({
							mes: '最多只能输入5位数',
							timeout: 1500
						});
						return false
					}

					this.inputValue += val
				}
			},
			qkInputValue(val) {
				this.inputValue = val;
			},
			setUp() {
				this.show3 = true;
			},
			bet() {
 
				if(this.orderPrompt == 'true') {
					if(this.lotteryData.length != 0 && this.ticketCount == 0) {
						this.show_title = false;
						this.$router.push({
							name: "buyColorBasket"
						})
					} else {
						this.show_title = true
					}

				} else {
					this.show_title = false
					this.getLotteryData()
					this.$router.push({
						name: "buyColorBasket"
					})

				}

			},
			quickBets() {
				if(this.noClick){
					return false;
				}
				this.noClick = true
				let data = {};
				data.leftName = this.leftName;
				data.rightName = this.rightName;
				data.subGameId = this.subGameId;
				data.totalPrice = this.orderOption.totalPrice;
				data.price = this.inputValue * 1;
				data.unite = this.unitPrice;
				data.subGameList = this.subGameList;
				data.kindId = this.kindId;
				data.newNumbers = this.newNumbers;
				data.ticketCount = this.ticketCount;
				data.betDataList = this.betDataList;
				data.periodNo = this.currentAwarPeriod;
				let lotteryData = getLotteryData(data, [], '0');
				this.currentOrder = lotteryData;
				let params = quickBets({
					lotteryData: this.currentOrder,
					kindId: this.kindId,
					orderFrom: "1",
					orderType: "0",
					periodNo: this.currentAwarPeriod
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
						if(!this.betDataList.inputFormat){
							this.$emit('initStyle')
						}else{
							this.$emit('initStyle')
							this.clearStyle()
						}
						
						this.currentOrder = []
					} else {
						this.$dialog.toast({
							mes: '下注失败！ ' + res.msg,
							timeout: 1500,
							icon: 'error',

						});
					}
				})
			},
			goBuyColorBasket() {
				this.getLotteryData()
				this.$router.push({
					path:"/buyColorBasket/"+this.classId+'/'+this.kindId,
					
				})
			},
			getLotteryData() {
				let data = {};
				data.leftName = this.leftName;
				data.rightName = this.rightName;
				data.subGameId = this.subGameId;
				data.totalPrice = this.orderOption.totalPrice;
				data.price = this.inputValue * 1;
				data.unite = this.unitPrice;
				data.subGameList = this.subGameList;
				data.kindId = this.kindId;
				data.newNumbers = this.newNumbers;
				data.ticketCount = this.ticketCount;
				data.betDataList = this.betDataList;
				data.periodNo = this.currentAwarPeriod;
				let lotteryData = getLotteryData(data, [], '0');
				lotteryData = this.lotteryData.concat(lotteryData)
				this.saveLotteryData(lotteryData)
			},
			clearStyle() {
				if(this.betDataList.inputFormat){
					bus.$emit('initTxt')
					this.$emit('initStyle')
				}else{
					this.$emit('initStyle')
				}
			},
		},
		watch: {
			unitPrice() {
				this.orderOption.unitPrice = this.unitPrice;
				this.orderOption.totalPrice = this.unitPrice * this.ticketCount * this.inputValue
			},
			ticketCount() {
				this.orderOption.ticketCount = this.ticketCount;
				this.orderOption.totalPrice = this.unitPrice * this.ticketCount * this.inputValue
			},
			inputValue() {
				this.orderOption.totalPrice = this.unitPrice * this.ticketCount * this.inputValue
			},
			kindId(){
				this.saveLotteryData([])
			}

		}
	}
</script>

<style lang="less">
	.box_footer {
		.bet_footer {
			/*position: fixed;*/
			width: 100%;
			padding: 0 0.2rem;
			min-height: 1rem;
			height: auto;
			display: flex;
			background: #011935 !important;
			justify-content: space-between;
			align-items: center;
			.yd-btn {
				padding: 0 0.3rem !important;
			}
			.bet_btn {
				padding: 0 0.5rem !important;
			}
			.company {
				width: .6rem;
				height: .6rem;
				text-align: center;
				line-height: .6rem;
				color: #ffffff;
				background: url(../../../../static/img/img_setting_special.png);
				background-size: .6rem .6rem;
			}
			.input {
				width: 1.2rem;
				height: 0.6rem;
				line-height: 0.6rem;
				font-size: 14px;
				background: #F0F0F0;
				border: 1px solid #ddd;
				margin: 0 0.1rem;
			}
			.input:empty::before {
				content: attr(placeholder);
			}
			.typing-cursor {
				opacity: 1;
				font-weight: bold;
				-webkit-animation: blink 0.7s infinite;
				animation: blink 0.7s infinite;
			}
		}
		.yd-popup-center {
			width: 5rem !important;
			.header {
				position: relative;
				margin: 0 auto;
				width: 5rem;
				height: .7rem;
				background: #011935;
				border-radius: 4px 4px 0 0;
				color: #FFFFFF;
				line-height: .7rem;
				text-align: center;
				font-size: 16px;
				img {
					position: absolute;
					width: 0.3rem;
					height: 0.3rem;
					top: 0.2rem;
					right: 0.15rem
				}
			}
			.conent {
				.item {
					background: #FFFFFF;
					height: .8rem;
					display: flex;
					border-bottom: 1px solid #bfbfbf;
					font-size: 14px;
					display: flex;
					align-items: center;
					padding: 0 0.2rem;
					.input {
						width: 1.2rem;
						height: 0.6rem;
						line-height: 0.6rem;
						font-size: 14px;
						background: #F0F0F0;
						border: 1px solid #ddd;
						margin: 0 0.1rem;
					}
					.input:empty::before {
						content: attr(placeholder);
					}
					.typing-cursor {
						opacity: 1;
						font-weight: bold;
						-webkit-animation: blink 0.7s infinite;
						animation: blink 0.7s infinite;
					}
				}
			}
			.footer {
				background: #FFFFFF;
				height: 1rem;
				border-radius: 0 0 4px 4px;
				display: flex;
				justify-content: space-around;
				align-items: center;
				.yd-btn {
					width: 1rem;
				}
			}
		}
	}
</style>