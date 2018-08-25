<template>
  <div class="home">
    <yd-flexbox direction="vertical">
      <div class="home_head">
        <Header v-if="isLogin == false"></Header>
        <HeaderII v-if="isLogin == true"></HeaderII>
      </div>
      <yd-flexbox-item class="home_nav">
        <div class="home_content" direction="vertical">
          <div class="home_nav_text">
            <yd-flexbox>
              <div @click="toPash('/loginLog')" class="yd-flexbox-item ka yd-flexbox-item-center" style="background: #bcb101">
                <img src="../../../static/img/home/home_centent_Log_in_record_@2x.png" alt="">
                <p>登入记录</p>
              </div>
              <div @click="toPash('/bankCard')" class="yd-flexbox-item ka yd-flexbox-item-center" style="background: #da542e;margin: 0 3%">
                <img src="../../../static/img/home/home_content_Bank_card_@2x.png" alt="">
                <p>银行卡</p>
              </div>
              <div class="yd-flexbox-item ka yd-flexbox-item-center">
                <div @click="toPash('/noterecord')" style="background: #2c9fe2">
                  <img src="../../../static/img/home/home_content_Note_record_@2x.png" style="height: 35%" alt="">
                  <p>投注记录</p>
                </div>
                <div style="height: 6%"></div>
                <div @click="toPash('/lotteryReport')" style="background: #255293">
                  <img src="../../../static/img/home/home_content_Lottery_Report_@2x.png" alt="">
                  <p>彩票报表</p>
                </div>
              </div>
            </yd-flexbox>
          </div>
          <div class="home_nav_text home_nav_cent">
            <div @click="toPash('/accountBill')" style="background: #00a4a6">
              <img src="../../../static/img/home/home_content_Ledger_record_@2x.png" alt="">
              <p>账变记录</p>
            </div>
            <div></div>
          </div>
          <div class="home_nav_text home_nav_bot">
            <div @click="enterChart" class="home_nav_bot_a">
              <yd-badge v-show="(noticeNum+applyRecord.length)!==0" bgcolor="rgb(235, 0, 4)">{{(noticeNum+applyRecord.length)>99?'99+':(noticeNum+applyRecord.length)}}</yd-badge>
              <img src="../../../static/img/home/home_content_news_@2x.png" alt="">
              <p>聊天室</p>
            </div>
            <div class="home_nav_bot_b">
              <div @click="toPash('/cashflow')" class="home_nav_bot_b_top">
                <img src="../../../static/img/home/home_content_Gold_flow_record_@2x.png" alt="">
                <p>金流记录</p>
              </div>
              <div style="height: 6%"></div>
              <div @click="toPash('/members')" class="home_nav_bot_b_bot">
                <!-- <div  class="home_nav_bot_b_bot"> -->
                <img src="../../../static/img/home/home_hbzt.png" alt="">
                <p>代理会员</p>
              </div>
            </div>
            <div class="home_nav_bot_c">
              <div @click="toPash('/security?id=0')" class="one">
                <img src="../../../static/img/home/home_content_Login_password_@2x.png" alt="">
                <p>登录密码</p>
              </div>
              <div @click="toPash('/security?id=1')" class="two">
                <img src="../../../static/img/home/home_content_Capital_cipher_@2x.png" alt="">
                <p>资金密码</p>
              </div>
              <div @click="toPash('/security?id=2')" class="three">
                <img src="../../../static/img/home/home_content_safety_problem_@2x.png" alt="">
                <p>安全问题</p>
              </div>
              <div @click="toPash('/referralLink')" class="four">
                <i class="fa fa-chain"></i>
                <p>推广链接</p>
              </div>
            </div>
          </div>
        </div>
      </yd-flexbox-item>
      <div class="home_bottom">
        <Footer></Footer>
      </div>
    </yd-flexbox>
  </div>
</template>

<script>
import Header from "../home/dome/home_head.vue";
import HeaderII from "../home/dome/home_headII.vue";
import Footer from "../home/dome/home_foot.vue";
import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      msg: ""
      // hierarchy:''
    };
  },
  created() {
    // this._kind();
    // this.hierarchy = this.userDetails.hierarchy;
    // console.log(this.hierarchy)
    console.log(this.userDetails.type);
  },
  computed: {
    ...mapState(["isLogin"]),
    ...mapState("login", ["userDetails"]),
    ...mapState("home", ["kindList"]),
    ...mapGetters("chart", ["noticeNum"]),
    ...mapState("chart", ["applyRecord"])
  },
  methods: {
    ...mapMutations(["setIsLogin"]),
    ...mapActions("home", ["kind"]),
    ...mapActions("chart", ["chartLogin"]),
    toPash(name) {
      if (this.isLogin == false) {
        this.$dialog.toast({
          mes: "未登录",
          timeout: 1000
          // icon: 'success'
        });
      } else if (
        (name == "/bankCard" ||
          name == "/security?id=0" ||
          name == "/security?id=1" ||
          name == "/security?id=2" ||
          name == "/lotteryReport" ||
          name == "/accountBill" ||
          // name == "/cashflow" ||
          name == "/members" ||
          name == "/referralLink"||
          name == "/loginLog") &&
        this.userDetails.type == 1
      ) {
        this.$dialog.toast({
          mes: "会员登录查看更多",
          timeout: 1000
        });
      }else if(
        ( name == "/members" ||
          name == "/referralLink")&&
           this.userDetails.hierarchy == 0
      ){
        this.$dialog.toast({
          mes: "代理会员畅玩更多",
          timeout: 1000
        });
      }
       else {
        this.$router.push({
          path: name
        });
      }
    },
    // 获取所有彩种
    // _kind() {
    //   let that = this;
    //   this.kind().then(res => {
    //     that.kind_List = res.data;
    //   });
    // },
    //登录聊天室
    enterChart() {
      if (sessionStorage.getItem("chartLogin") !== "1") {
        this.chartLogin({
          account: this.userDetails.account,
          password: sessionStorage.getItem("password"),
          loginFrom: "3"
        }).then(res => {
          if (res.code === 0) {
            sessionStorage.setItem("chartLogin", "1");
            this.$router.push("/chartroom");
          } else if (res.code === 111) {
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1000
            });
          }
        });
      } else {
        this.$router.push("/chartroom");
      }
    }
  },
  components: {
    Header,
    HeaderII,
    Footer
  }
};
</script>

