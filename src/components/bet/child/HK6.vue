<template>
    <div class="hk6_view">
        <div class="clockView hk6">
            <div class="left">
                <div style="display: flex;justify-content: center;align-items: center;height: .6rem;">
                    <img src="../../../../static/img/lingdang.png" style="width: 0.3rem;margin-right:0.1rem;" />
                    <span style="color: #FFFFFF;font-size: 12px;">第{{prevAwarPeriod2}}开奖</span>
                </div>
                <div>
                    <ul style="display: flex;justify-content: space-around;">
                        <li v-for="item in awardNum">
                            <div :class="'num_ball '+num_color[item]">{{item=='grey'?'?':item}}</div>
                            <div style="font-size: 14px;color: #6ccae3;text-align: center;">{{num_type[item]?num_type[item]:'-'}}</div>
                        </li>
                    </ul>

                </div>

            </div>
            <div class="lines" style="height: 100%;width: 1px;background: #FFFFFF;opacity: .6;"></div>
            <div class="right" style="padding: 0;">
                <p style="height: .6rem;display: flex;justify-content: center;align-items: center;">
                    <img src="../../../../static/img/naozhong.png" style="width: 0.3rem;margin-right:0.1rem;" />第{{currentAwarPeriod2}}期截止</p>
                <CountDown class="clock-count" :format="':'" :kindId="kindId" :classId="classId" style="font-size: 14px;color:#e43a45;" @stop="countDown"></CountDown>
            </div>
        </div>
        <div style="position: relative;background:#FFFFFF;z-index: 1000;" v-clickoutside3="closeModal">
            <transition name="fade">
                <div :style="listInfo_style" class="listInfo" ref="wrapper3">
                    <div>
                        <table border="0" cellspacing="0" cellpadding="0" style="width: 100%;" class="content">
                            <tr style="background: #f5f6fa;">
                                <td>期数</td>
                                <td>开奖号码</td>
                                <td v-for="(item,index) in gameConfig[kindId].labels">{{item}}</td>
                            </tr>

                            <tr v-for="(item,index) in winList" v-if="item.awardNum">
                                <td>{{item.awarPeriod}}</td>
                                <td>{{item.awardNum}}</td>
                                <td v-for="(item2,index2) in item.awardNum.split(',')">{{item2}}</td>
                            </tr>
                        </table>
                    </div>

                </div>
            </transition>
            <div class="xiala" style="z-index: 1000;" @click="open" ref="open">
                <img src="../../../../static/img/xiangxia.png" :class="show1?'top':'bottom'" />
            </div>
        </div>
        <div class="hk6_betPanel" style="overflow: hidden;flex: 1;padding-bottom: 1rem;">
            <div class="content" style="height: 100%;display: flex;flex-direction: column;">
                <div class="info">
                    <div style="display: flex;width: 100%;flex-direction: column;height: 100%;">
                        <div class="top">
                            <div style="display: flex;align-items: center;">
                                <img src="../../../../static/img/img_gold_pig.png" />
                                <span>{{userDetails.accountBalance}}</span>
                            </div>
                            <div v-if="showHotColdOrOmit.indexOf(subGameId)!=-1">
                                <yd-radio-group v-model="showType" color="#000000" size="15">
                                    <yd-radio val="hotCold">冷热</yd-radio>
                                    <yd-radio val="omit">遗漏</yd-radio>
                                </yd-radio-group>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bet_list_hk6">
                    <div class="left">
                        <ul class="conent">
                            <li v-for="(item,index) in standGameList" :style="hk6Index==index?{color:'#fff600'}:''" @click="selHk6Index(index)">{{item.gameName}}</li>
                        </ul>
                    </div>

                    <!--特两面-->
                    <div class="right">
                        <yd-tab horizontal-scroll active-color="#fff600" :callback='selectSubGameId' ref="ydtab">
                            <yd-tab-panel :label="key" :tabkey="index" v-for="(val, key,index) of standGameList[hk6Index].gameSons[0]"></yd-tab-panel>
                        </yd-tab>
                        <div class="btn_box" ref="hk6_scorll_right">
                            <div class="conent" v-if="templateType.other[subGameId]">
                                <ul>
                                    <li class="btn_item" @touchend="selected_num({row:0,col:index})" v-for="(item,index) in betDataList.numbers[0].cols" :style="item.data_selected?{background: 'rgba(244, 234, 42, .5)',
    textShadow: '0 0 0 rgba(255, 255, 255, .23)',
    boxShadow: 'inset 0 1px 5px rgba(0, 0, 0, .3)'}:''">

                                        <div :class="'btn_label '+item.btnColor">{{item.label}}</div>
                                        <span style="font-size: 14px;color: #FFFFFF;width: 1rem;">{{gamePlayList[0].gameSons[0].odd}}</span>
                                    </li>
                                </ul>
                            </div>

                            <!--特两面-->
                            <div class="conent" v-else-if="templateType.telm[subGameId]">
                                <ul v-for="(item1,index1) in betDataList.numbers">
                                    <li class="btn_item tlm" @touchend="selected_num({row:index1,col:index2})" v-for="(item2,index2) in item1.cols" :style="item2.data_selected?{background: 'rgba(244, 234, 42, .5)',
    textShadow: '0 0 0 rgba(255, 255, 255, .23)',
    boxShadow: 'inset 0 1px 5px rgba(0, 0, 0, .3)'}:''">

                                        <div class="btn_label" style="font-size: 20px;font-weight: 900;color: #FFFFFF;">{{item2.label}}</div>
                                        <span style="font-size: 14px;color: #FFFFFF;width: 1rem;">{{gamePlayList[0].gameSons[0].odd}}</span>
                                    </li>
                                </ul>
                            </div>
                            <!--总和-->
                            <div class="conent" v-else-if="templateType.zonghe[subGameId]">
                                <ul v-for="(item1,index1) in betDataList.numbers">
                                    <li class="btn_item tlm" @touchend="selected_num({row:index1,col:index2})" v-for="(item2,index2) in item1.cols" :style="item2.data_selected?{background: 'rgba(244, 234, 42, .5)',
    textShadow: '0 0 0 rgba(255, 255, 255, .23)',
    boxShadow: 'inset 0 1px 5px rgba(0, 0, 0, .3)'}:''">

                                        <div class="btn_label" style="font-size: 20px;font-weight: 900;color: #FFFFFF;">{{item2.label}}</div>
                                        <span style="font-size: 14px;color: #FFFFFF;width: 1rem;">{{gamePlayList[0].gameSons[0].odd}}</span>
                                    </li>
                                </ul>
                                <p style="color: #FFFFFF;font-size: 14px;margin:0.1rem 0;padding: 0 0.1rem;">※ 所有七个开奖号码的分数总和大于等于175为总分大；分数总和小于或等于174为总分小。</p>
                            </div>
                            <!--半波-->
                            <div class="conent" v-else-if="templateType.banbo[subGameId]">
                                <ul style="height: auto;display: flex;flex-direction: column;font-size: 14px;flex-wrap: wrap;color: #FFFFFF;">
                                    <li v-for="(item1,index1) in betDataList.numbers" style="height: auto;display: flex;flex-wrap: wrap;align-items: center;border-bottom: 1px solid rgba(255, 255, 255, 0.6);padding:0.1rem;"
                                        @touchend="onSelectHk6(index1)" :class="item1.data_selected?'sebo_item':''">
                                        <div style="flex: 2;font-weight: 900;font-size: 20px;">{{item1.rowName}}</div>
                                        <div style="flex: 1;">{{gamePlayList[0].gameSons[index1].odd}}</div>
                                        <div style="height: auto;display: flex;flex-wrap: wrap;flex: 8;">
                                            <div :class="'sebo '+item2.btnColor" v-for="(item2,index2) in item1.cols" :key="index2">{{item2.label}}
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <!--色波-->
                            <div class="conent" v-else-if="templateType.sebo[subGameId]">
                                <ul style="height: auto;display: flex;flex-direction: column;font-size: 14px;flex-wrap: wrap;color: #FFFFFF;">
                                    <li v-for="(item1,index1) in betDataList.numbers" style="height: auto;display: flex;flex-wrap: wrap;align-items: center;border-bottom: 1px solid rgba(255, 255, 255, 0.6);padding:0.1rem;"
                                        @touchend="onSelectHk6(index1)" :class="item1.data_selected?'sebo_item':''">
                                        <div style="flex: 1;font-weight: 900;font-size: 20px;">{{item1.rowName}}</div>
                                        <div style="flex: 1;">{{gamePlayList[0].gameSons[index1].odd}}</div>
                                        <div style="height: auto;display: flex;flex-wrap: wrap;flex: 8;">
                                            <div :class="'sebo '+item2.btnColor" v-for="(item2,index2) in item1.cols" :key="index2">{{item2.label}}
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                            <!--特肖-->
                            <div class="conent" v-else-if="templateType.texiao[subGameId]">
                                <ul style="height: auto;display: flex;flex-direction: column;font-size: 14px;flex-wrap: wrap;color: #FFFFFF;">
                                    <li v-for="(item1,index1) in betDataList.numbers" style="height: auto;display: flex;flex-wrap: wrap;align-items: center;border-bottom: 1px solid rgba(255, 255, 255, 0.6);padding:0.1rem;"
                                        @touchend="onSelectHk6(index1)" :class="item1.data_selected?'texiao_item':''">
                                        <div style="flex: 1;font-weight: 900;font-size: 20px;">{{item1.rowName}}</div>
                                        <!--<div style="flex: 1;" v-if="">{{}}</div>-->
                                        <div style="flex: 1;">{{item1.cols.length==5?gamePlayList[0].gameSons[0].odd.split(',')[1]:gamePlayList[0].gameSons[0].odd.split(',')[0]}}</div>
                                        <div style="height: auto;display: flex;flex-wrap: wrap;flex: 8;">
                                            <div :class="'texiao '+item2.btnColor" v-for="(item2,index2) in item1.cols" :key="index2">{{item2.label}}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <!--合肖-->
                            <div class="conent" v-else-if="templateType.hexiao[subGameId]">
                                <ul style="height: auto;display: flex;flex-direction: column;font-size: 14px;flex-wrap: wrap;color: #FFFFFF;">
                                    <li v-for="(item1,index1) in betDataList.numbers" style="height: auto;display: flex;flex-wrap: wrap;align-items: center;border-bottom: 1px solid rgba(255, 255, 255, 0.6);padding:0.1rem;"
                                        @touchend="onSelectHk6(index1)" :class="item1.data_selected?'texiao_item':''">
                                        <div style="flex: 1;font-weight: 900;font-size: 20px;">{{item1.rowName}}</div>
                                        <!--<div style="flex: 1;" v-if="">{{}}</div>-->
                                        <div style="flex: 1;">{{gamePlayList[0].gameSons[0].odd.split(',')[0]}}</div>
                                        <div style="height: auto;display: flex;flex-wrap: wrap;flex: 8;">
                                            <div :class="'texiao '+item2.btnColor" v-for="(item2,index2) in item1.cols" :key="index2">{{item2.label}}
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Bscroll from 'better-scroll';
    import CountDown from "./countdown.vue";
    import clickoutside3 from '../../../directives/clickoutside3';
    import {
        templateType
    } from './templateType.js';
    import {
        bus
    } from "../bus.js";
    import {
        mapState,
        mapActions,
        mapMutations
    } from "vuex";
    import {
        calcChooseBetCount,
        calcInputBetCount
    } from "../renderPalette.js";
    import {
        onSelectBtn,
        quickBtnSelect
    } from "../bet.js";
    import {
        renderingData
    } from "../bet.js";
    import gameConfig from '../gameConfig.js';
    export default {
        directives: {
            clickoutside3
        },
        components: {
            CountDown
        },
        props: ["classId", 'kindId', 'subGameList', 'standGameList', 'betDataList'],
        data() {
            return {
                num_color: num_color,
                gameConfig: gameConfig,
                showCurrentAwarPeriod: '',
                showPrevAwarPeriod: '',
                currentAwarPeriod2: '',
                prevAwarPeriod2: '',
                active: false,
                bileCodeArr: [],
                show1: false,
                showType: "hotCold",
                isclick: true,
                templateType: templateType,
                inputTxt: '',
                errPrompt: '',
                scroll1: null,
                scroll2: null,
                showHotColdOrOmit: [
                    "100101",
                    "100301",
                    "100201",
                    "100202",
                    "300101",
                    "300201",
                    "300205",
                    "300301",
                    "300305",
                    "300401",
                    "300405",
                    "300501",
                    "300505",
                    "300601",
                    "300701",
                    "301001",
                    "301101",
                    "301201",
                    "500401",
                    "500201",
                    "500206",
                    "500101",
                    "500106",
                    "500111",
                    "600401",
                    "600202",
                    "600301",
                ],
                awardNum: ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'],
                hotCold: {},
                omit: {},
                listInfo_style: {
                    width: '100%',
                    height: '0',
                    transition: 'all .3s',
                },
                winList: [],
                num_type: {},
                hk6Index: 0,
            }
        },
        created() {
            let res = this.historyData;
            if (res) {
                this.hotCold = res.data.hotCold
                this.omit = res.data.omit
                this.winList = res.data.winList
                this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
                this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
                this.simplifyAwarPeriod()
                this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
                if (res.data.winList[1].awardNum == null) {
                    this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
                    this.active = false;

                } else {
                    this.active = true;
                    this.awardNum = res.data.winList[1].awardNum.split(",")
                }
            } else {
                this.getWinsDragon("/" + this.kindId).then((res) => {
                    this.hotCold = res.data.hotCold
                    this.omit = res.data.omit
                    this.winList = res.data.winList
                    this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
                    this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
                    this.simplifyAwarPeriod()
                    this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
                    if (res.data.winList[1].awardNum == null) {
                        this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
                        this.active = false;
                    } else {
                        this.active = true;
                        this.awardNum = res.data.winList[1].awardNum.split(",")
                    }
                })
            }
            bus.$on("initTxt", () => {
                this.inputTxt = "";
            })
            this.judgeAnimal()
        },
        mounted() {
            setTimeout(() => {
                this.scroll2 = new Bscroll(this.$refs.hk6_scorll_right, {
                    scrollbars: true,
                    listenX: true,
                    click: true,
                })
                this.scroll2.on('scrollEnd', this.scrollEnd);
                this.scroll2.on('scrollStart', this.scrollStart);
            }, 100)

            this.cacheHistoryData(null)
        },
        computed: {
            ...mapState("bet", ["subGameId", "leftName", "rightName", "gameId", "gamePlayList", "kindList",
                "historyData", "newNumbers"
            ]),
            ...mapState("login", ["userDetails"]),
            ...mapState(["msg"]),
        },
        methods: {
            ...mapActions('bet', [
                "getSubGames",
                "getWinsDragon",

            ]),
            ...mapMutations('bet', [
                "setBetOrder",
                "saveDataOrSubGameList",
                "cacheHistoryData",
                "updateAwarPeriod"
            ]),
            simplifyAwarPeriod() {
                let lg = String(gameConfig[this.kindId].periodNoAll).length;
                this.showCurrentAwarPeriod = this.currentAwarPeriod2.slice(this.currentAwarPeriod2.length - lg, this.currentAwarPeriod2
                    .length)
                this.showPrevAwarPeriod = this.prevAwarPeriod2.slice(this.prevAwarPeriod2.length - lg, this.prevAwarPeriod2
                    .length)
            },
            countDown() {
                this.active = false;
                this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
                this.$dialog.toast({
                    mes: '第' + this.currentAwarPeriod2 + '期已停止销售',
                    timeout: 1500
                });
                this.prevAwarPeriod2 = this.currentAwarPeriod2;
                this.currentAwarPeriod2 = this.createChasePeriod(this.currentAwarPeriod2, 1, gameConfig[this.kindId].periodNoAll,
                    this.kindId)
                this.simplifyAwarPeriod()

                this.updateAwarPeriod({
                    currentAwarPeriod: this.currentAwarPeriod2,
                    prevAwarPeriod: this.prevAwarPeriod2
                })
            },
            onSelectHk6(index) {
                if (!this.isclick) {
                    return
                }
                let data = {};
                if (templateType.hexiao[this.subGameId]) {
                    let numbersLg = this.subGameId.slice(4, 6) * 1
                    if (this.newNumbers.length >= numbersLg && !this.betDataList.numbers[index].data_selected) {
                        this.$dialog.toast({
                            mes: '最多只能选取' + numbersLg + '个号码',
                            timeout: 1000
                        });
                        return false
                    }
                }
                this.betDataList.numbers[index].data_selected = !this.betDataList.numbers[index].data_selected;
                let result = calcChooseBetCount(this.betDataList, []);
                data.ticketCount = result.ticketCount;
                data.newNumbers = result.newNumbers;

                this.$emit("resultData", data)
            },
            scrollStart() {
                this.isclick = false
            },
            scrollEnd() {
                this.isclick = true
            },
            open() {
                this.show1 = !this.show1
            },
            selected_num(obj) {
                if (!this.isclick) {
                    return
                }
                let data = {};
                onSelectBtn(obj, this.subGameId, this.betDataList, this.bileCodeArr, [])
                let result = calcChooseBetCount(this.betDataList, [])
                data.ticketCount = result.ticketCount;
                data.newNumbers = result.newNumbers;
                this.$emit("resultData", data)
            },
            judgeFromat() {
                let result, data = {};
                result = calcInputBetCount(this.betDataList, this.inputTxt, []);
                this.errPrompt = result.msg;
                data.ticketCount = result.ticketCount;
                data.newNumbers = result.numbers;
                this.$emit("resultData", data)
            },
            quickBtnSelect(obj) {
                if (!this.isclick) {
                    return
                }
                let result, data = {};
                result = quickBtnSelect(this.betDataList, obj, []);
                data.ticketCount = result.ticketCount;
                data.newNumbers = result.newNumbers;
                this.$emit("resultData", data)
            },
            createChasePeriod(period, offset, periodNoAll, kindId) {
                let kindIdAry = ['bjpk10', 'azssc', 'xylhc', 'speed', 'azpk10', 'klft']
                if (kindIdAry.indexOf(this.kindId) != -1) {
                    return parseInt(period) + offset + '';
                } else {
                    if (kindId == "fc3d" || kindId == "pl3" || kindId == 'hk6') {
                        var digit = period.length - 4;
                        // 当前期号的日期
                        var periodTime = period.substr(0, 4);
                        // 转化为moment型，方便后面计算
                        var momentTime = moment(periodTime, 'YYYY');
                        var nowPeriodString = period.substr(4, digit);
                        // 当前期号
                        var nowPeriod = parseInt(period.substr(4, digit));
                        // 目标期号
                        var targetPeriod = nowPeriod + offset;
                        var targetTime = void 0;
                        if (targetPeriod > periodNoAll) {
                            targetPeriod -= periodNoAll;
                            targetTime = momentTime.add(1, 'y').format('YYYY');
                        } else {
                            targetTime = periodTime;
                        }
                        var targetPeriodString = targetPeriod + '';
                        return targetTime + targetPeriodString.padStart(digit, '0');
                    } else {
                        var digit = period.length - 8;
                        // 当前期号的日期
                        var periodTime = period.substr(0, 8);
                        // 转化为moment型，方便后面计算
                        var momentTime = moment(periodTime, 'YYYYMMDD');
                        var nowPeriodString = period.substr(8, digit);
                        // 当前期号
                        var nowPeriod = parseInt(period.substr(8, digit));
                        // 目标期号
                        var targetPeriod = nowPeriod + offset;
                        var targetTime = void 0;
                        if (targetPeriod > periodNoAll) {
                            targetPeriod -= periodNoAll;
                            targetTime = momentTime.add(1, 'd').format('YYYYMMDD');
                        } else {
                            targetTime = periodTime;
                        }
                        var targetPeriodString = targetPeriod + '';
                        return targetTime + targetPeriodString.padStart(digit, '0');
                    }
                }

            },
            closeModal(e) {
                if (e.target !== this.$refs.open) {
                    this.show1 = false;
                }
            },
            selectSubGameId(name, index) {
                this.$emit("selectSubGameId", {
                    name: name,
                    index: this.hk6Index
                })
            },
            selHk6Index(index) {
                this.hk6Index = index
                this.$emit("selHk6Index", index)
                this.$refs.ydtab.activeIndex = 0
            },
            judgeAnimal() {
                let names = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
                let obj = {};
                let labels = Array(12);
                let year = (new Date()).getFullYear();
                let animal = year % 12 + 8;
                let number_arr = new Array(12);
                for (var i = 0; i < 12; i++) {
                    if (i == animal) {
                        let first_number = 1;
                        let item = [String(first_number), String(first_number + 12), String(first_number + 24), String(
                            first_number + 36), String(first_number + 48)];

                        labels.fill(item, i, i + 1);
                    } else {
                        let first_number = i < animal ? (animal - i) + 1 : 13 - (i - animal);

                        let item = [String(first_number), String(first_number + 12), String(first_number + 24), String(
                            first_number + 36)];
                        labels.fill(item, i, i + 1);
                    }
                }
                labels.forEach((item1, index1) => {
                    item1.forEach((item2) => {
                        obj[item2] = names[index1]
                    })
                })
                for (var key in obj) {
                    if (key * 1 < 10) {
                        obj['0' + key] = obj[key]
                    }
                }
                this.num_type = obj;
            },

        },
        watch: {
            msg(newMsg) {
                let awardNews = JSON.parse(newMsg.data)
                if (awardNews.messageType == "3") {
                    if (awardNews.lotteryId == this.kindId) {
                        this.getWinsDragon("/" + this.kindId).then((res) => {
                            this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
                            this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
                            this.winList = res.data.winList;
                            this.simplifyAwarPeriod()
                            if (res.data.winList[1].awardNum == null) {
                                this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
                                this.active = false;
                            } else {
                                this.active = true;
                                this.awardNum = res.data.winList[1].awardNum.split(",")
                            }
                        })

                    }

                }
            },
            show1() {
                if (this.show1) {
                    this.listInfo_style = {
                        height: '3rem',
                    }
                    setTimeout(() => {
                        let scroll = new Bscroll(this.$refs.wrapper3, {
                            scrollbars: true,
                        })
                    }, 200)
                } else {
                    this.listInfo_style = {
                        height: '0',
                    }
                }
            },
            kindId() {let res = this.historyData;
            if (res) {
                this.hotCold = res.data.hotCold
                this.omit = res.data.omit
                this.winList = res.data.winList
                this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
                this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
                this.simplifyAwarPeriod()
                this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
                if (res.data.winList[1].awardNum == null) {
                    this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
                    this.active = false;

                } else {
                    this.active = true;
                    this.awardNum = res.data.winList[1].awardNum.split(",")
                }
            } else {
                this.getWinsDragon("/" + this.kindId).then((res) => {
                    this.hotCold = res.data.hotCold
                    this.omit = res.data.omit
                    this.winList = res.data.winList
                    this.currentAwarPeriod2 = res.data.winList[0].awarPeriod;
                    this.prevAwarPeriod2 = res.data.winList[1].awarPeriod;
                    this.simplifyAwarPeriod()
                    this.updateAwarPeriod({
					currentAwarPeriod: this.currentAwarPeriod2,
					prevAwarPeriod: this.prevAwarPeriod2
				})
                    if (res.data.winList[1].awardNum == null) {
                        this.awardNum = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];
                        this.active = false;
                    } else {
                        this.active = true;
                        this.awardNum = res.data.winList[1].awardNum.split(",")
                    }
                })
            }},
        }

    }
