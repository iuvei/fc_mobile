<template>
	<div class="clockView">
		<div class="lottery_result">
			<div class="lr_div ">
				<div class="lr_number">
					<div class="lrn_font">
						<div><span>{{awarPeriod}}</span>期</div>
					</div>
					<div class="lrn_number num-PK10" v-if="classId == 'PK10'">
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][0]"></div>
							<div class="ball_fonts">{{pk10.num}}</div>
						</div>
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][1]"></div>
							<div class="ball_fonts">{{pk10.dx}}</div>
						</div>
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][2]"></div>
							<div class="ball_fonts">{{pk10.ds}}</div>
						</div>
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][3]"></div>
							<div class="ball_fonts">{{pk10.lh1}}</div>
						</div>
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][4]"></div>
							<div class="ball_fonts">{{pk10.lh2}}</div>
						</div>
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][5]"></div>
							<div class="ball_fonts">{{pk10.lh3}}</div>
						</div>
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][6]"></div>
							<div class="ball_fonts">{{pk10.lh4}}</div>
						</div>
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][7]"></div>
							<div class="ball_fonts">{{pk10.lh5}}</div>
						</div>
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][8]"></div>
							
						</div>
						<div class="div_number" >
							<div class="bjpk10-ball" :class="'bjpk10-ball-'+awardNumber[0][9]"></div>
						</div>

						
					</div>
					<div class="lrn_number lhc_number_width num-SSC" v-if="classId == 'SSC'">
						<div class="div_number">
							<div class="ball-blue resultitem number-5">{{awardNumber[0][0]}}</div>
							<div class="ball_fonts">{{ssc.num}}</div>
						</div>
						<div class="div_number">
							<div class="ball-blue resultitem number-9">{{awardNumber[0][1]}}</div>
							<div class="ball_fonts">{{ssc.dx}}</div>
						</div>
						<div class="div_number">
							<div class="ball-blue resultitem number-2">{{awardNumber[0][2]}}</div>
							<div class="ball_fonts">{{ssc.ds}}</div>
						</div>
						<div class="div_number">
							<div class="ball-blue resultitem number-3">{{awardNumber[0][3]}}</div>
							<div class="ball_fonts">{{ssc.lh1}}</div>
						</div>
						<div class="div_number">
							<div class="ball-blue resultitem number-8">{{awardNumber[0][4]}}</div>
							<div class="ball_fonts"></div>
						</div>
					</div>
					<div class="lrn_number num-HK6" v-if="classId == 'HK6'">
						<div class="div_number">
							<div class="ball-green resultitem number-38">38</div>
							<div class="ball_fonts">鸡</div>
						</div>
						<div class="div_number"><div class="ball-blue resultitem number-10">10</div><div class="ball_fonts">牛</div></div>
						<div class="div_number"><div class="ball-green resultitem number-11">11</div><div class="ball_fonts">鼠</div></div>
						<div class="div_number"><div class="ball-blue resultitem number-4">4</div><div class="ball_fonts">羊</div></div>
						<div class="div_number"><div class="ball-blue resultitem number-3">3</div><div class="ball_fonts">猴</div></div>
						<div class="div_number"><div class="ball-blue resultitem number-14">14</div><div class="ball_fonts">鸡</div></div>
						<div class="div_number"><div class="plus">+</div></div>
						<div class="div_number"><div class="ball-green resultitem number-28">28</div><div class="ball_fonts">羊</div></div>
					</div>
					<div class="lrn_number lhc_number_klsf num-KLSF" v-if="classId == 'KLSF'">
						<div class="div_number"><div class="ball-11X5 back-blue align resultitem number-9">9</div><div class="ball_fonts">76</div></div>
						<div class="div_number"><div class="ball-11X5 back-blue align resultitem number-5">5</div><div class="ball_fonts">双</div></div>
						<div class="div_number"><div class="ball-11X5 back-red align resultitem number-20">20</div><div class="ball_fonts">小</div></div>
						<div class="div_number"><div class="ball-11X5 back-blue align resultitem number-13">13</div><div class="ball_fonts">尾大</div></div>
						<div class="div_number"><div class="ball-11X5 back-blue align resultitem number-14">14</div><div class="ball_fonts">虎</div></div>
						<div class="div_number"><div class="ball-11X5 back-blue align resultitem number-1">1</div><div class="ball_fonts"></div></div>
						<div class="div_number"><div class="ball-11X5 back-blue align resultitem number-4">4</div><div class="ball_fonts"></div></div>
						<div class="div_number"><div class="ball-11X5 back-blue align resultitem number-10">10</div><div class="ball_fonts"></div></div>
					</div>
					<div class="lrn_number num-PCEGG" v-if="classId == 'PCEGG'">
						<div class="div_number"><div class="ball-pcegg back-red resultitem number-3">3</div><div class="ball_fonts">11</div></div>
						<div class="div_number"><div class="plus"> + </div><div class="ball_fonts"></div></div>
						<div class="div_number"><div class="ball-pcegg back-green resultitem number-7">7</div><div class="ball_fonts">小</div></div>
						<div class="div_number"><div class="plus"> + </div><div class="ball_fonts"></div></div>
						<div class="div_number"><div class="ball-pcegg back-green resultitem number-1">1</div><div class="ball_fonts">单</div></div>
						<div class="div_number"><div class="plus"> = </div><div class="ball_fonts"></div></div>
						<div class="div_number"><div class="ball-pcegg back-blue resultitem number-11">11</div><div class="ball_fonts"></div></div>
					</div>
				</div>
			</div>
			<div class="lr_data">
				<div class="lrn_font">
					<div><span>{{awarPeriodI}}</span>期</div>
				</div>
				<div class="lrd_data">
					<!-- <div class="lrdd_font1">封盘: <span class="red">{{stopTime}}</span></div> -->
					<div class="lrdd_font2">开奖: <span class="red">{{time}}</span></div>
				</div>
			</div>
		</div>
		<div class="rough_lines"></div>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import bus from './eventBus.js';
