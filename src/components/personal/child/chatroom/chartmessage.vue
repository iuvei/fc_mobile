<template>
    <div id="chartmessage">     
        <div class="container">
            <MessageBox @click.native="query(item.fromSource,item.singleOrGroup,'1',item.nickName)" v-for="(item,index) in noticeList" :key="index" :name="item.messageType==='4'?'通知':item.nickName" :time="global._timeFormate(item.sendTime,'1')" mode='1'>
              <img slot="img" :src="item.messageType==='1'&&item.singleOrGroup==='2'?`../../../../../static/img/chartroom/${item.icon}.png`:item.messageType==='1'?'../../../../../static/img/chartroom/member.png':'../../../../../static/img/chartroom/notice.png'" alt="">
              <span :style="{background:item.singleOrGroup==='1'?'#eb0004':'#bae5f8'}" slot="badge" v-show="item.cnt!==0">{{item.cnt>99?'99+':item.cnt}}</span>
            </MessageBox>
        </div>
    </div>
</template>
<script>
import MessageBox from "../../../common/messageBox.vue";
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
     
    };
  },
  created() {
    //查询所有未读消息条数
    this.queryMessage();
  },
  components: {
    MessageBox
  },
  methods: {
    ...mapActions("chart", [
      "chartLogin",
      "queryMessage",
      "queryMessageRead",
      "readMessage",
    ]),
    //查询某个会员/群发送的消息
    query(fromSource, singleOrGroup, readStatus, nickName) {
      if (fromSource !== "notice") {
        this.$router.push({name:'chartpage',query:{fromSource,singleOrGroup,readStatus,nickName}})
      } else {
       this.$router.push({name:'chartNotice',query:{fromSource,singleOrGroup,readStatus,nickName}})
      }
    },
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    ...mapState("chart", ["messageList"]),
    ...mapGetters("chart", ["noticeList"])
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#chartmessage {
  .init;
  display: flex;
  padding-bottom: 0;
  flex-direction: column;
  .container {
    flex: 1;
    overflow: auto;
    span {
      display: block;
      width: 100%;
      height: 100%;
      .my-display(center,center);
      border-radius: 100%;
      font-size: 0.18rem;
    }
  }
}
</style>


