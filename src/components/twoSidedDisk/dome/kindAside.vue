<template>
	<div class="kindAside">
		<div :class="show?'overlay show':'overlay hide'" @click.stop="closeAside" ></div>
		<div tabindex="1" :class="show?'lottery_type_name show':'lottery_type_name'" v-show="show">
			<!-- <div class="ltn-name"> -->
				<!-- <a @click="changeKindId('/twobet/PK10-SPEED10','75秒赛车','bjpk10','speed')">
					<div class="lottery-menu icon-iSPEED10"></div><span>75秒赛车</span></a>
				<a @click="changeKindId('/twobet/PK10-BJPK10','北京赛车','bjpk10','speed')">
					<div class="lottery-menu icon-iBJPK10"></div><span>北京赛车</span></a>
				<a @click="changeKindId('/twobet/PK10-AULUCKY10','澳洲赛车','bjpk10','')">
					<div class="lottery-menu icon-iAULUCKY10"></div><span>澳洲赛车</span></a>
				<a @click="changeKindId('/twobet/SSC-SPEED5','75秒时时彩','','')">
					<div class="lottery-menu icon-iSPEED5"></div><span>75秒时时彩</span></a>
				<a @click="changeKindId('/twobet/SSC-CQSSC','重庆时时彩','cqssc','')">
					<div class="lottery-menu icon-iCQSSC"></div><span>重庆时时彩</span></a>
				<a @click="changeKindId('/twobet/HK6-HK6','香港六合彩','hk6','')">
					<div class="lottery-menu icon-iHK6"></div><span>香港六合彩</span></a>
				<a @click="changeKindId('/twobet/PK10-KLFT','快乐飞艇','klft','')">
					<div class="lottery-menu icon-iKLFT"></div><span>快乐飞艇</span></a>
				<a @click="changeKindId('/twobet/HK6-XYLHC','澳洲六合彩','','')">
					<div class="lottery-menu icon-iXYLHC"></div><span>澳洲六合彩</span></a>
				<a @click="changeKindId('/twobet/PK10-XYFT','幸运飞艇','mlaft','')">
					<div class="lottery-menu icon-iXYFT"></div><span>幸运飞艇</span></a>
				<a @click="changeKindId('/twobet/KLSF-GDKLSF','广东快乐十分','','')">
					<div class="lottery-menu icon-iGDKLSF"></div><span>广东快乐十分</span></a>
				<a @click="changeKindId('/twobet/KLSF-XYNC','幸运农场','','')">
					<div class="lottery-menu icon-iXYNC"></div><span>幸运农场</span></a>
				<a @click="changeKindId('/twobet/SSC-TJSSC','天津时时彩','tjssc','')">
					<div class="lottery-menu icon-iTJSSC"></div><span>天津时时彩</span></a>
				<a @click="changeKindId('/twobet/KLSF-AULUCKY8','澳洲快乐十分','','')">
					<div class="lottery-menu icon-iAULUCKY8"></div><span>澳洲快乐十分</span></a>
				<a @click="changeKindId('/twobet/SSC-XJSSC','新疆时时彩','xjssc','')">
					<div class="lottery-menu icon-iXJSSC"></div><span>新疆时时彩</span></a>
				<a @click="changeKindId('/twobet/PCEGG-PCEGG','PC蛋蛋','','')">
					<div class="lottery-menu icon-iPCEGG"></div><span>PC蛋蛋</span></a>
				<a @click="changeKindId('/twobet/SSC-AULUCKY5','澳洲时时彩','azssc','')">
					<div class="lottery-menu icon-iAULUCKY5"></div><span>澳洲时时彩</span></a>
			</div> -->
			<yd-accordion>
				<yd-accordion-item :title= item.className  v-for="(item,indexI) in list" :open="indexI==6?true:false">
					<img slot="icon" style="height:0.6rem" :src="'../../../../static/img/home/allKind/'+item.classId+'.png'" alt="">
				<div style="padding: .24rem;">
					<p @click="changeKindId( childList.kindId,childList.kindName,item.classId) "
					class="kindName" 
					v-for="(childList,indexII) in list[indexI].kindList">{{childList.kindName}}</p>
				</div>
				</yd-accordion-item>
			</yd-accordion>
			<div class="goback-index">
				<router-link to="/allKinds"><span>返回首页</span></router-link>
			</div>
		</div>
	</div>
</template>

