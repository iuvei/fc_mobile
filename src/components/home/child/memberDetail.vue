<template>
	<div class="memberDetail">
		<yd-navbar title="会员详情">
			<router-link to="/members" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
		<div ref="wrapper" class="list">
			<div class="content" >
        <div class="memberDetail_nav">
          	<div style="padding:0.15rem 0.2rem;">
              <p><span>账号 </span>:<span >{{childAcconnt.account}}</span></p>
              <p><span>身份 </span>:<span>{{hierarchyL[childAcconnt.hierarchy]}} </span> 
                  <yd-button v-if="childAcconnt.hierarchy == '0'" type="hollow" @click.native="_updateMemberAgent(childAcconnt.account)">转为代理</yd-button>
              </p>
              <p><span>状态 </span>:<span >{{statusL[childAcconnt.status]}} </span></p>
              <p><span>建立时间 </span>:<span>{{childAcconnt.createTime}}</span></p>
              <p><span>最后登录时间 </span>:<span >{{childAcconnt.lastLoginTime}}</span></p>
              <p><span>登录次数 </span>:<span>{{childAcconnt.loginTimes}} </span></p>
            </div>
                    <div  v-for="(item,index) in list" class="list-item" :key="index">
                      <p><span>彩种 </span>:<span >{{classID[item.baseLotteryClassId]}}</span></p>
                    <p><span>返点 </span>:<span>{{item.rebatePoint}} </span></p>
                    <p class="content_but" >
                      <yd-button class="lookPei_but" type="hollow" @click.native="lookPei(item.baseLotteryClassId)" >反水</yd-button>
                    </p>
            </div>
        </div>
			</div>
		</div>

    <yd-popup v-model="show1" position="center" width="80%">
            <div style="background-color:#fff;padding:0.2rem ;">
              <h1 style="background-color:#00a4a6;padding:0.2rem;color:#fff">返水配额</h1>
                 <yd-cell-group>
                    <yd-cell-item arrow type="label">
                      <span slot="left">{{max}}</span>
                        <select slot="right" v-model="rebatePoint">
                            <option v-for="(item, index) in selectList" :key="'Option'+index" :value="item">{{item}}</option>
                        </select>
                    </yd-cell-item>
                </yd-cell-group>
                <p style="text-align: center;">
                    <yd-button type="disabled" @click.native="show1 = false">取消</yd-button>
                    <yd-button  @click.native="changePei">保存</yd-button>
                </p>
            </div>
        </yd-popup>
	</div>
</template>

