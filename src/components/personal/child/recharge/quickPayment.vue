<template>
<div id="quickPayment">
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
          name: "微信扫码",
          context: "使用微信扫描完成支付，秒到账",
          img: "../../../../../static/img/personal/recharge/wechat.png",
          path: "/transfer/wechatScan"
        },
        {
          name: "QQ扫码",
          context: "使用QQ扫描完成支付，秒到账",
          img: "../../../../../static/img/personal/recharge/qq.png",
          path: "/transfer/qqScan"
        }
      ],
       mark: ""
    };
  },
  created(){
    this.query();

  },
  methods: {
      ...mapActions(["queryBank"]),
    routerPush(path) {
      this.$router.push(path);
    },
    query(){
     this.queryBank({ pcOrPhone: "1", type: "2" });
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
  computed:{
    ...mapGetters(["datas"]),

  },
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
  background-color: rgb(212, 211, 211);
}
#quickPayment {
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
