<template>
    <div id="manageGroup">
         <yd-navbar title="编辑资料">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>     
            <span @click="submit" slot="right" style="color:#fff">提交</span>      
        </yd-navbar>
        <div class="container">
            <div class="addPicture">
                <img  @click="show=true" :src="`../../../../../static/img/chartroom/${icon}.png`" alt="">
            </div>
          <yd-cell-group>
                <yd-cell-item>
                <span slot="left">群名称：</span>
                <yd-input slot="right" v-model="groupName" placeholder="填写群名称(2~10个字)" :min='2' :max='10' :required="true"></yd-input>
            </yd-cell-item>
             <yd-cell-item>
                <span slot="left">群公告：</span>
                <yd-input slot="right" v-model="groupNotice" placeholder="填写群公告(30字内)" :max='30'></yd-input>
            </yd-cell-item>
                <yd-cell-item>
                    <yd-textarea slot="right"  v-model="groupTro" placeholder="填写群介绍:" maxlength="70"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
        </div>


         <yd-popup v-model="show" position="center" width="90%">
            <div class="selectPicture">
                <p>选择图像：</p>
                <div >
                    <img @click="select(n)"  v-for="n in 4" :key="n" :src="`../../../../../static/img/chartroom/${n}.png`" alt="">
                </div>       
            </div>
        </yd-popup>
    </div>
</template>
<script>
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
export default {
  data() {
    return {
      fromSource: this.$route.query.groupId,
      groupName: "",
      groupNotice: "",
      groupTro: "",
      show: false,
      icon:''
    };
  },
  created() {
    //群信息
    this.queryGroupInfo(`/${this.fromSource}`).then(res => {
      this.groupName = this.groupInfo.name;
      this.groupNotice = this.groupInfo.notice;
      this.groupTro = this.groupInfo.intro;
      this.icon=this.groupInfo.icon
    });
  },
  methods: {
    ...mapActions("chart", ["queryGroupInfo",'updateGroupInfo']),
    select(n) {
      this.icon = n;
      this.show = false;
    },
    submit(){
        this.updateGroupInfo({
            name:this.groupName,
            notice:this.groupNotice,
            intro:this.groupTro,
            icon:String(this.icon),
            groupId:this.fromSource
        }).then(res=>{
            if(res.code===0){
                  this.$dialog.toast({ mes: "修改成功", timeout: 1000,callback:()=>{
                      this.$router.go(-1)

                  } });
            }else{
                  this.$dialog.toast({ mes: res.msg, timeout: 1000 });
            }

        })
    }
  },
  computed: {
    ...mapState("chart", ["groupInfo"])
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#manageGroup {
  .init;
  padding-bottom: 0;
  .container {
    height: 100%;
    .yd-cell:after {
      border: 0;
    }
    .addPicture {
      margin: 0.2rem 0;
      img {
        width: 1.5rem;
        display: block;
        margin: auto;
      }
    }
  }
  .selectPicture {
    background: #fff;
    padding: 0.2rem 0.3rem;
    div {
      .my-display(space-around,center);
      margin: 0.2rem 0;
    }
  }
}
</style>


