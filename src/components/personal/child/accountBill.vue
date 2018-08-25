<template>
<div id="accountBill">
    <yd-navbar title="帐变记录">
       
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>
          
    </yd-navbar>
    <div class="container"  :style="{height:!(countAll===0)?'100%':'auto'}">
      <div>

        <ul>
          <li><span>记录类型：</span>
          <select slot="right" v-model="global.type">
                         <option value="1">充值</option>
                         <option value="2">提现</option>
                         <option value="3">转点</option>
                         <option value="4">活动优惠</option>
                </select>
          
          </li>
          <li><span>下级账号：</span>
          <input
                 
                    placeholder="为空时查询自己"
                    v-model="account"
                ></li>
        </ul>
        <DateTime></DateTime>
        <button class="search" @touchstart="submit(1,false)">查询</button>
      </div>
      
   
        <!-- 数据为空时的样式 -->
        <section
            class="no_datas"
            v-if="countAll===0"
           
        >
            <img
                class="bgimg"
                src="../../../../static/img/personal/account_empty.png"
                alt=""
            >
                <p>暂无明细记录哦~</p>
                <p style="color:#a4a4a4">充值有优惠，大奖不等人</p>
                <button @click="recharge">立即充值 ></button>
        </section>
                <!-- 有数据时的样式 -->
                <article v-if="!(countAll===0)">
                  <section v-for="(item,index) of dataList" :key="index">
                    <p><span>类别：</span>{{item.item}}</p>
                    <p><span>时间：</span>{{item.confirmDate.slice(0,-2)}}</p>
                    <p><span>金额：</span>{{item.amount}}</p>
                  </section>
                  <ul >
                    <li>{{sumMin.name}}：{{sumMin.sum}}</li>
                    <li>{{sumMax.name}}：{{sumMax.sum}}</li>
                  </ul>
                    
                </article>
               
    </div>
     <footer v-if="!(countAll===0)" >
                        <Pagination
                            align="right"
                            v-on:enter="submit"
                            v-on:change="submit"
                            :allCounts='Number(countAll)'
                            ref='Pagination'
                        ></Pagination>
                    </footer>

</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import DateTime from "../../common/dateTime.vue";
import Pagination from "../../common/pagination.vue";

export default {
  data() {
    return {
      days: ["今天", "昨天", "本周", "上周", "本月", "上月"],
      mark: 0,
      // 返回数据
      dataList: [],
      // 类型
      type: "1",
      account: "",
      //总条数
      countAll: 0,
      sumMin: "",
      sumMax: ""
      // clientHeight:''
    };
  },
  created() {
    if (this.$route.query.account) {
      this.account = this.$route.query.account;
    }

    this.submit(1, false);


    // this.clientHeight=document.documentElement.clientHeight;

    // window.onresize = ()=> {

    //     if(document.documentElement.clientHeight< this.clientHeight){
    //        this.show=false;
    //     }else{

    //     }
    // };
  },
  methods: {
    ...mapActions(["queryChildBill"]),
    recharge() {
      this.$router.push("/recharge");
    },
    //查询
    submit: _.debounce(function(page, changePage) {
      if (!changePage) {
        this.initPage();
      }
      this.queryChildBill({
        account: this.account === "" ? this.userDetails.account : this.account,
        startTime: this.global.time.timeStart,
        endTime: this.global.time.timeEnd,
        page: page,
        type: this.global.type
      }).then(res => {
        if (res.code === 0) {
          console.log(res.data);
          this.sumMin = res.data.sumMin;
          this.sumMax = res.data.sumMax;
          this.countAll = res.data.countAll;
          this.dataList = res.data.lotteryOrder;
        } else if (res.code === 1) {
          this.dataList = [];
          this.countAll =0;
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500
          });
        }
      });
    }, 300),
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
  computed: {
    ...mapState("login", ["userDetails"])
  }
};
</script>

<style lang="less">
@import url("../../../../static/css/common.less");

#accountBill {
  .init;
  .container {
    .my-container;
    div {
      ul {
        margin-bottom: 0.3rem;
        li {
          .my-display(none;center);
          height: 0.7rem;
          margin-bottom: 0.15rem;
          span {
            display: block;
          }
          input {
            border: 1px solid #eeeeee;
            height: 100%;
            text-indent: 7px;
            border-radius: 4px;
          }
          select {
            border: none;
          }
        }
      }
      .search {
        .my-button(100%;
            1rem;
            #d91d36);
        &:active {
          opacity: 0.8;
        }
      }
    }
    .no_datas {
      overflow: hidden;
      .my-display(center;
            center);
      flex-direction: column;
      .bgimg {
        width: 4rem;
        display: block;
        margin-top: 0.2rem;
      }
      p {
        text-align: center;
        margin-bottom: 0.1rem;
      }
      button {
        display: block;
        border: 1px solid #bfbfbf;
        border-radius: 4px;
        color: #d91d36;
        padding: 0.2rem 0.7rem;
        margin-top: 0.2rem;
      }
    }
    article {
      .my-article;
      section {
        margin-bottom: 0.25rem;
        span {
          color: #d91d36;
        }
      }
      ul {
        position: fixed;
        right: 0.3rem;
        bottom: 2rem;
      }
    }
  }
  footer {
    .my-footer;
  }
}
</style>
