<template>
    <div id="reportAll">
    <yd-navbar :title="title">
      
            <yd-navbar-back-icon slot="left" @click.native="back"></yd-navbar-back-icon>
        
    </yd-navbar>
    <div class="container">
      <section v-for="(item,index) of dataList" :key="index">
        <div>
          <p>彩种：<span>{{item.baseLotteryName}}</span></p>
          <p>玩法：<span>{{item.gameName}}</span></p>
          <p>金额：<span>{{item.orderAmount}}</span></p>
          <p>输赢：<span :style="{color:item.realAmount<0?'green':item.realAmount===0?'black':'red'}">{{item.realAmount}}</span></p>
        </div>
        <div>
          <button @click="queryDetail(item.orderNo)">详情</button>
        </div>
      </section>
    </div>
    <footer>
       <Pagination ref="Pagination" align="right" :allCounts='Number(countAll)'  v-on:change="submit_all"  v-on:enter="submit_all"></Pagination>
    </footer>
    <!-- 模态框 -->
    <yd-popup v-model="showDetail" position="center" width="90%" :close-on-masker="false">
            <div class="model">
            <h3>注单明细<yd-icon @click.native="showDetail=false" name="error-outline" size=".45rem"></yd-icon></h3>
            <ul>
              <li><span>订单号：</span><span style="font-size:11px;">{{dataDetail.orderNo}}</span></li>
              <li><span>下注时间：</span>{{dataDetail.payTime?dataDetail.payTime.slice(0,-2):''}}</li>
              <li><span>注数：</span>{{dataDetail.payTimes}}</li>
              <li><span>注单金额：</span>{{dataDetail.singleAmount}}</li>
              <li><span>彩种：</span>{{dataDetail.lotteryName}}</li>
              <li><span>期号：</span>{{dataDetail.periodNo}}</li>
              <li><span>奖金：</span>{{dataDetail.odds}}</li>
              <li><span>返点：</span>{{dataDetail.rebatePercent}}</li>
              <li><span>玩法：</span>{{dataDetail.gameName}}</li>
              <li><span>销售返点：</span>{{dataDetail.rebateAmount}}</li>
              <li><span>开奖状态：</span>{{dataDetail.statusView}}</li>
              <li><span>开奖号码：</span>{{dataDetail.winNumbers}}</li>
              <li><span>中奖金额：</span>{{dataDetail.winAmount}}</li>
            </ul>
            </div>
    </yd-popup>
    </div>
</template>
<script>
import Pagination from "../common/pagination.vue";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      title: "",
      status: "",
      dayTime: "",
      dataList:[],
      countAll:0,
      showDetail:false,
      //注单明细
      dataDetail:{},
      account:''
    };
  },
  created() {
    this.status = this.$route.query.status;
    this.dayTime = this.$route.query.dayTime;
    this.account= this.$route.query.account;
    this.distinguish(this.status);
    this.submit_all(1, false);
    },
  methods: {
    ...mapActions(["queryMemberReportAll",'queryMemberReportOne']),
    submit_all: _.debounce(function(page, changePage, status=this.status, dayTime=this.dayTime) {
      this.queryMemberReportAll({
        account: this.account,
        baseLotteryId: "",
        dayTime: dayTime,
        page: page,
        statusWin: status
      }).then(res => {
        if (res.code === 0) {
          this.countAll=res.data.countAll;
          this.dataList=res.data.lotteryOrder;
        }else if(res.code === 1){
           this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
    }, 200),
    //辨别类型
    distinguish(status) {
      switch (status) {
        case "":
          this.title = "全部";
          break;
        case "0":
          this.title = "中奖";
          break;
        case "4,5":
          this.title = "退码";
          break;
        case "0,1,2":
          this.title = "有效";
          break;
        case "2":
          this.title = "未颁奖";
      }
    },
    //详情
    queryDetail(order){
      this.showDetail=true;
      this.queryMemberReportOne({
        dayTime:this.dayTime,
        orderNo:order
      }).then((res)=>{
        if(res.code===0){
          this.dataDetail=res.data;
        }else if(res.code===1){
           this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }

      })

    },
    //返回
    back(){
      this.$router.go(-1)
    }
  },
  components:{
    Pagination
  }
 
};
</script>
<style lang="less">
@import url("../../../static/css/common.less");

#reportAll {
  .init;
  display: flex;
  flex-direction: column;
  .container {
     padding: 0.2rem 0.3rem 0;
    overflow: auto;
    // height: 100%;
    flex: 1;
    section {
      .my-display(space-between;center);
      margin-bottom: .25rem;

      div {
        p {
          margin-bottom: 0.1rem;
        }
        button {
          border: 1px solid #7d7d7d;
          border-radius: 4px;
          padding: 0.1rem 0.3rem;
          &:active{
             background: #999;
          }
        }
      }
    }
  }
  footer{
    .my-footer;
  }
  .model{
    background: #fff;
    padding: .2rem .25rem;
    border-radius: 4px;
    h3{
      margin-bottom: .2rem;
      .my-display(space-between;center);
    }
    ul{
      li{
        margin-bottom: .15rem;
      }
    }
  }
}
</style>


