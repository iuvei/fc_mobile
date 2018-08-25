<template>
    <div id="payScan">
        <yd-navbar title="充值订单">
     
   
    </yd-navbar>
    <p>二维码支付</p>
    <div id="main">
      <ul>
        <li>支付方式：扫码支付</li>
        <li>订单金额：{{qrCode.orderAmount}}元</li>
        <li>
            <div ref="qrcode" id="qrcode"></div>
        </li>
        <li class="fontC">请使用{{$store.state.serviceType==='qq_scan'?'QQ':$store.state.serviceType==='weixin_scan'?'微信':''}}扫一扫</li>
        <li>{{qrCode.orderTime}}</li>
        <li>{{qrCode.orderNo}}</li>
    </ul>
    <a :href="imgSrc" download="二维码"><button class="button_01">保存图片</button></a>
    <!-- <button @click="chatQQ" class="button_02">QQ扫码</button> -->
    <button class="button_03" @click="$router.push('/recharge/quickPayment')">完成</button>
    </div>
    
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      imgSrc:''
    };
  },
  mounted() {
    //生成二维码
    this.qrcode();
     console.log(this.$refs.qrcode.children[0].toDataURL())
  },
  methods: {
    qrcode() {
      let qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 150,
        height: 150
      });
      qrcode.makeCode(this.qrcode.qrCode);
      // qrcode.makeCode("https://www.baidu.com");
      this.imgSrc=this.$refs.qrcode.children[0].toDataURL();
        
    },
    chatQQ(){
      window.location.href="mqqwpa://im/chat?chat_type=wpa";
    }
  },
  computed: {
    ...mapState(["qrCode"])
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
@base: 85px;
@font: 16px; /*px*/
#payScan {
  .init;
  padding-bottom: 0;
  font-size: @font;
  display: flex;
  flex-direction: column;
  p {
    border-bottom: 1px solid #bfbfbf;
    padding: 0.2rem 0.2rem;
  }
  #main {
    padding: 0.2rem 0.7rem 0.3rem;
    flex: 1;
    overflow: auto;
    ul {
      li {
        text-align: center;
        margin-bottom: 0.1rem;
        #qrcode {
          img {
            margin: auto;
          }
        }
      }
      .fontC {
        color: #d91d36;
      }
    }
    button{
      margin-bottom: .2rem;
      a{
        width: 100%;
      }
    }
    .button {
      
      &_01 {
        .my-button(100%;0.75rem;#0dbd2e);
      }
      &_02{
         .my-button(100%;0.75rem;#0dbd2e);
      }
      &_03{
         .my-button(100%;0.75rem;#d91d36);
      }
    }
  }
}
</style>


