<template>
    <div id="chartNotice">
         <yd-navbar title="通知">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>            
        </yd-navbar>
        <div class="container" ref="container">      
        <yd-pullrefresh :callback="loadList" ref="pullrefreshDemo">
        <yd-list theme="4">
            <yd-list-item>  
                <section slot="other" v-for="(item,index) in messagesRecord" :key="index">
                   <p class="time">{{global._timeFormate(item.sendTime,'2')}}</p>
                   <div>
                       <h3>{{item.nickName}}</h3>
                       <p>{{item.content}}</p>
                   </div>
                </section> 
            </yd-list-item>
        </yd-list>
    </yd-pullrefresh>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      name: this.$route.query.nickName,
      fromSource: this.$route.query.fromSource,
      readStatus: this.$route.query.readStatus,
      singleOrGroup: this.$route.query.singleOrGroup,
      page: 2
    };
  },
  created() {
  
     this.$nextTick(function() {
         this.query(1);
      this.$refs.container.scrollTop = this.$refs.container.scrollHeight;
    });
  },
  mounted() {
   
  },
  methods: {
    ...mapActions("chart", ["queryMessageRead", "readMessage"]),
     ...mapMutations("chart", ["toBackThrowMessage"]),
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
    //加载通知列表
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
        this.$refs.pullrefreshDemo.$emit("ydui.pullrefresh.finishLoad");
        ++this.page;
      } else {
        this.$dialog.toast({ mes: "内容已加载完毕" });
        this.$refs.pullrefreshDemo.$emit("ydui.pullrefresh.finishLoad");
      }
    }
  },
  computed: {
    ...mapState("chart", ["historyMessage", "countAll"]),
    ...mapGetters("chart", ["messagesRecord"])
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#chartNotice {
  .init;
  padding-bottom: 0;
  display: flex;
  flex-direction: column;
  .container {
    flex: 1;
    overflow: auto;
    background: #f1f1f1;
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
    section {
      margin-bottom: 0.5rem;
      .time {
        text-align: center;
        margin-bottom: 0.1rem;
        font-size: 12px;
      }
      div {
        padding: 0.2rem 0.3rem;
        background: #fff;
        border: 1px solid rgb(214, 214, 214);
        border-radius: 4px;
        h3 {
          margin-bottom: 0.1rem;
        }
      }
    }
  }
}
</style>


