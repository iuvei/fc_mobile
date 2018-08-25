
<template>
  <!-- 充值金额模板 -->
  <div id="charge_bank">
    <yd-navbar title="选择充值金额">
      <router-link slot="left" :to="{path:_routers.includes(routerId)?'/recharge/companyIncome':'/recharge/quickPayment'}">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <section class="title">
      <p>支付渠道</p>
    </section>
    <section class="_bank">
      <img :src="params[index].img" alt="">
      <p>{{params[index].title}}</p>
    </section>
    <section class="banks">
      <p>请选择充值种类：</p>
      <div>
        <yd-radio-group v-model="bankType" color="#d62541">
          <yd-radio v-for="(item,index) in dataList" :key="index" :val="index">
            <img :src="item.bankLogo" :alt="_routers.includes(routerId)?item.bankName:item.serviceType">
          </yd-radio>
        </yd-radio-group>
      </div>
    </section>
    <section class="_container">
      <article v-if="_routers.includes(routerId)">
        <p>用户名</p>
        <div>
          <input type="text" v-model="userName">
        </div>
        <span class="presentation">请填入开户人姓名，避免出现无法核实的情况</span>
      </article>
      <p>充值金额（元）</p>
      <div>
        <input @blur="restrictions" type="number" v-model="money">
      </div>
      <span class="presentation">单次充值上限为{{dataList[bankType].gatherMax}}元，最少充值{{dataList[bankType].gatherMin}}元</span>
      <ul>
        <li v-for="(item,index) in moneyList" :key="index">
          <label :class="{activeStyle:index==mark&&compare(item.num),disable:!compare(item.num)}" @click="changeBgc(index,item)" :for="index">{{item.context}}</label><input :value="item.num" v-model="num" style="display:none" :id="index" type="radio"></li>
      </ul>
   
        <button @click="saveMoney"><a style="width:100%;height:100%;display:inline-block;line-height:.9rem" v-if="show" :href="href" target="_blank">下一步</a><span v-else>下一步</span></button>
     
    </section>
    <div v-html="remark" class="tip"></div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      //选择银行
      bankType: 0,
      moneyList: [
        {
          context: "100元",
          num: 100
        },
        {
          context: "200元",
          num: 200
        },
        {
          context: "300元",
          num: 300
        },
        {
          context: "500元",
          num: 500
        },
        {
          context: "1000元",
          num: 1000
        },
        {
          context: "2000元",
          num: 2000
        },
        {
          context: "3000元",
          num: 3000
        },
        {
          context: "5000元",
          num: 5000
        }
      ],
      //用户姓名
      userName: "",
      //充值金额数
      money: "",
      //选中金额数
      num: "",
      //标记（点击后判断是否变样式）
      mark: 0,
      //路由id
      routerId: "",
      routers: [
        "bank",
        "qqTransfer",
        "alipayTransfer",
        "wechatTransfer",
        "wechatScan",
        "qqScan",
        "alipayScan"
      ],
      params: [
        {
          title: "银行卡转账",
          img: "../../../../../static/img/personal/recharge/banks.png"
        },
        {
          title: "QQ转账",
          img: "../../../../../static/img/personal/recharge/qq.png"
        },
        {
          title: "支付宝转账",
          img: "../../../../../static/img/personal/recharge/ailpay.png"
        },
        {
          title: "微信加好友转账",
          img: "../../../../../static/img/personal/recharge/wechat.png"
        },
        {
          title: "微信扫码",
          img: "../../../../../static/img/personal/recharge/wechat.png"
        },
        {
          title: "QQ扫码",
          img: "../../../../../static/img/personal/recharge/qq.png"
        }
      ],
      //路由对应的下标
      index: "",
      //说明
      remark: "",
      //银行列表
      dataList: [],
      //跳转银行页面路径
      href: "#",
      target: "_self",
      show:false
    };
  },
  created() {
    //获取id
    this.routerId = this.$route.params.id;
    this.index = this.routers.indexOf(this.routerId);
    //初始化数据列表
    this.dataList = this.datas(this.routerId);
    //初始化说明
    this.remark = this.incomeMessage(this.routerId);
    this.money = this.moneyList[0].num;
    //默认第一个银行页面
    this.href=this.dataList[0].bankEntrance;
  },
  methods: {
    ...mapActions([
      "saveMoneyOrder",
      "queryBank",
      "saveThreeOrder",
      "updateThreeOrder"
    ]),
    //点击改变样式
    changeBgc(index, item) {
      if (this.compare(item.num)) {
        this.mark = index;
      } else {
        return;
      }
    },
    //返回
    routerReturn() {
      this.$router.push("/recharge");
    },
    //会员生成订单
    saveMoney: _.debounce(function() {
      //当是公司入款时
      if (this._routers.includes(this.routerId)) {
        if (this.userName === "") {
          this.$dialog.toast({
            mes: "请输入充值人姓名",
            timeout: 1500
          });
        } else {
          // window.open(this.dataList[this.bankType].bankEntrance);
          this.saveMoneyOrder({
            bankAccountId: this.dataList[this.bankType].bankAccount,
            firstDeposit:
              this.dataList[this.bankType].firstDeposit === false ? "0" : "1",
            incomeType: "0",
            memberName: this.userName,
            orderNo: this.dataList[this.bankType].orderNo,
            saveAmount: String(this.money),
            way: "3"
          }).then(res => {
            if (res.code === 0 && res.msg === "OK") {
              this.queryBank({ pcOrPhone: "1", type: "0" }).then(() => {
                this.$router.push("/payment");
              });
            } else if (res.code === 1) {
              this.$dialog.toast({
                mes: res.msg,
                timeout: 1500
              });
            }
          });
        }
      } else {
        this.$dialog.loading.open("加载中");
        this.$store.commit("serviceType", {
          type: this.dataList[this.bankType].serviceType
        });
        this.saveThreeOrder({
          baseThreeBusinessId: this.dataList[this.bankType].bankAccountId,
          orderNo: this.dataList[this.bankType].orderNo,
          saveAmount: String(this.money),
          serviceType: this.dataList[this.bankType].serviceType,
          way: "3"
        }).then(res => {
          if (res.code === 0) {
            this.updateThreeOrder({
              orderNo: this.dataList[this.bankType].orderNo,
              payType: this.dataList[this.bankType].serviceType
            }).then(res => {
              if (res.code === 0) {
                // this.$router.push("/payScan");
                if (res.data.respCode === "SUCCESS" && res.data.qrCode) {
                  this.$dialog.loading.close();
                  this.$router.push("/payScan");
                } else {
                  this.$dialog.loading.close();
                  this.$dialog.toast({
                    mes: "支付失败，请重新尝试",
                    timeout: 1000,
                    callback: () => {
                      this.queryBank({ pcOrPhone: "1", type: "2" }).then(
                        res => {
                          if (res.code === 2) {
                            this.dataList = this.datas(this.routerId);
                          }
                        }
                      );
                    }
                  });
                }
              } else if (res.code === 1) {
                this.$dialog.loading.close();
                this.$dialog.toast({
                  mes: res.msg,
                  timeout: 1000
                });
              }
            });
          } else if (res.code === 1) {
            this.$dialog.loading.close();
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1000
            });
          }
        });
      }
    }, 200),
    // if (this._routers.includes(this.routerId)) {
    //   this.$router.push("/payment");
    // } else {
    //   this.$router.push("/payScan");
    // }
    //判断是否在充值金额范围内
    compare(number) {
      if (
        number >= this.dataList[this.bankType].gatherMin &&
        number <= this.dataList[this.bankType].gatherMax
      ) {
        return true;
      } else {
        return false;
      }
    },
    //金额限制
    restrictions() {
      if (this.money < this.dataList[this.bankType].gatherMin) {
        this.money = Math.ceil(this.dataList[this.bankType].gatherMin);
      } else if (this.money > this.dataList[this.bankType].gatherMax) {
        this.money = Math.floor(this.dataList[this.bankType].gatherMax);
      } else {
        this.money = this.money === "" ? 1 : Math.round(this.money);
      }
    }
  },
  computed: {
    ...mapGetters(["datas", "incomeMessage"]),
    //快捷支付的路由数组
    _routers() {
      return this.routers.slice(0, 4);
    }
  },
  watch: {
    num(newValue) {
      //只有在充值金额范围内才让用户点击传值
      if (this.compare(newValue)) {
        this.money = newValue;
      }
    },
    bankType(newValue){
       this.href = this.dataList[newValue].bankEntrance;
    },
    userName(newValue){
      if(newValue!==''){
        this.show=true;
      }else{
        this.show=false;
      }
    }
  }
};
</script>

