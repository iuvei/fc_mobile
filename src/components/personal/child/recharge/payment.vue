<template>
<div id="payment">
<yd-navbar title="充值订单">
        
    </yd-navbar>
    <div class="container">
    <ul class="list">
        <li><p><span class="span">银行名称：</span><span id="bankName"><img :src="PaymentOrder[0].logo" :alt="PaymentOrder[0].bankName"></span></p></li>
        <li><p><span class="span">订单号：</span><span id="order">{{PaymentOrder[0].orderNo}}</span></p><button class="btn" data-clipboard-target="#order">复制</button></li>
        <li><p><span class="span">银行卡号：</span><span id="accountNumber">{{PaymentOrder[0].bankAccount}}</span></p><button class="btn" data-clipboard-target="#accountNumber">复制</button></li>
        <li><p><span class="span">收款人：</span><span id="recevier">{{PaymentOrder[0].receiver}}</span></p><button class="btn" data-clipboard-target="#recevier">复制</button></li>
        <li><p><span class="span">开户人：</span><span id="accountPerson">{{PaymentOrder[0].name}}</span></p><button class="btn" data-clipboard-target="#accountPerson">复制</button></li>
        <li><p><span class="span">充值金额：</span><span id="money">{{PaymentOrder[0].amount}}</span></p><button class="btn" data-clipboard-target="#money">复制</button></li>
    </ul>
    <section>
        <p>注意事项：</p>
        <ol>
            <li>收款账号将会不定时更换，请在获取最新信息后充值，否则充值无法到账。</li>
            <li>平台填写金额应当与汇款金额完全一致，否则充值无法到账。</li>
            <li>充值申请提交成功，请在24小时内完成支付。</li>
            <li>支付成功后，请点击我已支付按钮。</li>
        </ol>
    </section>

    </div>
    
    <footer>
      <button @click="submit('5')">取消订单</button>
        <button @click="submit('1')">我已支付</button>
    </footer>

<!-- 模态框-->
    <yd-popup v-model="show" position="center" width="85%" :close-on-masker="false">
            <div class="container" style="background-color:#fff;">
              <img src="../../../../../static/img/personal/recharge/successTip.png" alt="">
                <section>
                  <h3>支付信息</h3>
                  <ul>
                    <li>支付方式：<span class="fontC">在线支付</span></li>
                    <li>支付金额：<span class="fontC">￥{{PaymentOrder[0].amount}}元</span></li>
                  </ul>
                  <ol>
                    <li>成功付款后，客服审核通过后将会自动到账，并弹出到账提示。</li>
                    <li>长时间无反应，请联系客服。</li>
                  </ol>

                </section>
                <p>
                   <button @click="confirm">确定</button>
                </p>
                <div @click="confirm" class="close">
                  <span></span>
                </div>

            </div>
        </yd-popup>
</div>
</template>

<script>
// 复制到剪切板插件
import Clipboard from "clipboard/dist/clipboard.js";
import { mapActions, mapState, mapGetters } from "vuex";
let clipboard = new Clipboard(".btn");
export default {
  data() {
    return {
      show: false
    };
  },
  created() {
    this.clipboard();
  },
  methods: {
    ...mapActions(["updateMoneyOrder"]),
    //   复制粘贴监听
    clipboard() {
      clipboard.on("success", e => {
        if (!Clipboard.isSupported()) {
          alert(1);
        }
        this.$dialog.toast({ mes: "复制成功！", timeout: 1000 });
      });
      clipboard.on("error", e => {
        this.$dialog.toast({
          mes: "复制失败",
          timeout: 1000,
          icon: "error"
        });
      });
    },
    submit(status) {
      if (status === "5") {
        this.$dialog.confirm({
          title: "M5II提示",
          mes: "是否取消订单？",
          opts: () => {
            this.updateMoneyOrder({
              orderNo: this.PaymentOrder[0].orderNo,
              orderStatus: "5"
            }).then(res => {
              if (res.code === 0) {
                this.$router.go(-1);
              } else if (res.code === 1) {
                this.$dialog.toast({
                  mes: res.msg,
                  timeout: 1000,
                   callback: () => {
                       this.$router.go(-1)
                    }
                });
              }
            });
          }
        });
      } else {
        this.updateMoneyOrder({
          orderNo: this.PaymentOrder[0].orderNo,
          orderStatus: "1"
        }).then(res => {
          if (res.code === 0) {
            this.show = true;
          }else if((res.code === 1)){
             this.$dialog.toast({
                  mes: res.msg,
                  timeout: 1000,
                   callback: () => {
                       this.$router.go(-1)
                    }
                });
          }
        });
      }
    },
    confirm(){
       this.show = false;
       this.$router.go(-1);
    }
  },
  computed: {
    ...mapState(["PaymentOrder"])
  }
};
</script>



