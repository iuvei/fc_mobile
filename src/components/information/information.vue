<template>
	<div class="information">
		<yd-popup v-model="showPhoto" position="center"  masker-opacity="0" class="showPhoto">
			<div style="background-color:#fff;">
				<div class="title" >点击更换头像</div>
				<div class="center" style="width: 7.04rem;display: flex;justify-content: space-around;flex-wrap: wrap;">
					<div class="" v-for="item in spriteIconList" :key="item" :class="'avatar-list '+'sprite-icon-'+item" @click="changeIconClass(item)"></div>
				</div>

			</div>
		</yd-popup>
		<yd-navbar title="账号详情">
			<!-- <router-link to="/home" slot="left"> -->
			<yd-navbar-back-icon @click.native="$router.go(-1)" slot="left"></yd-navbar-back-icon>
			<!-- </router-link> -->
		</yd-navbar>
		<div class="information_nav">
			<yd-cell-group title="">
				<yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #059eea">
						<img src="../../../static/img/information/information_touxiang.png" />
					</div>
					<span slot="left">头像</span>
					<div  slot="right">
						<div :class="'avatar '+'sprite-icon-'+iconClass" @click="sel_photo"></div>
					</div>
					
				</yd-cell-item>
				<yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #059eea">昵</div>
					<span slot="left">昵称</span>
					<span slot="right">{{userDetails.nickName}}</span>
				</yd-cell-item>
				<yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #00e27e">账</div>
					<span slot="left">账号</span>
					<span slot="right">{{userDetails.account}}</span>
				</yd-cell-item>
				<!-- <yd-cell-item arrow href="#" type="link">
          <div class="imgs" slot="left" style="background-color: #00e27e">ID</div>
          <span slot="left">ID</span>
          <span slot="right">{{userDetailsList.hierarchy}}</span>
        </yd-cell-item> -->
			</yd-cell-group>
			<yd-cell-group title="">
				<yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #ff3f4a">
						<img src="../../../static/img/information/qianbao.png" />
					</div>
					<span slot="left">我的钱包</span>
					<span slot="right" style="color: #d62541">{{this.userDetails.accountBalance}}</span>
				</yd-cell-item>
				<yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #ff3f4b">
						<img src="../../../static/img/information/xin.png" />
					</div>
					<span slot="left">我的收藏</span>
				</yd-cell-item>
				<yd-cell-item >
					<div class="imgs" slot="left" style="background-color: #fe9e14">
						<img src="../../../static/img/information/xiangce.png" />
					</div>
					<span slot="left">我的相册</span>
				</yd-cell-item>
			</yd-cell-group>

		</div>
	</div>
</template>
<script>
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      msg: "设置",
      showPhoto: false,
      spriteIconList: [
        "1",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "17",
        "18",
        "19",
        "2",
        "20",
        "3",
        "4",
        "6",
        "9"
      ],
      iconClass: "1"
    };
  },
  computed: {
    ...mapState("login", ["userDetails"])
  },
  mounted() {
    if (this.userDetails.avatar) {
      this.iconClass = this.userDetails.avatar;
    }
  },
  destroyed() {
    this.getUserDetails();
  },
  methods: {
    ...mapActions(["saveDiy"]),
    ...mapActions("login", ["getUserDetails"]),
    sel_photo() {
      this.showPhoto = true;
    },
    changeIconClass(item) {
      this.saveDiy({ avatar: item });
      this.iconClass = item;
    }
  },
  watch: {
    userDetails() {
      if (this.userDetails.avatar) {
        this.iconClass = this.userDetails.avatar;
      }
    }
  }
};
</script>
<style lang="less">
.information {
  height: 100%;
  background-color: #f1f1f1;
  text-align: center;
}

.information_nav {
  overflow: hidden;
  padding-top: 1rem;
  background: #fff;
  /*height: 100%;*/
  box-sizing: border-box;
}

.information .yd-navbar {
  background: #011935 !important;
}

.information .yd-navbar .yd-navbar-item i {
  color: #ffffff !important;
}