<style lang="less">
@import url("../../../../../static/css/common.less");
@base_num: 64px;
@gap_top: 0.2rem;
@padding: 0.25rem;
.display-mixin {
  display: flex;
  img {
    display: block;
    width: 1.6rem;
    height: 1.6rem;
  }
}

#charge_bank {
  height: 100%;
  padding-top: 1rem;
  overflow: auto;
  section {
    font-size: 16px; /*px*/
    border-bottom: 1px solid #bfbfbf;
  }
  .title {
    height: 65rem / @base_num;
    p {
      line-height: 65rem / @base_num;
      padding-left: @padding;
    }
  }
  ._bank {
    height: 100rem / @base_num;
    .display-mixin();
    p {
      line-height: 100rem / @base_num;
      padding-left: @padding;
    }
  }
  .banks {
    border-bottom: 0;
    padding: 0 @padding;
    margin-bottom: 0.1rem;
    p {
      padding: @padding 0;
    }
    div {
      width: 100%;
      div {
        display: flex;
        flex-wrap: wrap;
        .yd-radio {
          .my-display(none;center);
          padding-right: 0.1rem;
          .yd-radio-text {
            .my-display(none;center);
            img {
              max-height: 0.6rem;
            }
          }
        }
      }
    }
  }
  ._container {
    border-bottom: none;
    p {
      padding-left: @padding;
      padding-top: @gap_top;
    }
    div {
      margin-left: @padding;
      margin-right: @padding;
      input {
        width: 100%;
        height: 49rem / @base_num;
        border: 1px solid #bfbfbf;
        border-radius: 4px;
        text-indent: 7px;
        margin-top: @gap_top;
      }
    }
    .presentation {
      font-size: 12px;
      margin-left: @padding;
      color: rgba(0, 0, 0, 0.43);
      padding: 0;
    }

    ul {
      width: 100%;
      overflow: hidden;

      label {
        width: 105rem / @base_num;
        line-height: 36rem / @base_num;
        text-align: center;
        float: left;
        border: 1px solid #bfbfbf;
        margin-left: 0.199rem;
        margin-top: 10px;
        background: #f0f0f0;
        font-weight: 700;
      }
      .activeStyle {
        border: 1px solid #d91d36;
        background: #f28896;
        color: #fff;
      }
      .disable {
        background: rgba(190, 190, 190, 0.904);
        color: rgba(245, 244, 244, 0.425);
      }
    }
    button {
      .my-button(400rem / @base_num;58rem / @base_num);

      margin: 25px auto;
    }
  }
  .tip {
    padding: 0 @padding 0.3rem;
  }
}
</style>
