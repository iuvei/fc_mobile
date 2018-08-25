<template>
  <div class="bankCard">
    <yd-navbar title="银行卡">
      <router-link to="/home" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
      <router-link to="/newBankCard" slot="right" v-if="this.memberIfBind_list.length<5" v-show="haveBank">
        <span style="font-size: 0.6rem">＋</span>
      </router-link>
    </yd-navbar>
    <div class="bankCard_nav" v-show="haveBank" >
      <div class="balance">
        <span>
          账户余额：￥ <span style="color: #d62541">{{userDetails.accountBalance}}</span>
        </span>
      </div>
      <div class="card">
        <div class="cardList" v-for="item in memberIfBind_list">
          <img src="../../../../static/img/shengfa_big.png" class="big_img" alt="">
          <img src="../../../../static/img/shenfa_min.png" class="min_img" alt="">
          <span>{{item.bankName}}</span>
          <p>{{item.bankAccount}}</p>
        </div>
      </div>
      <div class="prompt">
        <div>
          <i>i</i>
          <span>使用提示</span>
        </div>
        <div>
          <p>1.银行卡绑定成功后，平台任意区域都 <span class="red">不会</span>出现您的完整银行账号，开户姓名等信息。</p>
          <p>2.每个游戏账号最多绑定 <span  class="red">5</span> 张银行卡，您已经成功绑定 <span  class="red">{{this.memberIfBind_list.length}}</span> 张</p>
          <p>3.一个账户只能绑定同一个开户人姓名的银行卡。</p>
        </div>
      </div>
    </div>
    <div class="bankCard_nav" v-show="noBank" >
      <div class="bankCard_nav_no">
        <img src="../../../../static/img/bank_kong.png" alt="">
        <div>
          <p>您还没有绑定第一张银行卡哦~</p>
          <p>点击下面绑定按钮首张银行卡</p>
        </div>
      </div>
      <div style="padding: 0rem 0.25rem;">
        <yd-button size="large" type="danger" @click.native="toPash('/firstBankCard')" >绑定</yd-button>
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
        memberIfBind_list:[],
        haveBank:false,
        noBank:true,
      }
    },
    created(){
      this._memberIfBind();
      console.log(this.userDetails)
    },
    computed:{
      ...mapState('login',[
        'userDetails'
      ])
    },
    methods:{
      ...mapActions('home',[
        'memberIfBind'
      ]),
      ...mapMutations('home',[
        'memberIfBindList'
      ]),
      _memberIfBind(){
        let that = this;
        this.memberIfBind().then( res => {
          // console.log(res)
          if(res.code == 0){
            that.haveBank =true;
            that.noBank = false;
          }else if(res.code == 1){
            that.haveBank =false;
            that.noBank = true;
          }
          that.memberIfBind_list = res.data.memberBankAccountList
        })
      },
      toPash(name){
          this.$router.push({
          path: name
        })
      },
    }
  }
</script>
<style >
  .bankCard{
    height: 100%;
    background-color:#f9f9f9 ;
    font-size: 0.28rem;
    display: flex;
    flex-direction: column;
  }
  .bankCard_nav{
    /* overflow: hidden; */
    overflow: auto;
    padding-top: 1rem;
    background: #f9f9f9;
    box-sizing: border-box;
    padding-bottom: 0.2rem;
    flex: 1;
  }
  .bankCard .yd-navbar{
    background: #011935 !important;
  }
  .bankCard .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .bankCard .yd-navbar span{
    color: #ffffff !important;
  }
  .balance{
    height: 1rem;
    line-height: 1rem;
    font-size: 0.35rem;
    box-sizing: border-box;
    padding: 0 0.3rem;
  }
  .prompt{
      height: 2.6rem;
    padding-top: 0.15rem;
  }
  .prompt div:nth-child(1){
    height: 0.6rem;
  }
  .prompt div:nth-child(1){
    padding: 0 0.3rem;
  }

  .prompt div:nth-child(1) i{
    display: inline-block;
    height: 0.5rem;
    width: 0.5rem;
    border-radius: 100%;
    border: 0.02rem solid #e96526;
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.35rem;
    color: #e96526;
  }
  .prompt div:nth-child(1) span{
    font-size: 0.35rem;
    color: #e96526;
  }
  .prompt div:nth-child(2){
    padding-left: 0.8rem;
    padding-right: 0.3rem;
  }
  .prompt div:nth-child(2) p{
    margin: 0.15rem 0;
  }
  .card{
    padding: 0 0.3rem;
  }
  .cardList{
    height: 2.35rem;
    margin-bottom: 0.15rem;
    position: relative;
  }
  .big_img{
    height: 2.35rem;
    width: 100%;
    z-index: 1;
    position: absolute;
    left: 0;
    top:0;
  }
  .min_img{
    height: 1rem;
    width: 1rem;
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    z-index: 10;
  }
  .cardList span{
    position: absolute;
    top: 0.4rem;
    left: 1.5rem;
    color: #ffffff;
    font-size: 0.45rem;
    z-index: 10;
  }
  .cardList p{
    position: absolute;
    top: 1.2rem;
    left: 1.5rem;
    color: #ffffff;
    z-index: 10;
    font-size: 0.45rem;
  }
  .bankCard .red{
    color: #e10101;
    font-size: 0.32rem;
  }
  .bankCard_nav_no{
    width: 100%;
    text-align: center;
    position: relative;
  }
  .bankCard_nav_no div{
    position: absolute;
    top: 75%;
    left: 50%;
    margin-left: -25%;
  }
  .bankCard_nav_no div p:nth-child(1){
    font-size: 0.3rem;
    color: #000;
    margin: 0.2rem 0;
  }
  .bankCard_nav_no div p:nth-child(2){
    font-size: 0.25rem;
    color: #707070;
  }
  .bankCard_nav_no img{
    width: 100%;
  }
</style>
