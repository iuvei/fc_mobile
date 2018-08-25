<template>
  <div class="setup">
    <yd-navbar title="设置">
      <router-link to="/home" slot="left">
        <yd-navbar-back-icon ></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="setup_nav">
      <yd-cell-group title="">
        <yd-cell-item arrow href="/announcement" type="link">
          <div class="imgs" slot="left" style="background-color: #059eea">
            <img  src="../../../static/img/setup/xiaoxi.png" />
          </div>
          <span slot="left">新消息通知</span>
        </yd-cell-item>
        <yd-cell-item arrow href="#" type="link">
          <div class="imgs" slot="left" style="background-color: #059eea">
            <img  src="../../../static/img/setup/biyan.png" />
          </div>
          <span slot="left">隐私</span>
        </yd-cell-item>
        <yd-cell-item arrow href="#" type="link">
          <div class="imgs" slot="left" style="background-color: #059eea">
            <img  src="../../../static/img/setup/shezhi.png" />
          </div>
          <span slot="left">通用</span>
        </yd-cell-item>
      </yd-cell-group>
      <yd-cell-group title="">
        <yd-cell-item arrow href="/security?id=0" type="link">
          <div class="imgs" slot="left" style="background-color: #fca426">
            <img  src="../../../static/img/setup/suo.png" />
          </div>
          <span slot="left">修改密码</span>
        </yd-cell-item>
        <yd-cell-item arrow href="/security?id=1" type="link">
          <div class="imgs" slot="left" style="background-color: #fca426">
            <img  src="../../../static/img/setup/qiandai.png" />
          </div>
          <span slot="left">资金密码</span>
        </yd-cell-item>
        <!-- <yd-cell-item type="label">
          <div class="imgs" slot="left" style="background-color: #ff2b43">
            <img  src="../../../static/img/setup/jiugongge.png" />
          </div>
          <div slot="left">锁屏手势</div>
          <yd-switch slot="right" v-model="ydswitch" color="#fc263e"></yd-switch>
        </yd-cell-item>
        <yd-cell-item type="label">
          <div class="imgs" slot="left" style="background-color: #fc263e">
            <img  src="../../../static/img/setup/dunpai.png" />
          </div>
          <div slot="left">设备锁</div>
          <yd-switch slot="right" v-model="ydswitchs" color="#fc263e"></yd-switch>
        </yd-cell-item> -->
      </yd-cell-group>
      <yd-cell-group title="">
        <yd-cell-item arrow href="/helpFeedback" type="link">
          <div class="imgs" slot="left" style="background-color: #049844">
            <img  src="../../../static/img/setup/wenda.png" />
          </div>
          <span slot="left">帮助与反馈</span>
        </yd-cell-item>
        <yd-cell-item arrow href="/about" type="link">
          <div class="imgs" slot="left" style="background-color: #009940">
            <img  src="../../../static/img/setup/gantan.png" />
          </div>
          <span slot="left">关于福彩官方</span>
        </yd-cell-item>
      </yd-cell-group>

    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return{
        msg: "设置",
        ydswitch: false,
        ydswitchs: false
      }
    }
  }
</script>
<style>
  .setup{
    height: 100%;
    background-color: #f1f1f1;
  }
  .setup_nav{
    overflow: hidden;
    padding-top: 1rem;
    background: #fff;
    /*height: 100%;*/
    box-sizing: border-box;
  }
  .setup .yd-navbar{
    background: #011935 !important;
  }
  .setup .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .setup .yd-navbar span{
    color: #ffffff !important;
  }
  .setup .yd-cell-box{
    margin-bottom: 0;
    border-bottom: 0.8rem solid #f1f1f1;
  }
  .setup .imgs{
    border-radius: 0.1rem;
    margin-right: 0.35rem;
    width: 0.7rem;
    height: 0.65rem;
    /*border: 0;*/
    /*padding-top: 0.05rem;*/
    /*box-sizing: border-box;*/
  }
  .setup .imgs img{
    height: 0.4rem;
    margin: 0.1rem 0.145rem;
  }
  /* .setup .yd-cell-item{
    height: 0.95rem;
    border-bottom: 0.015625rem solid #d9d9d9 !important;
  } */
</style>