<script>
	import Bscroll from 'better-scroll';
	import { mapState, mapActions, mapMutations } from "vuex";
	export default {
		props: ["show"],
		data() {
			return {
			     router:'',
			     list:[],
			     class_id:{
				  '1':'FTC',
				  '2':'HK6',
				  '3':'SSC',
				  '4':'KS',
				  '5':'11x5',
				  '6':'PK10',   
			     }
			}
		},
		created(){
			this.list = this.kindList;
			if(this.list.length == 0 ){
				this.kind().then(res => {
					this.list = this.kindList;
				});
			}else{
				this.list = this.kindList;
			}
			// console.log(this.kindList)
			this.router = window.location.href.slice(window.location.href.indexOf('#')+1);
			this.changeKindId( 'speed','75秒赛车',6)
		},
		computed:{
			...mapState('twobet', [
				'twoGameList'
			]),
			...mapState('home', [
				'kindList'
			]),
		},
		methods: {
			...mapActions('twobet', [
				'twoGameOdd',
			]),
			...mapActions('home', [
				'kind'
			]),
			...mapMutations('twobet',[
				'twoGameOddList'
			]),
			closeAside() {
				this.$emit("close")
			},
			changeKindId(to,name,id){
				let toPush ='/twobet/'+this.class_id[id]+'-'+to;
				// console.log(to,name,id)
				this.$emit("close",name)
				this.$router.push(toPush)
				this.twoGameOdd(to).then( res => {
					this.twoGameOddList = res.data;
					// console.log(res.data,'666')
				})
				// console.log(this.twoGameList,'777')
			}
		},
		watch: {

		}
	}
</script>

<style>
	.lottery_type_name {
		position: absolute;
		display: none;
		z-index: 99999;
		outline: 0;
		width: 100%;
	}

	.lottery_type_name {
		position: fixed;
		width: 42%;
		height: 100%;
		overflow: hidden;
		top: 0;
		display: block;
		transform: translate3d(-110%, 0, 0);
		-webkit-transform: translate3d(-110%, 0, 0);
		-moz-transform: translate3d(-110%, 0, 0);
		-ms-transform: translate3d(-110%, 0, 0);
		-o-transform: translate3d(-110%, 0, 0);
		background-color: #fff!important;
		z-index: 999;
		-webkit-box-shadow: 0 0 16px rgba(55, 55, 55, .5);
		box-shadow: 0 0 16px rgba(55, 55, 55, .5);
		-webkit-transition: transform .2s ease-in-out;
		-o-transition: transform .2s ease-in-out;
		transition: transform .2s ease-in-out;
	}
	
	.sidebar,
	.lottery_type_name {
		height: calc(100% - 45px);
		top: 45px;
		z-index: 7;
	}
	.lottery_type_name.show{
		-webkit-transform: translate3d(0,0,0);
    		-moz-transform: translate3d(0,0,0);
    		-ms-transform: translate3d(0,0,0);
    		-o-transform: translate3d(0,0,0);
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
		z-index: 7;
	}
	
	.overlay.hide {
		opacity: 0;
		visibility: hidden;
	}
	
	.overlay.show {
		visibility: visible;
	}
	
	.overlay.show {
		opacity: 1;
	}
	.lottery_type_name .ltn-name {
    		position: relative;
    		width: 100%;
    		height: calc(100% - 2.16rem);
    		overflow: auto;
    		-webkit-tap-highlight-color: rgba(55,55,55,.3);
}
.main-content.main-height, .lottery_type_name .ltn-name {
    height: calc(100% - 35px);
}
.lottery_type_name .ltn-name a {
    float: left;
    width: 100%;
    text-align: center;
    height: 0.75rem;
    line-height: 0.75rem;
    font-size: 16px;
    color: #fff;
    border-bottom: 1px solid #ccc;
    overflow: hidden;
}
.lottery_type_name .ltn-name .lottery-menu {
    width: 0.75rem;
    height: 0.75rem;
    float: left;
}
.lottery_type_name .ltn-name .lottery-menu {
    background: url('../../../../static/img/twobet/all_lott.png') 0 0 no-repeat;
    background-size: 4.5rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iSPEED10 {
        background-position: -2.35rem -8.5rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iBJPK10{
        background-position: -0.12rem -4rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iAULUCKY10 {
        background-position: -0.12rem -4.95rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iSPEED5 {
        background-position: -0.12rem -9.45rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iCQSSC {
        background-position: -2.35rem -4rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iHK6 {
        background-position: -2.35rem -5.85rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iKLFT {
        background-position: -2.35rem -14.85rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iXYLHC {
        background-position: -2.35rem -17.45rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iXYFT {
        background-position: -0.12rem -5.85rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iGDKLSF {
        background-position: -2.35rem -6.75rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iXYNC {
        background-position: -0.12rem -6.75rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iTJSSC {
        background-position: -2.35rem -7.65rem;
}

.lottery_type_name .ltn-name .lottery-menu.icon-iAULUCKY8 {
        background-position: -0.12rem -8.5rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iXJSSC {
        background-position: -0.12rem -7.65rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iPCEGG {
        background-position: -0.12rem -11.25rem;
}
.lottery_type_name .ltn-name .lottery-menu.icon-iAULUCKY5 {
        background-position: -2.35rem -4.95rem;
}

.lottery_type_name .ltn-name span {
    width: calc(100% - 1rem);
    height: 0.8rem;
    color: #8a8a8a;
    text-align: left;
    float: left;
}
.lottery_type_name .goback-index {
    width: 100%;
    text-align: center;
    line-height: 35px;
    background: #2061b3;
    position: absolute;
    left: 0;
    bottom: 0;
}
.lottery_type_name .goback-index a {
    color: #fff;
    font-size: .9em;
}
.kindName{
	height: 0.6rem;
	border-bottom: 1px solid #ccc;
	line-height: 0.6rem;
	padding-left: 0.1rem;
}
</style>