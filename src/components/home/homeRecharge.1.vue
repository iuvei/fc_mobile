<template>
  <div class="homeRecharge">
    <yd-flexbox direction="vertical">
      <div class="homeRecharge_head">
        <Header v-if="this.isLogin == false"></Header>
        <HeaderII v-if="this.isLogin == true"></HeaderII>  
      </div>
      <yd-flexbox-item class="homeRecharge_nav">
        <div class="one">
          <Box @click.native="toPash('/recharge')" width="40%" height="100%" backgroundColor="#3b5999" colorEffect="#2b3f6b">
            <p class="homeRecharge_name">充值</p>
            <p> • 公司入款</p>
            <p> • 快捷支付</p>
            <img src="../../../static/img/home/home_icon_recharge@2x.png" alt="">
          </Box>
          <img class="one_img" src="../../../static/img/home/home_content_recharge@2x.png" alt="">
        </div>
        <div class="two">
          <img class="two_img" src="../../../static/img/home/home_content_Withdrawals@2x.png" alt="">
          <Box @click.native="toPash('/withdraw')" width="40%" height="100%" backgroundColor="#0cc7f0" colorEffect="#0c95b3">
            <p class="homeRecharge_name">提现</p>
            <p> • 快速到账</p>
            <p> • 资金安全</p>
            <img src="../../../static/img/home/home_icon_Withdrawals@2x.png" alt="">
          </Box>
        </div>
        <div class="three">
          <Box @click.native="toPash('/help')" width="33%" height="100%" backgroundColor="#34af80" colorEffect="#298964">
             <img src="../../../static/img/home/home_icon_Help_center_@2x.png" alt="">
            <p>帮助中心</p>
          </Box>
        </div>
      </yd-flexbox-item>
      <div class="homeRecharge_bottom">
        <Footer></Footer>
      </div>
    </yd-flexbox>
  </div>
</template>

<script>
import Header from "../home/dome/home_head.vue";
import HeaderII from '../home/dome/home_headII.vue';
import Footer from "../home/dome/home_foot.vue";
import Box from "../common/box.vue";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      bcg: false,
      msg: ""
    };
  },
  created(){
      // console.log(this.isLogin)
    },
    computed:{
	  ...mapState([
		'isLogin'
      ]),
       ...mapState('login',[
        'userDetails'
      ]),
    },
  methods: {
    ...mapActions(["queryBank"]),
    toPash(name){
        if(this.isLogin == false){
         this.$dialog.toast({
						mes: '未登录',
						timeout: 1000,
						// icon: 'success'
                });
        }else if( (name == '/recharge' || name == '/withdraw') && this.userDetails.type == 1){
            this.$dialog.toast({
						mes: '会员登录查看更多',
						timeout: 1000,
						// icon: 'success'
                });
        }else{
            this.$router.push({
            path: name
          })
        }
    }  
  },
  components: {
    Header,
    HeaderII,
    Footer,
    Box
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === "/recharge/companyIncome") {
      this.queryBank({ pcOrPhone: "1", type: "0" }).then(res => {
        if (res.code === 1) {
          next({ path: "/payment" });
        } else {
          next();
        }
      });
    } else {
      next();
    }
  }
};
</script>

<style lang="less">
.homeRecharge {
  height: 100%;
  width: 100%;
  background: url("../../../static/img/home/home_bg@2x.png") no-repeat;
  background-size: cover;
  box-sizing: border-box;
  color: #c5cad0;
  font-size: 0.28rem;
  position: fixed;
  top:0;
  left: 0;
  bottom:0;
  right: 0;
  .homeRecharge_head {
    height: 1rem;
    width: 100%;
    box-sizing: border-box;
    padding: 0 0.15rem;
    margin-bottom: 0.07rem;
  }
  .homeRecharge_bottom {
    height: 1.2rem;
    width: 100%;
    box-sizing: border-box;
    opacity: 1;
    .homeRecharge_bottom_item {
      height: 1.2rem;
      box-sizing: border-box;
      padding: 0.08rem 0.1rem;
      color: #ffffff;
      opacity: 0.7;
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
.active {
  opacity: 1 !important;
}
.homeRecharge_nav {
  /*height: 100%;*/
  text-align: center;
  color: #ffffff;
  overflow: auto;
  div {
    margin-bottom: 3%;
  }
  .one {
    height: 40%;
    #_Box {
      float: left;
      position: relative;
      img {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        width: 20%;
      }
      p {
        font-size: 0.32rem;
        height: 12%;
      }
      .homeRecharge_name {
        margin: 30% 0 10% 0;
        font-size: 0.4rem;
      }
    }
    .one_img {
      float: left;
      width: 60%;
      height: 100%;
    }
  }
  .two {
    height: 29%;
    .two_img {
      float: left;
      width: 60%;
      height: 100%;
    }
    #_Box {
      float: left;
      position: relative;
      img {
        position: absolute;
        left: 0.2rem;
        bottom: 0.2rem;
        width: 18%;
      }
      p {
        font-size: 0.32rem;
        height: 15%;
      }
      .homeRecharge_name {
        margin: 20% 0 7% 0;
        font-size: 0.4rem;
      }
    }
  }
  .three {
    height: 24%;
    width: 100%;
    #_Box {
  
      position: relative;
      img {
        position: absolute;
        top: 40%;
        left: 50%;
        width: 40%;
        margin-left: -20%;
        margin-top: -20%;
      }
      p {
        position: absolute;
        left: 0;
        bottom: 0.05rem;
        text-align: left;
        color: #ffffff;
        font-size: 0.3rem;
        padding: 0.2rem;
      }
    }
  }
}
</style>
