<template>
    <div id="groupMembers">
        <yd-navbar title="群聊成员">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>   
             <yd-icon @click.native="show=true" name="more" slot="right" color="#fff" size=".4rem"></yd-icon>         
        </yd-navbar>
        <div class="container">
            <div class="group_owen">
                <p style="padding:.2rem;border-bottom: 1px solid #dcdcdc;">群主</p>
                <MessageBox  @click.native="queryData(groupLoader)" :name="groupLoader.nickName">
                <img slot="img" src="../../../../../static/img/chartroom/member.png" alt="">
                <span v-show="groupLoader.memberAccount===userDetails.account" slot="badge" style="color:#4b4b4b">我</span>
            </MessageBox>
            </div>
            <div class="group_members">
                 <p style="padding:.2rem;border-bottom: 1px solid #dcdcdc;">群成员  &nbsp;{{groupLeaguer.length}}人</p>
                 <MessageBox  @click.native="queryData(item)"  v-for="(item,index) in groupLeaguer" :key="index" :name="item.nickName">
                <img slot="img" src="../../../../../static/img/chartroom/member.png" alt="">
                <span v-show="item.memberAccount===userDetails.account" slot="badge" style="color:#4b4b4b">我</span>
            </MessageBox>
            </div>
            
        </div>


<!-- 底部弹框  邀请好友入群 -->
        <yd-popup v-model="show" position="bottom" height="1rem">
           <Box v-if="authority" @click.native="$router.push({name:'inviteGroup',query:{groupId:$route.params.groupId}})" height="1rem" backgroundColor="#fff" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="ucenter-outline" size=".4rem" color="#525252"></yd-icon>
               <span class="text">邀请新成员</span>
               </p>
           </Box>
           <Box v-else height="1rem" backgroundColor="#d3d3d3" colorEffect="#d3d3d3">
             <p>
               <yd-icon name="ucenter-outline" size=".4rem" color="#fff"></yd-icon>
               <span class="text" style="color:#fff">邀请新成员</span>
               </p>
           </Box>
          
        </yd-popup>


       
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import MessageBox from "../../../common/messageBox.vue";
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      //底部弹框
      show: false,
      //邀请权限
      authority:false,
      show2:false,
      nickName:''
    };
  },
  created() {
    this.queryGroupMember(`/${this.$route.params.groupId}`).then(res=>{
      if(res.code===111){
         this.$dialog.toast({ mes: res.msg, timeout: 1000 });
      }
    })
     //查看是否有邀请权限
    this.queryIsMaster({
      groupId:this.$route.params.groupId
    }).then(res=>{
     if(res===0){
         this.authority=true
     }
    })
  },
  components: {
    MessageBox,
    Box
  },
  methods: {
    ...mapActions("chart", ['queryIsMaster','queryGroupMember','queryGroupInfo']),
    //点击成员
    queryData(item){
      if(item.memberAccount===this.userDetails.account){
        this.$router.push({name:'memberCenter',query:{account:item.memberAccount,groupId:this.$route.params.groupId,mark:false}})
      }else{
        this.$router.push({name:'memberCenter',query:{account:item.memberAccount,groupId:this.$route.params.groupId}})
      }

    }
  },
  computed: {
    ...mapState("chart", ["groupFriend",'groupInfo','groupMembers']),
    ...mapState('login',['userDetails']),
    ...mapGetters('chart',['groupLoader','groupLeaguer'])
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#groupMembers {
  .init;
  padding-bottom: 0;
  .container {
    height: 100%;
    overflow: auto;
  }
  .yd-popup-content {
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
  }
}
</style>





