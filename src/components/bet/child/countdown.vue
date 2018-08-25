<template>

	<span class="clock-count" :style="fontColor?{color:fontColor}:''">
		     {{timeTxt}}
		</span>

</template>

<script>
	import { mapState, mapActions, mapMutations } from "vuex";
	import gameConfig from '../gameConfig.js'
	export default {
		data() {
			return {
				intervalId: null,
				time: 0,
				timeTxt: '00:00',
			}
		},
		props: ['format', 'fontColor', 'classId', 'kindId'],
		computed: {
			...mapState("bet", ["historyData"])
		},
		created() {

			if(this.format == "chinese") {
				this.timeTxt = '00分00秒'
			}
			if(this.historyData) {
				this.time = moment(this.historyData.data.nextTime).valueOf() - moment(this.historyData.data.currentTime).valueOf();
				if(this.time < 0) {
					this.time = gameConfig[this.kindId].midleTime * 1000 + this.time
				}
				this.startTime()
			} else {
				this.getTimes('/' + this.classId).then((res) => {
					if(res.data[this.kindId] < 0) {
						this.time = gameConfig[this.kindId].midleTime * 1000 + this.time
					} else {
						this.time = res.data[this.kindId] * 1000
					}
					this.startTime()
				})
			}

		},
		destroyed() {
			clearInterval(this.intervalId)
		},
		methods: {
			...mapActions('bet', [
				"getWinsDragon",
				"getTimes"
			]),

			startTime() {
				let awarPeriod;
				if(this.intervalId != null) {
					clearInterval(this.intervalId)
				}
				this.timeTxt = this.timeFormat(this.time);
				this.intervalId = setInterval(() => {
					this.time -= 1000
					if(this.time < 0) {
						this.$emit('stop')
						this.time = gameConfig[this.kindId].midleTime * 1000 + this.time
					}
					if(this.kindId == 'cqssc') {
						if(this.time == 60000) {
							this.getWinsDragon("/" + 'cqssc').then((res) => {
								let awarPeriod2 = res.data.winList[1].awarPeriod.slice(8)
								if(awarPeriod2 * 1 >= 95 || awarPeriod2 * 1 < 24) {
									gameConfig['cqssc'].midleTime = 300;
								} else {
									gameConfig['cqssc'].midleTime = 600;
								}
							})
						}
					}
					this.timeTxt = this.timeFormat(this.time);
				}, 1000)

			},
			timeFormat(time) {
				let hours = moment.duration(time).hours(),
					minutes = moment.duration(time).minutes(),
					seconds = moment.duration(time).seconds();
				hours.toString().length < 2 ? hours = 0 + "" + hours : hours = hours;
				minutes.toString().length < 2 ? minutes = 0 + "" + minutes : minutes = minutes;
				seconds.toString().length < 2 ? seconds = 0 + "" + seconds : seconds = seconds;
				if(this.format == ':') {
					if(time > 3600000) {
						return hours + ':' + minutes + ':' + seconds
					} else {
						return minutes + ':' + seconds
					}
				} else if(this.format == 'chinese') {

					if(time > 3600000) {
						return hours + '时' + minutes + '分' + seconds + '秒'
					} else {
						return minutes + '分' + seconds + '秒'
					}
				}
			},
		},
		watch: {
			kindId() {
				if(this.historyData) {
					this.time = moment(this.historyData.data.nextTime).valueOf() - moment(this.historyData.data.currentTime).valueOf();
					if(this.time < 0) {
						this.time = gameConfig[this.kindId].midleTime * 1000 + this.time
					}
					this.startTime()
				} else {
					this.getTimes('/' + this.classId).then((res) => {
						if(res.data[this.kindId] < 0) {
							this.time = gameConfig[this.kindId].midleTime * 1000 + this.time
						} else {
							this.time = res.data[this.kindId] * 1000
						}
						this.startTime()
					})
				}
			}

		}
	}
</script>

<style>
	@font-face {
		font-family: clock-number;
		src: url(../../../../fonts/LED.eot?) format("eot");
		src: url(../../../../fonts/LED.woff) format("woff"), url(../../../../fonts/LED.ttf) format("truetype")
	}
	
	.clock-count {
		/*width: 100%;*/
		display: flex;
		align-items: center;
		white-space: nowrap !important;
		font-size: 26px;
		/*line-height: 35px !important;*/
		border-radius: 4px !important;
		text-align: center !important;
		font-family: clock-number, "Helvetica Neue For Number", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Helvetica Neue", Helvetica, Arial, sans-serif;
	}
	
	.clock-count {
		font-size: 14px;
		color: rgb(228, 58, 69);
	}
</style>