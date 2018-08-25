<template>
	<div class="bet_view">
		<SscBet @resultData="getBetData" v-if="classId=='3'" :kindId="kindId" :classId="classId" :betDataList="betDataList" :subGameList="subGameList">

		</SscBet>
		<FtcBet @resultData="getBetData" v-else-if="classId=='1'" :kindId="kindId" :classId="classId" :betDataList="betDataList" :subGameList="subGameList">

		</FtcBet>
		<XuanFive @resultData="getBetData" v-else-if="classId=='5'" :kindId="kindId" :classId="classId" :betDataList="betDataList" :subGameList="subGameList">

		</XuanFive>
		<PkTen @resultData="getBetData" v-else-if="classId=='6'" :kindId="kindId" :classId="classId" :betDataList="betDataList" :subGameList="subGameList">

		</PkTen>
		<Ks @resultData="getBetData" v-else-if="classId=='4'" :kindId="kindId" :classId="classId" :betDataList="betDataList" :subGameList="subGameList" :standGameList2="standGameList2">

		</Ks>
	</div>
</template>
<script>
	import SscBet from './SSC.vue';
	import FtcBet from './FTC.vue';
	import XuanFive from './11X5.vue';
	import PkTen from './PK10.vue';
	import Ks from './K3.vue';
	export default {
		props: ["classId", 'kindId', 'betDataList','subGameList','standGameList2'],
		components: {
			SscBet,
			FtcBet,
			XuanFive,
			PkTen,
			Ks,
		},
		data() {
			return {}
		},
		created() {

		},
		mounted() {},
		computed: {},
		methods: {
			getBetData(data) {
				this.$emit('resultData', data)
			}
		},
		watch: {}
	}
</script>

