<template>
  <div class="bettingHall">
    <yd-navbar title="彩种大厅">
      <router-link to="/allKinds" slot="left">
        <yd-navbar-back-icon ></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="bettingHall_nav">
      <div class="navlist" v-for="(item,indexI) in list">
        <h1 v-if="indexI !=1">{{item.className}}</h1>
        <ul v-if="indexI !=1">
          <li :kindId="childList.kindId" :classId="list.classId" v-for="(childList,indexII) in list[indexI].kindList" @click="goBettingHall(childList.kindId,item.classId)">
            <img style="margin-top:0.2rem;margin-bottom:0.05rem" v-if="item.classId == 1" src="../../../static/img/home/allKind/ftc.png" alt="">
            <img style="margin-top:0.25rem;margin-bottom:0.1rem" v-if="item.classId == 3" src="../../../static/img/home/allKind/ssc.png" alt="">
            <img style="margin-top:0.25rem;margin-bottom:0.25rem" v-if="item.classId == 4" src="../../../static/img/home/allKind/ks.png" alt="">
            <img style="margin-top:0.37rem;margin-bottom:0.37rem" v-if="item.classId == 5" src="../../../static/img/home/allKind/11×5.png" alt="">
            <img style="margin-top:0.35rem;margin-bottom:0.35rem" v-if="item.classId == 6" src="../../../static/img/home/allKind/pk10.png" alt="">
            <span>{{childList.kindName}}</span>
          </li>
        </ul>
      </div>




     <!-- <div class="bettingHall_nav_top"></div> -->
     <!-- <div class="bettingHall_nav_center">
         <ul  >
            <li @click="toPash('/recharge/companyIncome')">
                <img src="../../../static/img/home/allKind/recharge.png" alt="">
                <div>充值</div>
            </li>
            <li @click="toPash('/withdraw')">
                <img src="../../../static/img/home/allKind/putForward.png" alt="">
                <div>提现</div>
            </li>
            <li @click="toPash('/redPacket')">
                <img src="../../../static/img/home/allKind/activities.png" alt="">
                <div>优惠活动</div>
            </li>
            <li @click="toPash('/help')">
                <img src="../../../static/img/home/allKind/help.png" alt="">
                <div>帮助中心</div>
            </li>
        </ul>
     </div> -->
    <!-- <div class="tilel">
      <div></div>
      <p>彩种</p>
    </div> -->
     <!-- <div class="container_main">
        <div class="container_type" v-for="(list,index2) in datasZ" >
          <div   v-for="(item,index) in list">
            <div  class="container_className" :class="{pattern:item.show}" @click="showDown(list,item,index)"  >
              <p>
                <span style="display:block;width:65%;flex-shrink: 0;text-align: left;font-size:0.35rem;" >{{item.className}}</span>
                <img style="display:block;background: white;border-radius: 50%;flex-shrink: 0;" :src="'../../../static/img/home/allKind/'+item.classId+'.png'" alt=""> -->
                <!-- <i  v-show="item.kindList.length!=0" :class="(index2==0&&item.classId!=1) || (index2==1&&item.classId!=1)  ?'red':''" >></i> -->
              <!-- </p>
            </div>
          </div>
          <div v-if="list[Index]">
            <ul  class="container_kindId" v-show="list[Index].show">
              <li @click="goBettingHall(childList.kindId,classId)"  class="container_detail" v-for="(childList,index) in list[Index].kindList"  :kindId="childList.kindId" :kindName="childList.kindName">
                {{childList.shortName}} -->
                <!-- <span :id="childList.kindId"  :I="i" :endTime="time[childList.kindId]" v-if="parseInt(time[childList.kindId])>=0" :kindName="childList.kindName" :kindId="childList.kindId"></span> -->
              <!-- </li>
            </ul>
          </div>
        </div>
      </div> -->
     
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        msg: "设置",
        userDetailsList:[],
        list:[],
        listNav:[],
        datas:[],
        datasZ: [],
        time: [],
        Index: 0,
        classId:'',
        kindId:" m5ffc",
        //1分钟
        datas1:['m5ffc','m5k3','m511x5','txffc'],
        //3分钟
        datas3:['m53fc'],
        //5分钟
        datas5:['m55fc','bjpk10','mlaft'],
        //10分钟
        datas10:['tjssc','xjssc','gd11x5','sd11x5','ahk3','gxk3','jsk3','jx11x5','sh11x5'],
        //一天
        datasDay:['fc3d','pl3'],
        //半个小时
        datashour:['shssl'],
      }
    },
    created(){
      this.userDetailsList = this.userDetails;
      this.list = this.kindList;
      this.kindList.forEach(item => {
        if(item.classId != 2){
          this.datas.push(item)
        }
      })
      this.loop();
    },
    computed:{
      ...mapState('login',[
        'userDetails'
      ]),
      ...mapState('home',[
        'kindList'
      ]),
      // ...mapState('bet',[
      //   'getTimes'
      // ]),
     
    },
    methods:{
       ...mapMutations('bet',[
        "setClassId",
        "setKindId",
        
      ]),
      ...mapActions('bet',[
        "getTimes"
      ]),
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
      //点击隐藏展示小彩种,和时间
      showDown: function (thing,obj,a) {

        // console.log(thing,obj,a);
        this.Index='';
      	  let that = this;
      	  let obj2;
          var kindList = obj.kindList;
        //点击当前一横条的，其他的全部隐藏
        if(obj.show==false){
          for(var i=0;i<this.datasZ.length;i++){
            if(this.datasZ[i][0]){
              this.datasZ[i][0].show=false;
            }
            if(this.datasZ[i][1]){
              this.datasZ[i][1].show=false;
            }
          }
        }
        //确保相邻两个不同时显示
        if(a==1){
          if(thing[0]){
            thing[0].show=false;
          }
        }else if(a==0){
          if(thing[1]){
            thing[1].show=false;
          }
        }
        this.classId = obj.classId;
        // console.log(this.classId)
        // this.setClassId(classId)
        obj.show=!obj.show;
        this.Index=a;
        this.getTimes("/"+obj.classId).then( data => {
           var hours=new Date().getHours();
          var second=new Date().getSeconds();
           if((hours>22&&second>0)||(hours<2&&second>0)){
            that.datas5.push('cqssc')
          }else{
            that.datas10.push('cqssc')
          }
          for(var key in data.data.data){
            if(data.data.data[key]<0){
              if(that.datas1.indexOf(key)!=-1){
                data.data.data[key]+=60;
              }else if (that.datas3.indexOf(key)!=-1){
                data.data.data[key]+=180;
              }else if (that.datas5.indexOf(key)!=-1){
                data.data.data[key]+=300;
              }else if (that.datas10.indexOf(key)!=-1){
                data.data.data[key]+=600;
              }else if(that.datasDay.indexOf(key)!=-1){
                data.data.data[key]+=86400;
              }else if(that.datashour.indexOf(key)!=-1){
                data.data.data[key]+=1800
              }
            }
          }
          that.time = data.data.data;
        })
        //  console.log(obj.kindList)
          obj.kindList.forEach((item,index)=>{
            // console.log(item.kindId)
          })
//         this.$axios.get("/inter/ticket/timeLeft/" + obj.classId).then(function (data) {
// //        console.log(data.data.data)
          // var hours=new Date().getHours();
          // var second=new Date().getSeconds();
          //判断重庆时时彩
          // if((hours>22&&second>0)||(hours<2&&second>0)){
            // that.datas5.push('cqssc')
          // }else{
            // that.datas10.push('cqssc')
          // }
          // for(var key in data.data.data){
          //   if(data.data.data[key]<0){
          //     if(that.datas1.indexOf(key)!=-1){
          //       data.data.data[key]+=60;
          //     }else if (that.datas3.indexOf(key)!=-1){
          //       data.data.data[key]+=180;
          //     }else if (that.datas5.indexOf(key)!=-1){
          //       data.data.data[key]+=300;
          //     }else if (that.datas10.indexOf(key)!=-1){
          //       data.data.data[key]+=600;
          //     }else if(that.datasDay.indexOf(key)!=-1){
          //       data.data.data[key]+=86400;
          //     }else if(that.datashour.indexOf(key)!=-1){
          //       data.data.data[key]+=1800
          //     }
          //   }
          // }
//           that.time = data.data.data;
//         }).catch(function () {
//         })
//      console.log(obj.kindList)
//      obj.kindList.forEach((item,index)=>{
//      	console.log(item.kindId)
//      })
//  	console.log(sessionStorageGet('kinds'))
//  this.$axios.get('/inter/ticket/gamePlay/'+item.classId+'/'+item.kindId).then((data)=> {
//  				let keyName_1 = item.classId
//				 this.standGameListALL[keyName_1] = data.data.data.standGameList
//				sessionStorageSet("standGameListALL",this.standGameListALL)
//			}).catch(function(error) {
//				console.log(error)
//			})


//      console.log(obj)
      },
      // getPeriodNoAll(){
      // 	let list = {};
      // 	// var periodNoAll = sessionStorageGet('kinds');
      // 	periodNoAll.forEach((item,index)=>{
      // 		list[item.classId] ={};
      // 		item.kindList.forEach((item2,index2)=>{
      // 			list[item.classId][item2.kindId] = item2.periodNoAll
      // 		})
      // 	});
      // 	// sessionStorageSet('periodNoAll',list)
      // },
      //循环大彩种列表，并把每两个彩种放在一个数组里
      loop:function () {
        let that = this;
        for (var j = 0; j < that.datas.length; j++) {
          if (that.datas[j].kindList.length != 0) {
            that.datas[j]["show"] = false;
          }
        }
        for (var k = 0, a = [], i = that.datas.length; k < i; k += 2) {
          a.push(that.datas.slice(k, k + 2));
        }
        that.datasZ = a;
      },
      //跳转到相应的投注页面
      goBettingHall(kindId,classId){
        let that = this;
        // console.log(kindId,classId,'111')
        // this.setKindId(kindId)
        // this.$router.push({name:'bet'})
        sessionStorage.setItem('classId', JSON.stringify(classId));
       sessionStorage.setItem('kindId', JSON.stringify(kindId));
        this.$router.push({
                name: 'bet',
                // params: {
                //     classId: classId,
                //     kindId: kindId
                // }
            })
      },
    }
  }
