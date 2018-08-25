<template>
	<div v-if="betData.length!=0">
		<template v-for="(item1,index1) in betData">
			<div class="bcn_center2" style="overflow: hidden;">
				<div class="bcn_title">
					<div :class="item1.open?'bt_icon open':'bt_icon'" @click="open(index1)" ></div>
				</div>
				<div class="bt_name" >{{item1.title}}</div>
				<div class="bcn_number_type" :style="item1.open?{height:item1.itemHeight,opacity:1}:{height:0,opacity:0}">
					<div class="bcn_number_type" :class="{bt_name_opacity:stopActive}" >
						<div :class="isNaN(item2.name)?item2.selected?'bcn_back bet_lottery bet_lottery_div'
								:'bet_lottery bet_lottery_div':item2.selected?'bet_lottery bcn_back':'bet_lottery'" 
								v-for="(item2,index2) in item1.list" @click="onSelectNumber(index1,index2,item2.key,item2.name,twoGameList[item2.key],item1.title)">
							<div :class="isNaN(item2.name)?'bl_name':'bl_name resultitem'" >{{item2.name}}</div>
							<!-- <div class="bl_name">{{item2.name}}</div> -->
							<div class="bl_multiple">{{twoGameList[item2.key]}}</div>
							<!-- <div class="bl_multiple" v-if="stopTime!='00:00'">{{twoGameList[item2.key]}}</div> -->
							<!-- <div class="bl_multiple" v-if="stopTime =='00:00'">--</div> -->
						</div>
					</div>
				</div>
			</div>
			<div class="rough_lines"></div>
		</template>
	</div>
</template>

<script>
	import bus from './eventBus.js';
	import { mapState, mapActions, mapMutations } from "vuex";
//  import func from './vue-temp/vue-editor-bridge.js';
	export default {
		props: ["betData","odds",],
		data() {
			return {
				itemHeight:'auto',
				enc:'',
				encNum:0,
				keys:[], // 投注数组
				names:[],
				keyNums:[],
				shopList:[],
				stopTime:'',
				stopActive:false,
				betKey:false,

			}
		},
		created() {
			// console.log(this.betData,'1');
			// console.log(this.key,'333');
			// if(this.key){
			// 	this.betKey = this.key;
			// }
		},
		mounted(){
			let that = this;
			bus.$on('userDefinedEvent',(msg)=>{
				that.enc = msg;
			})
			bus.$on('stop_time',(stopTime)=>{
                // console.log(data)
                that.stopTime = stopTime;
			});
			bus.$on('twobetKey',(Num)=>{
				if(Num == 0){
					this.clearZero()
				}
            });
		},
		computed:{
			...mapState('twobet', [
				'twoGameList'
			]),
		},
		methods: {
			...mapActions('twobet', [
				'twoGameOdd'
			]),
			onSelectNumber(row,col,key,name,keyNum,lei) {
				// this.betKey = false;
				// console.log(row,col,key,name,keyNum,lei)
				// if(this.stopTime != '00:00'){
						// 判断 当投注数组里面没有这个key的时候，把key值放到投注数组里面
					if(this.keys.indexOf(key) == -1){
							// console.log(-1)
							this.keys.push(key);
							this.names.push(lei);
							this.keyNums.push(keyNum);
							// 判断 当投注数组里面有这个key的时候，把key删除
						}else if(this.keys.indexOf(key) != -1){
							this.keys.splice( this.keys.indexOf( key ), 1 );
							this.names.splice( this.names.indexOf( name ), 1 );
							this.keyNums.splice( this.keyNums.indexOf( keyNum ), 1 );
						}
					this.$emit('callback', {
						row: row,
						col: col,
					});
					this.encNum = this.keys.length;
					bus.$emit('userNum',{
						encNum:this.encNum,
						row: row,
						col: col,
						key:this.keys,
						name:this.names,
						keyNum:this.keyNums,
					});
				// }
			},
			open(index) {
				event.target.parentNode.parentNode.children[2].style.height = event.target.parentNode.parentNode.children[2].scrollHeight+'px';
				this.$emit('open',{index:index,itemHeight:event.target.parentNode.parentNode.children[2].scrollHeight+'px'})
				
			},
			// 清除选中状态
			clearZero(){
				let that = this;
				that.keys = [];
				that.names =[];
				that.keyNums =[];
				that.betData.forEach(element => {
					element.list.forEach( item => {
						item.selected = false;
					})
				});
			}
		},
		watch: {
			// 当投注面板改变是清除选中状态
			enc(){
				this.clearZero();
			},
			$route(to, from) {
				this.clearZero();
			},
			betList(){
				let that = this;
				that.keys = that.betList.key;
				that.names =that.betList.name;
				that.keyNums =that.betList.keyNum;
			},
			// stopTime(){
			// 	if(this.stopTime == '00:00'){
			// 		this.stopActive = true;
			// 	}else{
			// 		this.stopActive = false;
			// 	}
			// },
		}
	}
