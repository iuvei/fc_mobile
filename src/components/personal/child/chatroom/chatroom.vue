<template>
    <div id="chartroom">
         <yd-navbar :title="titles[$route.meta.order]">      
            <yd-navbar-back-icon @click.native="$router.push('/home')"  slot="left"></yd-navbar-back-icon>     
                <i style="color:#fff;font-size:.4rem"  class="fa fa-plus" v-if="$route.meta.order!==2"  @click="show=true" slot="right"></i>
           </yd-navbar>
        <Pop width="auto"  v-model="show" bgcolor="#fff">
                  <ul class="List" slot="content">
                    <li>
                      <Box @click.native="$router.push('/addFriend')" width="auto" height="auto" backgroundColor="#fff" colorEffect="rgba(0, 0, 0, 0.103)"><i class="fa fa-user-plus"></i> 加好友 / 群</Box>                      
                      <Box @click.native="$router.push('/establishGroup')" width="auto" height="auto" backgroundColor="#fff" colorEffect="rgba(0, 0, 0, 0.103)"><i class="fa fa-comment"></i> 创建群聊</Box> 
                     </li>
                  </ul>
        </Pop>   
        <router-view></router-view>
        <div class="chartroom_footer">
<yd-tabbar active-class="tabactive" active-color="#d91d36">
                <yd-tabbar-item title="消息"  type="link" link="/chartroom/chartmessage">
                    <i  slot="icon" class="fa fa-comments-o" style="font-size:0.54rem"></i>
                     <yd-badge bgcolor="rgb(235, 0, 4)" slot="badge" type="danger" v-show="noticeNum!==0">{{noticeNum>99?'99+':noticeNum}}</yd-badge>
        </yd-tabbar-item>
        <yd-tabbar-item title="通讯录" link="/chartroom/chartmembers">
            <i class="fa fa-address-book-o" slot="icon" style="font-size:0.54rem"></i>
            <yd-badge bgcolor="rgb(235, 0, 4)" slot="badge" type="danger" v-show="applyRecord.length!==0">{{applyRecord.length>99?'99+':applyRecord.length}}</yd-badge>
        </yd-tabbar-item>
        <yd-tabbar-item title="我" link="/chartroom/personalMaterial">
            <yd-icon name="ucenter" slot="icon" size="0.54rem"></yd-icon>
        </yd-tabbar-item>
      </yd-tabbar>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import Box from "../../../common/box.vue";
import Pop from '../../../common/popNotice.vue'
export default {
  name:'chartroom',
  data() {
    return {
      titles: ["消息", "通讯录", "我"],
      show:false,
      //登陆账号
      account: document.cookie.split(";")[0].split("=")[1],
    }
  },
  created() {
        //查询所有未处理申请记录
    this.queryApplyRecord();

  },
  mounted() {
  if(!this.global._timer){
     this.global._timer= setInterval(()=>{
      this.getUserDetails()
     },28*60*1000)
  }

 
   
  },
  components: {
    Pop,
    Box
  },
  methods: {
    ...mapActions('login',['getUserDetails']),
    ...mapActions("chart", [
      "chartLogin",
      "queryMessage",
      "callbackMessage",
      "readMessage",
      'queryApplyRecord',
      'updateUser'
    ]),
    ...mapActions(["websocketLink"]),
    ...mapMutations("chart", ["throwMessage", "saveSocket"]),
     hidden(status){
      this.show=status
    },
    updatepersonal(){
      this.updateUser({
        icon:'',
        nickName:''
      })
    }
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    ...mapState("chart", ["chartsocket",'applyRecord']),
     ...mapGetters("chart", ["noticeNum"])
  },
  watch: {}
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
.tabactive {
  color: #d91d36 !important;
}
#chartroom {
  height: 100%;
  display: flex;
  flex-direction: column;
 font-size:  16px;
  #popNotice{
    position: absolute;
    right:0.14rem;
    top:1rem;
    z-index: 300;
    .List{
      li{
        font-size: 14px;
        #_Box{
          padding: .15rem;

        }
      }
      
    }

  }
 
}
</style>


