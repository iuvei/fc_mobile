<template>
  <div class="noteRecord">
    <div>
      <yd-navbar title="我的投注">
      <!-- <router-link to="/" slot="left"> -->
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
      <!-- </router-link> -->
    </yd-navbar>
    <ul class="noteRecord_head">
      <li :class="changeIndex==1?'active':''" @click="changeIdx(1,kindId)">注单查询</li>
      <li :class="changeIndex==2?'active':''" @click="changeIdx(2,kindId)">追号查询</li>
      <li :class="changeIndex==3?'active':''" @click="changeIdx(3,kindId)">撤单查询</li>
      <li >
        <!-- <yd-cell-item arrow type="label"> -->
          <select slot="right" v-model="kindId">
            <option value="" @click="changeIdx(4,kindId)" >全部</option>
            <option v-for="(item,index) in kindNameList" :value="kindIdList[index]">{{item}}</option>
          </select>
          <span>></span>
        <!-- </yd-cell-item> -->
      </li>
    </ul>
    </div>
    
    <div class="noteRecord_bav"  >
      <div v-show="nav_text" class="text">
        <div class="noteRecord_bav_but" v-if="this.changeIndex != 3" v-show="nav_choic"  >
          <div @click="_allbut()">
          	<input id="inp_all" class="inp_but " type="checkbox" />
          	<span>全选</span>
            <!--<yd-checkbox v-model="checkbox1">全选</yd-checkbox>-->
          </div>
          <div @click="_cancelOrder(changeIndex,'')">
            <yd-button type="hollow">撤单</yd-button>
          </div>
        </div>
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">
          <yd-list theme="1" slot="list">
            <div class="noteRecord_bav_text" v-for="(item,index) in list">
              <div v-show="yd_che">
                <input class="inp_but inp_list" ref="ccc" type="checkbox" />
                <!--<input ref="ccc" >{{msg}}</yd-checkbox>-->
              </div>
              <div>
                <img :src="'../../../../static/img/node_recore/'+item.baseLotteryId+'.png'" alt="">
              </div>
              <div>
                <p>{{item.baseLotteryName}}</p>
                <p>{{item.gameName}}</p>
              </div>
              <div>
                <p>第{{item.periodNo}}期</p>
                <p>投注总额：{{item.allAmount}}</p>
              </div>
              <div>
                <yd-button type="danger" @click.native = _queryMemberReportOne(index) :idx='index'>详情</yd-button>
              </div>
            </div>
          </yd-list>
          <!-- 数据全部加载完毕显示 -->
          <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

          <!-- 加载中提示，不指定，将显示默认加载中图标 -->
          <!--<img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>-->
        </yd-infinitescroll>
      </div>
      <div v-show="no_tz" style="">
        <div class="no_img">
          <img src="../../../../static/img/node_recore/no_record_03.png" alt="">
        </div>
        <div class="no_text">
          <p>暂无投注记录哦 ～</p>
          <p>不要让大奖溜走，购彩去 ～</p>
          <yd-button type="hollow" @click.native="toPath" >去投注 ></yd-button>
        </div>
      </div>
      <div v-show="no_zh" >
        <div class="zhh_no_img">
          <img src="../../../../static/img/node_recore/zhh_no_img_03.png" alt="">
        </div>
        <div class="no_text">
          <p>暂无追号记录哦 ～</p>
          <p>大奖不等待，1元中千元大奖 ～</p>
          <yd-button type="hollow" @click.native="toPath" >立即追号 ></yd-button>
        </div>
      </div>
    </div>
    <yd-popup v-model="show1" position="center" width="90%">
      <div style="background-color:#fff;">
        <div class="popup_head">
          注单明细
        </div>
        <ul class="popup_ul">
          <li>
            <span>注单号</span>
            <span>:</span>
            <span></span>
          </li>
          <li>
            <p>	{{lotteryReportList.orderNo}}</p>
          </li>
          <li>
            <span>下注时间</span>
            <span>:</span>
            <span>{{time}}</span>
          </li>
          <li>
            <span>注数</span>
            <span>:</span>
            <span>{{lotteryReportList.payTimes}}</span>
          </li>
          <li>
            <span>注单金额</span>
            <span>:</span>
            <span>{{lotteryReportList.singleAmount}}</span>
          </li>
          <li>
            <span>彩种</span>
            <span>:</span>
            <span>{{lotteryReportList.lotteryName}}</span>
          </li>
          <li>
            <span>玩法</span>
            <span>:</span>
            <span>{{lotteryReportList.gameName}}</span>
          </li>
          <li>
            <span>开奖号码</span>
            <span>:</span>
            <span>{{lotteryReportList.winNumbers}}</span>
          </li>
          <li>
            <span>销售返点</span>
            <span>:</span>
            <span>{{lotteryReportList. rebateAmount}}</span>
          </li>
          <li>
            <span>中奖金额</span>
            <span>:</span>
            <span>{{lotteryReportList.winAmount}}</span>
          </li>
          <li>
            <span>实际输赢</span>
            <span>:</span>
            <span>{{lotteryReportList.realAmount}}</span>
          </li>
          <li>
            <span>状态</span>
            <span>:</span>
            <span>{{lotteryReportList.statusView}}</span>
          </li>
          <li>
            <span>下注码</span>
            <span>:</span>
            <span>{{lotteryReportList.lotteryNumbers}}</span>
          </li>
        </ul>
      </div>
      <!--<div style="text-align: center;position: relative" alt="" @click.native="show1 = false" >-->
        <!--<img src="../../../../static/img/node_recore/cha.png" >-->
      <!--</div>-->
    </yd-popup>
  </div>
