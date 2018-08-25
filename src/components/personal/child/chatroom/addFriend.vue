<template>
    <div id="addFriend">
        <yd-navbar title="添加">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>            
        </yd-navbar>
        <div class="container">
             <yd-search :item-click="itemClickHandler" v-model="accountId" placeholder="账号/群" :fullpage='true' :result="result"></yd-search>
             <p v-show="show" class="tip">没有找到相关结果</p>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      accountId: "",
      result: [],
      show: false,
      remark: "",
      singleOrGroup: ""
    };
  },
  methods: {
    ...mapActions("chart", [
      "applyFriend",
      "queryUserByAccount",
      "queryGroupInfo"
    ]),
    //点击找人或找群
    itemClickHandler(item) {
      this.singleOrGroup = this.result.indexOf(item) === 0 ? "1" : "2";
      this.accountId = item.slice(3);
      if (this.result.indexOf(item) === 0) {
        this.queryUserByAccount(`/${item.slice(3)}`).then(res => {
          if (!res) {
            this.show = true;
            this.accountId=item.slice(3);;
          } else {
            this.$router.push({
              name: "memberCenter",
              query: {
                account: item.slice(3),
                singleOrGroup: this.singleOrGroup
              }
            });
          }
        });
      } else {
        if(/^[0-9]+$/.test(this.accountId)){
          this.queryGroupInfo(`/${item.slice(3)}`).then(res => {
          if (!res) {
            this.show = true;
            this.accountId=item.slice(3);
          } else {
            this.$router.push({
              name: "groupData",
              query: {
                fromSource: item.slice(3),
                singleOrGroup: this.singleOrGroup
              }
            });
          }
        });
        }else{
          this.accountId = '';
            this.$dialog.toast({
              mes:'请输入0-9之间的数字',
              timeout: 1500
            })
        } 
      }
    }
  },
  components: {
    Box
  },
  watch: {
    accountId(newValue) {
      if (newValue !== "") {
        this.result = ["找人：" + newValue, "找群：" + newValue];
      } else {
        this.result = [];
        this.show = false;
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#addFriend {
  .init;
  padding-bottom: 0;
  .container {
    height: 100%;
    .cancel-text {
      color: #d91d36;
    }
    .tip {
      text-align: center;
      margin-top: 2rem;
      color: rgb(156, 156, 156);
    }
  }
  #_Box {
    .my-display(center,center);
    color: #fff;
  }
}
</style>