export default {
	data(){
		return{
			classId:'',
			winList:[],
			kindId:'',
			// kindIds:{
			// 	SPEED10:'speed',
			// 	AULUCKY10:'azpk10',
			// 	BJPK10:'bjpk10',
			// 	CQSSC:'cqssc'
			// },
			awarPeriod:null,
			awarPeriodI:null,
			time:'',
			currentTime:'',
			stopTime:'',
			intervalId:null,
			nexttimestamp:null,
			timestamp:null,
			awardNumber:[],
			pk10:{
				num:'15',
				dx:'大',
				ds:'单',
				lh1:'龙',
				lh2:'虎',
				lh3:'虎',
				lh4:'龙',
				lh5:'虎',
			},
			ssc:{
				num:'15',
				dx:'大',
				ds:'单',
				lh1:'龙',
			}
		}
	},
	destroyed(){
				clearInterval(this.intervalId)
			},
	created(){
		this.kindId = this.$route.params.kindId.split('-')[1];
		this.classId = this.$route.params.kindId.split('-')[0];
		this._getWinsDragon(this.classId,this.kindId);
	},
	computed: {
		...mapState("bet", ["currentAwarPeriod", 'prevAwarPeriod', 'dragons']),
			
	},
	methods:{
		...mapActions('bet', [
			'getWinsDragon',
		]),
		_getWinsDragon(classI,kind){
			// console.log(classI,kind)
			let that = this;
			that.awardNumber = [];
			this.getWinsDragon('/'+kind).then( res => {
				// console.log(res,'111')
				that.winList = res.data.winList;
				that.awarPeriod = that.winList[0].awarPeriod;
				that.awarPeriodI = that.awarPeriod--;
				
				that.strTime(moment(res.data.nextTime).valueOf()-moment(res.data.currentTime).valueOf(),classI,kind);
				let num = res.data.winList[0].awardNum;
				if(classI == 'PK10'){
					if(num == null){
						that.awardNumber.push(['09','03','05','08','06','07','01','02','04','10']);
					}else{
						that.awardNumber.push(num.split(','));
					}
				}else if(classI == 'SSC'){
					if(num == null){
						that.awardNumber.push(['05','03','09','08','06']);
					}else{
						that.awardNumber.push(num.split(','));
					}
				}
				
				this.longhu(classI,that.awardNumber);
				
				// console.log( that.awardNumber)
				// console.log(that.awarPeriod,that.awarPeriodI,that.time,)
			})
		},
		// 时间转换
		strTime(timestamp,classI,kind){
			// console.log( timestamp,classI,kind)
			this.timestamp = timestamp;
			if(this.intervalId!=null){
		 			clearInterval(this.intervalId)
		 		}
			this.intervalId = setInterval(()=>{
					 timestamp -=1000;
					//  this.nexttimestamp = timestamp-15000;
					//  if(classI == 'SSC'){
					// 	if(timestamp>15000){
					// 		this.nexttimestamp = timestamp-15000;
					// 	}else if( timestamp>=0 && timestamp<=15000 ){
					// 		this.nexttimestamp = 0;
					// 	}else if(timestamp<0){
					// 		this.timestamp = 0;
					// 		this.nexttimestamp = 0;
					// 		this.timestamp = timestamp;
					// 	}	
					// }else if(classI == 'PK10'){
					// 	if(timestamp>30000){
					// 		this.nexttimestamp = timestamp-30000;
					// 	}else if(timestamp>=0 && timestamp<=30000){
					// 		this.nexttimestamp = 0;
					// 	}else if(timestamp<0){
					// 		this.nexttimestamp = 0;
					// 		this.timestamp = timestamp;
					// 	}	
					// }else if(kind == 'HK6'){
					// 	if(timestamp>45000){
					// 		this.nexttimestamp = timestamp-45000;
					// 	}else if(timestamp>=0 && timestamp<=45000){
					// 		this.nexttimestamp = 0;
					// 	}else if(timestamp<0){
					// 		this.nexttimestamp = 0;
					// 		this.timestamp = timestamp;
					// 	}	
					// }

					if(timestamp<0){
							this.nexttimestamp = 0;
							this.timestamp = timestamp;
						}	
					
					var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
					var dateI = new Date(this.nexttimestamp);
					var m = (date.getMinutes()+1)<=10 ? '0'+date.getMinutes() : date.getMinutes();
					var s = (date.getSeconds()+1)<=10 ? '0'+date.getSeconds() : date.getSeconds();
					var mm = (dateI.getMinutes()+1)<=10 ? '0'+dateI.getMinutes() : dateI.getMinutes();
					var ss = (dateI.getSeconds()+1)<=10 ? '0'+dateI.getSeconds() : dateI.getSeconds();
					// return m+s;
					this.time = m+':'+s;
					this.stopTime = mm+':'+ss;
					// console.log(this.time,'123123',this.stopTime)
					 this.$emit('clockView',this.time,this.stopTime,this.awarPeriodI);
					 bus.$emit('stop_time',this.stopTime);
		 		},1000)
		},
		//封盘倒计时计算
		// next_timestamp(timestamp,classI,kind){
		// 	let time;
		// 	if(kind == 'SSC'){
		// 		time = 15000;
		// 	}else if(kind == 'PK10'){
		// 		time = 30000;
		// 	}else if(kind == 'HK6'){
		// 		time = 45000;
		// 	}
		// 	if(timestamp>time){
		// 					this.nexttimestamp = timestamp-time;
		// 				}else if(timestamp>=0 && timestamp<=time){
		// 					this.nexttimestamp = 0;
		// 				}else if(timestamp<0){
		// 					this.nexttimestamp = 0;
		// 					this.timestamp = timestamp;
		// 				}	
		// },
		// 大小单双龙虎判断
		longhu(classI,awardNumber){
			let award_number = [];
			award_number = awardNumber;
			if(classI == 'PK10'){
				this.pk10.num = award_number[0][0]*1 + award_number[0][1]*1;
				if(this.pk10.num >= 10){
					this.pk10.dx = '大';
				}else{
					this.pk10.dx = '小';
				}
				if(this.pk10.num%2 == 0){
					this.pk10.ds = '双';
				}else{
					this.pk10.ds = '单';
				}
				if(award_number[0][0]*1 > award_number[0][9]*1){
					this.pk10.lh1 = '龙';
				}else{
					this.pk10.lh1 = '虎';
				}
				if(award_number[0][1]*1 > award_number[0][8]*1){
					this.pk10.lh2 = '龙';
				}else{
					this.pk10.lh2 = '虎';
				}
				if(award_number[0][2]*1 > award_number[0][7]*1){
					this.pk10.lh3 = '龙';
				}else{
					this.pk10.lh3 = '虎';
				}
				if(award_number[0][3]*1 > award_number[0][6]*1){
					this.pk10.lh4 = '龙';
				}else{
					this.pk10.lh4 = '虎';
				}
				if(award_number[0][4]*1 > award_number[0][5]*1){
					this.pk10.lh5 = '龙';
				}else{
					this.pk10.lh5 = '虎';
				}
			}else if(classI == 'SSC'){
				this.ssc.num = award_number[0][0]*1 + award_number[0][1]*1+award_number[0][2]*1 + award_number[0][3]*1+award_number[0][4]*1;
				if(this.ssc.num >= 22){
					this.ssc.dx = '大';
				}else{
					this.ssc.dx = '小';
				}
				if(this.ssc.num%2 == 0){
					this.ssc.ds = '双';
				}else{
					this.ssc.ds = '单';
				}
				if(award_number[0][0]*1 > award_number[0][4]*1){
					this.ssc.lh1 = '龙';
				}else{
					this.ssc.lh1 = '虎';
				}
			}
		}
	},
	 watch:{
        $route(to, from) {
			this.classId = this.$route.params.kindId.split('-')[0];
			this.kindId = this.$route.params.kindId.split('-')[1];
			// console.log(this.classId,this.kindId);
			this._getWinsDragon(this.classId,this.kindId)
		},
		timestamp(){
			// console.log(this.timestamp)
			if(this.timestamp <= 1000){
				// this.intervalId = null;
				this._getWinsDragon(this.classId,this.kindId)
			}
		}
    }
}
</script>