<style lang="less">
.home {
  height: 100%;
  width: 100%;
  background: url("../../../static/img/home/home_bg@2x.png") no-repeat;
  background-size: cover;
  box-sizing: border-box;
  color: #c5cad0;
  font-size: 0.28rem;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  .home_head {
    height: 1rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.15rem;
    margin-bottom: 0.07rem;
  }
  .home_bottom {
    height: 1.2rem;
    width: 100%;
    box-sizing: border-box;
    opacity: 1;
    .home_bottom_item {
      height: 1.2rem;
      box-sizing: border-box;
      padding: 0.08rem 0.1rem;
      color: #ffffff;
      // opacity: 0.7;
      img {
        width: 0.8rem;
        margin-left: 55%;
      }
      div {
        text-align: left;
      }
    }
  }
}
.home_nav {
  overflow: auto;
  height: 100%;
}
.home_nav_text {
  box-sizing: border-box;
  overflow: auto;
  height: 33%;
  .yd-flexbox {
    height: 100%;
    .ka {
      height: 100%;
      position: relative;
      img {
        height: 30%;
        position: absolute;
        top: 40%;
        left: 50%;
        margin-left: -25%;
        margin-top: -23%;
      }
      p {
        position: absolute;
        left: 0;
        bottom: 0.05rem;
        text-align: left;
        color: #ffffff;
        font-size: 0.28rem;
        padding: 0 0.2rem;
      }
      div {
        position: relative;
        height: 47%;
        img {
          width: 30%;
          position: absolute;
          top: 40%;
          left: 50%;
          margin-left: -13%;
          margin-top: -13%;
        }
      }
    }
  }
}
.home_nav_cent div:nth-child(1) {
  width: 27%;
  height: 84%;
  float: left;
  margin-right: 3%;
  margin-top: 4%;
  position: relative;
  img {
    position: absolute;
    top: 45%;
    left: 50%;
    height: 30%;
    margin-left: -25%;
    margin-top: -25%;
  }
  p {
    position: absolute;
    left: 0;
    bottom: 0.05rem;
    text-align: left;
    color: #ffffff;
    font-size: 0.28rem;
    padding: 0 0.2rem;
  }
}
.home_nav_cent div:nth-child(2) {
  width: 70%;
  height: 84%;
  margin-top: 4%;
  float: left;
  background: url("../../../static/img/home/home_content_picture@2x.png")
    no-repeat;
  background-size: cover;
}
.home_nav_bot {
  padding-bottom: 3%;
  .home_nav_bot_a {
    float: left;
    width: 30%;
    height: 100%;
    background: #4816b7;
    position: relative;
    img {
      width: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -25%;
      margin-left: -25%;
    }
    p {
      position: absolute;
      left: 0;
      bottom: 0.05rem;
      text-align: left;
      color: #ffffff;
      font-size: 0.28rem;
      padding: 0 0.2rem;
    }
  }
  .home_nav_bot_b {
    float: left;
    width: 24%;
    height: 100%;
    margin: 0 3%;
    .home_nav_bot_b_top {
      height: 47%;
      width: 100%;
      background-color: #1b9c1b;
      position: relative;
    }
    .home_nav_bot_b_bot {
      height: 47%;
      width: 100%;
      background-color: #f48e20;
      position: relative;
    }
    img {
      width: 40%;
      position: absolute;
      left: 55%;
      top: 44%;
      margin-top: -25%;
      margin-left: -25%;
    }
  }
  .home_nav_bot_c {
    float: left;
    width: 40%;
    height: 100%;
    position: relative;
    div {
      position: relative;
      height: 47%;
      width: 46%;
      float: left;
    }
    .one {
      background-color: #d04423;
      margin-right: 8%;
      margin-bottom: 6%;
    }
    .two {
      background-color: #811e78;
      margin-bottom: 6%;
    }
    .three {
      background-color: #1a75a2;
      margin-right: 8%;
    }
    .four {
      background: rgb(37, 82, 147);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i{
        font-size: 30px;
        margin-bottom: 20px;
      }
    }
    p {
      padding: 0 0.1rem;
    }
    img {
      width: 40%;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-top: -40%;
      margin-left: -20%;
    }
  }
}
.home p {
  position: absolute;
  left: 0;
  bottom: 0.05rem;
  text-align: left;
  color: #ffffff;
  font-size: 0.28rem;
  padding: 0 0.2rem;
}
.home_content {
  height: 100%;
  .yd-flexbox-vertical .yd-flexbox-item {
    width: 100%;
    height: 33%;
  }
}
</style>