</template>
<script>
  import {InfiniteScroll} from 'vue-ydui/dist/lib.rem/infinitescroll';
  // Vue.component(InfiniteScroll.name, InfiniteScroll);
	import { mapState, mapActions, mapMutations } from "vuex";
	// import upLoading from '../../common/upLoading.vue'
  export default {
    data () {
      return {
        msg: '',
        checklist3: [],
        isCheckAll: false,
        checklist1: [],
        checkbox1: false,
        show1: false,
        nav_text: false,
        no_tz: true,
        no_zh: false,
        yd_che: true,
        nav_choic:false,
        changeIndex: 1,
        list:[],
        countAll:'',
        kindlist:[],
        kindNameList:[],
        kindId:'',
        kindIdList:[],
        order:'',
        lotteryReportList:[],
        time:'2018-10-10 10:10:10..',
        status:'',
        allpro:[],
        all:false,
        //  上拉加载数据
        page: 1,
        pageSize: 10,
        // 彩票logo
        imgs:[
          { '11选5': '11×5'},{'安徽快三': 'ahks'},{'北京赛车': 'bjsc'},{'北京PK10': 'bjsc-pk10'},{'重庆时时彩': 'cqssc'},
          {'江西11选5': 'jx11×5'},{'江西时时彩': 'jxssc'},{'快三': 'ks'},{'M5分分彩': 'M5ffc'},{'M5快三': 'M-5ks'},{'M5三分彩': 'M5-sfc'},
          {'M5五分彩': 'M5-wfc'},{'山东11选5': 'sd11×5'},{'时时彩': 'ssc'},{'天津时时彩': 'tjssc'},{'新疆时时彩': 'xjssc'}
        ]
      }
    },
    created(){
    	this._queryLotteryOrderOwn('',1,'1');
    	this._kind();
//  	this._allbut();
//       this.loadBottom()

    },
    methods: {
    	...mapActions('home',[
    		'queryLotteryOrderOwn',
    		'kind',
    		'queryMemberReportOne',
    		'cancelOrder'
    	]),
    	...mapMutations('home',[
    		'savequeryLotteryOrderOwn',
    		'kindList',
    		'queryMemberReportOneList',
    		'cancelOrderList'
    	]),
      change(value, isCheckAll) {
        this.isCheckAll = isCheckAll;
      },
      checkAll() {
        this.isCheckAll = !this.isCheckAll;
        this.$refs.checklistDemo.$emit('ydui.checklist.checkall', this.isCheckAll);
      },
      changeIdx(ind,id){
        let that = this;
//      console.log(ind,id)
        that.changeIndex = ind;
        that._queryLotteryOrderOwn(id,1,that.changeIndex)
      },
      // 获取所有彩种
      _kind(){
      	let that = this;
	      this.kind().then((res) => {
	      	let list = res.data;
	      	// console.log(list,'00000')
	      	list.forEach((item) => {
            that.kindlist = item.kindList;
            // console.log(that.kindlist,'3333')
	      		that.kindlist.forEach((iv) => {
		      		that.kindNameList.push(iv.kindName);0.
		      		that.kindIdList.push(iv.kindId)
		      	})
	      	})
	      	// console.log(that.kindNameList,'333');
//	      	console.log(that.kindIdList);
	      })
      },
      //我的投注
	    _queryLotteryOrderOwn(id,pag,sta){
	    	let that = this;
	    	// console.log(that.imgs,'333');
	    	that.status = sta;
	    	this.queryLotteryOrderOwn({
						baseLotteryId: id,
						page:pag,
						status: sta+''
					}).then((res) => {
						// console.log(res);
						that.list = res.data.lotteryOrder;
						that.countAll = res.data.countAll;
						if(that.countAll === 0){
							if(sta === 1 ){
			          that.nav_text = false;
			            that.no_tz = true;
			            that.no_zh = false;
			        }else if(sta === 2){
			          that.nav_text = false;
			          that.no_tz = false;
			          that.no_zh = true;
			        }else if(sta === 3){
			          that.nav_text = false;
			          that.no_tz = true;
			          that.no_zh = false;
			        }
						}else if(that.countAll != 0){
							that.nav_text = true;
							that.no_tz = false;
			        that.no_zh = false;
			        if(sta === 3){
			        	that.yd_che = false;
			        }else{
			        	that.yd_che = true;
			        }
						}
					})
	    },
	    // 查看详情
	    _queryMemberReportOne(e){
	    	let that = this;
	    	that.show1 = true;
        that.order = that.list[e].orderNo;
        // console.log(that.order)
	    	this.queryMemberReportOne({
	    		orderNo:that.order
	    	}).then((res) => {
	    		that.lotteryReportList = res.data
	    		that.time = that.lotteryReportList.payTime.substring(0,19)
	    		// console.log(that.lotteryReportList)
	    	})
	    },
	    // 全选/反选
	    _allbut(){
	    	 //获取checkbox按钮组
 					this.allpro = document.getElementsByClassName("inp_list");
 					// 获取全选按钮
 					this.all = document.getElementById("inp_all");
 					 //全选按钮被选中时，遍历所有按钮
			    for(let i=0;i<this.allpro.length;i++){

          if(this.all.checked == true) {
            this.allpro[i].checked = true;
          }else if(this.all.checked == false){
          	this.allpro[i].checked = false;
          }
        }
	    },
	    // 撤单
	    _cancelOrder(ind,id){
	    	let that = this;
        //筛选选中状态的投注
        let che = document.getElementsByClassName("inp_list");
        for(var i=0,listId = [];i<che.length;i++){
          if(che[i].checked == true){
            that.order = that.list[i].orderNo;
            listId.push(that.order)
          }
        }
	    	this.cancelOrder(listId).then((data) => {
	    		console.log(data.data.failNum)
	    		if(listId.length == 0){
		    		this.$dialog.alert({mes:'最少选择一次投注撤单'});
		    	}else if(data.code != 0){
		    		this.$dialog.alert({mes:data.msg});
		    	}else if(data.code == 0 && data.data.failNum == 0){
		    		this.$dialog.alert({mes:'撤单成功！'});
		    	}else if(data.code == 0 && data.data.failNum != 0){
		    		this.$dialog.alert({mes:'撤单成功,但是有'+data.data.failNum+'条超过撤单期限！'});
		    	}
		    	document.getElementById("inp_all").checked = false;
		    	this._allbut();
		    	this.changeIdx(ind,id)
	    	})
	    },
      loadList() {
    	  let that = this;
        this.queryLotteryOrderOwn({
          baseLotteryId: that.kindId,
          page: that.page,
          status: that.status+''
        }).then(function (response) {
          // console.log(response,'333');
          let _list = response.data.lotteryOrder;
          // console.log(_list,'000');
          that.list = that.list.concat(_list);
          //
          if (_list.length < that.pageSize || that.page == 3) {
            /* 所有数据加载完毕 */
            that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
            return;
          }
          //
          // /* 单次请求数据完毕 */
          that.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');
          //
          that.page++;
        });
      },
      toPath(){
        this.$router.push({
          path: '/redPacket'
      })
      }
    },
    watch:{
    	kindId(){
    		this._queryLotteryOrderOwn(this.kindId,1,this.status)
    	},
      changeIndex(){
        this.all.checked = false;
        this._allbut();
        this._queryLotteryOrderOwn('',1,this.status)
      },
      countAll(){
        if(this.countAll = 0 ){
          this.nav_choic = false;
        }else{
          this.nav_choic = true;
        }
      }
    }
  }
