<template>
  <div class="createRoom">
    <yd-navbar title="创建房间">
      <router-link to="/redPacket" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="createRoom_nav">
        <yd-cell-item>
            <span slot="left" class='red'>房间名称：</span>
            <yd-input slot="right" v-model="input6" regex="^\d{5,12}$" placeholder="请输入不少于16个汉字"></yd-input>
        </yd-cell-item>
        <div class="lei">
            <span class='lei_span red' >游戏类别：</span>
            <yd-radio-group v-model="radio4" color="#F00">       
                <yd-radio val="红包大战"></yd-radio>
                <yd-radio val="红包接龙"></yd-radio>
                <yd-radio val="可发可抢"></yd-radio>
            </yd-radio-group>
        </div>
        <yd-cell-item>
            <span slot="left" class='red'>红包金额：</span>
            <yd-input slot="right" v-model="input6" regex="^\d{5,12}$" placeholder=""></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">最小金额：</span>
            <yd-input slot="right" v-model="input6" regex="^\d{5,12}$" placeholder="请输入最小红包金额"></yd-input>
        </yd-cell-item>
        <yd-cell-item>
            <span slot="left">最大金额：</span>
            <yd-input slot="right" v-model="input6" regex="^\d{5,12}$" placeholder="请输入最大红包金额"></yd-input>
        </yd-cell-item>
        <yd-cell-item arrow>
            <span slot="left">福利设置：</span>
            <yd-input slot="right" v-model="input6" regex="^\d{5,12}$" placeholder=""></yd-input>
            
        </yd-cell-item>
        <yd-cell-item >
            <span slot="left">密码设置：</span>
            <yd-input slot="right" v-model="input6" regex="^\d{5,12}$" placeholder=""></yd-input>
            <yd-switch slot="right" v-model="ydswitch"></yd-switch>
        </yd-cell-item>
        <div class="createRoom_but">
            <yd-button size="large" type="warning">福利保证金：0金币</yd-button>
            <yd-button size="large" type="warning">开启费用：0金币</yd-button>
            <yd-button size="large" type="danger">确认创建房间</yd-button>
        </div>
        
        
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return {
        msg: '银行卡',
         input6: '',
        radio4: '红包大战',
        ydswitch: true
      }
    },
    created(){
    },
    computed:{
      
    },
    methods:{
      ...mapActions('home',[
        'memberIfBind'
      ]),
      ...mapMutations('home',[
        'memberIfBindList'
      ]),
    }
  }
</script>
<style >
  .createRoom{
    height: 100%;
    background-color:#f1f1f1 ;
  }
  .createRoom_nav{
    /* overflow: hidden; */
    padding-top: 1.2rem;
    background: #f1f1f1;
    box-sizing: border-box;
    padding-bottom: 0.2rem;
  }
  .createRoom .yd-navbar{
    background: #011935 !important;
  }
  .createRoom .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .createRoom .yd-navbar span{
    color: #ffffff !important;
  }
  .createRoom .yd-cell-item{
      background: #ffffff;
  }
  .lei{
      height: 1rem;
      width: 100%;
      background: #ffffff;
      box-sizing: border-box;
      padding: 0.3rem;
      font-size: 0.29rem;
      margin: 0.2rem 0;
  }
  .lei .lei_span{
      float: left;
      width:25%;
  }
  .lei .yd-radio{
      line-height: 0.4rem;
  }
  /* .lei span{
      float: left;
  } */
  .createRoom_but{
      padding: 0 0.2rem 0.2rem 0.2rem;
      background: #ffffff;
      margin-top: 0.4rem;
  }
  .createRoom_but .yd-btn-block{
      margin-top: 0.2rem;
  }
  .red{
      color:#db1d39;
  }
  
</style>
