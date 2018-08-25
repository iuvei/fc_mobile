<template>
  <div class="footer">
    <yd-flexbox>
      <yd-flexbox-item  class="home_bottom_item"  style="background-color: #3e5b97">
        <router-link class="_div" tag="div" to="/allKinds" active-class="_active">
          <img src="../../../../static/img/home/tab_normal_qbcz@2x.png" alt="">
          <div >福彩主页</div>
        </router-link>              
      </yd-flexbox-item>
      <yd-flexbox-item  class="home_bottom_item"  style="background-color:#0da30d ">
        <router-link class="_div"  tag="div" to="/redPacket"  active-class="_active">
          <img src="../../../../static/img/home/tab_normal_hbxt@2x.png"  style="width: 39%" alt="">
          <div >彩种大厅</div>
        </router-link>       
      </yd-flexbox-item>
      <yd-flexbox-item  class="home_bottom_item" style="background-color: #45a1d8"  >
        <router-link class="_div" tag="div" to="/homeRecharge" active-class="_active">
         <img src="../../../../static/img/home/tab_normal_cztx@2x.png" alt="">
         <div >充值提现</div>
         </router-link>
      </yd-flexbox-item>
      <yd-flexbox-item  class="home_bottom_item" style="background-color: #ff6551"  >
        <router-link class="_div"   tag="div" to="/home" active-class="_active">
        <yd-badge v-show="(noticeNum+applyRecord.length)!==0" bgcolor="rgb(235, 0, 4)">{{(noticeNum+applyRecord.length)>99?'99+':(noticeNum+applyRecord.length)}}</yd-badge>
          <img src="../../../../static/img/home/tab_normal_gezx@2x.png" alt="">
          <div >个人中心
             
          </div>
        </router-link>
      </yd-flexbox-item>
    </yd-flexbox>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {},
  computed:{
    ...mapGetters('chart',['noticeNum']),
    ...mapState("chart", ['applyRecord']),
  }
};
</script>
<style lang="less">
.footer {
  color: #ffffff;
  font-size: 0.28rem;
  .home_bottom_item {
    height: 1.2rem;
    box-sizing: border-box;
    padding: 0.08rem 0.1rem;
    color: #ffffff;
    img {
      width: 0.8rem;
      margin-left: 55%;
    }
    div {
      text-align: left;  
    }
    ._div{
      opacity: 0.4;
    }
    ._active {
      opacity: 1 !important;
    }
    .yd-badge{
      position: absolute
    }
  }
}
</style>
