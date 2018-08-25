<template>
  <div class="announcement">
    <yd-navbar title="站内信">
      <router-link to="/setup" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="announcement_nav">
      <yd-tab>
        <yd-tab-panel label="最新公告">
          <!-- <div class="nav_list" v-for="item in MemberNoticeListA" v-show="nav_list_a">
            <h1>【重要通知】</h1>
            <div>
              <span>{{item.title}}</span>
              <img src="../../../../static/img/home/hot.png" alt="">
            </div>
            <p>{{item.lcd}}</p>
          </div> -->
          <yd-accordion>           
            <yd-accordion-item v-for="(item,index) in MemberNoticeListA" v-show="nav_list_a"  :title=item.title  :key="index">
              <div slot="icon">【重要通知】</div>
              <div slot="txt">{{item.lcd}}</div>
              <div class="announcement_nav_text">
                {{item.content}}
              </div>
            </yd-accordion-item>    
          </yd-accordion>
          <div class="no_list" v-if="nav_list_a==false">
            <img class="snnouncement_kong" src="../../../../static/img/setup/snnouncement_kong_03.png" alt="">
            <p>暂无最新公告哦~</p>
            <div>大奖不等待，一元中千元大奖</div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="最新消息">
          <yd-accordion>           
            <yd-accordion-item v-for="(item,index) in MemberNoticeListB" v-show="nav_list_b"  :title=item.title  :key="index">
              <div slot="icon">【最新消息】</div>
              <div slot="txt">{{item.lcd}}</div>
              <div class="announcement_nav_text">
                {{item.content}}
              </div>
            </yd-accordion-item>    
          </yd-accordion>
          <div class="no_list" v-if="nav_list_b==false">
            <img class="snnouncement_kong" src="../../../../static/img/setup/snnouncement_kong_03.png" alt="">
            <p>暂无最新消息哦~</p>
            <div>大奖不等待，一元中千元大奖</div>
          </div>
        </yd-tab-panel>
        <yd-tab-panel label="站内私信">
          <!-- <div class="nav_list" v-for="item in NoticeAlertList" v-show="nav_list_c">
            <h1>【站内私信】</h1>
            <div>
              <span>{{item.title}}</span>
              <img src="../../../../static/img/home/hot.png" alt="">
            </div>
            <p v-if="nav_list_c==true">{{item.sentTime}}</p>
          </div> -->
          <yd-accordion>           
            <yd-accordion-item v-for="(item,index) in NoticeAlertList" v-show="nav_list_c"  :title=item.title :key="index">
              <div slot="icon">【站内私信】</div>
              <div slot="txt">{{item.sentTime}}</div>
              <div class="announcement_nav_text">
                {{item.content}}
              </div>
            </yd-accordion-item>    
          </yd-accordion>
          <div class="no_list" v-if="nav_list_c==false" >
            <img class="snnouncement_kong" src="../../../../static/img/setup/snnouncement_kong_03.png" alt="">
            <p>暂无站内私信哦~</p>
            <div>大奖不等待，一元中千元大奖</div>
          </div>
        </yd-tab-panel>
      </yd-tab>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        msg: "站内信",
        MemberNoticeListA:[],
        MemberNoticeListB:[],
        NoticeAlertList:[],
        nav_list_a:false,
        nav_list_b:false,
        nav_list_c:false,
        b:false
      }
    },
    created(){
      this.announcenment();
    },
    methods:{
      ...mapActions('home',[
        "queryMemberNoticeList",
        "queryNoticeAlertList",
        "deleteNoticeAlert",
      ]),
      announcenment(){
        let that = this;
        console.log(that.userDetails);
        let account = that.userDetails.account;
        console.log(account)
        this.queryMemberNoticeList("?notice_type=3").then(res=>{
          if(res.code == 0){
            that.MemberNoticeListA = res.data;
            if(that.MemberNoticeListA.length == 0){
              that.nav_list_a = false;
            }else if (that.MemberNoticeListA.length != 0){
              that.nav_list_a = true;
            }
          }
          // that.MemberNoticeListA = res.data;
          // console.log(that.MemberNoticeListA,'aaa')
        });
        this.queryMemberNoticeList("?notice_type=2&type=1").then(res=>{
          if(res.code == 0){
            that.MemberNoticeListB = res.data;
            if(that.MemberNoticeListB.length == 0){
              that.nav_list_b = false;
            }else if (that.MemberNoticeListB.length != 0){
              that.nav_list_b = true;
            }
          }
          // console.log(that.MemberNoticeListB,'bbb')
        });
        this.queryNoticeAlertList("?is_read="+''+"&memberid="+account).then(res =>{
            if(res.code == 0){
              that.NoticeAlertList = res.data;
              if(that.NoticeAlertList.length == 0){
                  that.nav_list_c = false;
              }else if(that.NoticeAlertList.length != 0){
                  that.nav_list_c = true;
              }
            }
            // console.log(that.NoticeAlertList)
          })
      },
      showList(){
        this.b = true;
      }

    },
    computed:{
      ...mapState('login',[
        'userDetails'
      ])
    },
  }
</script>
<style lang="less">
  .announcement{
    height: 100%;
    background-color: #f6f6f6;
  }
  .announcement_nav{
    overflow: hidden;
    padding-top: 1rem;
    background: #fff;
    /*height: 100%;*/
    box-sizing: border-box;
  }
  .announcement .yd-navbar{
    background: #011935 !important;
  }
  .announcement .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .announcement .yd-navbar span{
    color: #ffffff !important;
  }
  .announcement .yd-tab-panel{
    background-color: #f6f6f6;
    // padding: 0 2%;
    width: 100%;
    .nav_list{
      height: 1rem;
      background: #ffffff;
      margin: 0.15rem auto 0.2rem;
      line-height: 1rem;
      font-size: 0.3rem;
      padding: 0 0.25rem;
      box-sizing: border-box;
      h1{
        width: 27%;
        float: left;
      }
      div{
        width: 38%;
        float: left;
      }
      p{
        width: 35%;
        float: left;
        // background-color: #f6f6f6;
      }
    }

  }
  .no_list{
    text-align: center;
    padding-top: 15%;
    background-color: #f6f6f6;
    font-size: 0.35rem;
    z-index: 10;
    .snnouncement_kong{
      width: 90%;
      height: 60%;
      margin: auto;
    }
    p{
      color: #363636;
      margin-bottom: 0.2rem;
    }
    div{
      color: #a6a6a6;
    }
  }
  .announcement .yd-accordion-title{
    width: 40%;
  }
  .announcement .yd-accordion{
    overflow: hidden;
    background: #f6f6f6;
  }
  .announcement .yd-accordion-head{
    margin: 0.2rem 0 0 0;
    background: #fff;
    height: 1rem;
  }
  .announcement .yd-accordion-content{
    background: #fff;
    padding:0 0.2rem;
    box-sizing: border-box;
  }
  .announcement_nav_text{
    font-size: 0.28rem;
    padding: 0.2rem;
    box-sizing: border-box;
  }
</style>