<style lang="less">
@base_num: 64px;
@font: 15px; /*px*/
// 公共样式-->
@import url("../../../../../static/css/common.less");

#payment {
  height: 100%;
  padding-top: 1rem;
  padding-bottom: 90rem / @base_num;
  font-size: @font;
  display: flex;
  flex-direction: column;
  .container {
    overflow: auto;
    flex: 1;
    .list {
      li {
        height: 1rem;
        margin-left: 0.3rem;
        padding-right: 0.2rem;
        border-bottom: 1px solid #e2e2e2;
        display: flex;
        align-items: center;
        p {
          height: 100%;
          width: 85%;
          display: flex;
          align-items: center;
          span {
            line-height: 1;
          }
          .span {
            display: block;
            width: 28%;
            text-align: right;
          }
          #bankName {
            height: 100%;
            .my-display(none;center);
            img {
              max-height: 1rem;
            }
          }
        }
        button {
          .my-button(15%;0.5rem);
        }
      }
    }
    section {
      p {
        margin: 0.2rem 0.1rem 0.24rem;
      }
      ol {
        margin-left: 0.65rem;
        margin-right: 0.6rem;
        li {
          list-style: decimal;
          margin-bottom: 0.15rem;
        }
      }
    }
  }

  footer {
    width: 100%;
    height: 90rem / @base_num;
    background: #b7b7b7;
    position: fixed;
    bottom: 0;
    .my-display(space-around;center);
    button {
      .my-button(40%;50rem / @base_num);
    }
    button:nth-child(1) {
      background-color: #797777;
    }
  }
  .yd-popup-content {
    overflow: inherit;
    .container {
      border-radius: 5px;
      padding: 0.35rem 0.45rem 0.1rem;
      @img-width: 3rem;
      img {
        width: @img-width;
        position: absolute;
        top: -@img-width / 3;
        left: 0;
        right: 0;
        margin: auto;
      }
      section {
        margin-top: 30%;
        padding: 0.2rem 0.52rem 0.1rem;
        border: 1px solid #edad0d;
        border-radius: 4px;

        h3 {
          width: 1.4rem;
          position: relative;
          top: -0.38rem;
          // text-align: center;
          background: #fff;
        }
        .fontC {
          color: #ea4b4f;
        }
        ol {
          margin-left: 0;
          margin-right: 0;
          margin-top: 0.2rem;
        }
      }
      p {
        button {
          .my-button(100%,0.8rem);
          margin-top: 0.3rem;
          margin-bottom: 0.1rem;
        }
      }
      @width: 30px;
      .close {
        width: @width;
        height: @width;
        position: absolute;
        right: -@width / 2;
        top: -@width / 2;
        background: #fff;
        border-radius: 50%;
        span {
          display: block;
          width: 20px;
          height: 2px;
          background: #49a4f5;
          line-height: 0;
          font-size: 0;
          transform: rotate(45deg);
          position: relative;
          top: 13px;
          left: 5px;
        }
        span:before {
          .my-cross(20px;2px;-90deg);
        }
      }
    }
  }
}
</style>