<style>
	.lr_div {
		border-bottom: 1px solid #ccc;
		height: 45px;
		position: relative;
	}
	
	.lr_number {
		height: 100%;
	}
	
	.lrn_font {
		display: inline-block;
		vertical-align: middle;
		height: 100%;
	}
	
	.lrn_font div {
		color: #999;
		line-height: 40px;
		font-size: 15px;
		height: 100%;
	}
	
	.lrn_font span {
		font-size: 15px;
		color: #1378bd;
		padding: 5px;
		padding-right: 0;
	}
	
	.lrn_number {
		display: inline-flex;
		vertical-align: middle;
		max-width: 75%;
		margin-left: 3px;
	}
	
	.num-PK10>.div_number {
		margin: 0;
	}
	
	.lrn_number .div_number {
		display: inline-block;
		vertical-align: middle;
		/*margin: 0 3px;*/
		font-size: 12px;
	}                                                                                                                                                                                      .bjpk10-ball {
		background: url('../../../../static/img/twobet/pk10num.png');
		background-size: 4.75rem 0.45rem;
		display: inline-block;
		vertical-align: middle;
		height: 0.45rem;
		width: 0.45rem;
		margin: 0 1px;
	}
		.bjpk10-ball-01 {
		background-position: 4.75rem 0;
	}
	
	.bjpk10-ball-02 {
		background-position: 4.265rem 0;
	}
	.bjpk10-ball-04 {
		background-position: 3.305rem 0;
	}
	
	.bjpk10-ball-03 {
		background-position: 3.79rem 0;
	}
	
	.bjpk10-ball-05 {
		background-position: 2.83rem 0;
	}
	
	.bjpk10-ball-06 {
		background-position: 2.37rem 0;
	}
	
	.bjpk10-ball-07 {
		background-position: 1.9rem 0;
	}
	
	.bjpk10-ball-08 {
		background-position: 1.42rem 0;
	}
	
	.bjpk10-ball-09 {
		background-position: 0.94rem 0;
	}
	
	.bjpk10-ball-10 {
		background-position: 0.46rem 0;
	}
	.div_number .ball_fonts {
		height: 16px;
	}
	
	.lrn_number .ball_fonts {
		text-align: center;
	}
	
	.lrn_number::after {
		content: '';
		height: 100%;
		width: 0;
		display: inline-block;
		vertical-align: middle;
	}
	
	.lr_data .lrn_font div {
		line-height: 35px;
	}
	
	.lr_number::after {
		content: '';
		height: 100%;
		display: inline-block;
		vertical-align: middle;
	}
	
	.lr_number::after {
		clear: both;
	}
	
	.lr_data {
		height: 35px;
		white-space: nowrap;
		font-size: 0;
	}
	
	.lrd_data {
		display: inline-block;
		vertical-align: middle;
		margin-left: 20px;
		height: 100%;
		font-size: 0;
		white-space: nowrap;
	}
	
	.lrd_data .lrdd_font1 {
		text-align: left;
	}
	
	.lrd_data .lrdd_font2 {
		text-align: center;
	}
	
	.lrd_data .lrdd_font1,
	.lrd_data .lrdd_font2,
	.lrd_data .lrdd_font3 {
		display: inline-block;
		vertical-align: middle;
		/*margin-left: 15px;*/
		color: #666;
		font-size: 15px;
	}
	
	@media (max-width: 412px) {
		.lrd_data .lrdd_font1,
		.lrd_data .lrdd_font2,
		.lrd_data .lrdd_font3 {
			margin-left: 0;
		}
	}
	
	@media (max-width: 384px) {
		.lrd_data .lrdd_font1,
		.lrd_data .lrdd_font2,
		.lrd_data .lrdd_font3 div {
			margin-left: 10px;
		}
	}
	
	.lrd_data .lrdd_font1 span {
		color: #ff5b26;
	}
	
	.lrd_data::after {
		content: '';
		width: 0;
		height: 100%;
		display: inline-block;
		vertical-align: middle;
	}
	
	.lrd_data .lrdd_font2 span {
		color: #00cd22;
	}
	
	.rough_lines {
		width: 100%;
		height: 10px;
		background-color: #ebebeb;
		-webkit-box-shadow: 0 1px 1px #bbb inset;
		box-shadow: 0 1px 1px #bbb inset;
	}

