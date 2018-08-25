const SPECIAL_KINDID = {
	bjpk10:true,
	klft:true,
	azpk10:true,
	speed:true,
	azssc:true,
};
export function createChaseList(_a) {
	var confirmBetFields = _a.confirmBetFields,
		betList = _a.betList,
		chaseList = _a.chaseList,
		periodNo = _a.periodNo,
		gameType = _a.gameType,
		isFirst = _a.isFirst;
	var chaseAfterPercent = confirmBetFields.chaseAfterPercent,
		chaseBeforePercent = confirmBetFields.chaseBeforePercent,
		chaseBeforePeriod = confirmBetFields.chaseBeforePeriod,
		chaseMinNumber = confirmBetFields.chaseMinNumber,
		chaseMinPercent = confirmBetFields.chaseMinPercent,
		chasePeriods = confirmBetFields.chasePeriods,
		chasePrePay = confirmBetFields.chasePrePay,
		chaseTimes = confirmBetFields.chaseTimes,
		chaseWinType = confirmBetFields.chaseWinType,
		confirmBetType = confirmBetFields.confirmBetType;
	var newChaseList = [],
		finalChaseList = [],
		targetChasePeriods = chasePeriods,
		msg = '';
	if(isFirst) {
		for(var i = 0; i < chasePeriods; i += 1) {
			newChaseList.push({
				currentPay: 0,
				hasPay: 0,
				profit: '',
				profitRate: '',
				periodNo: createChasePeriod(periodNo, i, gameType),
				times: chaseTimes
			})
		}
	} else {
		newChaseList = chaseList.reduce(function(prev, item, index) {
			return prev.concat([__assign({}, item, {
				periodNo: createChasePeriod(periodNo, index, gameType),
				times: item.times
			})])
		}, newChaseList)
	}
	if(confirmBetType === confirmBetTypeEnum.common) {
		var hasPay_1 = 0;
		newChaseList.forEach(function(item) {
			var times = item.times;
			var currentPay = 0;
			currentPay = betList.reduce(function(prev, item) {
				return prev + item.totalPrice * times
			}, 0);
			currentPay = parseFloat(currentPay.toFixed(2));
			hasPay_1 += currentPay;
			hasPay_1 = parseFloat(hasPay_1.toFixed(2));
			var profit = {
				profit: '--',
				profitRate: '--'
			};
			if(betList.length === 1) {
				profit = calcProfitByChaseTimes({
					chaseTimes: times,
					betItem: betList[0],
					hasPay: hasPay_1
				})
			}
			finalChaseList.push({
				currentPay: currentPay,
				hasPay: hasPay_1,
				periodNo: item.periodNo,
				profit: profit.profit,
				profitRate: profit.profitRate,
				times: times
			})
		})
	} else {
		var hasPay_2 = chasePrePay;
		var betItem_1 = betList[0];
		if(chaseWinType === 1) {
			newChaseList.forEach(function(item, index) {
				var times = 0;
				if(isFirst) {
					times = calcChaseTimesByProfitRate({
						profitRate: chaseMinPercent,
						hasPay: hasPay_2,
						betItem: betItem_1
					});
					times = times >= chaseTimes ? times : chaseTimes
				} else {
					times = item.times
				}
				if(times !== 0 && times < 99999) {
					var currentPay = betItem_1.totalPrice * times;
					currentPay = parseFloat(currentPay.toFixed(2));
					hasPay_2 += currentPay;
					hasPay_2 = parseFloat(hasPay_2.toFixed(2));
					var profit = calcProfitByChaseTimes({
						chaseTimes: times,
						betItem: betItem_1,
						hasPay: hasPay_2
					});
					finalChaseList.push({
						periodNo: item.periodNo,
						times: times,
						currentPay: currentPay,
						hasPay: hasPay_2,
						profit: profit.profit,
						profitRate: profit.profitRate
					})
				}
			})
		}
		if(chaseWinType === 2) {
			newChaseList.forEach(function(item, index) {
				var targetProfitRate;
				if(index < chaseBeforePeriod) {
					targetProfitRate = chaseBeforePercent
				} else {
					targetProfitRate = chaseAfterPercent
				}
				var times = 0;
				if(isFirst) {
					times = calcChaseTimesByProfitRate({
						profitRate: targetProfitRate,
						hasPay: hasPay_2,
						betItem: betItem_1
					});
					times = times >= chaseTimes ? times : chaseTimes
				} else {
					times = item.times
				}
				if(times !== 0 && times < 99999) {
					var currentPay = betItem_1.totalPrice * times;
					currentPay = parseFloat(currentPay.toFixed(2));
					hasPay_2 += currentPay;
					hasPay_2 = parseFloat(hasPay_2.toFixed(2));
					var profit = calcProfitByChaseTimes({
						chaseTimes: times,
						betItem: betItem_1,
						hasPay: hasPay_2
					});
					finalChaseList.push({
						currentPay: currentPay,
						hasPay: hasPay_2,
						periodNo: item.periodNo,
						profit: profit.profit,
						profitRate: profit.profitRate,
						times: times
					})
				}
			})
		}
		if(chaseWinType === 3) {
			newChaseList.forEach(function(item, index) {
				var times = 0;
				if(isFirst) {
					times = calcChaseTimesByProfit({
						profit: chaseMinNumber,
						hasPay: hasPay_2,
						betItem: betItem_1
					});
					times = times >= chaseTimes ? times : chaseTimes
				} else {
					times = item.times
				}
				if(times !== 0 && times < 99999) {
					var currentPay = betItem_1.totalPrice * times;
					currentPay = parseFloat(currentPay.toFixed(2));
					hasPay_2 += currentPay;
					hasPay_2 = parseFloat(hasPay_2.toFixed(2));
					var profit = calcProfitByChaseTimes({
						chaseTimes: times,
						betItem: betItem_1,
						hasPay: hasPay_2
					});
					finalChaseList.push({
						currentPay: currentPay,
						hasPay: hasPay_2,
						periodNo: item.periodNo,
						profit: profit.profit,
						profitRate: profit.profitRate,
						times: times
					})
				}
			})
		}
	}
	return finalChaseList
};
function createChasePeriod(period, offset, gameType) {
	var periodNoAll = gameType.periodNoAll,
		kindId = gameType.kindId;
	if(SPECIAL_KINDID[kindId]) {
		return parseInt(period) + offset + ''
	} else {
		var digit = period.length - 8;
		var periodTime = period.substr(0, 8);
		var momentTime = moment(periodTime, 'YYYYMMDD');
		var nowPeriodString = period.substr(8, digit);
		var nowPeriod = parseInt(period.substr(8, digit));
		var targetPeriod = nowPeriod + offset;
		var targetTime = void 0;
		if(targetPeriod > periodNoAll) {
			targetPeriod -= periodNoAll;
			targetTime = momentTime.add(1, 'd').format('YYYYMMDD')
		} else {
			targetTime = periodTime
		}
		var targetPeriodString = targetPeriod + '';
		return targetTime + targetPeriodString.padStart(digit, '0')
	}
};
function calcProfitByChaseTimes(_a) {
	var chaseTimes = _a.chaseTimes,
		betItem = _a.betItem,
		hasPay = _a.hasPay;
	var subGameId = betItem.subGameId,
		lotteryNum = betItem.xuanhao,
		odds = betItem.oddMax,
		optionalMin = betItem.optionalMin;
	var betTimes = calcBetTimes(betItem);
	var oddArray = odds.split(',').map(function(item) {
		return parseFloat(item)
	}).sort(function(a, b) {
		return a - b
	});
	var oddMin = oddArray[0];
	var oddMax = oddArray[oddArray.length - 1];
	var profit = {
		min: calcProfitAndRate({
			odds: oddMin,
			chaseTimes: chaseTimes,
			betTimes: betTimes,
			hasPay: hasPay
		}),
		max: calcProfitAndRate({
			odds: oddMax,
			chaseTimes: chaseTimes,
			betTimes: betTimes,
			hasPay: hasPay
		})
	};
	if(oddArray.length === 1) {
		return {
			profit: profit.min.profit.toFixed(3),
			profitRate: profit.min.profitRate + '%'
		}
	} else {
		return {
			profit: profit.min.profit.toFixed(3) + '~' + profit.max.profit.toFixed(3),
			profitRate: profit.min.profitRate + '%~' + profit.max.profitRate + '%'
		}
	}
};
function calcBetTimes(betItem) {
	var betTimes = 1;
	var subGameId = betItem.subGameId,
		lotteryNum = betItem.xuanhao,
		optionalMin = betItem.optionalMin;
	if(subGameId === "300101") {
		var lotteryNumArray = lotteryNum.replace(/\?/g, '').split(',');
		betTimes = lotteryNumArray.reduce(function(prev, item) {
			return item.length > 0 ? ++prev : prev
		}, 0)
	}
	if(optionalMin > 0) {
		var optionalNum = lotteryNum.split('|')[0];
		betTimes = quickCalc_1.combination(optionalNum.split(''), optionalMin).length
	}
	return betTimes
};
function calcProfitAndRate(_a) {
	var odds = _a.odds,
		chaseTimes = _a.chaseTimes,
		betTimes = _a.betTimes,
		hasPay = _a.hasPay;
	var all = odds * chaseTimes * betTimes * ( hasPay / betTimes )
	var real = all - hasPay;
	return {
		profit: real,
		profitRate: fhRound(real / hasPay * 100)
	}
};
function fhRound(value, digit) {
	if(digit === void 0) {
		digit = 3
	}
	return Math.round(value * (Math.pow(10, digit))) / Math.pow(10, digit)
};
function calcChaseTimesByProfitRate(_a) {
	var profitRate = _a.profitRate,
		hasPay = _a.hasPay,
		betItem = _a.betItem;
	var odds = betItem.oddMax,
		totalAmount = betItem.totalPrice;
	var oddArray = odds.split(',').map(function(item) {
		return parseFloat(item)
	}).sort(function(a, b) {
		return a - b
	});
	var oddMin = oddArray[0];
	var betTimes = calcBetTimes(betItem);
	var profitRateMax = (oddMin * betTimes - totalAmount) / totalAmount * 100;
	if(hasPay === 0) {
		if(profitRate > profitRateMax) {
			return 0
		} else {
			return 1
		}
	}
	var chaseTimes = Math.ceil(hasPay * (profitRate / 100 + 1) / (oddMin * betTimes - totalAmount - profitRate * totalAmount / 100));
	return isNaN(chaseTimes) || !isFinite(chaseTimes) || chaseTimes < 0 ? 0 : chaseTimes
};
function calcChaseTimesByProfit(_a) {
	var profit = _a.profit,
		hasPay = _a.hasPay,
		betItem = _a.betItem;
	var odds = betItem.oddMax,
		totalAmount = betItem.totalPrice;
	var oddArray = odds.split(',').map(function(item) {
		return parseFloat(item)
	}).sort(function(a, b) {
		return a - b
	});
	var oddMin = oddArray[0];
	var betTimes = calcBetTimes(betItem);
	var maxBonus = oddMin * betTimes - totalAmount;
	if(maxBonus <= 0) {
		return 0
	}
	var chaseTimes = Math.ceil((profit + hasPay) / (betTimes * oddMin - totalAmount));
	return isNaN(chaseTimes) || !isFinite(chaseTimes) || chaseTimes < 0 ? 0 : chaseTimes
};