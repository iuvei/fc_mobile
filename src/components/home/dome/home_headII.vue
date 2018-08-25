<template>
    <div class="headerII">
        <yd-flexbox>
            <yd-flexbox-item>
                <yd-button size="large" type="danger" @click.native="show3 = true">
                    <yd-icon name="type" color="#ffffff"></yd-icon>
                </yd-button>
                <div class="home_head_logo"></div>
            </yd-flexbox-item>
            <yd-flexbox-item>
                <yd-flexbox>
                    <div @click="toPash('/information')" class="home_head_right" style="background-color: #0ab6a5">
                        <img src="../../../../static/img/home/cbl_yonghuzhongxin.png" alt="">
                        <div>{{userDetailsList.account}}</div>
                    </div>
                    <div @click="toPash('/information')" class="home_head_right" style="background-color: #e54600">
                        <img style="width:40%" src="../../../../static/img/home/cbl_qiandai.png" alt="">
                        <div style="width:60%">{{userDetailsList.accountBalance}}</div>
                    </div>
                </yd-flexbox>
            </yd-flexbox-item>
        </yd-flexbox>

        <yd-popup v-model="show3" position="left" width="60%" style="z-index:1000;">
            <!-- <div style="height:0.8rem"></div> -->
            <!--<yd-button type="danger" style="margin: 5px;background: rgba(255 255 255 0)" @click.native="show3 = false">Close Left Popup</yd-button>-->
            <!-- <img src="../../../../static/img/home/home_logo.png" alt=""> -->
            <div class="yd-popup-top">
                <yd-icon name="type" color="#ffffff"></yd-icon>
                <span>最常用</span>
            </div>
            <ul class="yd-popup-list">
                <li @click="goBet">
                    <div style="background: #025de6">
                        <img src="../../../../static/img/home/cbl_wenben.png" alt="">
                    </div>
                    <span>{{showName}}</span>
                </li>
                <li @click="toPash('/recharge')">
                    <div style="background: #e54600">
                        <img src="../../../../static/img/home/cbl_qiandai.png" alt="">
                    </div>
                    <span>充值</span>
                </li>
                <li @click="toPash('/withdraw')">
                    <div style="background: #0ab6a5">
                        <img src="../../../../static/img/home/cbl_tixian.png" alt="">
                    </div>
                    <span>提现</span>
                </li>
                <li @click="toPash('/activity')">
                    <div style="background: #ef9118">
                        <img src="../../../../static/img/home/cbl_yuohuihuodong.png" alt="">
                    </div>
                    <span>优惠活动</span>
                </li>
                <li @click="toPash('/award')">
                    <div style="background: #1a7dc2">
                        <img src="../../../../static/img/home/cbl_awary.png" alt="">
                    </div>
                    <span>开奖历史</span>
                </li>
                <li @click="toPash('/help')">
                    <div style="background: #c30410">
                        <img src="../../../../static/img/home/cbl_bangzhuzhongxin.png" alt="">
                    </div>
                    <span>帮助中心</span>
                </li>
                <li>
                    <div style="background: #068834">
                        <img src="../../../../static/img/home/cbl_kehuduanxiazai.png" alt="">
                    </div>
                    <span>客户端下载</span>
                </li>
            </ul>
            <div class="home_but">
                <div @click="toPash('/information')">
                    <img src="../../../../static/img/home/cbl_yonghuzhongxin.png" alt="">
                </div>
                <img @click="toPash('/setup')" src="../../../../static/img/home/cbl_shezhi.png" alt="">
                <img @click="_signOut()" src="../../../../static/img/home/cbl_guanbi.png" alt="">
            </div>
        </yd-popup>
        
    </div>
