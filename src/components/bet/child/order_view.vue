<template>
	<transition name="fade2">
		<div class="order" v-if="option.ticketCount>0">
			<div v-if="odd!=''&&odd!=null" style="display: flex;justify-content: center;flex-direction: column;">
				<p style="text-align: center;">当前玩法赔率为{{odd}}，共选择{{option.ticketCount}}注</p>
				<p>投注{{Math.round(option.totalPrice*100)/100}}元，可中奖{{winAmount}}元，最多盈利{{profit}}元。</p>
			</div>
			<div v-if="odd==''&&odd!=null" style="display: flex;justify-content: center;flex-direction: column;">
				<p style="text-align: center;">
					</span>共选择{{option.ticketCount}}注，可中奖{{winAmount}}元</p>
				<p>投注{{Math.round(option.totalPrice*100)/100}}元，最多盈利{{profit}}元。</p>
			</div>
			<div v-if="odd==null" style="display: flex;justify-content: center;flex-direction: column;">
				<p style="text-align: center;">
					</span>共选择{{option.ticketCount}}注</p>
				<p>投注{{Math.round(option.totalPrice*100)/100}}元</p>
			</div>
			<!--<div v-else  style="display: flex;justify-content: center;flex-direction: column;">
		<p v-if="oddMax==oddMin" style="text-align: center;">共选择{{option.ticketCount}}注，可中奖{{Math.round(oddMax*unitPrice*inputValue*100)/100}}元</p>
		<p v-else style="text-align: center;">共选择{{option.ticketCount}}注，可中奖{{Math.round(oddMin*unitPrice*inputValue*100)/100}}元至{{Math.round(oddMax*unitPrice*inputValue*100)/100}}元</p>
		<p v-if="oddMax==oddMin">投注{{Math.round(option.totalPrice*100)/100}}元，可盈利{{ Math.round((oddMax*unitPrice*inputValue-option.totalPrice)*100)/100}}元。</p>
		<p v-else style="text-align: center;">投注{{Math.round(option.totalPrice*100)/100}}元，可盈利{{Math.round((oddMin*unitPrice*inputValue-option.totalPrice)*100)/100}}元至{{Math.round((unitPrice*inputValue*oddMax-option.totalPrice)*100)/100}}元</p>
		</div>-->
		</div>
		<!--<div class="order" v-if="option.ticketCount>0&&classId==2" >
		<div  style="display: flex;justify-content: center;flex-direction: column;">
		<p style="text-align: center;">共选择{{option.ticketCount}}注</p>
		<p>投注{{Math.round(option.totalPrice*100)/100}}元</p>
		</div>
	</div>-->
	</transition>
</template>

