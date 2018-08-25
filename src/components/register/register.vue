<template>
  <div class="register">
    <div class="register_logo">
      <!-- <img src="../../../static/img/login/login_logo.png" alt=""> -->
			<img src="../../../static/img/home/fucai.png" alt="">
    </div>
    <div class="register_nav">
      <div>
        <span>账号</span>
        <input type="text" v-model="userName"  id="user" >
      </div>
      <!-- <div>
        <span>昵称</span>
        <input type="text" v-model="className" id="class">
      </div> -->
      <div>
        <span>密码</span>
        <input type="password" v-model="Password" id="passI">
      </div>
      <div>
        <span>确认密码</span>
        <input type="password" v-model="pass_word" id="passII">
      </div>
      <!--<div>-->
        <!--<span>验证码</span>-->
        <!--<input type="text">-->
        <!--<img src="" alt="">-->
      <!--</div>-->
    </div>
    <div class="register_but">
      <yd-button size="large" type="primary" @click.native=_register()  >注册</yd-button>
      <!-- <div>试玩</div> -->
      <div></div>
      <div>
        <span class="Forget_password">忘记密码？</span>
        <router-link to="/login" tag="span" class="new_register">已有账号，去登陆</router-link>
      </div>
    </div>
    <div class="register_boot">
      <p>福彩官方娱乐上线系统2.0 &copy;版权所有</p>
      <p>友情请示:理性购彩,热心公益,未满18周岁禁止购彩及兑奖</p>
    </div>
    <yd-popup v-model="show1" position="center" width="80%" border-radius="0.1rem" >
      <div style="background-color:#fff;padding: 0.5rem 0">
        <img src="../../../static/img/login/region_ok_03.png" alt="" style="width: 100%;margin: 0 auto">
        <div style="height: 0.8rem;line-height: 0.8rem;color: #d22340;font-size: 0.4rem">恭喜您，注册成功！</div>
        <div style="height: 0.8rem;line-height: 0.8rem;color: #313131;font-size: 0.3rem;margin-bottom: 0.5rem"><span style="color: #d22340;">{{countDown}}</span>秒后页面跳转</div>
        <p style="text-align: center; height: 0.8rem;">
          <router-link to="/allKinds">
            <yd-button style="width: 80%; height: 0.8rem;color: #ffffff;font-size: 0.3rem" type="danger" @click.native="show1 = false">登录</yd-button>
          </router-link>
        </p>
      </div>
    </yd-popup>


    <yd-popup v-model="show2" position="center" width="75%"  :close-on-masker=false>

            <yd-cell-group>
              <div class="modelII_header">请先填写真实姓名和手机号码</div>
                <yd-cell-item>
                    <span slot="left">真实姓名：</span>
                    <input slot="right" v-model="true_name" type="text"  placeholder="name">
                </yd-cell-item>
                <yd-cell-item>
                    <span slot="left">手机号码：</span>
                     <input slot="right" v-model="register_phone" type="number" placeholder="phone">
                </yd-cell-item>
                <yd-button type="disabled"   @click.native="goLogin" >取消</yd-button>
                <yd-button @click.native="show2 = false">确定</yd-button>
            </yd-cell-group>
      </yd-popup>
              
            
           
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        msg: '注册页',
        show1: false,
        show2: false,
        countDown: 5,
        userName: '',
        className: '',
        Password: '',
        pass_word: '',
        true_name:'',
        register_phone:'',
        rescode:'',
      }
    },
    created(){
     // this._register()
      // this.queryRegister().then(res => {
      //     this.rescode = res.code;
      //     if(res.code == 0){
      //       this.show2 = true;
      //     }else{
      //       this.show2 = false;
      //     }
      //   })
     
    },
    computed: {
			...mapState([
				'isLogin'
			])
		},
    methods:{
      ...mapActions('register',[
        'registerMember',
        'queryRegister'
      ]),
      ...mapActions('login', [
				"getUserDetails",
			]),
      ...mapMutations('register',[
        'registerMemberList'
      ]),
      ...mapMutations(['setIsLogin']),
      _register(){
        let that = this;
        let data;
        // 会员账号正则
        let reg=/^[a-zA-Z][a-zA-Z0-9_]{5,16}$/;
        // 会员密码正则
        let pass=/(?![^a-zA-Z0-9]+$)(?![^a-zA-Z/D]+$)(?![^0-9/D]+$).{6,20}$/;
        // 姓名验证
        let regNmae = /^[\u4E00-\u9FA5A-Za-z]+$/;
        // 号码验证
        let regPhone = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
        let hrefID = window.location.href;
        let urlId = hrefID.substring(hrefID.indexOf("register")+9,hrefID.length);
        if(urlId == "" || urlId == null || urlId == undefined ){
          urlId="73acd9a5972130b75066c82595a1fae3";
        }
        if(that.userName == ''){
          this.$dialog.alert({mes: "账号不能为空,且必须包括数字和字母，长度在6-16位之间！"});
          that.userName = '';
          document.getElementById('user').focus()
        }else if(!reg.test(that.userName)){
          this.$dialog.alert({mes: "您输入的格式不正确，账号必须包含数字和字母，长度在6-16位之间！"});
          that.userName = '';
          document.getElementById('user').focus()
        }
        // else if(that.className == ''){
        //   this.$dialog.alert({mes: "请输入昵称！"});
        //   that.className = '';
        //   document.getElementById('class').focus()
        // }
        
        else if(that.Password == ''){
          this.$dialog.alert({mes: "密码不能为空，且必须为6-20位，至少包含数字和字母！"});
          that.Password = '';
          document.getElementById('passI').focus()
        }else if(!pass.test(that.Password)){
          this.$dialog.alert({mes: "您输入的密码格式不正确，密码长度为6-20位，且必须包含数字和字母！"});
          that.Password = ''
          document.getElementById('passI').focus()
        }else if(that.pass_word != that.Password){
          this.$dialog.alert({mes: "您两次输入的密码不一致，请重新输入！"});
          that.Password = '';
          that.pass_word = '';
          document.getElementById('passI').focus()
        }else {
          // if(that.rescode == 0){
          //   data= {
          //   memberAccount: that.userName, // 会员账号
          //   memberName: that.className, // 昵称
          //   password: hex_md5(that.Password), // 密码
          //   promoteId: urlId ,// 链接id
          //   way:'3',//
          //   trueName :that.true_name+"",//真实姓名
          //   registerPhone:that.register_phone,//电话号码
          //   }
          // }else if(that.rescode != 0){
          //     data= {
          //     memberAccount: that.userName, // 会员账号
          //     memberName: that.className, // 昵称
          //     password: hex_md5(that.Password), // 密码
          //     promoteId: urlId ,// 链接id
          //     way:'3',//
          //   }
          // };

          data= {
              memberAccount: that.userName, // 会员账号
              // memberName: that.className, // 昵称
              password: hex_md5(that.Password), // 密码
              promoteId: urlId ,// 链接id
              way:'3',//
            }
          this.registerMember(data).then( res => {
            if( res.code == 0){
              that.show1 = true;
              this.setIsLogin(true);
              this.getUserDetails();
							// this.$router.push({
							// 	name: "allKinds"
							// })
              that.count_down()
            }else if(res.code != 0){
              this.$dialog.alert({mes: res.msg});
              that.userName = '';
              // that.className = '';
              that.pass_word = '';
              that.Password = '';
            }
          })
        }

      },
      count_down(){
        let that = this;
        that.countDown = 5;
        setInterval(function () {
          that.countDown -= 1;
          if( that.countDown === 0){
            that.show1 = false;
            that.$router.push({name: 'allKinds'})
          }
        }, 1000);
      },
      goLogin(){
        let that = this;
        that.$router.push({
						path: '/login'
					})
      }
    },
    watch:{
      // show2(){
      //   if( this.show2 == false && (this.true_name == '' || this.register_phone == '') ){
      //      this.$dialog.toast({
      //               mes: '请先填写真实姓名和手机号码',
      //               timeout: 1500,
      //               icon: 'error'
      //           });
      //     this.show2 = true;
      //   }
      // }
    }
  }