</script>
<style>
  .bettingHall{
    height: 100%;
    width: 100;
    background-color: #545977;
    text-align: center;
    color: #fff;
    display: flex;
    flex-direction:column; 
    font-size: 0.28rem;
  }
  .bettingHall_nav{
    overflow: auto;
    padding-top: 1rem;
    background: #545977;
    height: 100%;
    box-sizing: border-box;
    flex: 1;
    padding-bottom: 0.2rem;
  }
   .bettingHall .yd-navbar{
    background: #011935 !important;
  }
  .bettingHall .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .bettingHall .yd-navbar span{
    color: #ffffff !important;
  }
  .bettingHall_nav_top{
      height: 2.75rem;
      width: 100%;
      background: url('../../../static/img/home/allKind/more_top_img.png') no-repeat;
      background-size: cover;
      margin-bottom: 0.2rem;
  }
  .bettingHall_nav_center{
      height: 2rem;
      width: 100%;
      box-sizing: border-box;
      padding: 0 0.25rem;
      background: #ffffff;   
      margin-bottom: 0.2rem;
  }
  .bettingHall_nav_center ul{
    overflow: hidden;
    box-shadow:2px 3px  3px 2px #f1f1f1;
    padding: 0.2rem 0;
  }
  .bettingHall_nav_center li{
      width: 25%;
      float: left;
  }
  .bettingHall_nav_center li img{
      height: 1.25rem;
  }