.information .yd-navbar span {
  color: #ffffff !important;
}

.information .yd-cell-box {
  margin-bottom: 0;
  border-bottom: 0.8rem solid #f1f1f1;
}

.information_nav .imgs {
  border-radius: 0.1rem;
  margin-right: 0.35rem;
  width: 0.68rem;
  color: #ffffff;
  height: 0.65rem;
  line-height: 0.65rem;
}

.information .imgs img {
  height: 0.4rem;
  margin: 0.1rem;
}

.information .imgs .photo {
  height: 0.4rem;
  margin: 0.14rem;
}

.information .yd-cell-item {
  height: 0.95rem;
}

.information .showPhoto {
  .yd-popup-center {
    border-radius: 4px;
    box-shadow: 1px 1px 7px 2px #aaa;
  }
  .yd-popup-content {
    border-radius: 4px;
  }
  .title {
    line-height: 0.5rem;
    height: 0.5rem;
    font-size: 12px;
    opacity: 0.8;
  }
  .center {
    height: auto;
    .avatar-list {
      width: 1.28rem;
      height: 1.28rem;
      margin: 0.16rem;
      border-radius: 50%;
      background-image: url(../../../static/img/sprite.png);
      background-size: 1.28rem 22rem;
    }
  }
}
.avatar {
  width: 0.7168rem;
  height: 0.7168rem;
  border-radius: 50%;
  background-image: url(../../../static/img/sprite.png);
  background-size: 0.7168rem 15.4rem;
}
.sprite-icon-1.avatar {
  background-position: 0 -0.96rem;
}

.sprite-icon-1 {
  background-position: 0 -1.38rem;
}
.sprite-icon-10 {
  background-position: 0 -11.04rem;
}
.sprite-icon-11 {
  background-position: 0 -2.76rem;
}
.sprite-icon-12 {
  background-position: 0 -4.14rem;
}
.sprite-icon-13 {
  background-position: 0 -5.52rem;
}
.sprite-icon-14 {
  background-position: 0 -6.9rem;
}
.sprite-icon-15 {
  background-position: 0 -8.28rem;
}
.sprite-icon-17 {
  background-position: 0 -9.66rem;
}
.sprite-icon-18 {
  background-position: 0 0;
}
.sprite-icon-19 {
  background-position: 0 -12.432rem;
}
.sprite-icon-2 {
  background-position: 0 -13.8rem;
}
.sprite-icon-20 {
  background-position: 0 -15.18rem;
}
.sprite-icon-3 {
  background-position: 0 -16.568rem;
}
.sprite-icon-4 {
  background-position: 0 -17.948rem;
}
.sprite-icon-6 {
  background-position: 0 -19.332rem;
}
.sprite-icon-9 {
  background-position: 0 -20.712rem;
}
.sprite-icon-10.avatar {
  background-position: 0 -7.74rem;
}
.sprite-icon-11.avatar {
  background-position: 0 -1.94rem;
}
.sprite-icon-12.avatar {
  background-position: 0 -2.9rem;
}
.sprite-icon-13.avatar {
  background-position: 0 -3.86rem;
}
.sprite-icon-14.avatar {
  background-position: 0 -4.84rem;
}
.sprite-icon-15.avatar {
  background-position: 0 -5.8rem;
}
.sprite-icon-17.avatar {
  background-position: 0 -6.78rem;
}
.sprite-icon-18.avatar {
  background-position: 0 0;
}
.sprite-icon-19.avatar {
  background-position: 0 -8.72rem;
}
.sprite-icon-2.avatar {
  background-position: 0 -9.668rem;
}
.sprite-icon-20.avatar {
  background-position: 0 -10.628rem;
}
.sprite-icon-3.avatar {
  background-position: 0 -11.6rem;
}
.sprite-icon-4.avatar {
  background-position: 0 -12.56rem;
}
.sprite-icon-6.avatar {
  background-position: 0 -13.54rem;
}
.sprite-icon-9.avatar {
  background-position: 0 -14.5rem;
}
</style>