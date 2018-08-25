<template>
    <div id="inviteGroup">
         <yd-navbar title="邀请新成员">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>            
        </yd-navbar>
        <div class="container">
            <yd-cell-group title="好友">
        <yd-cell-item :data-Ingroup="item.Ingroup" type="checkbox" v-for="(item,index) of inviteFriend" :key="index"  ref="Input">
            <div slot="left" class="person">
                <img style="width:.7rem;margin-right:.2rem;" src="../../../../../static/img/chartroom/member.png" alt="">
                <span>{{item.nickName}}</span>    
            </div>
            <input v-if="item.Ingroup!=='1'"  slot="right"  type="checkbox" :value="item.friendAccount" v-model="checkedNames"/>
            <input v-else slot="right" disabled  type="checkbox" :checked='confirm'>
        </yd-cell-item>
    </yd-cell-group>
        </div>
        <div class="footer">
            <Box v-if="checkedNames.length!==0"  @click.native="invite" width="100%" height=".8rem" backgroundColor="#d91d36" colorEffect="#a52c3c">
                <span>立即邀请</span>
            </Box>
             <Box v-else  width="100%" height=".8rem" backgroundColor="#ddd" colorEffect="#ddd">
                <span>立即邀请</span>
            </Box>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      checkedNames: [],
      confirm: false
    };
  },
  created() {
    this.queryFriend().then(() => {
      this.queryGroupFriend({
        groupId: String(this.$route.query.groupId)
      }).then(res => {
        console.log(this.inviteFriend);
      
          //好友在群内时默认选中
           this.$nextTick(() => {
            this.confirm = true;
           });
     
      });
    });
  },
  mounted() {},
  methods: {
    ...mapActions("chart", ["queryFriend", "inviteGroup", "queryGroupFriend"]),
    invite() {
      this.inviteGroup({
        accountList: this.checkedNames,
        groupId: String(this.$route.query.groupId)
      }).then(res => {
        if (res.code === 0) {
          this.$dialog.toast({
            mes: "发送成功",
            timeout: 1000,
            callback: () => {
              this.$router.go(-1);
            }
          });
        } else if (res.code === 111) {
          this.$dialog.toast({ mes: res.msg, timeout: 1000 });
        }
      });
    }
  },
  components: {
    Box
  },
  computed: {
    ...mapState("chart", ["friends"]),
    ...mapGetters("chart", ["inviteFriend"])
  },
  watch: {
    checkedNames() {
      console.log(this.checkedNames);
    }
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#inviteGroup {
  .init;
  .container {
    height: 100%;
    overflow: auto;
    .yd-cell-left {
      .person {
        .my-display(center,center);
      }
    }
    .yd-cell-item[data-ingroup="1"] {
      .yd-cell-checkbox-icon:after {
        color: #d9d9d9;
      }
    }
  }
  .footer {
    width: 100%;
    height: 1rem;
    padding: 0 0.3rem;
    position: fixed;
    bottom: 0;
    background: #d1d1d1;
    .my-display(center,center);
    #_Box {
      border-radius: 4px;
      .my-display(center,center);
      color: #fff;
    }
  }
}
</style>


