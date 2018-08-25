<template>
	<div class="members">
		<yd-navbar title="代理会员">
			<router-link to="/home" slot="left">
				<yd-navbar-back-icon></yd-navbar-back-icon>
			</router-link>
      <yd-button slot="right" type="danger" @click.native="toNewMember()" >新增</yd-button>
		</yd-navbar>
		<div class="members_tel">
				<yd-cell-group>
					<yd-cell-item>
								<span slot="left">下级账号：</span>
								<input slot="right" type="text"  v-model="childAcconnt" placeholder="不指定时请留空！">
								<yd-button slot="right" type="primary"  @click.native="_queryAgentMemberInfo(childAcconnt)">查询</yd-button>
						</yd-cell-item>
				</yd-cell-group>
		</div>
		<div ref="wrapper" class="list">
			<div class="content" >
				<div v-for="(item,index) in list" class="list-item" :key="index">
				    <p><span>会员账号 </span>:<span > {{item.account}}</span></p>
						<!-- <p><span>账号名称 </span>:<span> {{item.name}}</span></p> -->
						<p><span>钱包余额 </span>:<span > {{item.accountBalance}}</span></p>
						<p><span>团队人数 </span>:<span> {{item.childCount}}</span></p>
						<p><span>下级总额 </span>:<span > {{item.childAmount}}</span></p>
						<p><span>注册时间 </span>:<span> {{item.create_time}}</span></p>
						<p><span>最后登录时间</span>:<span > {{item.last_loginTime}}</span></p>
						<p class="content_but" >
							<yd-button  type="hollow" @click.native="tomemberDetail(item.account)" >详情</yd-button>
						</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Bscroll from "better-scroll";
import { mapState, mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      list: [],
			countAll: 0,
      childAcconnt:'',
      account:'',

    };
  },
  created() {
      this.account = this.userDetails.account;
      // console.log(this.userDetails)
      this._queryAgentMemberInfo(this.account)
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
	 computed: {
            ...mapState('login', [
                'userDetails'
						]),
        },
  methods: {
    ...mapActions(["queryAgentMemberInfo"]),
    ...mapMutations(["queryLoginInfoList"]),
    ...mapActions('login', [
				"getUserDetails",
			]),
		_queryAgentMemberInfo(childAcconnt){
			let acc
			if(childAcconnt){
				acc = childAcconnt;
			}else{
				acc = this.account;
			}
			let data = {
				'memberAccount':acc,
				'strt':'1',
				'type':'2',
			};
			this.queryAgentMemberInfo(data).then( res => {
					this.list = res.data;
          this.list.forEach( item => {
            if(item.childCount == null || item.childCount == '' || item.childCount == undefined){
              item.childCount = '0'
            }
            if(item.childAmount == null || item.childAmount == '' || item.childAmount == undefined){
              item.childAmount = '0'
            }
            if(item.lastLoginTime == null){
              item.lastLoginTime = item.createTime;
            }
            item.create_time = item.createTime.slice(0, 19);
            item.last_loginTime = item.lastLoginTime.slice(0, 19);
          });
			})
    },
    tomemberDetail(account){
      console.log(account);
      if(account == this.userDetails.account){
         this.$router.push({
          path: '/memberModify',
          query: {
            id: account
          }
        })
      }else if(account != this.userDetails.account){
        this.$router.push({
          path: '/memberDetail',
          query: {
            id: account
          }
        })
      }
    },
    toNewMember(){
      this.$router.push({
        path:'/memberNew'
      })
    }
  },
  watch:{
    userDetails(){
       this.account = this.userDetails.account;
        this._queryAgentMemberInfo(this.account)

    }
  }
};
</script>

<style lang="less">
.members {
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
    // height: 100%;
    width: 100%;
    position: absolute;
    top: 2rem;
    left: 0;
    overflow: auto;
    padding: 0 0.2rem;
    color: #ffffff;
    .list-item {
      width: 100%;
      margin: 0.3rem 0;
      padding: 0.3rem;
      border-radius: 2px; /*px*/
			color: #ffffff;
			position: relative;
      p {
        text-align: left;
        span {
          color: #ffffff !important;
        }
			}
			.content_but{
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
.members .list .content div:nth-child(5n + 1) {
  background: #17a8e1;
}
.members .list .content div:nth-child(5n + 2) {
  background: #04b0c4;
}
.members .list .content div:nth-child(5n + 3) {
  background: #5f65c3;
}
.members .list .content div:nth-child(5n + 4) {
  background: #4ba708;
}
.members .list .content div:nth-child(5n + 5) {
  background: #e6a316;
}
.members_tel {
  display: inline;
  position: fixed;
  top: 1rem;
  left: 0;
  height: 1rem;
  width: 100%;
  background-color: #cccccc;
  z-index: 10;
}
</style>
