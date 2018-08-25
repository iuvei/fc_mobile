<template>
    <div id="memberCenter">
         <yd-navbar :title="$route.query.account!==userDetails.account?'个人资料':'我的资料'">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon> 
            <!-- <span @click="show=true" style="color:#fff" slot="right">更多</span>            -->
            <yd-icon v-show="$route.query.account!==userDetails.account&&show3" @click.native="more" name="more" slot="right" color="#fff" size=".4rem"></yd-icon>
        </yd-navbar>
        <div class="container">
            <div class="personal">
                <img src="../../../../../static/img/chartroom/member.png" alt="">
                <p>{{UserByAccount.nickName}}</p>
            </div>
            <yd-cell-item  href="#" type="link">
                <yd-icon name="ucenter-outline" slot="icon"  size=".42rem"></yd-icon>
                <span slot="right">{{UserByAccount.memberAccount}}</span>
            </yd-cell-item>
              <yd-cell-item  href="#" type="link">
                <yd-icon name="footmark" slot="icon"  size=".42rem"></yd-icon>
                <span slot="right">在线</span>
            </yd-cell-item>
        </div>
        <div class="footer" v-show="$route.query.account!==userDetails.account">
            <Box v-if="show3" @click.native="query(account,'1','1',UserByAccount.nickName)" width="3.5rem" height=".8rem" backgroundColor="#d91d36" colorEffect="#a52c3c">
                <span>发消息</span>
            </Box>
             <Box v-else @click.native="show4=true" width="3.5rem" height=".8rem" backgroundColor="#fff" colorEffect="#d3d3d3">
                <span style="color:#000">加好友</span>
            </Box>
        </div>

<!--查询好友列表时的成员资料的底部弹框 （删除好友  设置备注功能）-->
         <yd-popup v-model="show" position="bottom" height="2rem">
           <Box @click.native="deleteFriend(account)" height="1rem" backgroundColor="#fff" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="delete" size=".4rem" color="#525252"></yd-icon>
               <span class="text">删除</span>
               </p>
           </Box>
            <Box @click.native="show2=true" height="1rem" backgroundColor="#fff" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="feedback" size=".4rem" color="#525252"></yd-icon>
               <span class="text">设置备注</span>
               </p>
           </Box>
        </yd-popup>

<!-- 查询群成员时的群成员资料的底部弹框（移出群聊，修改群昵称功能） -->
        <yd-popup v-model="show5"  position="bottom" height="auto">
          <Box v-if="isPower" @click.native="moveOut"  height="1rem" backgroundColor="#fff" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="delete" size=".4rem" color="#525252"></yd-icon>
               <span class="text">移出本群</span>
               </p>
           </Box>
            <Box v-else height="1rem" backgroundColor="#d3d3d3" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="ucenter-outline" size=".4rem" color="#fff"></yd-icon>
               <span class="text" style="color:#fff">移出本群</span>
               </p>
           </Box>
        </yd-popup>

        <!-- 修改好友资料的弹框 -->
        <yd-popup v-model="show2" position="center" width="80%" :masker-opacity='0'>
            <div class="main">
              <p class="setRemark">备注名</p>
               <yd-input required v-model="nickName" max="20" placeholder="请输入备注名"></yd-input>
               <Box @click.native="updataInfo" height="1rem" backgroundColor="#d91d36" colorEffect="#a52c3c" style="color:#fff">提交</Box>
                
            </div>
        </yd-popup>

