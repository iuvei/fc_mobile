<template>
  <div class="about">
    <yd-navbar title="关于福彩官方">
      <router-link to="/setup" slot="left">
        <yd-navbar-back-icon></yd-navbar-back-icon>
      </router-link>
    </yd-navbar>
    <div class="about_nav">
        <div class="text">
          <h1>福彩官方</h1>
          <div>福彩官方彩票是“一站式”网络娱乐平台，是行业发展迅速，口碑绝佳，操作便捷的一家多元化线上娱乐平台。自成立以来，福彩官方集团坚持一个目标：在竞争中不断超越自我，立志成为航特内一流的博彩网站之一。</div>
          <h1>福彩官方集团的承若</h1>
          <div>在此激励下，我们致力于向我们的合作伙伴提供一个公正合理，安全可靠和准确便捷的货币平台，并为活跃用户提供7*24的志愿。我们的使命不仅仅是为您提供一流的线上娱乐，同时协助您设置每场游戏的限额，让您在良好的娱乐心态下获取最佳的娱乐体验。</div>
          <h1>技术团队</h1>
          <div>聘请8年网站设计经验的专业工作室，进行网站设计，力求时尚大气红客联盟核心成员率领的百人团队，为您提供安全有保障的购彩体验，聘请国内一流运维团队，保证您能7*24小时不间断的享受福彩官方彩票带来的购彩体验200名客服人员，保证您任何的需求都能够在第一时间响应</div>
        </div>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    data(){
      return{
        msg: "设置"
      }
    }
  }
</script>
<style>
  .about{
    height: 100%;
    background-color: #f6f3f3;
    text-align: left;
    font-size: 0.32rem;
  }
  .about_nav{
    overflow: hidden;
    padding-top: 1rem;
    background: #f6f3f3;
    /*height: 100%;*/
    box-sizing: border-box;
  }
   .about .yd-navbar{
    background: #011935 !important;
  }
  .about .yd-navbar .yd-navbar-item i{
    color: #ffffff !important;
  }
  .about .yd-navbar span{
    color: #ffffff !important;
  }
  .about_nav{
      background: #f6f3f3;
      padding: 0.25rem;
      overflow: hidden;
        padding-top: 1.25rem;
        height: 100%;
    box-sizing: border-box;

  }
  .about_nav .text{
      background: #fff;
      height: 100%;
      border: 1px solid #f1f1f1;
      padding: 1rem 0.2rem;
  }
  .text div{
    margin-bottom: 0.4rem;
    font-size: 0.3rem;
  }
</style>
