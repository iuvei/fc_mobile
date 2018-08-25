<template>
  <div class="awardII">
    <yd-navbar title="开奖结果">
      <!-- <router-link to="/award" slot="left"> -->
        <yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
      <!-- </router-link> -->
      <div slot="right">
        <div style="width: 100%">
          <img src="../../../../static/img/home/runChart.png" alt="" style="display: block;width: 0.35rem;margin: auto">
          <div style="width: 100%;color: #ffffff;font-size: 0.2rem">走势图</div>
        </div>
      </div>
    </yd-navbar>
    <div ref="wrapper" class="awardII_nav">
      <div class="content">
        <div class="awardII_text" v-for="(item,index) in winsDragon_List ">
        <div>
          <span>{{item.className}} &nbsp; &nbsp;</span>
          <span style="position: relative">第<span>{{item.awarPeriod.substring(9)}}</span>期&nbsp; {{item.awardTime.substring(0,19)}} <i class="new_img" v-if="index == 0">最新</i> </span>
        </div>
        <div>
          <ul>
            <li v-for="item in winsDragon_List_num[index]" :class="classId=='6'?'pk_ten':''">{{item}}</li>
          </ul>
          <!-- <p>和值：25|组二</p> -->
        </div>
      </div>
      <div style="height:2.2rem"></div>

      </div>
      
    </div>
    <div class="go_bet">
      <button @click="toPath(classId,kindId)">
        <yd-button type="danger">去投{{this.$route.query.lName}}</yd-button>
      </button>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll';
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        msg: '开奖结果',
        winsDragon_List: [],
        winsDragon_List_num: [],
        isActiveII:false,
        classId:'',
        kindId:''
      }
    },
    created(){
      this._winsDragon()
      this.classId = this.$route.query.cId;
      this.kindId =this.$route.query.kid;
      console.log(this.$route.query.kid,this.$route.query.lName,this.$route.query.cId,'00')
      // this.$route.query.kid;
    },
    mounted() {
			this.$nextTick(() => {
				let scroll = new Bscroll(this.$refs.wrapper, {
					scrollbars: true,
					listenX: true,
					click: true,
				})
				scroll.on('scrollEnd', this.scrollEnd);
				scroll.on('scrollStart', this.scrollStart);
			})
		},
    methods:{
			...mapMutations('bet', [
				'cacheHistoryData'
			]),
      ...mapActions('home',[
        'winsDragon'
      ]),
      ...mapMutations('home',[
        'winsDragonList'
      ]),
      _winsDragon(){
        let that = this;
        let data = this.$route.query.kid;
        that.winsDragon_List_num = [];
        this.winsDragon(data).then( res => {
          if(res.code == 0){
            that.winsDragon_List = res.data.winList;
            // that.winsDragon_List['className'] = this.$route.query.lName;
            console.log(that.winsDragon_List);
            that.winsDragon_List.forEach( item => {
              item['className'] = this.$route.query.lName;
              if(item.awardNum == null && that.$route.query.cId == 6){
                that.isActiveII = true;
                that.winsDragon_List_num.push(['?','?','?','?','?','?','?','?','?','?']);
              }else if(item.awardNum == null && (that.$route.query.cId == 4 || that.$route.query.cId == 1)){
                that.isActiveII = false;
                that.winsDragon_List_num.push(['?','?','?']);
              }else if(item.awardNum == null){
                that.isActiveII = false;
                that.winsDragon_List_num.push(['?','?','?','?','?']);
              } else {
                that.isActiveII = false;
                that.winsDragon_List_num.push(item.awardNum.split(','));
              }
            })
            console.log(that.winsDragon_List_num)
          }

        })
      },
      toPath(classId,kindId){
				let path = '/bet/'
				if(classId=='2'){
					path = '/hk6bet/'
				}
					this.$http.get(this.global.baseUrl + '/inter/ticket/winsDragon/' + kindId, {
						timeout: 500
					}).then((res) => {
						this.cacheHistoryData(res.data)
						this.$router.push({
							path: path + classId + '/' + kindId,
						})
					}).catch((error) => {
						if(error.response) {} else if(error.request) {
							if(error.request.readyState == 4 && error.request.status == 0) {
								this.cacheHistoryData(null)
								this.$router.push({
									path: path + classId + '/' + kindId,
								})
							}
						} else {
							console.log('Error', error.message);
						}
					})
					if(JSON.parse(sessionStorage.getItem(kindId))){
						let obj = {};
						let kindList = JSON.parse(sessionStorage.getItem(kindId))
						kindList.forEach((item)=>{
							item.gameSons.forEach((item2)=>{
								obj[item2.subGameId] = item2.odd;
							})
							
						})
					}
					sessionStorage.setItem('classId', JSON.stringify(classId));
					sessionStorage.setItem('kindId', JSON.stringify(kindId));
					sessionStorage.setItem('prevPath', "/redPacket");

				}
    }
  }