<!-- 加好友时的备注弹框 -->
         <yd-popup v-model="show4" position="center" width="90%" :close-on-masker="false">
            <div style="background-color:#fff;padding:.2rem .3rem">
               <p style="margin-bottom:.2rem;display:flex;justify-content:space-between">备注：<span style="display:flex;align-items:center">{{remark.length}}/50</span></p>
               <div>
                   <textarea v-model="remark" style="margin-bottom:.2rem;width:100%;height:2rem"></textarea>
               </div>
               <Box style="color:#fff" @click.native="apply" width="100%" height="1rem" backgroundColor="#d91d36" colorEffect="#a52c3c">发送</Box>
            </div>
        </yd-popup>




    </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      account: this.$route.query.account,
      //控制底部弹框
      show: false,
      //修改好友资料弹窗
      show2: false,
      nickName: "",
      //判断从哪个页面进来的Boolean(可能搜索页面)
      show3: true,
      //备注弹框
      show4: false,
      //移出群聊的底部弹框
      show5: false,
      remark: "",
      //路由历史
      routerHistory: sessionStorage.getItem("routerHistory").split(","),
      //踢人权限
      isPower:false
    };
  },
  created() {
    this.queryUserByAccount(`/${this.account}`);
    this.proposePower();
  },
  methods: {
    ...mapActions("chart", [
      "queryMessage",
      "queryUserByAccount",
      "delFriend",
      "updateFriendInfo",
      "applyFriend",
      "updateUserGroup",
      "propose",
      'queryGroupInfo'
    ]),
    query(fromSource, singleOrGroup, readStatus, nickName) {
      this.$router.push({
        name: "chartpage",
        query: { fromSource, singleOrGroup, readStatus, nickName }
      });
    },
    //删除好友
    deleteFriend(account) {
      this.$dialog.confirm({
        title: "删除联系人",
        mes: `将联系人${this.account}删除，将同时删除与该联系人的聊天记录`,
        opts: () => {
          this.delFriend(`/${account}`).then(res => {
            if (res.code === 0) {
              this.$dialog.toast({
                mes: "删除成功",
                timeout: 1000,
                callback: () => {
                  this.$router.push("/chartroom/chartmembers");
                  this.queryMessage();
                }
              });
            } else if (res.code === 111) {
              this.$dialog.toast({ mes: res.msg, timeout: 1000 });
            }
          });
        }
      });
    },
    //右上角点击事件
    more() {
      if (
        this.routerHistory[this.routerHistory.length - 1].slice(0, 13) ===
        "/groupMembers"
      ) {
        this.show5 = true;
      } else {
        this.show = true;
      }
    },

    //修改好友资料
    updataInfo() {
      this.updateFriendInfo({
        nickName: this.nickName,
        friendAccount: this.account
      }).then(res => {
        if (res.code === 0) {
          this.show2 = false;
          this.show = false;
          this.queryUserByAccount(`/${this.account}`);
        }else if(res.code===111){
               this.$dialog.toast({
                 mes:res.msg,
                  timeout: 1500,
               })

            }
      });
    },
    //加好友
    apply() {
      this.applyFriend({
        toSource: this.account,
        remark: this.remark,
        singleOrGroup: this.$route.query.singleOrGroup
      }).then(res => {
        if (res.code === 0) {
          this.show4 = false;
          this.remark = "";
          this.$dialog.toast({ mes: "发送成功", timeout: 1000 });
        } else if (res.code === 111) {
          this.show4 = false;
          this.remark = "";
          this.$dialog.toast({ mes: res.msg, timeout: 1500 });
        }
      });
    },
    //踢人权限
    proposePower(){
      if(this.$route.query.groupId){
         this.queryGroupInfo(`/${this.$route.query.groupId}`).then(res=>{
        if(this.userDetails.account===res.group_master_account){
          this.isPower=true;
        }
      })
      }
     
    },
    //踢人
    moveOut() {
      this.$dialog.confirm({
        title: "删除群成员",
        mes: "确定要将该用户从本群中移除？",
        opts: () => {
          this.propose({
            account: this.account,
            groupId: this.$route.query.groupId,
            type: "1"
          }).then(res => {
            if (res.code === 0) {
               this.$dialog.toast({
                 mes: '移出本群成功！',
                 timeout: 1000,
                 callback:()=>{
                   this.$router.go(-1)
                 }
               })
            }else if(res.code===111){
               this.$dialog.toast({
                 mes:res.msg,
                  timeout: 1500,
               })
            }
          });
        }
      });
    }
  },
  components: {
    Box
  },
  computed: {
    ...mapState('login',['userDetails']),
    ...mapState("chart", ["UserByAccount",'groupInfo'])
  },
  watch: {
    //最多输入50字
    remark(newValue, oldValue) {
      if (newValue.length > 50) {
        this.remark = this.remark.slice(0, 50);
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.path === "/addFriend") {
      next(vm => {
        vm.show3 = false;
      });
    }
    next();
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#memberCenter {
  .init;
  .container {
    height: 100%;
    .my-container;
    .personal {
      text-align: center;
      img {
        width: 1.5rem;
      }
      p {
        font-weight: 600;
        font-size: 20px;
        margin-top: 0.2rem;
      }
    }
    .yd-cell-right {
      justify-content: flex-start;
      text-align: left;
    }
  }
  .footer {
    height: 1rem;
    background: #d1d1d1;
    .my-display(center,center);
    #_Box {
      .my-display(center,center);
      border-radius: 4px;
      span {
        color: #fff;
      }
    }
  }
  #_Box {
    .my-display(center,center);
    p {
      width: 100%;
      padding: 0 0.3rem;
      .my-display(none,center);
      .text {
        margin-left: 0.3rem;
        color: #525252;
      }
    }
  }
  .main {
    background-color: #fff;
    padding: 0.2rem 0.3rem;
    .setRemark {
      margin-bottom: 0.3rem;
    }
    #_Box {
      margin-top: 0.3rem;
    }
  }
}
</style>