</script>

<style>
	.bcn_title {
		text-align: center;
		min-height: 25px;
		margin-top: .25rem;
	}
	.bt_icon {
		float: left;
		position: relative;
		height: 30px;
		width: 30px;
		background: url('../../../../static/img/twobet/setupico.png');
		background-size: 485px 145px;
		background-position: -261px 30px;
		margin: -6px 0 0 18px;
		-webkit-transition: all .2s ease-in-out;
		-o-transition: all .2s ease-in-out;
		transition: all .2s ease-in-out;
		-webkit-transform: scale(.9);
		-ms-transform: scale(.9);
		transform: scale(.9);
	}
	.bt_icon.open {
		-webkit-transform: rotate(180deg) scale(.9);
		-ms-transform: rotate(180deg) scale(.9);
		transform: rotate(180deg) scale(.9);
	}
	.bt_name {
		z-index: -20;
		font-size: 0.3rem;
		color: #666;
		line-height: 4px;
		position: relative;
		top: -20px;
		text-align: center;
		display: block;
	}
	.bcn_number_type {
    overflow: hidden;
    -webkit-transition: height .2s ease-in,opacity .2s ease-in;
    -o-transition: height .2s ease-in,opacity .2s ease-in;
    transition: height .2s ease-in,opacity .2s ease-in;
	}
	.bet_lottery,
	.bet_lottery_div,
	.bet_lottery_full,
	.bl_multiple,
	.bl_name {
		user-select: none;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		cursor: pointer;
	}
	.bet_lottery {
		width: 25%;
		height: 50px;
		display: inline-block;
		border: 1px solid #ccc;
		text-align: center;
		border-radius: 5px;
		margin: 0 3% 5% 3%;
	}
	.bl_multiple {
		color: #ff4d4d;
		font-size: 16px;
	}
	.bl_name {
		margin-top: 5px;
		color: #666;
		font-size: 16px;
	}
	.bet_lottery_div {
		width: 40.2%;
	}
	.resultitem {
		width: 25px;
		height: 25px;
		border: 2px solid #4485F8;
		border-radius: 15px;
		margin: 2px auto;
		font-family: "Arial";
		font-size: 17px;
		font-style: italic;
		font-weight: bold;
		box-shadow: 0 0 5px #fff;
		text-align: center;
	}
	.bcn_back {
		background: -webkit-linear-gradient(top, rgba(70, 149, 230, 1) 0, rgba(0, 149, 214, 1) 100%);
		background: -webkit-gradient(linear, left top, left bottom, from(rgba(70, 149, 230, 1)), to(rgba(0, 149, 214, 1)));
		background: -o-linear-gradient(top, rgba(70, 149, 230, 1) 0, rgba(0, 149, 214, 1) 100%);
		background: linear-gradient(to bottom, rgba(70, 149, 230, 1) 0, rgba(0, 149, 214, 1) 100%);
	}
	.bcn_back .bl_name {
		color: #fff;
	}
	.bcn_back .bl_multiple {
		color: #b0d2f0;
	}
	.bt_name_opacity{
		opacity: 0.5;
	}
</style>