<style lang="less">
	.betPanel {
		touch-action: none;
		position: absolute;
		z-index: 1;
		width: 100%;
		top: 2.8rem;
		bottom: 1rem;
		overflow: hidden;
		.sebo,
		.texiao {
			width: 0.6rem;
			height: 0.6rem;
			text-align: center;
			line-height: 0.6rem;
			font-size: 12px;
			color: #000000;
		}
		.sebo_item,
		.texiao_item {
			background: rgba(244, 234, 42, 0.5);
			text-shadow: rgba(255, 255, 255, 0.23) 0px 0px 0px;
			box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 5px inset;
		}
		/*北京赛车特殊面板样式*/
		.bet_list_pk10 {
			padding-bottom: 1rem;
			background: #FFFFFF;
			.top {
				width: 100%;
				height: 1.2rem;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #707070;
				justify-content: space-between;
				padding-left: 0.2rem;
				padding-right: 0.4rem;
				.badge {
					background-image: url(../../../../static/img/img_arrow_first.png);
					width: .8rem;
					height: .5rem;
					background-size: 100% 100%;
				}
				.yd-badge {
					padding: 0.16rem 0.28rem;
					border-radius: 5px;
					/*px*/
				}
				.inner {
					background-color: #FFF;
					width: .1rem;
					height: .1rem;
					background-color: rgb(202, 5, 0);
					position: absolute;
					left: .13rem;
					bottom: -0.05rem;
					transform: rotate(225deg);
				}
			}
			.bet_box {
				display: flex;
				flex-wrap: wrap;
				.bet_selected {
					width: .73rem;
					height: .8rem;
					padding: 0;
					line-height: .73rem;
					text-align: center;
					font-size: 16px;
					text-transform: uppercase;
					font-family: Arial;
					color: #fff;
					/*-webkit-border-radius: 50%;*/
					/*border: 1px solid #7b0e25;*/
					background: url(../../../../static/img/img_chose_ball.png);
					background-size: 100% 100%;
					/*background: #ca0500 -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(#ca0500), to(rgba(255, 255, 255, 0.6)));*/
					position: relative;
					margin: 0.3rem .17rem;
				}
				.bet_unchecked {
					width: .73rem;
					height: .8rem;
					padding: 0;
					line-height: .73rem;
					text-align: center;
					font-size: 16px;
					text-transform: uppercase;
					font-family: Arial;
					color: #ca0500;
					/*-webkit-border-radius: 50%;*/
					/*border: 1px solid #7b0e25;*/
					background: url(../../../../static/img/img_default_ball.png);
					background-size: 100% 100%;
					/*background: #ca0500 -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(#ca0500), to(rgba(255, 255, 255, 0.6)));*/
					position: relative;
					margin: 0.3rem .17rem;
				}
			}
		}
		/*快三样式*/
		.bet_list_ksSum {
			padding-bottom: 1rem;
			background: #FFFFFF;
			.top {
				width: 100%;
				height: 1rem;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #707070;
				justify-content: flex-start;
				padding-left: 0.2rem;
				padding-right: 0.4rem;
				.yd-badge {
					padding: 0.16rem 0.28rem;
					border-radius: 5px;
					margin-right: .4rem;
					/*px*/
				}
				.inner {
					background-color: #FFF;
					width: .1rem;
					height: .1rem;
					background-color: rgb(202, 5, 0);
					position: absolute;
					left: .13rem;
					bottom: -0.05rem;
					transform: rotate(225deg);
				}
			}
			.bet_box {
				margin-top: .1rem;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				.bet_ks_unchecked {
					width: 1.6rem;
					height: .8rem;
					padding: 0;
					text-align: center;
					font-size: 16px;
					border-radius: 4px;
					text-transform: uppercase;
					font-family: Arial;
					color: #000000;
					border: 1px solid #c0bfbb;
					background: #ffffff -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(ivory), to(rgba(255, 255, 255, 0.6)));
					position: relative;
					margin: 0.1rem;
					p:nth-child(1) {
						font-size: 16px;
						line-height: 24px;
					}
					p:nth-child(2) {
						color: #76736c;
						font-size: 12px;
					}
				}
				.bet_ks_selected {
					width: 1.6rem;
					height: .8rem;
					border-radius: 4px;
					padding: 0;
					text-align: center;
					font-size: 16px;
					text-transform: uppercase;
					font-family: Arial;
					color: #FFFFFF;
					border: 1px solid #d91d36;
					background: #d91d36;
					position: relative;
					margin: 0.1rem;
					p:nth-child(1) {
						font-size: 16px;
						line-height: 24px;
					}
					p:nth-child(2) {
						color: #FFFFFF;
						font-size: 12px;
					}
				}
			}
			.fast_select {
				margin-top: 0.2rem;
				margin-bottom: 1rem;
				p {
					font-size: 14px;
					text-align: center;
					color: #313131;
				}
				.quick_box {
					display: flex;
					width: 96%;
					margin-left: 2%;
					margin-top: .1rem;
					li {
						width: 1.78rem;
						height: .6rem;
						border: 1px solid #d7d7d9;
						line-height: .6rem;
						text-align: center;
						font-size: 12px;
						color: #313131;
					}
					li:nth-child(1) {
						border-left: 1px solid #CCCCCC;
						border-radius: 5px 0 0 5px;
					}
					li:nth-child(2),
					li:nth-child(3),
					li:nth-child(4) {
						border-left: none;
					}
					li:nth-child(4) {
						border-radius: 0px 5px 5px 0;
					}
				}
			}
		}
		/*常规样式*/
		.bet_list_routine {
			/*position: absolute;*/
			/*margin-top: 2.8rem;*/
			padding-bottom: 1rem;
			background: #FFFFFF;
			.bet_list_item {
				width: 100%;
				height: auto;
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				.top {
					width: 100%;
					height: 1.2rem;
					display: flex;
					align-items: center;
					border-bottom: 1px solid #707070;
					justify-content: space-between;
					padding-left: 0.2rem;
					padding-right: 0.4rem;
					.badge {
						background-image: url(../../../../static/img/img_arrow_first.png);
						width: .8rem;
						height: .5rem;
						background-size: 100% 100%;
					}
					.yd-badge {
						padding: 0.16rem 0.28rem;
						border-radius: 5px;
						/*px*/
					}
					.box {
						display: flex;
						li {
							padding: 0.10rem 0.28rem;
							/*border-radius: 5px;/*px*/
							border-bottom: 1px solid #CCCCCC;
							border-top: 1px solid #CCCCCC;
							border-right: 1px solid #CCCCCC;
						}
						li:nth-child(1) {
							border-left: 1px solid #CCCCCC;
							border-radius: 5px 0 0 5px;
						}
						li:nth-child(6) {
							border-radius: 0px 5px 5px 0;
						}
					}
				}
				.inner {
					background-color: #FFF;
					width: .1rem;
					height: .1rem;
					background-color: rgb(202, 5, 0);
					position: absolute;
					left: .13rem;
					bottom: -0.05rem;
					transform: rotate(225deg);
				}
			}
			.bet_selected {
				width: .73rem;
				height: .8rem;
				padding: 0;
				line-height: .73rem;
				text-align: center;
				font-size: 16px;
				text-transform: uppercase;
				font-family: Arial;
				color: #fff;
				/*-webkit-border-radius: 50%;*/
				/*border: 1px solid #7b0e25;*/
				background: url(../../../../static/img/img_chose_ball.png);
				background-size: 100% 100%;
				/*background: #ca0500 -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(#ca0500), to(rgba(255, 255, 255, 0.6)));*/
				position: relative;
				margin: 0.1rem .17rem;
			}
			.bet_unchecked_square {
				width: 2rem;
				height: 1.3rem;
				line-height: 1.2rem;
				padding: 0;
				text-align: center;
				font-size: 16px;
				text-transform: uppercase;
				font-family: Arial;
				color: #000000;
				border: 1px solid #c0bfbb;
				background: #ffffff -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(ivory), to(rgba(255, 255, 255, 0.6)));
				position: relative;
				margin: 0.25rem;
				border-radius: 4px;
				.btn_box_1 {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					img {
						width: .6rem;
						height: .6rem;
					}
				}
				.btn_box_2 {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					img {
						width: .6rem;
						height: .6rem;
					}
				}
				.btn_box_3 {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					img {
						width: .6rem;
						height: .6rem;
					}
				}
			}
			.bet_selected_square {
				width: 2rem;
				height: 1.3rem;
				padding: 0;
				text-align: center;
				line-height: 1.2rem;
				font-size: 16px;
				text-transform: uppercase;
				font-family: Arial;
				color: #FFFFFF;
				border: 1px solid #d91d36;
				background: #d91d36;
				position: relative;
				margin: 0.25rem;
				border-radius: 4px;
				.btn_box_1 {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					img {
						width: .6rem;
						height: .6rem;
					}
				}
				.btn_box_2 {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					img {
						width: .6rem;
						height: .6rem;
					}
				}
				.btn_box_3 {
					height: 100%;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					img {
						width: .6rem;
						height: .6rem;
					}
				}
			}
			.bet_unchecked {
				width: .73rem;
				height: .8rem;
				padding: 0;
				line-height: .73rem;
				text-align: center;
				font-size: 16px;
				text-transform: uppercase;
				font-family: Arial;
				color: #ca0500;
				/*-webkit-border-radius: 50%;*/
				/*border: 1px solid #7b0e25;*/
				background: url(../../../../static/img/img_default_ball.png);
				background-size: 100% 100%;
				/*background: #ca0500 -webkit-gradient(radial, 60 60, 60, 50 120, 0, from(#ca0500), to(rgba(255, 255, 255, 0.6)));*/
				position: relative;
				margin: 0.1rem .17rem;
			}
		}
		/*单式样式*/
		.bet_list_ds {
			textarea {
				width: 94%;
				margin: 0 3%;
				height: 5.5rem;
				border-radius: 4px;
			}
		}
		.info_ds {
			margin-top: .5rem;
			position: relative;
			padding: 0.1rem 0.2rem;
			background: #FFFFFF;
			/*box-sizing: border-box;
		border-bottom: 1px solid #CCCCCC;*/
			.left {
				width: 1rem;
				/*color: #666;*/
				img {}
			}
			.center {
				width: 5rem;
			}
			.right {
				width: 1.2rem;
				img {
					width: .8rem;
					height: 0.6rem;
				}
			}
		}
		.info {
			/*height: 1.52rem;*/
			display: flex;
			flex-direction: column;
			/*margin-top: 2.8rem;*/
			position: relative;
			padding: 0.1rem 0.2rem;
			background: #FFFFFF;
			/*box-sizing: border-box;
		border-bottom: 1px solid #CCCCCC;*/
			.top {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #666;
				font-size: 12px;
				img {
					width: .8rem;
					height: 0.73rem;
					margin-right: 0.2rem;
				}
			}
			.bottom {}
		}
	}
</style>