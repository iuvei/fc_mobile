<template>
    <div id="groupData">
         <yd-navbar title="群聊资料">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>   
             <yd-icon v-show="!show" @click.native="show3=true" name="more" slot="right" color="#fff" size=".4rem"></yd-icon>         
        </yd-navbar>
        <div class="container">
             <div class="personal">
                <img :src="`../../../../../static/img/chartroom/${groupInfo.icon}.png`" alt="">
                <p>{{groupInfo.group_id}}</p>
            </div>
             <yd-cell-item>
                <!-- <yd-icon name="ucenter-outline" slot="icon"  size=".42rem"></yd-icon> -->
                <i class="fa fa-group" slot="icon" style="font-size:.3rem"></i>
                <span slot="right">{{groupInfo.name}}</span>
            </yd-cell-item>
            <yd-cell-item >
                <!-- <yd-icon name="compose" slot="icon"  size=".42rem"></yd-icon> -->
                <i class="fa fa-bullhorn" slot="icon" style="font-size:.3rem"></i>
                <span slot="right"> {{groupInfo.notice}}</span>
            </yd-cell-item>
            
            <yd-cell-item >
                <span slot="left">群创建时间：</span>
                <div slot="right">{{global.timeFormate(groupInfo.create_time)}}</div>
            </yd-cell-item>
            <yd-cell-item :arrow="!show" :href="`/groupMembers/${fromSource}`" :type="!show?'link':'div'">
                <span slot="left">群成员：</span>
                <div slot="right">共{{groupInfo.peopelCnt}}人
                  <!-- <button v-show="!show&&show4" @click="$router.push({name:'inviteGroup',query:{groupId:groupInfo.group_id}})" class="invite">邀请好友</button> -->
                </div>
            </yd-cell-item>
            <yd-cell-item >
                <span slot="left">我的群名片：</span>
                <div slot="right">{{groupInfo.nickName}}</div>
            </yd-cell-item>
  
            <div class="group_tro">
                <div class="title">群介绍：</div>
                <div class="text">{{groupInfo.intro}}</div>
            </div>
            
        </div>
        <footer v-show="show">
          <Box @click.native="show2=true" width="3.5rem" height=".8rem" backgroundColor="#fff" colorEffect="#d3d3d3">
                <span style="color:#000">加入群聊</span>
         </Box>
        </footer>


         <yd-popup v-model="show2" position="center" width="90%" :close-on-masker="false">
            <div style="background-color:#fff;padding:.2rem .3rem">
               <p style="margin-bottom:.2rem;display:flex;justify-content:space-between">备注：<span style="display:flex;align-items:center">{{remark.length}}/50</span></p>
               <div>
                   <textarea v-model="remark" style="margin-bottom:.2rem;width:100%;height:2rem"></textarea>
               </div>
               <Box style="color:#fff" @click.native="apply" width="100%" height="1rem" backgroundColor="#d91d36" colorEffect="#a52c3c">发送</Box>
            </div>
        </yd-popup>


        <!-- 退出群聊的底部边框 -->
         <yd-popup v-model="show3" position="bottom" height="auto">
           <Box v-if="groupInfo.group_master_account===userDetails.account" @click.native="dissolutionGroup" height="1rem" backgroundColor="#fff" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="delete" size=".4rem" color="#525252"></yd-icon>
               <span class="text">解散群聊</span>
               </p>
           </Box>
           <Box v-else @click.native="out" height="1rem" backgroundColor="#fff" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="delete" size=".4rem" color="#525252"></yd-icon>
               <span class="text">退出群聊</span>
               </p>
           </Box>
            <Box v-if="groupInfo.group_master_account===userDetails.account" @click.native="$router.push({name:'manageGroup',query:{groupId:fromSource}})" height="1rem" backgroundColor="#fff" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="home-outline" size=".4rem" color="#525252"></yd-icon>
               <span class="text">管理群聊</span>
               </p>
           </Box>
            <Box @click.native="show4=true" height="1rem" backgroundColor="#fff" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="feedback" size=".4rem" color="#525252"></yd-icon>
               <span class="text">设置群名片</span>
               </p>
           </Box>
        </yd-popup>

          <!-- 修改群备注的弹框 -->
        <yd-popup v-model="show4" position="center" width="80%" :masker-opacity='0'>
            <div class="main">
              <p class="setRemark">群名片</p>
               <yd-input required v-model="nickName" max="20" placeholder="请输入群名片"></yd-input>
               <Box @click.native="reviseGroupNickname" height="1rem" backgroundColor="#d91d36" colorEffect="#a52c3c" style="color:#fff">提交</Box>
              
            </div>
        </yd-popup>
        
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      fromSource: this.$route.query.fromSource,
      //加群时展示加群按钮
      show: false,
      show2: false,
      remark: "",
      //展示底部弹框
      show3: false,
      groupName: "",
      //群备注弹框
      show4: false,
      nickName: ""
    };
  },
  created() {
    //群信息
    this.queryGroupInfo(`/${this.fromSource}`).then(res => {
      this.groupName = res.name;
    });
  },
  methods: {
    ...mapActions("chart", [
      "queryGroupInfo",
      "applyFriend",
      "outGroup",
      "updateUserGroup",
      'queryMessage',
      'propose'
    ]),
    //加群
    apply() {
      this.applyFriend({
        toSource: this.fromSource,
        remark: this.remark,
        singleOrGroup: this.$route.query.singleOrGroup
      }).then(res => {
        if (res.code === 0) {
          this.show2 = false;
          this.remark = "";
          this.$dialog.toast({ mes: "发送成功", timeout: 1000 });
        } else if (res.code === 111) {
          this.show2 = false;
          this.remark = "";
          this.$dialog.toast({ mes: res.msg, timeout: 1500 });
        }
      });
    },
    //退出群聊
    out() {
      this.$dialog.confirm({
        title: "退出群聊",
        mes: `你将退出${this.groupName}，退群通知仅管理员可见。`,
        opts: () => {
          this.outGroup(`/${this.fromSource}`).then(res => {
            if (res.code === 0) {
              this.$dialog.toast({
                mes: "退出成功",
                timeout: 1000,
                callback: () => {
                  this.$router.push("/chartroom/chartmessage");
                  this.queryMessage();
                }
              });
            } else if (res.code === 111) {
              this.$dialog.toast({
                mes: res.msg,
                timeout: 1000
              });
            }
          });
        }
      });
    },
    //修改群昵称
    reviseGroupNickname() {
      this.updateUserGroup({
        nickName: this.nickName,
        groupId: this.fromSource
      }).then(res => {
        if (res.code === 0) {
          this.show4 = false;
          this.show3 = false;
          this.$dialog.toast({
            mes: "修改成功",
            timeout: 1500,
            callback: () => {
              this.queryGroupInfo(`/${this.fromSource}`).then(res => {
                this.groupName = res.name;
              });
            }
          });
        }else if(res.code===111){
               this.$dialog.toast({
                 mes:res.msg,
                  timeout: 1500,
               })

            }
      });
    },
    //解散群聊
    dissolutionGroup(){
       this.$dialog.confirm({
        title: "解散群聊",
        mes: "确定要将该群聊解散？",
        opts: () => {
          this.propose({
            account:'',
            groupId: this.fromSource,
            type: "2"
          }).then(res => {
            if (res.code === 0) {
               this.$dialog.toast({
                 mes: '成功解散群聊！',
                 timeout: 1000,
                 callback:()=>{
                   this.$router.push('/chartroom/chartmessage')
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
    ...mapState("chart", ["groupInfo"]),
    ...mapState('login',['userDetails'])
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
        vm.show = true;
      });
    }
    next();
  }
};
</script>
<style lang='less'>
@import url("../../../../../static/css/common.less");
#groupData {
  .init;
  // padding-bottom: 0;
  display: flex;
  flex-direction: column;
  .container {
    .my-container;
    flex: 1;
    overflow: auto;
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
    .yd-cell-arrow {
      justify-content: space-between !important;
    }
    .invite {
      border: 1px solid gray;
      margin-left: 0.3rem;
      padding: 0.1rem 0.2rem;
      border-radius: 4px;
    }
    .yd-cell-right {
      justify-content: flex-start;
      text-align: left;
    }
    .group_tro {
      margin-top: 0.2rem;
      padding-left: 0.34rem;
      display: flex;

      .title {
        color: #333;
        font-size: 0.3rem;
        flex: 1;
      }
      .text {
        color: #525252;
        font-size: 0.26rem;
        flex: 4;
        display: flex;
        align-items: center;
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
  footer {
    width: 100%;
    height: 1rem;
    position: absolute;
    bottom: 0;
    background: #d1d1d1;
    .my-display(center,center);
    #_Box {
      border: 1px solid rgb(187, 187, 187);
      border-radius: 4px;
      .my-display(center,center);
    }
  }
}
</style>


