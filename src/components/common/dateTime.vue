<template>
    <div id="dateTime">
        <div class="date">
            <input type="date" v-model="global.time.timeStart">
            <span></span>
            <input type="date" v-model="global.time.timeEnd"  >
        </div>
            <div class="days">
                <button :class="{active_time:mark===index}" v-for="(item,index) of days" :key="index" @click="hunt(index)">{{item}}</button>
            </div>
    </div>
</template>
<script>

export default {

  data() {
    return {
      days: ["今天", "昨天", "本周", "上周", "本月", "上月"],
      mark: 0,

    };
  },
  methods: {
    hunt(index) {
      this.mark = index;
      this.selectTime(index);
    },
     // 本周第一天；
    showWeekFirstDay() {
      let Nowdate = new Date();
      let WeekFirstDay;
      if (Nowdate.getDay() == 0) {
        WeekFirstDay = new Date(Nowdate - 6 * 86400000);
      } else {
        WeekFirstDay = new Date(Nowdate - (Nowdate.getDay() - 1) * 86400000);
      }
      let M = Number(WeekFirstDay.getMonth()) + 1;
      if (M < 10) {
        M = "0" + M;
      }
      let D = WeekFirstDay.getDate();
      if (D < 10) {
        D = "0" + D;
      }
      return WeekFirstDay.getFullYear() + "-" + M + "-" + D;
    },
    //获得某月的天数：
    getMonthDays(myMonth) {
      let monthStartDate = new Date(new Date().getFullYear(), myMonth, 1);
      let monthEndDate = new Date(new Date().getFullYear(), myMonth + 1, 1);
      let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
      return days;
    },
     //点击今天  昨天 本周。。。改变时间
    selectTime(index) {
      switch (index) {
        case 0:
          this.global.time.timeStart =this.global.timeFormate(new Date());
          this.global.time.timeEnd = this.global.timeFormate(new Date());
          break;
        case 1:
          this.global.time.timeStart = this.global.timeFormate(
            new Date().getTime() - 24 * 60 * 60 * 1000
          );
          this.global.time.timeEnd = this.global.timeFormate(
            new Date().getTime() - 24 * 60 * 60 * 1000
          );
          break;
        case 2:
          this.global.time.timeStart = this.showWeekFirstDay();
          this.global.time.timeEnd = this.global.timeFormate(new Date());
          break;
        case 3:
          this.global.time.timeStart = this.global.timeFormate(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDay() == 0
                ? new Date().getDate() - 13
                : new Date().getDate() - new Date().getDay() - 6
            )
          );
          this.global.time.timeEnd = this.global.timeFormate(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth(),
              new Date().getDay() == 0
                ? new Date().getDate() - 7
                : new Date().getDate() - new Date().getDay()
            )
          );
          break;
        case 4:
          this.global.time.timeStart = this.global.timeFormate(
            new Date(new Date().getFullYear(), new Date().getMonth(), 1)
          );
          this.global.time.timeEnd = this.global.timeFormate(new Date());
          break;
        case 5:
          this.global.time.timeStart = this.global.timeFormate(
            new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1)
          );
          this.global.time.timeEnd = this.global.timeFormate(
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() - 1,
              this.getMonthDays(new Date().getMonth() - 1)
            )
          );
          break;
      }
    }
  }
};
</script>
<style lang="less">
@import url("../../../static/css/common.less");
#dateTime {
  .date {
    width: 100%;
    .my-display(space-between;center);
    input[type="date"] {
      display: block;
      width: 45%;
      line-height: 0.7rem!important;
      text-align: center;
      border: 1px solid #cfcfcf;
      border-radius: 4px;
    }
    span {
      display: block;
      width: 3%;
      height: 1px;
      background: black;
    }
  }
  .days {
    .my-display(space-between;center);
    margin: 0.15rem 0;
    button {
      display: block;
      border: 1px solid transparent;
      padding: 2px 6px;
      border-radius: 4px;
    }
    .active_time {
      border-color: #d91d36 !important;
      color: #d91d36;
    }
  }
}
</style>


