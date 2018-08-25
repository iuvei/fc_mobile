<template>
  <div id="app">
  	<img src="../static/img/img_default_ball.png" style="display: none;" />
  	<img src="../static/img/bo_red_bg.png" style="display: none;" />
  	<img src="../static/img/bo_blue_bg.png" style="display: none;" />
  	<img src="../static/img/bo_green_bg.png" style="display: none;" />
  	<img src="../static/img/bo_grey_bg.png" style="display: none;" />
    <!--<transition :name="transitionName">-->
      <router-view  class="_view" ></router-view>
    <!--</transition>-->   
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "App",
  data() {
    return {
      transitionName: "_translate",
      // show:false,
      routerHistory: sessionStorage.getItem("routerHistory")
        ? sessionStorage.getItem("routerHistory").split(",")
        : [],
      timeoutObj: "",
      ws: ""
    };
  },
  created() {
    // this.show = true;
    this._getUserDetails();

    //userDetails为空重新请求
    // if (this.userDetails.length === 0) {
    //   this.getUserDetails();
    // }
  },
  mounted() {
    //监听网页关闭  断开聊天websocket
    window.addEventListener("beforeunload", () => {
      //  sessionStorage.setItem("chartLogin",2);
      if (this.chartsocket !== "") {   
        this.chartsocket.close();
      }
    });
    //浏览器标签页被隐藏或显示的时候会触发visibilitychange事件(针对手机息屏websocket断掉)
    document.addEventListener("visibilitychange", () =>{
      this.chartsocket.close();
    });
  },
  computed: {
    ...mapState("login", ["userDetails"]),
    ...mapState(["isLogin"]),
    ...mapState("chart", ["chartsocket"])
  },
  methods: {
    ...mapActions("bet", ["getGamePlayList"]),
    ...mapActions("home", ["kind"]),
    ...mapMutations("bet", ["saveStandGameList"]),
    ...mapMutations(["sendMessage"]),
    ...mapActions(["websocketLink"]),
    ...mapActions("chart", [
      "callbackMessage",
      "readMessage",
      "queryMessage",
      "queryApplyRecord",
      "queryApplyRecordAll",
      "queryGroup"
    ]),
    ...mapMutations("chart", ["saveSocket", "throwMessage"]),
    ...mapActions("login", ["getUserDetails"]),
    ...mapMutations(["setIsLogin"]),
    cacheGamePlay() {
      this.kind().then(res => {
        res.data.forEach(item1 => {
          item1.kindList.forEach(item2 => {
            this.getGamePlayList(`/${item1.classId}/${item2.kindId}`).then(
              res2 => {
                sessionStorage.setItem(
                  item2.kindId,
                  JSON.stringify(res2.data.standGameList)
                );
                //  						this.saveStandGameList({standGameList:res2.data.standGameList,kindId:item2.kindId})
              }
            );
          });
        });
      });
    },
    _getUserDetails() {
      this.getUserDetails().then(res => {
        if (res.code == "666") {
          this.setIsLogin(false);
          // this.setIsLogin(true);
        } else {
          this.cacheGamePlay();
          this.websoket_chat();
          this.setIsLogin(true);
          //						this.websoket()
          //						if(window.location.pathname == "/") {
          //							this.$router.push({
          //								path: "/home"
          //							})
          //						}
        }
        // this.show = true;
      });
    },
    websoket() {
      let URL_1;
      URL_1 = this.global.baseUrl;
      let accord = window.location.protocol;
      let str = "wss:";
      if (accord == "https:") {
        URL_1 = this.global.baseUrl.slice(6);
        str = "wss:";
      } else if (accord == "http:") {
        URL_1 = this.global.baseUrl.slice(5);
        str = "ws:";
      }
      var websocket = new ReconnectingWebSocket(
        encodeURI(str + URL_1 + "/notify/" + this.userDetails.account)
      );
      //				let websocket = new WebSocket(encodeURI(str + URL_1 + "/notify/" + this.userDetails.account));
      this.webSocket = websocket;
      websocket.onopen = function() {
        // console.log("连接成功");
      };
      websocket.onerror = function() {
        console.log("断开");
      };
      websocket.onclose = function() {
        console.log("退出成功");
      };

      websocket.onmessage = message => {
           this.sendMessage(message)
      };
    },
    //聊天室websocket连接
    websoket_chat() {
      this.websocketLink({
        url: this.global.chart_baseUrl,
        type: "/websocket/"
      }).then(socket => {
        //把socket存入全局变量
        this.saveSocket(socket);
        socket.onopen = () => {
          console.log("连接成功");
          //  this.$dialog.loading.close();
          //不断访问websocket实现断线重连
          // this.ws = new WebSocket("wss://echo.websocket.org");
          // this.ws.onopen = evt => {
          //   this.timeoutObj = setTimeout(() => {
          //     this.ws.send("Hello WebSockets!");
          //   }, 2000);
          // };
          // this.ws.onmessage = eve => {
          //   console.log(eve.data);
          //   if (eve.data !== "Hello WebSockets!") {
          //     alert(1);
          //   } else {
          //     clearTimeout(this.timeoutObj);
          //     this.timeoutObj = setTimeout(() => {
          //       this.ws.send("Hello WebSockets!");
          //     }, 2000);
          //   }
          // };
        };
        socket.onclose = () => {
          console.log("连接关闭");
          if (
            sessionStorage.getItem("chartLogin") === "1" &&
            this.chartsocket !== "" &&
            this.isLogin
          ) {
            setTimeout(() => {
              this.websoket_chat();
            }, 2000);
          }
        };
        socket.onerror = e => {
          console.log(e);
          // this.$dialog.loading.open("正在连接网络...");
          // this.chartsocket.close();

        };
        socket.onmessage = message => {
          this.chat_onMessage(message);
        };
      });
    },

    //聊天消息监听
    chat_onMessage(message) {
      let messageData = JSON.parse(message.data);
      let messageType = JSON.parse(message.data).messageType;
      console.log(messageData);
      if (messageType === "1") {
        this.callbackMessage(
          `/${messageData.id}/${messageData.singleOrGroup}`
        ).then(res => {
          if (res.code === 0) {
            if (this.$route.name === "chartpage") {
              //判断若接收的信息来自正在聊天的对象，则标记已读同时展示
              if (
                this.$route.query.fromSource === messageData.fromSource &&
                this.$route.query.singleOrGroup === messageData.singleOrGroup
              ) {
                this.readMessage(
                  `/${messageData.fromSource}/${messageData.singleOrGroup}`
                ).then(res => {
                  if (res.code === 0) {
                    this.throwMessage(messageData);
                  }
                });
              }
            } else {
              this.queryMessage();
            }
          }
        });
      } else if (messageType === "2") {
        this.queryApplyRecord();
        this.queryApplyRecordAll();
      } else if (messageType === "3") {
        //加群成功
        this.queryGroup();
      }
    }
  },

  watch: {
  	isLogin(){
  		if(this.isLogin){
  			this.websoket();
  		}else{
  		this.webSocket.close()
  		}
  	},
    //路由切换动画
    $route(to, from) {
  
      //记录当前路由路径
      this.routerHistory.push(from.path);
      sessionStorage.setItem("routerHistory", this.routerHistory);
      let routes = Array.of(
        "/home",
        "/homeRecharge",
        "/redPacket",
        "/personal",
        "/allKinds"
      );
      //禁止底部导航动画
      if (routes.includes(from.path) && routes.includes(to.path)) {
        this.transitionName = "";
      } else {
        if (this.routerHistory.includes(to.path)) {
          let index = this.routerHistory.findIndex((item, index) => {
            return Object.is(item, to.path);
          });
          //从数组中删除整个已经跳转的路径并执行反向动画
          this.routerHistory.splice(index);
          sessionStorage.setItem("routerHistory", this.routerHistory);
          this.transitionName = "_translate";
        } else {
          let _index = this.routerHistory.findIndex((item, index) => {
            return Object.is(item, "/accountBill");
          });
          if (
            from.path === "/recharge/companyIncome" &&
            to.path === "/homeRecharge"
          ) {
            this.routerHistory.splice(_index);
            sessionStorage.setItem("routerHistory", this.routerHistory);
            this.transitionName = "_translate";
          } else {
            this.transitionName = "translate";
          }
        }
      }
      //进入聊天室连上websocket
      if (from.path === "/login" && to.path === "/allKinds") {
        console.log(this.chartsocket)
        if (this.isLogin) {  
            this.websoket_chat();   
        }
      }
      if(from.matched[0].path==='/chartroom'&&to.path==='/home'){
        clearInterval(this.global._timer);
        this.global._timer=undefined;
      }
    }
  }
};
</script>

<style>
._view {
  width: 100%;
  position: absolute;
}
/* 从右往左动画   前进 */
.translate-enter {
  transform: translate3d(100%, 0, 0);
}
.translate-enter-to,
.translate-leave {
  transform: translate3d(0, 0, 0);
}
.translate-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.translate-enter-active,
.translate-leave-active {
  transition: transform 0.4s;
}
/* 从左往右动画   后退 */
._translate-enter {
  transform: translate3d(-100%, 0, 0);
}
._translate-enter-to,
._translate-leave {
  transform: translate3d(0, 0, 0);
}
._translate-leave-to {
  transform: translate3d(100%, 0, 0);
}
._translate-enter-active,
._translate-leave-active {
  transition: transform 0.4s;
}
</style>
