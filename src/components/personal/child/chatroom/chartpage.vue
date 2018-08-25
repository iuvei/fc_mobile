<template>
    <div id="chartpage">
         <yd-navbar ref="header">      
            <yd-navbar-back-icon @click.native="$router.push('/chartroom/chartmessage')"  slot="left"></yd-navbar-back-icon>
            <div slot="center" class="title">
               <h3>{{name}}</h3>
               <p v-show="singleOrGroup==='1'">在线</p> 
            </div> 
            <router-link :to="{path:'/groupData',query:{fromSource}}" v-show="singleOrGroup==='2'" slot="right">
                <!-- <img style="width:.4rem" src="../../../../../static/img/chartroom/group_data.png" alt=""> -->
                <i class="fa fa-users" style="color:#fff"></i>
            </router-link>           
        </yd-navbar>
        <div class="container" ref="pullrefreshDemo" @click="show=false">
         <yd-pullrefresh ref="refresh" :callback="loadList">
        <yd-list theme="4">
            <yd-list-item>
               <DialogBox slot="other" v-for="(item,index) in messagesRecord" :key="index" :mode="modeType(item)">
              <span v-show="item.singleOrGroup==='2'" slot="nickname">{{item.nickName}}</span>
              <p v-show="index===0||(index!==0&&period(messagesRecord[index-1]['sendTime'],item.sendTime))" slot="chart_time" style="text-align:center">{{global._timeFormate(item.sendTime,'2')}}</p>
              <img slot="img" src="../../../../../static/img/chartroom/member.png" alt="">
              <p style="display:flex;align-items:center;height:100%" v-html="resolveFace(item.content)"></p>
              </DialogBox>                
            </yd-list-item>
        </yd-list>
    </yd-pullrefresh>       
        </div> 
           <div class="chartkey">  
             <div class="main-top">
                <p><input @focus="focus" @blur="blur" type="text" v-model="text"></p>
                <Box width="16%" height="100%" :style="buttonStyle"  @click.native="send" :backgroundColor="text!==''?'#fff':'#d4d7d0'"  :colorEffect="text!==''?'#e7e9e5':'#d4d7d0'">发送</Box>  
             </div>    
             <div class="main-bottom">
               <i @click="show=true"  class="fa fa-smile-o"></i>
  
               <!-- <input @change="sendImg"  ref="imgFile" style="display:none" type="file" name="file" accept="image/*" id="picture">
               <label for="picture"><i   id="picture" class="fa fa-image"></i></label> -->               
               </div>                       
          </div>
      <transition name="bounce">
           <ul class="pop" v-show="show">
            <li @click="selectFace(item)" v-for="(item,index) of faces" :key="index" :title="item">
              <img :src="`../../../../../static/img/chartroom/face/${index}.gif`" alt="">
            </li>
          </ul>
      </transition>

          
        </div>
