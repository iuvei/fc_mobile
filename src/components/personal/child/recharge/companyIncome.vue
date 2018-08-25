<template>
<div id="companyIncome">
    <ul>
        <li
            v-for="(item,index) in incomeDatas"
            :key="index"
            @click="routerPush(item.path)"
            @touchstart="color(index,true)"
            @touchend="color(index,false)"
            :class="{'bgcolor':mark===index}"
        >
          <img
            :src="item.img"
                :alt="item.name"
          >
          <div>
            <h3>{{item.name}}</h3>
            <p>{{item.context}}</p>
          </div>
        </li>
    </ul>
</div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      incomeDatas: [
        {
          name: "银行卡转账",
          context: "使用银行卡向该银行转账充值",
          img: "../../../../../static/img/personal/recharge/banks.png",
          path: "/transfer/bank"
        },
        {
          name: "QQ转账",
          context: "使用qq钱包转账",
          img: "../../../../../static/img/personal/recharge/qq.png",
          path: "/transfer/qqTransfer"
        },
        {
          name: "支付宝转账",
          context: "使用支付宝转账",
          img: "../../../../../static/img/personal/recharge/ailpay.png",
          path: "/transfer/alipayTransfer"
        },
        {
          name: "微信加好友转账",
          context: "点击扫描二维码添加好友转账",
          img: "../../../../../static/img/personal/recharge/wechat.png",
          path: "/transfer/wechatTransfer"
        }
      ],
      mark: ""
    };
  },
  created() {
    this.query();
    this.Income();
  },
  methods: {
    ...mapActions(["queryBank", "queryIncome"]),
    routerPush(path) {
      this.$router.push(path);
    },
    //入款说明
    Income() {
      this.queryIncome();
    },
    //查询银行卡
    query() {
      this.queryBank({ pcOrPhone: "1", type: "0" }).then(res => {
        if (res.code === 1) {
          this.$router.push("/payment");
        }
      });
    },
    //点击时改变颜色，增加用户体验
    color(index, start) {
      if (start) {
        this.mark = index;
      } else {
        this.mark = undefined;
      }
    }
  },
  computed: {
    ...mapState(["dataList"]),
    ...mapGetters(["datas"])
  },
  //判断有无数据，没有数据就让它不能点进去
  beforeRouteLeave(to, from, next) {
    if (to.name === "transfer") {
      if (this.datas(to.params.id).length === 0) {
        next(false);
        this.$dialog.toast({
          mes: "此功能暂未开放",
          timeout: 1000
        });
      } else {
        next();
      }
    } else {
      next();
    }
  }
};
</script>

<style lang="less">
@base_num: 64px;
.bgcolor {
  background-color: rgb(223, 222, 222);
}
#companyIncome {
  ul {
    li {
      height: 116rem / @base_num;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #bfbfbf;
      img {
        width: 1.6rem;
        height: 1.6rem;
        display: block;
      }
      div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        h3 {
          font-size: 18px;
          font-weight: 500;
          margin-bottom: 5px;
        }
        p {
          font-size: 17px;
          color: #858585;
        }
      }
    }
    li:last-child {
      border-bottom: 0;
    }
  }
}
</style>
