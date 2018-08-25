<template>
	
	<div class="left_menu left_right_menu">
		<div class="height_overflow" v-if="classId == 'PK10'">
			<a>
				<div class="lrm_two_sides" :class="listShow=='PK10'?'lrm_back':''" @click="list_Show('PK10')">两面盘
					<div class="menu_lines"></div>
				</div>
			</a>
			<a>
				<div class="lrm_two_sides" :class="listShow=='PK10_1_5'?'lrm_back':''" @click="list_Show('PK10_1_5')">单号1 ~ 5
					<div class="menu_lines"></div>
				</div>
			</a>
			<a>
			    <div class="lrm_two_sides" :class="listShow=='PK10_6_10'?'lrm_back':''" @click="list_Show('PK10_6_10')">单号6 ~ 10
					<div class="menu_lines"></div>
				</div>
			</a>
			<a>
				<div class="lrm_two_sides" :class="listShow=='PK10_1_10'?'lrm_back':''" @click="list_Show('PK10_1_10')">单号1 ~ 10
					<div class="menu_lines"></div>
				</div>
			</a>
			<a>
			    <div class="lrm_two_sides" :class="listShow=='PK10_GYJ'?'lrm_back':''" @click="list_Show('PK10_GYJ')">冠亚军组合
					<div class="menu_lines"></div>
				</div>
			</a>
		</div>
        <div class="height_overflow" v-if="classId == 'SSC'">
            <a><div class="lrm_two_sides" :class="listShow=='SSC'?'lrm_back':''" @click="list_Show('SSC')">整合<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='SSC_1'?'lrm_back':''" @click="list_Show('SSC_1')">第一球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='SSC_2'?'lrm_back':''" @click="list_Show('SSC_2')">第二球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='SSC_3'?'lrm_back':''" @click="list_Show('SSC_3')">第三球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='SSC_4'?'lrm_back':''" @click="list_Show('SSC_4')">第四球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='SSC_5'?'lrm_back':''" @click="list_Show('SSC_5')">第五球<div class="menu_lines"></div></div></a>
        </div>
        <div class="height_overflow" v-if="classId == 'HK6'">
            <a><div class="lrm_two_sides" :class="listShow=='HK6'?'lrm_back':''" @click="list_Show('HK6')">特码<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_LM'?'lrm_back':''" @click="list_Show('HK6_LM')">两面<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_SB'?'lrm_back':''" @click="list_Show('HK6_SB')">色波<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_12SX'?'lrm_back':''" @click="list_Show('HK6_12SX')">十二生肖<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_HX'?'lrm_back':''" @click="list_Show('HK6_HX')">合肖<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_TWS'?'lrm_back':''" @click="list_Show('HK6_TWS')">头尾数<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_ZM'?'lrm_back':''" @click="list_Show('HK6_ZM')">正码<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_ZTM'?'lrm_back':''" @click="list_Show('HK6_ZTM')">正码特<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_ZM_1_6'?'lrm_back':''" @click="list_Show('HK6_ZM_1_6')">正码1-6<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_WX'?'lrm_back':''" @click="list_Show('HK6_WX')">五行<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_YXWS'?'lrm_back':''" @click="list_Show('HK6_YXWS')">一肖尾数<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_ZX'?'lrm_back':''" @click="list_Show('HK6_ZX')">正肖<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_7SB'?'lrm_back':''" @click="list_Show('HK6_7SB')">7色波<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_ZZX'?'lrm_back':''" @click="list_Show('HK6_ZZX')">总肖<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_ZXBZ'?'lrm_back':''" @click="list_Show('HK6_ZXBZ')">自选不中<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_LXLW'?'lrm_back':''" @click="list_Show('HK6_LXLW')">连肖连尾<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='HK6_LLM'?'lrm_back':''" @click="list_Show('HK6_LLM')">连码<div class="menu_lines"></div></div></a>
        </div>
        <div class="height_overflow" v-if="classId == 'KLSF'">
            <a><div class=" lrm_two_sides" :class="listShow=='KLSF'?'lrm_back':''" @click="list_Show('KLSF')">整合<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_DQ_1_8'?'lrm_back':''" @click="list_Show('KLSF_DQ_1_8')">单球1～8<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_D1Q'?'lrm_back':''" @click="list_Show('KLSF_D1Q')">第一球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_D2Q'?'lrm_back':''" @click="list_Show('KLSF_D2Q')">第二球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_D3Q'?'lrm_back':''" @click="list_Show('KLSF_D3Q')">第三球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_D4Q'?'lrm_back':''" @click="list_Show('KLSF_D4Q')">第四球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_D5Q'?'lrm_back':''" @click="list_Show('KLSF_D5Q')">第五球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_D6Q'?'lrm_back':''" @click="list_Show('KLSF_D6Q')">第六球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_D7Q'?'lrm_back':''" @click="list_Show('KLSF_D7Q')">第七球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_D8Q'?'lrm_back':''" @click="list_Show('KLSF_D8Q')">第八球<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='KLSF_LM'?'lrm_back':''" @click="list_Show('KLSF_LM')">连码<div class="menu_lines"></div></div></a>
        </div>
        <div class="height_overflow" v-if="classId == 'PCEGG'">
            <a><div class=" lrm_two_sides" :class="listShow=='PCEGG'?'lrm_back':''" @click="list_Show('PCEGG')">主势盘<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='PCEGG_TMSB'?'lrm_back':''" @click="list_Show('PCEGG')">特码包三<div class="menu_lines"></div></div></a>
        </div>
        <div class="height_overflow" v-if="classId == 'FTC'">
            <a><div class=" lrm_two_sides" :class="listShow=='FTC'?'lrm_back':''" @click="list_Show('FTC')">定位胆<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='FTC_EM'?'lrm_back':''" @click="list_Show('FTC_EM')">二码<div class="menu_lines"></div></div></a>
            <a><div class=" lrm_two_sides" :class="listShow=='FTC_ZX'?'lrm_back':''" @click="list_Show('FTC_ZX')">直选<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='PCEGG_TMSB'?'lrm_back':''" @click="list_Show('FTC')">组选<div class="menu_lines"></div></div></a>
            <a><div class=" lrm_two_sides" :class="listShow=='PCEGG'?'lrm_back':''" @click="list_Show('FTC')">大小单双<div class="menu_lines"></div></div></a>
            <a><div class="lrm_two_sides" :class="listShow=='PCEGG_TMSB'?'lrm_back':''" @click="list_Show('FTC')">不定位<div class="menu_lines"></div></div></a>
        </div>
		<div class="lrm_many" :class="{stop:timeActive}" @click="showbet(true)">已选{{cenNum}}注<span>{{palyBut}}</span></div>
		<div class="clear_pool" id="bet_cleart_pool" v-show = false >清空</div>
	</div>