</script>

<style>
  .register{
    /* position: relative; */
    height: 100%;
    width: 100%;
    min-height: 12.34rem;
    background: url("../../../static/img/login/login_bg@2x.png") no-repeat ;
    background-size: cover;
    padding: 0.6875rem;
    box-sizing: border-box;
    color: #c5cad0;
    position: fixed;
    top:0;
    left: 0;
    bottom:0;
    right: 0;
    text-align: center;
  }
  .register_logo{
    overflow: hidden;
    margin: 0.5rem 0 0.4rem 0;
  }
  .register_logo img{
    float: left;
    width: 3rem;
    height: 1.5rem;
    /* margin-left: -0.2rem; */
  }
  .register_nav{
    color: #c5cad0;
    font-size: 0.35rem;
    text-align: left;
  }
  .register_nav div{
    height: 1rem;
    width: 100%;
    border-bottom: 1px solid #c5cad0;
    box-sizing: border-box;
    padding: 0.25rem 0;
  }
  .register_nav div span{
    float: left;
    width: 25%;
  }
  .register_nav div input{
    float: left;
    width: 40%;
    border: 0;
    color: #ffffff;
  }
  .register_nav div img{
    float: left;
    width: 25%;
    height: 0.5rem;
  }
  .register_but{
    overflow: hidden;
    padding: 0.25rem 0;
    color: #feffff;
    font-size: 0.3125rem;
  }
  .register_but div{
    height: 0.85rem;
    width: 100%;
    text-align: center;
    line-height: 0.85rem;
  }
  .register_but div:nth-child(1){
    background: #d91d36;
  }
  .register_but div:nth-child(3){
    font-size: 0.2rem;
  }
  .Forget_password{
    float: left;
    font-size: 0.3rem;
  }
  .new_register{
    float: right;
    font-size: 0.3rem;
  }
  .register_boot{
    width: 8rem;
    position: absolute;
    left: 50%;
    top:11.5rem;
    /* bottom:0.6875rem; */
    margin-left: -4rem;
    font-size: 0.24rem;
  }
  .register_boot p{
    text-align: center;
    width: 100%;
    margin: 0 auto;
  }
  .register .yd-popup-center.yd-popup-show * {
    border-radius: 0.08rem;
  }
  .register .yd-btn-block{
    height: 0.85rem;
  }
  .modelII_header{
    height: 0.7rem;
    font-size: 0.35rem;
    line-height: 0.7rem;
    color: #ffffff;
    background-color: #cccccc;
  }
</style>
