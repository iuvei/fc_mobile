<template>
     <div id="recharge">
  
    <yd-navbar >
  
      <!-- <router-link to="/homeRecharge" slot="left"> -->
  
        <yd-navbar-back-icon @click.native="$router.push('/homeRecharge')" slot="left"></yd-navbar-back-icon>
       <!-- </router-link> -->
  
      <div slot="center">
  
        <ul class="recharge_tab">
  
          <router-link   to="/recharge/companyIncome" tag="li" active-class="activeColor" >公司入款</router-link>
  
          <router-link to="/recharge/quickPayment" tag="li" active-class="activeColor">快捷支付</router-link>
  
        </ul>
  
      </div>

  
    </yd-navbar>
    <router-view></router-view>
  
  
  
  
  
  </div>
</template>
<script>
export default {
  data() {
    return {
      //激活状态

      activeLink: "active"
    };
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
@base_num: 64px;

#recharge {
  .activeColor {
    color: #d9213b !important;
    background: #fff;
  }
  height: 100%;
  padding-top: 1rem;
  overflow: hidden;
  .recharge_tab {
    width: 252rem / @base_num;

    height: 40rem / @base_num;

    border-radius: 4px;

    li {
      width: 50%;

      line-height: 40rem / @base_num;

      color: #a8a8b4;

      text-align: center;

      font-size: 16px; /*px*/
      font-weight: 600;

      float: left;

      border: 1px solid #fff;
    }

    li:nth-child(1) {
      border-radius: 4px 0 0 4px;
    }

    li:nth-child(2) {
      border-radius: 0 4px 4px 0;
    }
  }
}
</style>