</template>
<script>
import bus from './eventBus.js';
export default {
    props: ['keys'],
    data(){
        return{
            classId:'',
            listShow:'PK10_LMP',
            cenNum:0,
            shopList:[],
            stopTime:'',
            timeActive:false,
            palyBut:'提交注单',
            // betKey:false,

        }
    },
    created(){
        this.classId = this.$route.params.kindId.split('-')[0];
        // console.log(this.classId,'11')
        this.list_Show(this.classId);

    },
    mounted(){
			let that = this;
			bus.$on('userNum',(data)=>{
                // console.log(data)
                that.cenNum = data.encNum;
                this.setJson(data)
            });
            bus.$on('stop_time',(stopTime)=>{
                // console.log(data)
                that.stopTime = stopTime;
            });
		},
    methods:{
        list_Show(name){
            this.listShow = name;
            bus.$emit('userDefinedEvent',this.listShow);
            this.$emit('menu',this.listShow)
        },
        setJson(data){
            // console.log(data)
          this.shopList = [];
          data.name.forEach((item,index) => {
              let obj = {};
              obj.name = item;
              obj.key = data.key[index];
              obj.keyNum = data.keyNum[index];
              obj.amount = 0;
              obj.content = data.key[index].slice(data.key[index].indexOf('_')+1,data.key[index].Length);
              obj.gameId = data.key[index].slice(0,4);
              this.shopList.push(obj)
          });
        },
        showbet(t){
            // console.log(t)
            // this.shopList = this.shopList;
            if(this.cenNum == 0){
                this.$dialog.toast({
                    mes: '您还未选择',
                    timeout: 1500,
                    icon: 'error'
                });
            }else{
                this.$emit('showpopup',t,this.cenNum,this.shopList);
            }
            
        }
    },
    watch:{
        $route(to, from) {
            this.classId = this.$route.params.kindId.split('-')[0];
            if(this.classId == 'PK10'){
                this.listShow = 'PK10'
            }else if(this.classId == 'SSC'){
                this.listShow = 'SSC'
            }else if(this.classId == 'HK6'){
                this.listShow = 'HK6'
            }else if(this.classId == 'KLSF'){
                this.listShow = 'KLSF'
            }else if(this.classId == 'PCEGG'){
                this.listShow = 'PCEGG'
            }
            else if(this.classId == 'FTC'){
                this.listShow = 'FTC'
            }
        },
        listShow(){
            this.cenNum = 0;
        },
        // stopTime(){
        //     if(this.stopTime == "00:00"){
        //         this.timeActive = true;
        //         this.palyBut = '已封盘'
        //     }else{
        //         this.timeActive = false;
        //         this.palyBut = '提交注单'
        //     }
        // },
        keys(){
                // console.log(this.keys)
				if(this.keys == true){
                    this.cenNum = 0;
                     bus.$emit('twobetKey',0);
                }else if(this.keys == false){
                    bus.$emit('twobetKey',1);
                }
			}
    }
}
</script>


