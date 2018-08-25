<template>
    <div id="chartmembers">
        <yd-cell-item arrow type="link" href="/newFriends">
            <span slot="left">新朋友
               
            </span>
            <span slot="right">
                 <yd-badge bgcolor="rgb(235, 0, 4)" v-show="applyRecord.length!==0">{{applyRecord.length>99?'99+':applyRecord.length}}</yd-badge>
            </span>
            
        </yd-cell-item>
         <yd-tab v-model="tab1" active-color="#d91d36">
        <yd-tab-panel :label="'好友  '+friends.length">
            <div class="container">
                <MessageBox @click.native="$router.push({name:'memberCenter',query:{account:item.friendAccount}})" v-for="(item,index) in friends" :key="index" :name="item.nickName">
                    <img slot="img" src="../../../../../static/img/chartroom/member.png" alt="">
                </MessageBox>
            </div>
        </yd-tab-panel>
        <yd-tab-panel :label="'群聊  '+groups.length">
             <div class="container">
               <MessageBox @click.native="query(String(item.groupId),'2','1',item.name)" v-for="(item,index) in groups" :key="index" :name="item.name">
                    <img slot="img" :src="`../../../../../static/img/chartroom/${item.icon}.png`" alt="">
                </MessageBox>
             </div>
            </yd-tab-panel> 
    </yd-tab>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import MessageBox from "../../../common/messageBox.vue";
export default {
  data() {
    return {
      tab1: 0
    };
  },
  created() {
      this.queryFriend();
      this.queryGroup();
  },
  methods: {
      ...mapActions('chart',['queryFriend','queryGroup']),
      query(fromSource, singleOrGroup, readStatus, nickName) {
      if (fromSource !== "notice") {
        this.$router.push({name:'chartpage',query:{fromSource,singleOrGroup,readStatus,nickName}})
      } else {
        return;
      }
    },
  },
  components:{
      MessageBox
  },
  computed:{
      ...mapState("chart", ['applyRecord','friends','groups'])
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#chartmembers {
  .init;
  display: flex;
  padding-bottom: 0;
  flex-direction: column;
  .yd-cell-right {
    display: flex;
    align-items: center;
      .yd-badge {
      display: flex;
      align-items: center;
    }
  }
  .yd-tab {
    height: 100%;
    display: flex;
    flex-direction: column;
    .yd-tab-panel {
      flex: 1;
      .yd-tab-panel-item {
        height: 100%;
      }
      .container {
        // .my-container;
        height: 100%;
        overflow: auto;
      }
    }
  }
}
</style>


