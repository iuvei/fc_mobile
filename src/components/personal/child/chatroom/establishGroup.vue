<template>
    <div id="est_group">
        <yd-navbar title="创建群聊">      
            <yd-navbar-back-icon @click.native="$router.go(-1)"  slot="left"></yd-navbar-back-icon>                      
        </yd-navbar>
        <div class="container">
            <div class="addPicture">
                <img v-if="icon===''" @click="show=true" src="../../../../../static/img/chartroom/addPicture.png" alt="">
                <img @click="show=true" v-else :src="`../../../../../static/img/chartroom/${icon}.png`" alt="">
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
                    <yd-textarea slot="right"  v-model="groupTro" placeholder="填写群介绍" maxlength="70"></yd-textarea>
                </yd-cell-item>
            </yd-cell-group>
            <Box @click.native="creat" backgroundColor="#d91d36" colorEffect="#a52c3c">
                <span>提交</span>
            </Box>
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
import Box from "../../../common/box.vue";
export default {
  data() {
    return {
      groupName: "",
      groupNotice: "",
      groupTro: "",
      show: false,
      icon: ""
    };
  },
  methods: {
    ...mapActions("chart", ["createGroup"]),
    select(n) {
      this.icon = n;
      this.show = false;
    },
    //建群
    creat() {
      if (this.groupName === "") {
        this.$dialog.toast({ mes: "请填写群名称", timeout: 1000 });
      } else if (this.icon === "") {
        this.$dialog.toast({ mes: "请设置群头像", timeout: 1000 });
      } else {
        this.createGroup({
          name: this.groupName,
          notice: this.groupNotice,
          intro: this.groupTro,
          icon: String(this.icon)
        }).then(res => {
          if(res.code===0){
               this.$dialog.toast({ mes: "创建成功", timeout: 1000 });
               this.groupName='';
               this.groupNotice='';
               this.groupTro='';
               this.icon='';
          }else if(res.code===111){
              this.$dialog.toast({ mes:res.msg, timeout: 1000 });
          }
        });
      }
    }
  },
  components: {
    Box
  }
};
</script>
<style lang="less">
@import url("../../../../../static/css/common.less");
#est_group {
  .init;
  display: flex;
  flex-direction: column;
  padding-bottom: 0;
  .container {
    .my-container;
    overflow: auto;
    flex: 1;
    .addPicture {
      margin: 0.2rem 0;
      img {
        width: 1.5rem;
        display: block;
        margin: auto;
      }
    }
    #_Box {
      .my-display(center,center);
      span {
        color: #fff;
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


