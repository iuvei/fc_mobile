<template>
  <div class="activity">
    <yd-navbar title="优惠活动">
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
    </yd-navbar>
    <!-- <yd-accordion>
      <div class="activity_nav">
        <div style="position: relative" v-for="(item,index) in activityList" :key="index"> -->
          <!--<img class="activity_img" :src="item.documentImageNewname" alt="">-->
          <!-- <yd-accordion-item title="">
            <div style="padding: .24rem;"  v-html="item.documentConetnt">
              {{item.documentConetnt}}
            </div>
          </yd-accordion-item> -->
          <!--<img class="activity_img" :src="item.documentImageNewname" alt="">-->
          <!-- <p class="activity_nav_p">【会员注册】下载手机APP，注册会员送20元彩金！</p>
        </div>
      </div>
    </yd-accordion> -->
    <div style="padding-top:1.2rem;flex: 1;height:100%;">
      <div class="activity_nav" v-for="(item,index) in activityList" :key="index">
        <img class="img" :src="item.documentImageNewname" alt="优惠活动" @click="activity_details(index)">
          <!-- <img class="img" src="http://m52.pxklos.com/upload/20180616183103696.jpg" alt="" @click="activity_details(index)"> -->
           <div class="activities" v-show="show && idx == index">
            <div v-html="item.documentConetnt" class="activity_text">{{item.documentConetnt}}</div>
            <div class="but" >
              <yd-button type="danger" @click.native="toPash('/recharge/companyIncome')">参加活动</yd-button>
            </div>
          </div>
      </div>
    </div>
    
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        mag:'优惠活动',
        activityList:[],
        show:false,
        idx:''
      }
    },
    created(){  
      this.activityList = this.activityDocumentList;
      // console.log(this.activityList,'333')
      if(this.activityList.length == 0 ){
        this.queryDocumentContentList().then( res =>{
          this.activityList = res.data;
        })
      }else{
        // console.log(333)
        this.activityList = this.activityDocumentList;
      }
    },
    computed:{
      ...mapState('activity', ["activityDocumentList"]),
    },
    methods:{
      ...mapActions('activity',[
        'queryDocumentContentList'
      ]),
      activity_details( index ){
        // console.log(index);
        if(this.isLogin == false){
          this.$dialog.toast({
						mes: '未登录',
						timeout: 1000,
						// icon: 'success'
                });
        }else{
           if(this.idx == index){
            this.idx = index;
            this.show = !this.show;
          }else if(this.idx != index){
            this.idx = index;
            for(var i=0;i<= this.activityList.length;i++){
              if( i == index){
                this.idx = index;
                this.show = true;
              }
            }
          }
        }
      },
       toPash(name){
        if(this.isLogin == false){
         this.$dialog.toast({
						mes: '未登录',
						timeout: 1000,
						// icon: 'success'
                });
        }else{
          this.$router.push({
          path: name
        })
        }
        
      },

    },
  }
</script>
<style>
  .activity{
    height: 100%;
    width: 100;
    background-color: #fff;
    overflow: auto;
    display: flex;
    flex-direction: column;
  }
  .activity_nav{
      width: 100%;
      margin-bottom: 0.2rem;
      overflow: auto;
      padding: 0;
      flex: 1;
  }
  .activity .yd-navbar{
    background: #011935 !important;
  }
  .activity .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .activity .yd-navbar span{
    color: #ffffff !important;
  }
  .activity .yd-accordion-head-arrow{
    display: none;
  }
  .activity .yd-accordion-head{
    height: 3rem;
    background: url("../../../static/img/home/yhhd_01.png") no-repeat;
    background-size: cover;
    box-sizing: border-box;
    margin: 0.25rem 0.25rem 0 0.25rem;
    /*background: #ffffff;*/
  }
  .activity .yd-accordion-head-content{
    height: 100%;
    /*background: #ffffff;*/
  }
  .activity_nav_p{
    text-align: left;
    margin: 0 0.25rem;
    font-size: 0.3rem;
    background: #ffffff;
  }
  .activity_img{
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 10;
  }


  .activity_text{
        text-align: left;
        box-sizing: border-box;
        padding: 0.2rem;
        
      }
      .img{
        display:block;
        height: 2.5rem;
        width: 100%;
        padding: 0;
        margin: 0;
      }
      .activities{
        width: 100%;
        box-sizing: border-box;
        padding: 0.15rem;
        margin: 0;
        /* background: rgba(255,255,255,0.05); */
      }
      .activities .but{
        width: 1.5rem;
        margin: auto;
      }
</style>