<style >
	.bet_choice_number, .left_right_menu {
    height: 100%;
}
.left_right_menu {
    width: 26%;
    /*background: #0063b8;*/
    background: -webkit-linear-gradient(top,rgba(0,99,184,1) 1%,rgba(0,173,189,1) 72%);
    background: -webkit-gradient(linear,left top,left bottom,color-stop(1%,rgba(0,99,184,1)),color-stop(72%,rgba(0,173,189,1)));
    background: -o-linear-gradient(top,rgba(0,99,184,1) 1%,rgba(0,173,189,1) 72%);
    background: linear-gradient(to bottom,rgba(0,99,184,1) 1%,rgba(0,173,189,1) 72%);
    position: relative;
}
.left_menu {
    float: left;
}
.height_overflow {
    overflow: auto;
    height: 70%;
}
.lrm_champion, .lrm_number, .lrm_two_sides {
    height: 51px;
    text-align: center;
    line-height: 50px;
    font-size: 17px;
    color: #fff;
}
.lrm_two_sides {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
}
.lrm_back {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: pointer;
    background: #005d93;
    background: -webkit-linear-gradient(top,rgba(0,93,147,1) 0,rgba(14,97,145,1) 100%);
    background: -webkit-gradient(linear,left top,left bottom,from(rgba(0,93,147,1)),to(rgba(14,97,145,1)));
    background: -o-linear-gradient(top,rgba(0,93,147,1) 0,rgba(14,97,145,1) 100%);
    background: linear-gradient(to bottom,rgba(0,93,147,1) 0,rgba(14,97,145,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#005d93', endColorstr='#0e6191', GradientType=0 );
}
@media (max-width: 384px){
	.lrm_champion, .lrm_number, .lrm_two_sides {
    font-size: 14px;
}
}
@media (max-width: 384px){
	.lrm_two_sides {
    -webkit-box-shadow: inset 0 -3px 3px -3px rgba(0,0,0,.67), 0 3px 1px -3px #fff;
    box-shadow: inset 0 -3px 3px -3px rgba(0,0,0,.67), 0 3px 1px -3px #fff;
}
}
.menu_lines {
    -webkit-box-shadow: -1px 1px 0 0.2px #fff, 0 0 1px 0.5px rgba(0,0,0,.67);
    box-shadow: -1px 1px 0 0.2px #fff, 0 0 1px 0.5px rgba(0,0,0,.67);
    width: 100%;
}
.lrm_many {
    cursor: pointer;
    -ms-user-select: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    width: 58px;
    height: 45px;
    border: 1px solid rgba(255,255,255,.34);
    text-align: center;
    border-radius: .5rem .5rem 0 0;
    line-height: 28px;
    color: rgba(255,255,255,.85);
    background-color: rgb(255,102,0);
    position: absolute;
    left: 0;
    right: 0;
    bottom: 40px;
    margin: auto;
}
.lrm_many {
    bottom: 10px;
    border-radius: .3rem;
    width: calc(100% - 10px);
    height: 50px;
    font-size: .3rem;
}
.lrm_many>span {
    position: absolute;
    bottom: 4px;
    font-size: .25rem;
    line-height: 12px;
    width: 100%;
    left: 0;
}
.bet_choice_number {
    float: left;
    width: 74%;
    overflow: hidden;
    text-align: center;
    position: relative;
}
.stop{
    background-color:#a8a8a8;
}
</style>