.tilel{
    width: 100%;
    padding: 0 0.25rem;
    box-sizing: border-box;
}
.tilel div{
  width: 0.5rem;
  height: 3px;
  background: #489cff;
  
}
.tilel p{
  font-size: 0.32rem;
  text-align: left;
   padding: 0.05rem
}
  .container_type{
    margin: auto;
    overflow: hidden;
    overflow-y: auto;
  }
  .container_type .pp{
     display: flex;
    display: -webkit-flex;
    display: -moz-flex; /*Firefox*/
    dispaly: flex box;

    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */

  width: 48%;
  /* height: 1.28rem; */
  align-items: center;
  float: left;
  border: 1px solid #f1f1f1;
  margin-bottom: 0.2rem;
  padding: 0.2rem;
  box-shadow:0px 0px  3px 2px #f1f1f1;
}
.container_type .pp:nth-child(2n+1){
  margin-right: 4%;
}
.container_type .pp .pp_div{
  height: 1rem;
  width: 65%;
  float: left;
  font-size: 0.32rem;
  text-align: left;
  
}
.container_type .pp img{
  display: block;
  width: 1rem;
  float:right;
}
   .container_main{
    /*flex-wrap: wrap ;*/
    height: 100%;
    background-color: #545977;
    padding: 0.2rem;
  }
  .container_type{
    width: 100%;
    margin: auto;
    overflow: hidden;
    overflow-y: auto;
  }
  .container_type p{
     display: flex;
    display: -webkit-flex;
    display: -moz-flex; /*Firefox*/
    dispaly: flex box;

    display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
    display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
    display: -ms-flexbox;      /* TWEENER - IE 10 */
    display: -webkit-flex;     /* NEW - Chrome */

  align-items: center;
}
  .container_type>div>div{
    float: left;
    width: 48%;
    background: #fff;
    margin-bottom: 0.15rem;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow:0px 0px  3px 2px #f1f1f1;
    padding: 0.2rem;
    margin: 0.07rem;
  }
  .container_type img{
    width: 1rem;
    height: 1rem;
    /* margin-right: 0.35rem; */
  }
  .container_kindId{
    float: left;
    width: 100%;
  }
  .container_detail{
    width: 48%;
    height: 0.8rem;
    float: left;
    overflow: hidden;
    background: #f1f1f1;
    margin: 0.05rem 0.07rem;
    /* border-radius: 0.2rem; */
    line-height: 0.8rem;
    text-align: center;

  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }
  .fade-enter, .fade-leave-to {
    opacity: 0
  }

  .bettingHall .navlist{
    padding: 0.05rem 0.25rem;
  }
  .bettingHall .navlist h1{
    text-align: left;
    padding: 0.2rem 0;
    color: #ffffff;
    font-size: 0.28rem;
  }
  .bettingHall .navlist ul{
    display: -webkit-flex; /* Safari */
    flex-wrap:wrap;
    display: flex;
    pad: 0.1rem 0.2rem;
    box-sizing: border-box;
  }
  .bettingHall .navlist ul li{
    flex-direction: column-reverse;
    width: 23%;
    height: 1.7rem;
    background: #489cff;
    margin: 1%;
    /* margin-bottom: 2% */
  }
  .bettingHall .navlist ul li img{
    display: block;
    margin: auto;
    width:65%;
  }
   .bettingHall .navlist ul li:nth-child(6n+1){
    background: #0094ff;
  }
  .bettingHall .navlist ul li:nth-child(6n+2){
    background: #ff2121;
  }
  .bettingHall .navlist ul li:nth-child(6n+3){
    background: #00ae8b;
  }
  .bettingHall .navlist ul li:nth-child(6n+4){
    background: #e82cfe;
  }
  .bettingHall .navlist ul li:nth-child(6n+5){
    background: #ffa31f;
  }
  .bettingHall .navlist ul li:nth-child(6n+6){
    background: #ff5400;
  }
</style>