</template>
<script>
import Box from "../../../common/box.vue";
import DialogBox from "../../../common/dialogBox.vue";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      //昵称
      name: this.$route.query.nickName,
      //消息
      text: "",
      //账号id/群id
      fromSource: this.$route.query.fromSource,
      readStatus: this.$route.query.readStatus,
      //群‘2’  个人‘1’
      singleOrGroup: this.$route.query.singleOrGroup,
      page: 2,
      interval: "",
      //表情包弹框
      show: false,
      fileBase: "",
      src: ""
    };
  },
  created() {
    this.query(1);
  },
  mounted() {
    this.scrollBottom();
  },
  methods: {
    a() {},
    ...mapActions("chart", [
      "sendMessage",
      "queryMessageRead",
      "readMessage",
      "sendMessageGroup"
    ]),
    ...mapMutations("chart", ["throwMessage", "toBackThrowMessage"]),
    //读取历史消息
    query(page) {
      this.queryMessageRead({
        fromSource: this.fromSource,
        readStatus: this.readStatus,
        singleOrGroup: this.singleOrGroup,
        page: page
      }).then(res => {
        this.readMessage(`/${this.fromSource}/${this.singleOrGroup}`).then(
          res => {
            if (res.code === 0) {
              
            }
          }
        );
      });
    },

    //判断消息在左还是在右
    modeType(item) {
      if (item.singleOrGroup === "1") {
        if (item.fromSource === this.userDetails.account) {
          return "right";
        } else {
          return "left";
        }
      } else if (item.singleOrGroup === "2") {
        if (item.fromAccount === this.userDetails.account) {
          return "right";
        } else {
          return "left";
        }
      }
    },
    //input聚焦
    focus(e) {
      this.interval = setInterval(() => {
            e.target.scrollIntoView(true);   //el为input元素
      }, 200);
    },
    //input失焦
    blur() {
      clearInterval(this.interval);
    },
    scrollToEnd() {
      document.body.scrollTop = document.body.scrollHeight;
    },
    //发送消息
    send() {
      if (this.text !== "") {
        if (this.singleOrGroup === "1") {
          this.sendMessage({
            account: this.fromSource,
            content: this.text
          }).then(res => {
            if (res.code === 0) {
              this.throwMessage({
                fromSource: this.userDetails.account,
                content: this.text,
                singleOrGroup: "1",
                sendTime: new Date().getTime()
              });
              this.text = "";
            } else if (res.code === 111) {
              this.$dialog.toast({ mes: res.msg });
            }
          });
        } else if (this.singleOrGroup === "2") {
          this.sendMessageGroup({
            groupId: this.fromSource,
            content: this.text
          }).then(res => {
            if (res.code === 0) {
              this.text = "";
            } else if (res.code === 111) {
              this.$dialog.toast({ mes: res.msg });
            }
          });
        }
      } else {
        return;
      }
    },
    //消息时间处理  隔十分钟展示时间
    period(t1, t2) {
      if (t2 - t1 > 10 * 60 * 1000) {
        return true;
      } else {
        return false;
      }
    },
    //加载消息列表
    loadList() {
      if (this.page <= Math.ceil(this.countAll / 10)) {
        this.queryMessageRead({
          fromSource: this.fromSource,
          readStatus: this.readStatus,
          singleOrGroup: this.singleOrGroup,
          page: this.page
        }).then(res => {
          for (let item of res.messageList) {
            this.toBackThrowMessage(item);
          }
        });
        this.$refs.refresh.$emit("ydui.pullrefresh.finishLoad");
        ++this.page;
      } else {
        this.$dialog.toast({ mes: "内容已加载完毕" });
        this.$refs.refresh.$emit("ydui.pullrefresh.finishLoad");
      }
    },
    //聊天窗口滑到最下面
    scrollBottom() {
      this.$nextTick(function() {
        this.$refs.pullrefreshDemo.scrollTop = this.$refs.pullrefreshDemo.scrollHeight;
      });
    },
    //选择表情包
    selectFace(item) {
      this.text += item;
      this.show = false;
    },
    //解析表情包
    resolveFace(content) {
      if (/\[[\u4e00-\u9fa5a-zA-Z]+\]/g.test(content)) {
        return `${content.replace(/\[[\u4e00-\u9fa5a-zA-Z]+\]/g, item => {
          if (this.faces.includes(item)) {
            let index = this.faces.indexOf(item);
            return `<img src="../../../../../static/img/chartroom/face/${index}.gif">`;
          } else {
            return item;
          }
        })}`;
      } else {
        return content;
      }
    }
    //发送图片
    //   sendImg(){
    //       let reader  = new FileReader();
    //      let file=this.$refs.imgFile.files[0];

    //     reader.onload =()=>{
    //         if (this.singleOrGroup === "1") {
    //         this.sendMessage({
    //           account: this.fromSource,
    //           content: `<img src="${reader.result}">`
    //         }).then(res => {
    //           if (res.code === 0) {
    //             this.throwMessage({
    //               fromSource: this.userDetails.account,
    //               content: `<img src="${reader.result}">`,
    //               singleOrGroup: "1",
    //               sendTime: new Date().getTime()
    //             });
    //             this.text = "";
    //           } else if (res.code === 111) {
    //             this.$dialog.toast({ mes: res.msg });
    //           }
    //         });
    //       } else if (this.singleOrGroup === "2") {
    //         this.sendMessageGroup({
    //           groupId: this.fromSource,
    //           content:reader.result
    //         }).then(res => {
    //           if (res.code === 0) {
    //             this.text = "";
    //           } else if (res.code === 111) {
    //             this.$dialog.toast({ mes: res.msg });
    //           }
    //         });
    //       }
    //   }
    //       reader.readAsDataURL(file)
    // }
  },
  components: {
    DialogBox,
    Box
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    ...mapState("chart", ["historyMessage", "countAll", "sendStatus", "faces"]),
    //消息记录
    ...mapGetters("chart", ["messagesRecord"]),
    buttonStyle() {
      if (this.text === "") {
        return {
          color: "#fff"
        };
      } else {
        return {
          color: "#000"
        };
      }
    }
  },
  watch: {
    //发送消息滑到最底部
    historyMessage() {
      //滚动前高度
      let beforeScorllHeight = this.$refs.pullrefreshDemo.scrollHeight;
      if (this.sendStatus === "1") {
        this.scrollBottom();
      } else if (this.sendStatus === "2") {
        this.$nextTick(function() {
          this.$refs.pullrefreshDemo.scrollTop =
            this.$refs.pullrefreshDemo.scrollHeight - beforeScorllHeight;
        });
      }
    },
    fileBase(v) {
      console.log(v);
    }
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
//表情包弹框动画
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.3s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

#chartpage {
  .init;
  padding-bottom:0;
  display: flex;
  flex-direction: column;
  .title {
    h3 {
      color: #fff;
      text-align: center;
      font-size: 0.3rem;
    }
    p {
      color: #d4d7d0;
      font-size: 0.25rem;
      text-align: center;
    }
  }
  .container {
    flex: 1;
    background: #f1f1f1;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    .my-container;
    article {
      background: transparent;
      padding: 0;
      .yd-list-img {
        width: 0;
        height: 0;
      }
      .yd-list-mes {
        background: transparent;
        padding: 0;
      }
    }
    .yd-pullrefresh-dragtip {
      top: 0.3rem;
      z-index: 2;
    }
  }
  .chartkey {
    height: 1.6rem;
    width: 100%;
    background: #d91d36;
    padding: 0.15rem 0.3rem;
    .my-display(space-between,center);
    flex-direction: column;
    .main-top {
      width: 100%;
      height: 50%;
      .my-display(space-between,none);
      p {
        width: 82%;
        height: 100%;
        input {
          height: 100%;
          width: 100%;
          background: #fff;
          border: 0;
          border-radius: 4px;
          text-indent: 7px;
        }
      }
      #_Box {
        .my-display(center,center);
        border-radius: 5px;
      }
    }
    .main-bottom {
      width: 100%;
      height: 50%;
      .my-display(none,flex-end);
      i {
        color: #fff;
        font-size: 25px;
        margin-right: 0.4rem;
      }
    }
  }

  .pop {
    background: #fff;
    padding: 0.2rem;
    position: absolute;
    z-index: 200;
    bottom: 1.7rem;
    left: 0.3rem;
    right: 0.3rem;
    max-height: 180px;
    overflow: scroll;
    li {
      display: inline-block;
      width: 10%;
      text-align: center;
      img {
        width: 22px;
        height: 22px;
        margin: 0.1rem 0;
      }
    }
  }
}
</style>


