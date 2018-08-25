<template>
  <div class="helpFeedback">
    <yd-navbar title="帮助与反馈">
      <router-link to="/setup" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="helpFeedback_nav">
      <yd-cell-group title="">
        <yd-cell-item>
          <yd-textarea v-model="text" slot="right" placeholder="请输入您宝贵的意见" maxlength="1000"></yd-textarea>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-item>
        <span slot="left">联系方式：</span>
        <yd-input slot="right" v-model="input4" regex="mobile" placeholder="请输入您的联系方式"></yd-input>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">联系邮箱：</span>
        <yd-input slot="right" v-model="input3" :debug="true" regex="email" placeholder="请输入您的联系邮箱"></yd-input>
      </yd-cell-item>
      <yd-button size="large" type="danger" @click.native="_feedback">提交</yd-button>
      <div class="Customer">
        <div @click="_helpService()">
          <img src="../../../../static/img/kefu.png" alt="">
          <span> 拨打客服电话</span>
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
        msg: '帮助与反馈',
        input4: "",
        input3: "",
        text: "",
        url:''
      }
    },
    methods:{
      ...mapActions('home',['feedback','helpService']),
      _feedback(){
        let that =this;
        if(this.text == ''){
          that.$dialog.toast({
						mes:'您没有填写反馈内容！',
						timeout: 1500,
						icon: 'error'
                });
        }else if(this.input4 == ''){
          that.$dialog.toast({
						mes:'请填写您的电话号码！',
						timeout: 1500,
						icon: 'error'
                });
        }else if(this.input3 == ''){
          that.$dialog.toast({
						mes:'请填写您的电子邮箱！',
						timeout: 1500,
						icon: 'error'
                });
        }else{
          this.feedback({
            'content':this.text,
            'mobile':this.input4,
            'email':this.input3,
          }).then( res => {
            if(res.code == 0){
              that.$dialog.toast({
              mes:res.msg,
              timeout: 1500,
              icon: 'success'
                  });
            }
          })
        }
        
      },
      _helpService(){
        let that = this;
        this.helpService().then( res => {
          if(res.code == 0){
            that.url = res.data;
            // console.log(res.data)
            window.open(that.url)
          }else{
            that.$dialog.toast({
						mes: res.msg,
						timeout: 1000,
						// icon: 'success'
                });
          }
        })
      }

    }
  }
</script>
<style>
  .helpFeedback{
    height: 100%;
    background-color: #f1f1f1;
  }
  .helpFeedback_nav{
    overflow: hidden;
    /*padding-top: 1rem;*/
    background: #f7f3f4;
    height: 100%;
    box-sizing: border-box;
    padding: 1.25rem 0.25rem 0.25rem 0.25rem;
    position: relative;
  }
  .helpFeedback .yd-navbar{
    background: #011935 !important;
  }
  .helpFeedback .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .helpFeedback .yd-navbar span{
    color: #ffffff !important;
  }
  .helpFeedback .yd-cell-box{
    border-radius: 0.1rem;
    margin-bottom: 0.25rem;
  }
  .helpFeedback .yd-cell{
    border-radius: 0.1rem;
  }
  .helpFeedback .yd-textarea>textarea{
    height: 4rem;
  }
  .helpFeedback .yd-cell-item{
    background-color: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 0.1rem;
    margin-bottom: 0.25rem;
  }
  .helpFeedback .yd-cell-item:not(:last-child):after{
    display: none;
  }
  .helpFeedback .yd-cell:after{
    display: none;
  }
  .helpFeedback .yd-btn-danger{
    margin-top: 0.25rem;
    background-color: #d62541;
  }
  .Customer{
    /* position: absolute; */
    /* bottom: 0; */
    /* left: 0; */
    margin-top: 0.5rem;
    height: 1.5rem;
    /* padding: 0.25rem; */
    width: 100%;
    box-sizing: border-box;
  }
  .Customer div{
    height: 1rem;
    background-color: #d62541;
    font-size: 0.35rem;
    border-radius: 0.07rem;
    margin: auto;
    padding: 0.15rem;
    text-align: center;
  }
  .Customer img{
    display: inline-block;
    height: 0.7rem;
    vertical-align:middle;

  }
  .Customer span{
    display: inline-block;
    color: #ffffff;
    /*line-height: 0.7rem;*/
    vertical-align:middle;
    margin: 0;
  }
</style>