</script>
<style>
  .noteRecord{
    /* overflow: hidden; */
    height: 100%;
    width: 100;
    min-height: 100%;
    text-align: center;
    background-color: #f9f9f9;
    display: flex;
    flex-direction:column; 
    font-size: 0.24rem;
  }
  .noteRecord .yd-list-theme1{
    padding: 0;
  }
  .noteRecord .yd-list{
    /* overflow: visible; */
  }
  .noteRecord_bav{
    flex: 1;
    /* position: absolute;
    top: 0;
    left: 0; */
    width: 100%;
    overflow: auto;
    /* margin-top: 2rem; */
    background: #f9f9f9;
    /* min-height: 100%; */
   
  }
  .noteRecord_bav>.text{
    height: 100%;
  }

  .noteRecord_head{
    overflow: hidden;
    width: 100%;
    /* position: fixed;
    top: 1rem;
    left: 0; */
    margin-top: 1rem;
    z-index: 12;
  }
  .noteRecord_head li{
    float: left;
    width: 24%;
    height: 1rem;
    background: #ffffff;
    line-height: 1.04rem;
    font-size: 0.3rem;
    border-bottom: 1px solid #dfdfdf;
    box-sizing: border-box;
  }
  .noteRecord_head li:nth-child(4){
    width: 28%;
    line-height: 1rem;
    font-family: "微软雅黑";
    text-align: center !important;
    color: #000000;
    padding: 0;
    margin: 0;
  }
  .noteRecord_head select{
    float: left;
    width: 75%;
    height: 1rem;
    color: #2c3e50;
    font-size: 0.3rem;
    text-align: center !important;
    font-family:Gabriola;
    line-height: 1rem;
    border: 0rem;
    color: #000000;
  }
   .noteRecord_head span{
    float: left;
    width: 25%;
   
  }
  .noteRecord_head option {
  	padding: 0 !important;
  	border: 0 !important;
  	text-align: center;
    color: #000000;
  }
  .noteRecord .yd-navbar{
    background: #011935 !important;
    width: 100%;
    position: fixed !important;
    top: 0;
    left: 0;
    z-index: 100;
  }
  .noteRecord .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .noteRecord .yd-navbar span{
    color: #ffffff !important;
  }
  .noteRecord_bav_but{
    height: 1rem;
    background: #f5f5f5;
    padding: 0.2rem 0.3rem;
    box-sizing: border-box;
  }
  .noteRecord_bav_but div:nth-child(1){
      float: left;
    line-height: 0.4rem;
    padding-top: 0.1rem;
    width: 1.5rem;
    text-align: left
  }
  .noteRecord_bav_but div:nth-child(2){
    float: right;
  }
  .noteRecord_bav_text{
    height: 1.9rem;
    background: #ffffff;
    padding: 0.35rem 0.25rem;
    box-sizing: border-box;
    margin-bottom: 0.125rem;
  }
  .noteRecord_bav_text div{
    float: left;
  }
  .noteRecord_bav_text div:nth-child(1){
    padding-top: 0.35rem;
    width: 8%;
  }
  .noteRecord_bav_text div:nth-child(2){
    width: 15%;
  }
  .noteRecord_bav_text div:nth-child(2) img{
    height: 1rem;
  }
  .noteRecord_bav_text div:nth-child(3){
    padding-top: 0.3rem;
    width: 28%;
    font-size: 0.24rem;
  }
  .noteRecord_bav_text div:nth-child(4){
    padding-top: 0.3rem;
    width: 35%;
    font-size: 0.23rem;
  }
  .noteRecord_bav_text div:nth-child(5){
    padding-top: 0.35rem;
    width: 14%;
    float: right;
  }
  .popup_head{
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.4rem;
    background: #011935;
    color: #ffffff;
  }
  .popup_ul{
    padding-bottom: 0.5rem;
  }
  .popup_ul li{
  	width: 100%;
    height: 0.55rem;
    line-height: 0.55rem;
    background: #ffffff;
    text-align: left;
    padding: 0 0.5rem;
    box-sizing: border-box;
  }
   .popup_ul li:nth-child(2){
  	/* font-size: 0.24rem !important; */
  }
  .popup_ul li:nth-child(2n){
    background: #f7f3e7;
  }
  .noteRecord .yd-popup-content{
    border-radius: 0.1rem;
  }
  .popup_ul li span{
    float: left;
    font-size: 0.3rem;
  }
  .popup_ul li span:nth-child(1){
      width: 23%;
    color: #da1c36;
  }
  .popup_ul li span:nth-child(2){
     width: 5%;
    color: #da1c36;
    font-size: 0.4rem;
   }
  .popup_ul li span:nth-child(3){
    width: 70%;
  }
  .no_img{
    padding: 2rem 1.8rem 0 1.8rem;
    height: 6.3475rem;
    width: 100%;
    box-sizing: border-box;
    background-size: cover;
  }
  .no_img img{
   width: 4rem;
  }
  .no_text{
  	height: 45%;
  }
  .no_text p{
    height: 0.6rem;
    font-size: 0.3rem;
    font-weight: 700;
    color: #a8a8a8;
  }
  .no_text p:nth-child(1){
    color: #303030;
  }
  .no_text .yd-btn{
    width: 30%;
    height: 0.6rem;
    color: #da1c36;
    font-size: 0.35rem;
    /*font-family:Gabriola;*/
  }
  .zhh_no_img{
    padding: 1.5rem 1.5rem 0 1.5rem;
    height: 55%;
    width: 100%;
    box-sizing: border-box;
    background-size: cover;
  }
  .zhh_no_img img{
    width: 5rem;
  }
  .noteRecord .active{
    color: #da1c36;
    border-bottom: 0.04rem solid #da1c36 !important;
  }
  .inp_but{
  	display: inline-block;
  	height: 0.4rem;
  	width: 0.4rem;
  	background: #ffffff;
  	border: 0;
  }
</style>