/* 时时彩 */
	.num-SSC .div_number {
    display: inline-block;
    vertical-align: middle;
    margin: 0 3px;
    font-size: 12px;
}
	.resultitem {
    background: 0;
    line-height: 22px;
}
.resultitem {
    width: 20px;
    height: 20px;
    border: 2px solid #4485F8;
    border-radius: 15px;
    margin: 2px auto;
    font-family: "Arial";
    font-size: 17px;
    font-style: italic;
    font-weight: bold;
    box-shadow: 0 0 5px #fff;
}
.div_number .ball_fonts {
    height: 16px;
}
.lrn_number .ball_fonts {
    text-align: center;
}
/* 六合彩 */
.num-HK6 .resultitem {
    font-size: 15px;
    line-height: 22px;
}
.div_number>.plus {
    line-height: 28px;
    font-size: 16px;
}
.plus {
    float: left;
    margin: 0 3px;
    line-height: 34px;
}
/* 快乐十分 */
.num-KLSF>.div_number {
    margin: 0;
}
.num-KLSF .align {
    margin-left: 3px;
}
.num-KLSF .resultitem {
    line-height: 22px;
    color: #111;
}
/* pc蛋蛋 */
.num-PCEGG .resultitem {
    line-height: 22px;
}
.num-PCEGG .div_number>.plus {
    margin: 0;
    line-height: 25px;
}
</style>