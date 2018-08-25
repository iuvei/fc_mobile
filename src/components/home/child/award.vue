<template>
  <div class="award">
    <div>
      <yd-navbar title="开奖历史">
      <!-- <router-link to="/" slot="left"> -->
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
      <!-- </router-link> -->
    </yd-navbar>
    <div class="award_nav_head">
        <span>彩种类型：</span>
        <div>
          <select slot="right" v-model="classId">
            <option v-for="(item,index) in kind_List" :value="item.classId" v-if="item.className!= '六合彩'" >{{item.className}}</option>
          </select>
          <img src="../../../../static/img/home/xiangxia.png" alt="">
        </div>
      </div>
    </div>
    
      <div ref="wrapper" class="award_nav">
        <div class="content">
          <div class="award_nav_text" v-for="(item,index) in winHistory_list">
            <div>
              <span>{{item.lotteryName}}</span>
              <span>第{{item.periodNos}}期</span>
              <span>{{item.awardTimes}}</span>
            </div>
            <div>
              <ul>
                <li v-for="item in winHistory_list_num[index]"  :class="classId == '6'?'pkTen':''">{{item}}</li>
              </ul>
              <!-- <p>和值：25|组二</p> -->
              <router-link  tag="div" :to="{ name:'awardII',query:{kid:item.baseLotteryId,lName:item.lotteryName,cId:classId}}" ></router-link>
            </div>
            <!-- <div>
              第{{item.periodNos}}期投注截止：03：23
            </div> -->
        </div>
        <div style="height:2.2rem">

        </div>

        </div>
        
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll';
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data() {
      return {
        mag: '开奖历史',
        kind_List:[],
        classId: '3',
        winHistory_list:[],
        winHistory_list_num:[],
        isActiveI:false
      }
    },
    created(){
      this._kind();
      this._winHistory();
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
    computed:{
      ...mapState('login',[
        'userDetails'
      ]),
      ...mapState('home',[
        'kindList'
      ])
    },
    methods:{
      ...mapActions( 'home',[
        'kind',
        'winHistory'
      ]),
      ...mapMutations('home',[
        'kindList',
        'winHistoryList'
      ]),
      // 获取所有彩种
    _kind() {
      let that = this;
      this.kind().then(res => {
        console.log(res.data);
        that.kind_List = res.data;
        })
      },
      _winHistory(){
        let that = this;
        let data = that.classId;
        console.log(that.classId);
        that.winHistory_list_num = [];
        this.winHistory(data).then( res => {
          console.log(res,'333');
          if(res.code == 0 ){
            that.winHistory_list = res.data;

            that.winHistory_list.forEach( item => {
              if(item.periodNo == null || item.periodNo == '' || item.periodNo == undefined){
                item['periodNos'] = '--';
              }else {
                item['periodNos'] = item.periodNo.substring(4);
              };
              if (item.awardTime == null || item.awardTime == '' || item.awardTime == undefined) {
                item['awardTimes'] = "00:00:00";
              }else {
                item['awardTimes'] = item.awardTime.substring(10,19);
              }
              if(item.winNum == null && that.classId == 6){
                that.isActiveI = true;
                that.winHistory_list_num.push(['?','?','?','?','?','?','?','?','?','?']);
              }else if(item.winNum == null && (that.classId == 4 || that.classId == 1) ){
                that.isActiveI = false;
                that.winHistory_list_num.push(['?','?','?']);
              }else if(item.winNum == null){
                that.isActiveI = false;
                that.winHistory_list_num.push(['?','?','?','?','?']);
              } else  {
                that.isActiveI = false;
                that.winHistory_list_num.push(item.winNum.split(','));
              }

            });
          }
          console.log(that.winHistory_list_num);
        })
      }
    },
    watch:{
      classId(){
        this._winHistory()
      }
    }
  }
</script>
<style>
  .award{
    height: 100%;
    text-align: center;
    background-color:#f9f9f9 ;
    display: flex;
    flex-direction:column; 
    /* position: relative; */
  }
  .award_nav{
    /* overflow: auto; */
    position: absolute;
    top: 2rem;
    left: 0;
    /* padding-top: 2rem;  */
    height: 100%;
    width: 100%;
    background: #f9f9f9;
    box-sizing: border-box;
    flex: 1;
    /* padding-bottom: 2rem; */
  }
  .award .yd-navbar{
    background: #011935 !important;
    /* position: fixed !important;
    top: 0;
    left: 0; */
    z-index: 100;
  }
  .award .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .award .yd-navbar span{
    color: #ffffff !important;
  }
  .award_nav_head{
    position: fixed;
    top: 1rem;
    left: 0;
    height: 1rem;
    width: 100%;
    color: #000000;
    box-sizing: border-box;
    border-bottom: 0.125rem solid #dfdfdf;
    z-index: 10;
    background: #ffffff;
  }
  .award_nav_head span{
    float: left;
    height: 1rem;
    width: 30%;
    line-height: 1rem;
    font-size: 0.3rem;
    color: #000000;
  }
  .award_nav_head div{
    float: left;
    width: 25%;
    height: 0.6rem;
    margin: 0.2rem 0.1rem 0 0.1rem;
    /* border: 1px solid #dfdfdf; */
    line-height: 0.6rem;
    padding: 0.1rem;
    box-sizing: border-box;
  }
  .award_nav_head select{
    float: left;
    color: #2c3e50;
    font-size: 0.28rem;
    /* text-align: right; */
    font-family:Gabriola;
    /* height: 0.8rem; */
    border: 0;
  }
  .award_nav_head img{
    float: right;
    /* height: 0.4rem; */
  }
  .award_nav_text{
    height: 2.2rem;
    border-bottom: 0.03rem solid #dfdfdf;
    box-sizing: border-box;
    padding: 0.3rem 0.2rem 0.1rem 0.2rem;
  }
  .award_nav_text div:nth-child(1){
      height: 0.4rem;
    color: #000000;
    text-align: left;
    font-size: 0.3rem;
  }
  .award_nav_text div:nth-child(2){
    height: 1rem;
    text-align: left;
    box-sizing: border-box;
    padding: 0.15rem 0;
    font-size: 0.25rem;
  }
  .award_nav_text div:nth-child(3){
    height: 0.4rem;
    text-align: right;
    color: #a6a6a6;
  }
  .award_nav_text div:nth-child(2) ul{
    float: left;
    min-width: 4rem;
  }
  .award_nav_text div:nth-child(2) ul li{
    color: #ffffff;
    height: 0.7rem;
    width: 0.7rem;
    border-radius: 0.7rem;
    background: #dd1c37;
    text-align: center;
    line-height: 0.78rem;
    float: left;
    margin: 0 0.08rem;
    font-size: 0.35rem;
  }
  .pkTen{
    color: #dd1c37 !important ;
    width: 0.6rem !important;
    text-align: center;
    line-height: 0.7rem;
    background: #f9f9f9 !important;
    margin: 0 0 !important;
  }
  .award_nav_text div:nth-child(2) p{
    line-height: 0.7rem;
    color: #717171;
    float: left;
  }
  .award_nav_text div:nth-child(2) div{
    float: right;
    background:url("../../../../static/img/home/go_right.png") no-repeat;
    width: 0.5rem;
    height: 0.8rem;
    margin-top: -0.2rem;
  }
</style>
