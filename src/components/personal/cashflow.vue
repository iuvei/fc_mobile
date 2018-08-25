<template>
  <div id="cashflow">
    <yd-navbar title="金流记录">
      <router-link to="/home" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="container">
      <div>
          <p><span>交易类型：</span>
          <select v-model="type">
              <option value="0">全部</option>
              <option value="1">充值</option>
              <option value="2">取款</option>
              <option value="3">投注</option>
              <option value="4">优惠</option>
          </select>
          </p>
        <DateTime></DateTime>
         <button class="search" @click="submit(1,false)">查询</button>
      </div>
      <article v-if="countAll>0">
        <section v-for="(item,index) of dataList" :key="index"> 
          <ul class="main">
            <li><span>时间：</span>{{item.tradeDate.slice(0,-2)}}</li>
            <li>
              <ul class="portion">
                <li><span>金额：</span>{{item.tradeAmount}}</li>
                <li><span>交易后：</span>{{item.amountAfter}}</li>
              </ul>
            </li>
            <li>
              <ul class="portion">
                <li><span>类别：</span>{{item.tradeType}}</li>
                <li><span>项目：</span>{{item.tradeItem}}</li>
              </ul>
            </li>
            <li class="comments"><span>备注：</span><p>{{item.tradeRemark}}</p></li>
          </ul>
        </section>
      </article> 
    </div>
    <footer>
      <Pagination ref="Pagination" align="right" :allCounts='Number(countAll)' v-on:change="submit" v-on:enter="submit"></Pagination>
    </footer>
    
  </div>
</template>
<script>
import DateTime from "../common/dateTime.vue";
import Pagination from "../common/pagination.vue";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      type:'0',
      countAll:0,
      dataList:[]
    };
  },
  created() {
    this.submit(1,false)
  },
  methods: {
    ...mapActions(['myCash']),
    submit: _.debounce(function(page,changePage){
       if (!changePage) {
        this.initPage();
      }
      this.myCash(`${this.type}/${this.global.time.timeStart}/${this.global.time.timeEnd}/${page}`).then((res)=>{
        if(res.code===0){
          console.log(res.data);
          this.countAll=res.data.count;
          this.dataList=res.data.dataList;
        }else if(res.code===1){
           this.$dialog.toast({
            mes: res.msg,
            timeout: 1000
          });
        }
      })
    },200),
     // 初始化当前页码
    initPage() {
      if (this.$refs.Pagination) {
        this.$refs.Pagination.currentPage = 1;
      }
    }
  },
  components: {
    DateTime,
    Pagination
  },
  watch: {}
};
</script>
<style lang="less">
@import url("../../../static/css/common.less");
#cashflow {
  .init;
  .container {
    .my-container;
    height: 100%;
    div{
      p{
        margin-bottom: .2rem;
        select{
          border: none;
        }
      }
      .search {
        .my-button(100%;
            1rem;
            #d91d36);
      }
    }
    article{
      .my-article;
      section{
        margin-bottom: .4rem;
        .main{
         
          .portion{
            display: flex;
            li:nth-child(1){
              flex: 1;
            }
            li:nth-child(2){
              flex: 2;
            }
          }
          li{
            margin-bottom: .05rem;
             span{
            color: #d91d36;
          }
          }
          .comments{
            display: flex;
            p{
              width: 86%;
              overflow-x: auto;
              white-space: nowrap;
            }

          }
        }
      }

    }
   
  }
   footer{
      .my-footer;
    }
}
</style>