</template>
<script>
    import gameConfig from '../../bet/gameConfig.js';
    import {
        mapState,
        mapActions,
        mapMutations
    } from "vuex";
    export default {
        data() {
            return {
                msg: '',
                show3: false,
                show1: false,
                validateCode: '',
                Login: true,
                userDetailsList: [],
                showName:'重庆彩',
            }
        },
        created() {
        	if(JSON.parse(sessionStorage.getItem('kindId'))){
        		this.showName = gameConfig[JSON.parse(sessionStorage.getItem('kindId'))].gameName;
        	}
            this.userDetailsList = this.userDetails
        },
        computed: {
            ...mapState('login', [
                'userDetails'
            ]),
            ...mapState([
                'isLogin'
            ]),
            ...mapState('chart', ['chartsocket'])
        },
        methods: {
            ...mapActions('home', ['signOut']),
            ...mapActions('login', [
                'touristLogin'
            ]),
			...mapMutations('bet', [
				'cacheHistoryData'
			]),
            ...mapMutations(['setIsLogin']),
            _signOut() {
                let that = this;
                this.signOut().then(res => {
                    if (res.code == '0') {
                        this.setIsLogin(false);
                        this.$dialog.toast({
                            mes: "登出成功",
                            timeout: 1000,
                            icon: 'success'
                        });
                    }
                })
                this.$router.push({
                    path: '/login'
                })
                sessionStorage.setItem("chartLogin", "2");
                this.chartsocket.close();
            },
            goBet() {
            	let classId,kindId;
            	if(this.showName == '重庆彩'){
            	kindId = 'cqssc';
                classId = '3';
            	}else{
            	kindId = JSON.parse(sessionStorage.getItem('kindId'));
                classId = JSON.parse(sessionStorage.getItem('classId'));
            	}
                

                let path = '/bet/'
                if (classId == '2') {
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
                    if (error.response) {} else if (error.request) {
                        if (error.request.readyState == 4 && error.request.status == 0) {
                            this.cacheHistoryData(null)
                            this.$router.push({
                                path: path + classId + '/' + kindId,
                            })
                        }
                    } else {
                        console.log('Error', error.message);
                    }
                })
                if (JSON.parse(sessionStorage.getItem(kindId))) {
                    let obj = {};
                    let kindList = JSON.parse(sessionStorage.getItem(kindId))
                    kindList.forEach((item) => {
                        item.gameSons.forEach((item2) => {
                            obj[item2.subGameId] = item2.odd;
                        })

                    })
                }
                sessionStorage.setItem('classId', JSON.stringify(classId));
                sessionStorage.setItem('kindId', JSON.stringify(kindId));
                sessionStorage.setItem('prevPath', "/allKinds");
            },
            toPash(name) {
                if (this.isLogin == false) {
                    this.$dialog.toast({
                        mes: '未登录',
                        timeout: 1000,
                        // icon: 'success'
                    });
                } else if ((name == '/withdraw' || name == '/recharge' || name == '/setup') && this.userDetails.type ==
                    1) {
                    this.$dialog.toast({
                        mes: '会员登录查看更多',
                        timeout: 1000,
                        // icon: 'success'
                    });
                } else if (name == '/bet') {
                    sessionStorage.setItem('classId', JSON.stringify('3'));
                    sessionStorage.setItem('kindId', JSON.stringify('cqssc'));
                    this.$router.push({
                        path: name
                    })
                } else {
                    this.$router.push({
                        path: name
                    })
                }
            },
        },
        watch:{
             $route(to,from){
                console.log(to.path,'1');
            }
        }
    }
</script>
<style lang="less">
    .headerII {
        color: white;
        .yd-flexbox-item {
            height: 1rem;
            i {
                float: left;
                width: 0.4rem;
                height: 0.4rem;
                font-size: 0.4rem !important;
                margin: 0.3rem 0.2rem 0.1rem 0.2rem;
            }
            .yd-btn-danger {
                background-color: rgba(255, 255, 255, 0);
            }
            .yd-btn-block {
                margin-top: 0 !important;
                width: 20%;
                float: left;
            }
            .home_head_logo {
                float: left;
                height: 1rem;
                width: 2rem;
                // background: url("../../../../static/img/home/home_logo.png") no-repeat;
                background: url("../../../../static/img/home/fucai.png") no-repeat;
                background-size: cover;
                // margin-top: 0.15rem;
            }
            .home_head_right {
                height: 0.82rem;
                margin-right: 0.1rem;
                margin-top: 0.1rem;
                padding: 0.02rem;
                width: 50%;
                div {
                    width: 65%;
                    float: left;
                    color: #ffffff;
                    box-sizing: border-box;
                    padding-top: 0.4rem; // font-size: 0.28rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    text-align: center;
                }
                img {
                    width: 35%;
                    float: right;
                    padding: 0.05rem;
                    box-sizing: border-box;
                }
            }
        }
        .yd-popup-content {
            background-color: #001928;
            padding: 0.2rem 0.2rem 0.2rem 0.2rem;
            box-sizing: border-box;
            img {
                height: 0.9rem;
            }
            .yd-popup-top {
                height: 1rem;
                padding-top: 0.5rem;
                i {
                    float: left;
                    font-size: 0.5rem !important;
                }
                span {
                    float: left;
                    margin-left: 0.5rem;
                    font-size: 0.32rem;
                    height: 0.5rem;
                    line-height: 0.6rem;
                }
            }
            .yd-popup-list {
                padding-top: 0.2rem;
                li {
                    height: 1rem;
                    margin-bottom: 0.15rem;
                    div {
                        margin-left: 1rem;
                        height: 1rem;
                        width: 1rem;
                        float: left;
                        background: #49a4f5;
                        padding: 0.125rem;
                        img {
                            height: 0.75rem;
                            margin-left: 0;
                        }
                    }
                    span {
                        float: left;
                        height: 1rem;
                        line-height: 1rem;
                        font-size: 0.32rem;
                        margin-left: 0.25rem;
                    }
                }
            }
            .home_but {
                position: absolute;
                left: 0.2rem;
                bottom: 0.2rem;
                z-index: 100;
                width: 0.6rem;
                height: 2.7rem;
                div {
                    height: 0.6rem;
                    width: 0.6rem;
                    border-radius: 100%;
                    background: #676766;
                    padding: 0.1rem;
                    box-sizing: border-box;
                    img {
                        width: 0.4rem;
                        height: 0.4rem;
                        margin: 0;
                    }
                }
                img {
                    height: 0.5rem;
                    width: 0.5rem;
                    border-radius: 100%;
                    margin-top: 0.45rem;
                    margin-left: 0.05rem;
                }
            }
            .shiwan {
                height: 1rem;
                width: 100%;
                input {
                    float: left;
                    height: 1rem;
                    width: 60%;
                    border: 1px solid #b1b1b1;
                    font-size: 0.4rem;
                    padding: 0.1rem;
                }
                img {
                    float: right;
                    height: 1rem;
                    width: 38%;
                }
            }
        }
    }
</style>