<script>
import Bscroll from "better-scroll";
import { mapState, mapActions, mapMutations } from "vuex";
import Pagination from "../../common/pagination";
export default {
  data() {
    return {
      list: [],
      countAll: 0,
      childAcconnt: {},
      show1: false,
      classID: {
        "1": "福体彩",
        "2": "六合彩",
        "3": "时时彩",
        "4": "快三",
        "5": "11选5",
        "6": "pk10"
      },
      statusL: {
        "0": "正常",
        "1": "禁止登入",
        "2": "黑名单",
        "3": "返回限制降点"
      },
      hierarchyL: {
        "0": "会员",
        "1": "代理",
        "2": "代理",
        "3": "代理"
      },
      max: "",
      maxRebate: "",
      minRebate: "",
      rebatePoint: "",
      selectList: [],
      classId: ""
    };
  },
  created() {
    // this._queryLoginInfo(1);
    // this.getUserDetails().then(data => {});
    let routerParams = this.$route.query.id;
    this._queryMemberInfoEdit(routerParams);
  },
  mounted() {
    // this.$nextTick(() => {
    //   let scroll = new Bscroll(this.$refs.wrapper, {
    //     scrollbars: true,
    //     listenX: true,
    //     click: true
    //   });
    //   scroll.on("scrollEnd", this.scrollEnd);
    //   scroll.on("scrollStart", this.scrollStart);
    // });
  },
  components: {
    Pagination
  },
  computed: {
    ...mapState("login", ["userDetails"])
  },
  methods: {
    ...mapActions([
      "queryMemberInfoEdit",
      "queryTeamQutaType",
      "updateTeamRebet",
      "updateMemberAgent"
    ]),
    ...mapMutations(["queryLoginInfoList"]),

    time() {
      var date = new Date();
      var n = date.getFullYear();
      var y = date.getMonth() + 1;
      if (y < 10) {
        y = "0" + y;
      }
      var t = date.getDate();
      if (t < 10) {
        t = "0" + t;
      }
      var h = date.getHours();
      if (h < 10) {
        h = "0" + h;
      }
      var m = date.getMinutes();
      if (m < 10) {
        m = "0" + m;
      }
      var mi = date.getSeconds();
      if (mi < 10) {
        mi = "0" + mi;
      }
      //        $('.loginRecord_time').html(n+"-"+y+"-"+t+" "+h+":"+m+":"+mi);
      this.newTime = n + "-" + y + "-" + t + " " + h + ":" + m + ":" + mi;
    },
    timestampToTime(timestamp) {
      var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var hh = date.getHours() + ":";
      var mm = date.getMinutes() + ":";
      var ss = date.getSeconds();
      return Y + M + D + hh + mm + ss;
    },
    _queryMemberInfoEdit(account) {
      this.queryMemberInfoEdit("/" + account).then(res => {
        // console.log(res);
        this.childAcconnt = res.data.baseMembers;
        this.list = res.data.listRebate;
        if (
          this.childAcconnt.lastLoginTime == null ||
          this.childAcconnt.lastLoginTime == ""
        ) {
          this.childAcconnt.lastLoginTime = this.childAcconnt.createTime;
        }
        this.childAcconnt.createTime = this.timestampToTime(
          this.childAcconnt.createTime
        );
        this.childAcconnt.lastLoginTime = this.timestampToTime(
          this.childAcconnt.lastLoginTime
        );
      });
    },
    // 查看配额
    lookPei(id) {
      // console.log(id);
      this.classId = id;
      this.show1 = true;
      let data = {
        account: this.childAcconnt.account,
        type: id
      };
      this.queryTeamQutaType(data).then(res => {
        // console.log(res);
        this.max = "返水:(最高" + res.data.maxRebate + ")";
        this.maxRebate = res.data.maxRebate.toFixed(1);
        this.minRebate = res.data.minRebate.toFixed(1);
        this.rebatePoint = res.data.rebatePoint.toFixed(1);
        for (
          var i = this.minRebate * 10, d = [];
          i <= this.maxRebate * 10;
          i++
        ) {
          let p = (i / 10).toFixed(1);
          d.push(p);
        }
        this.selectList = d.reverse();
        // console.log(this.rebatePoint)
        // console.log(this.selectList)
      });
    },
    //修改配额
    changePei() {
      let data = {
        account: this.childAcconnt.account,
        childRebet: this.rebatePoint,
        type: this.classId
      };
      this.updateTeamRebet(data).then(res => {
        console.log(res);
        if (res.code == 0) {
          this.lookPei(this.classId);
          this.$dialog.toast({
            mes: "保存成功",
            timeout: 1500,
            icon: "success"
          });
          this._queryMemberInfoEdit(this.childAcconnt.account);
          this.show1 = false;
        }
      });
    },
    // 转为代理
    _updateMemberAgent(account) {
      let data = account;
      this.updateMemberAgent("/" + data).then(res => {
        if (res.code === 0) {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500,
            icon: "success"
          });
          this._queryMemberInfoEdit(account);
        } else {
          this.$dialog.toast({
            mes: res.msg,
            timeout: 1500,
            icon: "orrer"
          });
        }
      });
    }
  }
};
</script>

<style lang="less">
.memberDetail {
  height: 100%;
  font-size: 0.3rem;
  .yd-navbar {
    background: #011935 !important;
    /*background: linear-gradient(0,#272a32,#4b4e58)!important;*/
    color: #ffffff;
    .yd-back-icon:before,
    .yd-navbar-center-title {
      color: #ffffff !important;
    }
  }

  .list {
    -webkit-overflow-scrolling: touch;
    // height: 100%;
    width: 100%;
    position: absolute;
    top: 1.2rem;
    left: 0;
    overflow: hidden;
    padding: 0 0.2rem;
    color: #ffffff;
    .list-item {
      width: 100%;
      margin: 0.3rem 0;
      padding: 0.3rem;
      border-radius: 2px; /*px*/
      color: #ffffff;
      position: relative;
      p {
        text-align: left;
        span {
          color: #ffffff !important;
        }
      }
      .content_but {
        position: absolute;
        right: 0.2rem;
        bottom: 0.4rem;
        width: 1rem;
        height: 0.5rem;
      }
    }
  }
  .pagination {
    position: fixed;
    bottom: 0;
    right: 0.2rem;
  }
}
.memberDetail .list  .content .memberDetail_nav div:nth-child(5n + 1) {
  background: #17a8e1;
}
.memberDetail .list .content .memberDetail_nav div:nth-child(5n + 2) {
  background: #04b0c4;
}
.memberDetail .list .content .memberDetail_nav div:nth-child(5n + 3) {
  background: #5f65c3;
}
.memberDetail .list .content .memberDetail_nav div:nth-child(5n + 4) {
  background: #4ba708;
}
.memberDetail .list .content .memberDetail_nav div:nth-child(5n + 5) {
  background: #e6a316;
}
.memberDetail .yd-cell-right select {
  padding-left: 0.3rem;
}
</style>