<script>
	import { mapState } from "vuex";
	export default {
		data() {
			return {
				showOdd: '',
				oddMax: 0,
				oddMin: 10000,
				winAmount: 0,
				profit: 0,
				odd: '',
			}
		},
		props: ["option", "newNumbers", "unitPrice", "inputValue"],
		created() {},
		computed: {
			...mapState('bet', [
				'subGameList',
				"rightName",
				"leftName",
				"gameId",
				"classId",
				"subGameId"
			])
		},
		methods: {
			combination(m, n) {
				return this.factorial(m, n) / this.factorial(n, n);
			},
			factorial(m, n) {
				var num = 1;
				var count = 0;
				for(var i = m; i > 0; i--) {
					if(count == n) { 
						break;
					}
					num = num * i;
					count++;
				}
				return num;
			},
			//定位胆
			getProfit_routine(newNumbers) {
				let winAmount = 0;
				let profit = 0;
				//				this.odd = 98.00;
				this.odd = this.subGameList[0].oddMax;
				newNumbers.forEach((item, index) => {
					if(item.length != 0) {
						winAmount += this.inputValue * this.unitPrice * this.odd;
					}
					winAmount = Math.round(winAmount * 1000) / 1000

				})
				this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
				this.winAmount = winAmount;
				this.profit = Math.round(this.profit * 1000) / 1000
				this.winAmount = Math.round(this.winAmount * 1000) / 1000
			},
			//直选-组选-和值
			getProfit_double(newNumbers) {
				let winAmount = 0;
				let profit = 0;
				//				this.odd = 980;
				this.odd = this.subGameList[0].oddMax;
				winAmount = this.inputValue * this.unitPrice * this.odd;
				this.winAmount = Math.round(winAmount * 1000) / 1000;
				this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
				this.profit = Math.round(this.profit * 1000) / 1000
			},
			getProfit_specialNum(newNumbers) {

			},
			getProfit_zuhe(newNumbers) {
				let winAmount = 0;
				let profit = 0;
				let odd = this.subGameList[0].oddMax.split(",")
				let odd1 = odd.split(",")[0] * 1;
				let odd2 = odd.split(",")[1] * 1;
				let odd3 = odd.split(",")[2] * 1;
				let winAmount_min = odd3 * this.inputValue * this.unitPrice;
				let winAmount_max = odd1 * this.inputValue * this.unitPrice + odd3 * this.inputValue * this.unitPrice + odd2 * this.inputValue * this.unitPrice;
				let profit_min = winAmount_min - (this.inputValue * this.unitPrice * this.option.ticketCount);
				let profit_max = winAmount_max - (this.inputValue * this.unitPrice * this.option.ticketCount);
				newNumbers.forEach((item, index) => {
					if(index == 0) {
						if(item.length > 1) {
							winAmount_max = winAmount_max + ((odd2 + odd3) * (this.inputValue * this.unitPrice)) * (item.length - 1)
							profit_max = winAmount_max - (this.inputValue * this.unitPrice * this.option.ticketCount);
						}
					} else if(index == 1) {
						if(item.length > 1) {
							winAmount_max = winAmount_max + (odd3 * this.inputValue * this.unitPrice) * (newNumbers[index - 1].length * (item.length - 1))
							profit_max = winAmount_max - (this.inputValue * this.unitPrice * this.option.ticketCount);
						}
					}
				})
				winAmount_max = Math.round(winAmount_max * 1000) / 1000;
				profit_max = Math.round(profit_max * 1000) / 1000;
				winAmount_min = Math.round(winAmount_min * 1000) / 1000;
				profit_min = Math.round(profit_min * 1000) / 1000
				this.profit = profit_min + '至' + profit_max;
				this.winAmount = winAmount_min + '至' + winAmount_max;
			},
			getProfit_dxds(newNumbers) {
				let winAmount = 0;
				let count1 = 0;
				let count2 = 0;
				let count3 = 0;
				let ary1 = [];
				let ary2 = [];
				let ary3 = [];
				let profit = 0;
				this.odd = this.subGameList[0].oddMax;
				newNumbers.forEach((item1, index1) => {
					if(index1 == 0) {
						item1.forEach((item2) => {
							if(item2 == 0 || item2 == 1) {
								if(ary1.indexOf(item2) == -1) {
									count1++
								}
								ary1.push(0);
								ary1.push(1);
							} else if(item2 == 2 || item2 == 3) {
								if(ary1.indexOf(item2) == -1) {
									count1++
								}
								ary1.push(2);
								ary1.push(3);
							}
						})
					} else if(index1 == 1) {
						item1.forEach((item2) => {
							if(item2 == 0 || item2 == 1) {
								if(ary2.indexOf(item2) == -1) {
									count2++
								}
								ary2.push(0);
								ary2.push(1);
							} else if(item2 == 2 || item2 == 3) {
								if(ary2.indexOf(item2) == -1) {
									count2++
								}
								ary2.push(2);
								ary2.push(3);
							}
						})
					} else if(index1 == 2) {
						item1.forEach((item2) => {
							if(item2 == 0 || item2 == 1) {
								if(ary3.indexOf(item2) == -1) {
									count3++
								}
								ary3.push(0);
								ary3.push(1);
							} else if(item2 == 2 || item2 == 3) {
								if(ary3.indexOf(item2) == -1) {
									count3++
								}
								ary3.push(2);
								ary3.push(3);
							}
						})
					}
				})
				if(newNumbers.length == 2) {
					winAmount = count1 * count2 * this.odd * this.inputValue * this.unitPrice;
				} else if(newNumbers.length == 3) {
					winAmount = count1 * count2 * count3 * this.odd * this.inputValue * this.unitPrice;
				}

				this.winAmount = winAmount;
				this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
				this.profit = Math.round(this.profit * 1000) / 1000
				this.winAmount = Math.round(this.winAmount * 1000) / 1000
			},
			getProfit_mutex(newNumbers) {
				let winAmount = 0;
				let profit = 0;
				this.odd = this.subGameList[0].oddMax;
				newNumbers.forEach((item, index) => {
					if(item.length != 0) {
						winAmount += this.inputValue * this.unitPrice * this.odd * item.length;
						winAmount = Math.round(winAmount * 1000) / 1000
					}
				})
				this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
				this.winAmount = winAmount;
				this.profit = Math.round(this.profit * 1000) / 1000
				this.winAmount = Math.round(this.winAmount * 1000) / 1000
			},
			getProfit_bdw(newNumbers, num) {
				let winAmount = 0;
				let profit = 0;
				this.odd = this.subGameList[0].oddMax;
				if(num == 1) {

					if(newNumbers[0].length == 1) {
						winAmount = this.inputValue * this.unitPrice * this.odd * 1
					} else if(newNumbers[0].length == 2) {
						winAmount = this.inputValue * this.unitPrice * this.odd * 2
					} else {
						winAmount = this.inputValue * this.unitPrice * this.odd * 3
					}
				} else if(num == 2) {
					if(newNumbers[0].length == 2) {
						winAmount = this.inputValue * this.unitPrice * this.odd * 1
					} else {
						winAmount = this.inputValue * this.unitPrice * this.odd * 3
					}
				} else if(num == 3) {
					if(newNumbers[0].length == 3) {
						winAmount = this.inputValue * this.unitPrice * this.odd * 1
					} else if(newNumbers[0].length == 4) {
						winAmount = this.inputValue * this.unitPrice * this.odd * 4
					} else {
						winAmount = this.inputValue * this.unitPrice * this.odd * 10
					}
				}
				this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
				this.winAmount = winAmount;
				this.profit = Math.round(this.profit * 1000) / 1000
				this.winAmount = Math.round(this.winAmount * 1000) / 1000
			},
			getProfit_ksSum(newNumbers) {
				let winAmount = 0;
				let profit = 0;
				this.oddMax = 0;
				this.oddMin = 10000;
				newNumbers[0].forEach((item) => {
					if(this.subGameList[item].oddMax * 1 >= this.oddMax) {
						this.oddMax = this.subGameList[item].oddMax * 1
					}
					if(this.subGameList[item].oddMax * 1 <= this.oddMin) {
						this.oddMin = this.subGameList[item].oddMax * 1
					}
				})
				winAmount = Math.round(this.inputValue * this.unitPrice * this.oddMin * 1000) / 1000 + '至' + Math.round(this.inputValue * this.unitPrice * this.oddMax * 1000) / 1000;
				profit = Math.round((this.inputValue * this.unitPrice * this.oddMin - this.inputValue * this.unitPrice * this.option.ticketCount) * 1000) / 1000 + '至' + Math.round((this.inputValue * this.unitPrice * this.oddMax - this.inputValue * this.unitPrice * this.option.ticketCount) * 1000) / 1000;
				this.profit = profit;
				this.winAmount = winAmount;
				this.odd = '';
			},
			getProfit_ksbth(newNumbers) {
				let winAmount = 0;
				let profit = 0;
				this.odd = this.subGameList[0].oddMax;
				if(newNumbers[0].length == 2) {
					winAmount = this.inputValue * this.unitPrice * this.odd * 1
				} else {
					winAmount = this.inputValue * this.unitPrice * this.odd * 3
				}
				this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
				this.winAmount = winAmount;
				this.profit = Math.round(this.profit * 1000) / 1000
				this.winAmount = Math.round(this.winAmount * 1000) / 1000

			},
			getProfit_optional(newNumbers,num,type) {
				
				let winAmount = 0;
				let profit = 0;
				if(type) {
					this.odd = this.subGameList[0].oddMax;
					if(newNumbers[0].length <= 5) {
						winAmount = this.inputValue * this.unitPrice * this.odd * this.option.ticketCount;
					} else {
						winAmount = this.inputValue * this.unitPrice * this.odd * num
					}
					this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
					this.winAmount = winAmount;
					this.profit = Math.round(this.profit * 1000) / 1000
					this.winAmount = Math.round(this.winAmount * 1000) / 1000
				} else {
					if(newNumbers[0].length==num){
					this.odd = this.subGameList[0].oddMax;
					winAmount = this.inputValue * this.unitPrice * this.odd;
					this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
					this.winAmount = winAmount;
					this.profit = Math.round(this.profit * 1000) / 1000
					this.winAmount = Math.round(this.winAmount * 1000) / 1000
					}else{
					let n = num - 5
					this.odd = this.subGameList[0].oddMax;
					winAmount = this.combination(newNumbers[0].length-5,n)*this.inputValue * this.unitPrice * this.odd;
					this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
					this.winAmount = winAmount;
					this.profit = Math.round(this.profit * 1000) / 1000
					this.winAmount = Math.round(this.winAmount * 1000) / 1000	
					}
				}
			},
			getProfit_optional_ds(newNumbers){
				let winAmount = 0;
				let profit = 0;
				this.odd = this.subGameList[0].oddMax;
				winAmount = newNumbers.length*(this.inputValue * this.unitPrice * this.odd);
				this.winAmount = Math.round(winAmount * 1000) / 1000;
				this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
				this.profit = Math.round(this.profit * 1000) / 1000
			
			},
			getProfit_optional_dt(newNumbers,num){
				
//				let winAmount = 0;
//				let profit = 0;
//				this.odd = this.subGameList[0].oddMax;
//				if(num<5){
//					if(newNumbers[1].length<5){
//					winAmount = newNumbers[1].length*(this.inputValue * this.unitPrice * this.odd);
//				}else{
//					winAmount = 4*(this.inputValue * this.unitPrice * this.odd);
//				}
//				}else if(num==5){
//					winAmount = this.inputValue * this.unitPrice * this.odd;
//				}else if(num>5){
//					if(newNumbers[0].length<5){
//						winAmount = (newNumbers[1].length-(5-newNumbers[0].length))*(this.inputValue * this.unitPrice * this.odd);
//					}else if(newNumbers[0].length>=5){
//						let count = this.combination(newNumbers[1].length,num-newNumbers[0].length)
//						winAmount = count*(this.inputValue * this.unitPrice * this.odd);
//					}
//				}
//				
//				this.winAmount = Math.round(winAmount * 1000) / 1000;
//				this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
//				this.profit = Math.round(this.profit * 1000) / 1000
				this.odd = null
			},
			getProfit_pk10(newNumbers){
				let winAmount = 0;
				let profit = 0;
				this.odd = this.subGameList[0].oddMax;
				let count = 0
				newNumbers.forEach((item1)=>{
					let ary = [];
					item1.forEach((item2)=>{
						if(item2==0||item2==1){
							if(ary.indexOf(item2)==-1){
								count++
							}
							ary.push(0)
							ary.push(1)
							
						}
						if(item2==2||item2==3){
							if(ary.indexOf(item2)==-1){
								count++
							}
							ary.push(2)
							ary.push(3)
						}
						
					})
				})
				winAmount = count*(this.inputValue * this.unitPrice * this.odd);
				this.winAmount = Math.round(winAmount * 1000) / 1000;
				this.profit = winAmount - (this.inputValue * this.unitPrice * this.option.ticketCount);
				this.profit = Math.round(this.profit * 1000) / 1000
			},
			getProfit_ts(newNumbers){
				this.odd = null
			},
			getProfit_default() {
				this.odd = null
			}
			
		},
		watch: {
			newNumbers() {
				if(this.newNumbers.length == 0) {
					return false;
				}
				console.log(this.subGameId, this.newNumbers, this.subGameList)
				switch(this.subGameId) {
					case '100101':
					case '300101':
					case '500401':
					case '600401':
						this.getProfit_routine(this.newNumbers)
						break;
					case '100201':
					case '100202':
					case '100203':
					case '100204':
					case '100301':
					case '100302':
					case '100303':
					case '100401':
					case '100402':
					case '100403':
					case '300201':
					case '300202':
					case '300203':
					case '300204':
					case '300205':
					case '300206':
					case '300207':
					case '300208':
					case '300209':
					case '300210':
					case '300211':
					case '300212':
					case '300213':
					case '300214':
					case '300215':
					case '300216':
					case '300301':
					case '300302':
					case '300303':
					case '300304':
					case '300306':
					case '300307':
					case '300308':
					case '300309':
					case '300310':
					case '300310':
					case '300311':
					case '300401':
					case '300402':
					case '300403':
					case '300404':
					case '300406':
					case '300407':
					case '300408':
					case '300409':
					case '300410':
					case '300411':
					case '300501':
					case '300502':
					case '300503':
					case '300504':
					case '300506':
					case '300507':
					case '300508':
					case '300509':
					case '300510':
					case '300511':
					case '300601':
					case '300602':
					case '300701':
					case '300702':
					case '400201':
					case '400301':
					case '400401':
					case '400402':
					case '400501':
					case '400601':
					case '400701':
					case '400802':
					case '400901':
					case '500101':
					case '500102':
					case '500103':
					case '500104':
					case '500105':
					case '500106':
					case '500107':
					case '500108':
					case '500109':
					case '500110':
					case '500111':
					case '500112':
					case '500113':
					case '500114':
					case '500115':
					case '500201':
					case '500202':
					case '500203':
					case '500204':
					case '500205':
					case '500206':
					case '500207':
					case '500208':
					case '500209':
					case '500210':
					case '600101':
					case '600201':
					case '600202':
					case '600203':
					case '600301':
					case '600302':
						this.getProfit_double(this.newNumbers)
						break;
					case '300305':
					case '300405':
					case '300505':
						this.getProfit_zuhe(this.newNumbers)
						break;
					case '100501':
					case '100502':
					case '300801':
					case '300802':
					case '300803':
					case '300804':
						this.getProfit_dxds(this.newNumbers)
						break;
					case '100601':
					case '300901':
					case '300903':
					case '300905':
					case '300907':
					case '300909':
					case '500301':
					case '500302':
					case '500303':
						this.getProfit_bdw(this.newNumbers, 1)
						break;
					case '100602':
					case '300902':
					case '300904':
					case '300906':
					case '300908':
					case '300910':
						this.getProfit_bdw(this.newNumbers, 2)
						break;
					case '300911':
						this.getProfit_bdw(this.newNumbers, 3)
						break;
					case '301401':
					case '301407':
					case '301418':
						this.getProfit_mutex(this.newNumbers)
						break;
					case '400101':
						this.getProfit_ksSum(this.newNumbers)
					case '400801':
						this.getProfit_ksbth(this.newNumbers)
						break;
					case '500501':
						this.getProfit_optional(this.newNumbers, 5, true)
						break;
					case '500502':
						this.getProfit_optional(this.newNumbers, 10, true)
						break;
					case '500503':
						this.getProfit_optional(this.newNumbers, 10, true)
						break;
					case '500504':
						this.getProfit_optional(this.newNumbers, 10, true)
						break;
					case '500505':
						this.getProfit_optional(this.newNumbers, 1, true)
						break;
					case '500506':
						this.getProfit_optional(this.newNumbers, 6, false)
						break;
					case '500507':
						this.getProfit_optional(this.newNumbers,7,false)
						break;						
					case '500508':
						this.getProfit_optional(this.newNumbers,8,false)
						break;
					case '500601':
					case '500602':
					case '500603':
					case '500604':
					case '500605':
					case '500606':
					case '500607':
					case '500608':
					   this.getProfit_optional_ds(this.newNumbers)
					     break;
					case '500701':
					 this.getProfit_optional_dt(this.newNumbers,2)
					     break;
					case '500702':
					 this.getProfit_optional_dt(this.newNumbers,3)
					     break;
					case '500703':
					 this.getProfit_optional_dt(this.newNumbers,4)
					     break;
					case '500704':
					 this.getProfit_optional_dt(this.newNumbers,5)
					     break;
					case '500705':
					 this.getProfit_optional_dt(this.newNumbers,6)
					     break;
					case '500706':
					 this.getProfit_optional_dt(this.newNumbers,7)
					     break;
					case '500707':
					 this.getProfit_optional_dt(this.newNumbers,8)
					     break;
					case '500707':
					 this.getProfit_optional_dt(this.newNumbers,8)
					     break;
					case '600501':
					case '600502':
					this.getProfit_pk10(this.newNumbers)
					     break;
					case '600503':
					this.getProfit_ts(this.newNumbers)
					     break;
					default:
						this.getProfit_default()
						break;
				}
			},
			subGameList() {}
		}
	}
</script>

<style>
	.order {
		display: flex;
		font-size: 12px;
		z-index: -1;
		overflow: hidden;
		background: #f7f3e7;
		height: .8rem;
		opacity: .8;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/*过度动画*/
	
	.fade2-enter-active,
	.fade2-leave-active {
		transition: all .3s;
	}
	
	.fade2-enter-active {
		width: 100%;
		opacity: .8;
	}
	
	.fade2-leave-active {
		width: 100%;
		height: 0;
		opacity: 0;
	}
	
	.fade2-enter {
		width: 100%;
		height: 0;
	}
</style>