</script>
<style>
  .awardII{
    /*overflow: hidden;*/
    height: 100%;
    text-align: center;
    display: flex;
    flex-direction:column; 
  }
  .awardII_nav{
    overflow: auto;
    position: absolute;
    top: 1rem;
    height: 100%;
    width: 100%;
    background: #f9f9f9;
    flex: 1;
    box-sizing: border-box;
  }
  .awardII .yd-navbar{
    background: #011935 !important;
  }
  .awardII .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .awardII .yd-navbar span{
    color: #ffffff !important;
  }
  .awardII_text .yd-cell-item{
    float: left;
    width: 20%;
  }
  .awardII_text{
    height: 2.265rem;
    border-bottom: 0.03rem solid #dfdfdf;
    box-sizing: border-box;
    padding: 0.4rem 0.2rem 0.1rem 0.2rem;
  }
  .awardII_text:nth-child(1){
    background-color: #fcf8ef !important;
  }
  .awardII_text:nth-child(1) li {
    color: #ffffff !important;
    background: #dd1c37 !important;
  }
  .awardII_text:nth-child(1) li:nth-last-child(1) {
    /*color: #ffffff !important;*/
    background: #50a5f6 !important;
  }
  .awardII_text div:nth-child(1){
    height: 0.4rem;
    color: #000000;
    text-align: left;
    font-size: 0.3rem;
    font-weight: 700;
  }
  .awardII_text div:nth-child(2){
    height: 1rem;
    text-align: left;
    box-sizing: border-box;
    padding: 0.15rem 0;
    font-size: 0.25rem;
  }
  .awardII_text div:nth-child(2) ul{
    min-width: 4rem;
  }
  .awardII_text div:nth-child(2) ul li{
    color: #dd1c37;
    height: 0.7rem;
    width: 0.7rem;
    border-radius: 0.7rem;
    text-align: center;
    line-height: 0.78rem;
    float: left;
    margin: 0 0.08rem;
    font-size: 0.35rem;
  }
  .pk_ten{
    color: #dd1c37 !important ;
    height: 0.55rem !important;
    width: 0.55rem !important;
    text-align: center;
    line-height: 0.5rem !important;
    background: #f9f9f9 !important;
    margin: 0.15rem 0.05rem !important;
  }
  .awardII_text div:nth-child(2) p{
    line-height: 0.7rem;
    color: #717171;
  }
  .go_bet{
    width: 100%;
    height: 1rem;
    position: fixed;
    bottom: 0;
    left: 0;
    background: #011935;
    line-height: 1rem;
  }
  .go_bet button{
    background: #dd1c37;
    border: 0;
    border-radius: 0.08rem;
  }
  .new_img{
    position: absolute;
    top: -0.3rem;
    right: -0.8rem;
    display: inline-block;
    height: 0.38rem;
    width: 0.75rem;
    background-color: #f18f49;
    color: white;
    font-size: 12px !important;
    text-align: center;
    line-height: 0.4rem;
    border-radius: 0.08rem;
    font-family:新宋体 ;
  }

</style>