</script>

<style lang="less">
    @font-face {
        font-family: clock-number;
        src: url(../../../../fonts/LED.eot?) format("eot");
        src: url(../../../../fonts/LED.woff) format("woff"), url(../../../../fonts/LED.ttf) format("truetype")
    }

    @keyframes numberListActivessc {
        from {
            transform: translateY(1.8rem);
        }
        to {
            transform: translateY(-0.9rem)
        }
    }

    .hk6_view {
        overflow: hidden;
        flex: 1;
        width: 100%;
        display: flex;
        background: url(../../../../static/img/hk6bg.jpg);
        background-size: 100% 100%;
        flex-direction: column;
        .sebo,
        .texiao {
            width: 0.6rem;
            height: 0.6rem;
            text-align: center;
            line-height: 0.6rem;
            font-size: 12px;
            color: #000000;
        }
        .sebo.red,
        .texiao.red {
            background: url(../../../../static/img/bo_red_bg.png);
            background-size: 100% 100%;
        }
        .sebo.blue,
        .texiao.blue {
            background: url(../../../../static/img/bo_blue_bg.png);
            background-size: 100% 100%;
        }
        .sebo.green,
        .texiao.green {
            background: url(../../../../static/img/bo_green_bg.png);
            background-size: 100% 100%;
        }
        .sebo_item,
        .texiao_item {
            background: rgba(244, 234, 42, 0.5);
            text-shadow: rgba(255, 255, 255, 0.23) 0px 0px 0px;
            box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 5px inset;
        }
        .clockView {
            width: 100%;
            height: 1.8rem;
            display: flex;
            /*background: linear-gradient(135deg, rgba(19, 46, 123, 1) 0, rgba(0, 201, 202, 1) 100%);*/
            background-size: 100% 100%;
            .left {
                flex: 5;
                background: none;
                p {
                    text-align: center;
                    font-size: 12px;
                    color: #F0F0F0;
                    padding: 0.1rem 0;
                }
                ul {
                    display: flex;
                    justify-content: space-around;
                    li {
                        .num_ball {
                            width: .7rem;
                            height: .7rem;
                            text-align: center;
                            line-height: .8rem;
                            font-size: 14px;
                        }
                        .num_ball.red {
                            background: url(../../../../static/img/bo_red_bg.png);
                            background-size: 100% 100%;
                        }
                        .num_ball.green {
                            background: url(../../../../static/img/bo_green_bg.png);
                            background-size: 100% 100%;
                        }
                        .num_ball.blue {
                            background: url(../../../../static/img/bo_blue_bg.png);
                            background-size: 100% 100%;
                        }
                        .num_ball.grey {
                            background: url(../../../../static/img/bo_grey_bg.png);
                            background-size: 100% 100%;
                        }
                    }
                }
            }
            .right {
                flex: 3;
                font-size: 14px;
                color: #F0F0F0;
                padding-top: 0.1rem;
                p {
                    text-align: center;
                    font-size: 12px;
                    color: #F0F0F0;
                }
                .clock-count {
                    width: 100%;
                    color: #FFFFFF !important;
                    display: inline-block;
                    white-space: nowrap !important;
                    font-size: 26px !important;
                    line-height: 35px !important;
                    border-radius: 4px !important;
                    text-align: center !important;
                    font-family: clock-number, "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
                }
                /*	display: flex;*/
            }
            .open-num {
                border-radius: 2px;
                width: 0.44rem;
                height: 0.32rem;
                color: #FFFFFF;
                margin: 0.03rem;
                line-height: 0.32rem;
                text-align: center;
                font-size: 12px;
            }
            .open-num.yellow {
                background: #e5b800;
            }
            .open-num.darkGrey {
                background: #cfc9c9;
            }
            .open-num.deepBlue {
                background: #0278d7;
            }
            .open-num.gray {
                background: #474c50;
            }
            .open-num.green {
                background: #288c06;
            }
            .open-num.red {
                background: #ea075f;
            }
            .open-num.deepRed {
                background: #7e0209;
            }
            .open-num.orange {
                background: #f17403;
            }
            .open-num.lightGray {
                background: #003e92;
            }
            .open-num.blue {
                background: #25b5cb;
            }
        }
        /*.active_ul {
			transform: translateY(1.8rem);
			animation: numberListActivessc .25s infinite linear;
		}*/
        .xiala {
            position: absolute;
            background: #FFFFFF;
            bottom: -0.38rem;
            width: 1.2rem;
            height: 0.4rem;
            z-index: 1;
            margin-top: 2.8rem;
            border: 1px solid #C5CAD0;
            border-top: none;
            border-radius: 0 0 4px 4px;
            position: absolute;
            left: 50%;
            margin-left: -0.6rem;
            img {
                margin-left: 0.4rem;
                width: 0.4rem;
                height: 0.4rem;
            }
            img.top {
                -moz-transform: rotate(180deg);
                -webkit-transform: rotate(180deg);
                transform: rotate(180deg);
                filter: progid:DXImageTransform.Microsoft.BasicImage(rotation=2);
            }
        }
        .listInfo {
            width: 100%;
            z-index: 100;
            background: #FFFFFF;
            transition: all .3s;
            overflow: hidden;
            border-bottom: 1px solid #CCCCCC;
            tr {
                height: 0.4rem;
                td {
                    text-align: center;
                    font-size: 12px;
                    border-left: 1px solid #C5CAD0;
                    border-bottom: 1px solid #C5CAD0;
                }
            }
        }
        /*过度动画*/
        .fade-enter-active,
        .fade-leave-active {
            transition: all .3s;
        }
        .fade-enter-active {
            background: #D91D36;
            width: 100%;
            height: 3rem;
        }
        .fade-leave-active {
            background: #D91D36;
            width: 100%;
            height: 0;
        }
        .fade-enter {
            background: #D91D36;
            width: 100%;
            height: 0;
        }
        .info {
            /*height: 1.52rem;*/
            display: flex;
            flex-direction: column;
            /*margin-top: 2.8rem;*/
            position: relative;
            padding: 0.1rem 0.2rem;
            background: #FFFFFF;
            /*box-sizing: border-box;
		border-bottom: 1px solid #CCCCCC;*/
            .top {
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #666;
                font-size: 12px;
                img {
                    width: .8rem;
                    height: 0.73rem;
                    margin-right: 0.2rem;
                }
            }
            .bottom {}
        }
        /*六合彩*/
        .bet_list_hk6 {
            overflow: hidden;
            flex: 1;
            display: flex;
            .left {
                overflow: auto;
                height: 100%;
                ul {
                    display: flex;
                    flex-direction: column;
                    border-right: 1px solid rgba(255, 255, 255, .4);
                    width: 1.4rem;
                    /*background: #011935;*/
                    li {
                        border-bottom: 1px solid rgba(255, 255, 255, .4);
                        width: 100%;
                        color: #FFFFFF;
                        line-height: .8rem;
                        text-align: center;
                        font-size: 14px;
                    }
                }
            }
            .right {
                display: flex;
                flex-direction: column;
                overflow: hidden;
                flex: 1;
                .yd-tab {
                    .yd-tab-nav {
                        display: flex;
                        .yd-tab-nav-item {
                            a {
                                width: 1.2rem;
                            }
                        }
                    }
                    .yd-tab-nav .yd-tab-active {
                        color: currentColor;
                        background: none;
                    }
                    .yd-tab-nav-item {
                        background: none;
                    }
                    .yd-tab-box {
                        background: none;
                    }
                }
                .btn_box {
                    overflow: hidden;
                    /*overflow: scroll;*/
                    /*-webkit-overflow-scrolling: touch;*/
                    flex: 1;
                    ul {
                        display: flex;
                        border-top: 1px solid rgba(255, 255, 255, .6);
                        flex-wrap: wrap;
                        .btn_item {
                            position: relative;
                            width: 33.33%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            height: 1.4rem;
                            border-bottom: 1px solid rgba(255, 255, 255, .6);
                            border-right: 1px solid rgba(255, 255, 255, .6);
                            .btn_label {
                                width: 0.8rem;
                                height: 0.8rem;
                                line-height: 0.8rem;
                                font-size: 14px;
                                text-align: center;
                            }
                            .btn_label.red {
                                background: url(../../../../static/img/bo_red_bg.png);
                                background-size: 100% 100%;
                            }
                            .btn_label.blue {
                                background: url(../../../../static/img/bo_blue_bg.png);
                                background-size: 100% 100%;
                            }
                            .btn_label.green {
                                background: url(../../../../static/img/bo_green_bg.png);
                                background-size: 100% 100%;
                            }
                        }
                        .btn_item.tlm {
                            width: 50% !important;
                            .btn_label {
                                width: auto;
                                height: 0.8rem;
                                line-height: 0.8rem;
                                font-size: 14px;
                                text-align: center;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
