<template>
	<div class="memberModify">
		<yd-navbar title="详细信息">
			<router-link to="/members" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
		</yd-navbar>
		<div ref="wrapper" class="list">
			<div class="content" >
				<div  class="list-item">
				  <p><span>用户账号 </span>:<span >{{user.account}}</span></p>
					<!-- <p><span>用户昵称 </span>:<span>{{user.nickName}} </span></p> -->
					<p><span>账号余额 </span>:<span >{{user.accountBalance}} </span></p>
					<p><span>账号等级 </span>:<span>{{hierarchy[user.hierarchy]}}</span></p>
          <p><span>&nbsp;&nbsp; Q  Q &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>:<span>{{user.qq}} </span></p>
					<p><span>&nbsp;&nbsp; 微 信  &nbsp;&nbsp;&nbsp;</span>:<span >{{user.vx}} </span></p>
					<p><span>&nbsp;&nbsp; 号 码  &nbsp;&nbsp;&nbsp;</span>:<span>{{user.phone}}</span></p>
					
				</div>
        <yd-cell-group>
        <yd-cell-item>
            <span slot="left">QQ：</span>
            <yd-input slot="right" v-model="valueQQ" :debug="true" regex="^\d{5,12}$" :placeholder="user.qq=='QQ未绑定'?user.qq = '请输入QQ':user.qq = user.qq "></yd-input>
        </yd-cell-item>

        <yd-cell-item>
            <span slot="left">微信：</span>
            <yd-input slot="right" v-model="valueVX" regex="/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/" :placeholder="user.vx== '微信未绑定'? user.vx = '请输入微信': user.vx = user.vx"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
            <span slot="left">手机号：</span>
            <yd-input slot="right" v-model="valuePhone" regex="mobile" :placeholder="user.phone == '号码未绑定' ? user.phone = '请输入号码': user.phone = user.phone"></yd-input>
        </yd-cell-item>
    </yd-cell-group>
     <yd-button size="large" type="primary"  @click.native="_updateOwnInfo">修改</yd-button>
                
			</div>
		</div>
	</div>
</template>

<script>
import Bscroll from "better-scroll";
import { mapState, mapActions, mapMutations } from "vuex";
import Pagination from "../../common/pagination";
export default {
  data() {
    return {
      user: {},
      valueQQ: "",
      valueVX: "",
      valuePhone: "",
      hierarchy: {
        "0": "会员",
        "1": "一级代理",
        "2": "二级代理",
        "3": "三级代理",
      }
    };
  },
  created() {
    this.getUserDetails().then( data =>{
                this.user = this.userDetails;
                if(!this.userDetails.qq){
        this.user.qq = 'QQ未绑定';
        
      }else{
        this.user.qq = this.userDetails.qq;
      }
      if(this.userDetails.vx){
        this.user.vx = this.userDetails.vx;
      }else{
        this.user.vx = '微信未绑定';
      }
      if(this.userDetails.phone){
        this.user.phone = this.userDetails.phone;
      }else{
        this.user.phone = '号码未绑定';
      }
            })
    
      
  
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
    ...mapActions(["updateOwnInfo"]),
    ...mapActions('login', [
				"getUserDetails",
			]),
    ...mapMutations(["queryLoginInfoList"]),
    _updateOwnInfo(account) {
      if (this.valueQQ == "" && this.valueVX == "" && this.valuePhone == "") {
        this.$dialog.toast({
          mes: "您没有做任何修改",
          timeout: 1500,
          icon: "success"
        });
      } else {
        let data = {
          qq: this.valueQQ == ''? this.valueQQ = this.user.qq : this.valueQQ = this.valueQQ,
          vx: this.valueVX == ''? this.valueVX = this.user.vx : this.valueVX = this.valueVX,
          phone: this.valuePhone == ''? this.valuePhone = this.user.phone : this.valuePhone = this.valuePhone,
        };
        this.updateOwnInfo(data).then(res => {
          console.log(res);
          if (res.code == 0) {
            this.$dialog.toast({
              mes: "保存成功",
              timeout: 1500,
              icon: "success"
            });
            this.getUserDetails().then( data =>{
                console.log(data)
            })
          }else{
            this.$dialog.toast({
              mes: res.msg,
              timeout: 1500,
              icon: "errror"
            });
          }
        });
      }
    }
  },
   watch:{
    userDetails(){
       this.user = this.userDetails;
    }
  }
};
</script>

<style lang="less">
.memberModify {
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
    width: 100%;
    position: absolute;
    top: 1rem;
    // bottom: 1rem;
    overflow: auto;
    padding: 0 0.2rem;
    color: #000;
    .list-item {
      width: 100%;
      margin: 0.3rem 0;
      padding: 0.3rem;
      border-radius: 2px; /*px*/
      color: #ffffff;
      position: relative;
      background-color: #17a8e1;
      p {
        text-align: left;
        span {
          // color: #ffffff !important;
          color: #ffffff;
        }
      }
      .content_but {
        position: absolute;
        right: 0.2rem;
        top: 0.2rem;
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
// .memberModify .list .content div:nth-child(5n + 1) {
//   background: #17a8e1;
// }
</style>
