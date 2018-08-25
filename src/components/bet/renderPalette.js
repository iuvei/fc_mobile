
function getRegularNumbers(_a) {
	var names = _a.names,
		start = _a.start,
		end = _a.end,
		labels = _a.labels,
		subGameId = _a.subGameId;

	var rows = [];
	for(var i = start; i <= end; i += 1) {
		if(hk6BetNumbersConfig.texiao[subGameId] || hk6BetNumbersConfig.sebo[subGameId] || hk6BetNumbersConfig.banbo[subGameId]) {
			rows.push({
				rowName: names[i],
				data_selected: false,
				cols: loopNumbers_bet({
					labels: labels[i],
					subGameId: subGameId
				})
			})
		} else {
			rows.push({
				rowName: names[i],
				cols: loopNumbers_bet({
					labels: labels[i],
					subGameId: subGameId
				})
			})
		}

	}
	return rows
};
export function calcInputBetCount(betNumbers, inputNumber, optionalFields) {
	console.log(betNumbers)
	if(/^[\d,\s,,,;]*$/.test(inputNumber)) {
		var orginalNumbers = inputNumber.replace(/[\s,,,;]+/g, ',').split(',');
		var inputFormat_1 = betNumbers.inputFormat,
			max_1 = betNumbers.max,
			maxSame_1 = betNumbers.maxSame,
			min_1 = betNumbers.min,
			minSame_1 = betNumbers.minSame,
			numberUnitFormat_1 = betNumbers.numberUnitFormat,
			optionalMin = betNumbers.optionalMin;
		var reg_1 = new RegExp("\\B(?=(\\d{" + numberUnitFormat_1 + "})+(?!\\d))", 'g');
		var numbers_1 = [],
			msg_1 = '';
		orginalNumbers.forEach(function(item) {
			if(item !== '') {
				var arr_1 = item.replace(reg_1, ',').split(','),
					sameNumber_1 = 1,
					content_1 = '';
				arr_1.forEach(function(unit) {
					if(unit.length !== numberUnitFormat_1) {
						content_1 = item + "\u683C\u5F0F\u4E0D\u6B63\u786E"
					}
				});
				if(arr_1.length !== inputFormat_1) {
					content_1 = item + "\u4E0D\u662F" + inputFormat_1 + "\u4E2A\u53F7\u7801\uFF0C\u65E0\u6CD5\u4F5C\u4E3A\u4E00\u6CE8"
				} else {
					var sortNumbers = arr_1.sort();
					var maxNumber = parseInt(sortNumbers[arr_1.length - 1]),
						minNumber = parseInt(sortNumbers[0]);
					if(maxNumber > max_1 || minNumber < min_1) {
						content_1 = item + "\u4E2D\u6709\u4E0D\u5C5E\u4E8E\u8BE5\u73A9\u6CD5\u7684\u53F7\u7801"
					}
				}
				if(!content_1) {
					arr_1.forEach(function(item) {
						var same = 0;
						arr_1.forEach(function(sub) {
							if(item === sub) {
								same += 1
							}
						});
						if(same > sameNumber_1) {
							sameNumber_1 = same
						}
					});
					if(sameNumber_1 < minSame_1) {
						content_1 = "\u6BCF\u6CE8\u53F7\u7801\u81F3\u5C11\u6709" + minSame_1 + "\u4E2A\u76F8\u540C\u7684\u6570\uFF0C" + item + "\u4E2D\u53EA\u6709" + sameNumber_1 + "\u4E2A\u76F8\u540C\u7684\u6570"
					}
					if(maxSame_1 > 0 && sameNumber_1 > maxSame_1) {
						content_1 = "\u6BCF\u6CE8\u53F7\u7801\u81F3\u591A\u6709" + maxSame_1 + "\u4E2A\u76F8\u540C\u7684\u6570\uFF0C" + item + "\u4E2D\u6709" + sameNumber_1 + "\u4E2A\u76F8\u540C\u7684\u6570"
					}
				}
				if(content_1) {
					if(!msg_1) {
						msg_1 = content_1
					}
				} else {
					numbers_1.push(item)
				}
			}
		});
		return {
			msg: msg_1,
			numbers: numbers_1,
			ticketCount: optionalMin > 0 ? numbers_1.length * combination(optionalFields, optionalMin).length : numbers_1.length
		}
	} else {
		return {
			msg: '您输入的号码不合规范，请参考玩法说明',
			numbers: [],
			ticketCount: 0
		}
	}
};
function loopNumbers(_a) {
	var	betTypeMap = _a.betTypeMap,
		labels = _a.labels,
		subGameId = _a.subGameId;
	var numbers = [];
	var betType = betTypeMap[subGameId];
//	var betRate = betRates.find(function(item) {
//		return item.subGameId === subGameId
//	});
//	console.log(betRate)
//	var dtSumBetRate = betRates.find(function(item) {
//		return item.subGameId === "301417"
//	});
	labels.forEach(function(label, index) {
		var inverse;
		if(!(dtSumMap[subGameId] && index === 2)) {
			inverse = index % 2 === 0 ? index + 1 : index - 1
		}
		numbers.push({
			inverse: inverse,
			label: label,
			data_selected: false
		})
	});
	return __assign({},betType, {
		cols: numbers,
		rowName: betType.rightName,
		subGameId: subGameId
	})
};

function combination(arr, num) {
	var result = [];
	(function f(t, a, n) {
		if(n === 0) {
			return result.push(t)
		}
		for(var i = 0, l = a.length; i <= l - n; i += 1) {
			f(t.concat([a[i]]), a.slice(i + 1), n - 1)
		}
	})([], arr, num);
	return result
};

function numberTimesClac(numbers) {
	return numbers.reduce(function(prev, item) {
		return prev * item.length
	}, 1)
};

function fixedBetClac(firstRow, countArr) {
	return firstRow.reduce(function(prev, item) {
		return prev + countArr[item]
	}, 0)
};

function calcDantuo(firstRow, secondRow, n) {
	return firstRow.length > 0 ? combination(secondRow, n - firstRow.length).length : 0
};

function noOneEqualCalc(numbers) {
	var allPossibleCombines = allCombination(numbers);
	var ticketCount = 0;
	allPossibleCombines.forEach(function(item) {
		var isEffect = true;
		item.forEach(function(sub, index) {
			if(item.indexOf(sub) !== index) {
				isEffect = false
			}
		});
		if(isEffect) {
			ticketCount += 1
		}
	});
	return ticketCount
};

function allCombination(arr) {
	var result = [];
	(function f(t, a, n) {
		if(n < a.length) {
			a[n].forEach(function(item) {
				if(n === a.length - 1) {
					result.push(t.concat([item]))
				} else {
					f(t.concat([item]), a, n + 1)
				}
			})
		}
	})([], arr, 0);
	return result
};
export function createSpecialBetNumbers(props) {
	var betTypeMap = props.betTypeMap,
		subGameIds = props.subGameIds;
	var firstSubGameId = subGameIds[0];
	var numbers = [],
		max = 9;
	subGameIds.forEach(function(subGameId) {
		var labels = [];
		if(zhengheMap[subGameId]) {
			if(subGameId === '301406') {
				labels = bigSmallOddEven
			} else {
				labels = bigSmallOddEvenPrimeValue
			}
		} else if(dtSumMap[subGameId]) {
			labels = dragonTiger
		} else if(sumOEMap[subGameId]) {
			labels = oddEven
		} else if(KSBetNumbersConfig.special[subGameId] || BJSCBetNumbersConfig.special[subGameId]) {
			labels = [betTypeMap[subGameId].rightName]
		}
		if(KSBetNumbersConfig.special[subGameId]) {
			var betType = betTypeMap[subGameId];
			numbers.push(__assign({}, betType, {
				label: betType.rightName,
				data_selected: false
			}))
		} else {
			numbers.push(loopNumbers({
				betTypeMap: betTypeMap,
				labels: labels,
				subGameId: subGameId
			}))
		}
	});
	if(doubleEdtionMap[subGameIds[0]]) {
		max = 9
	} else if(KSBetNumbersConfig.special[subGameIds[0]]) {
		max = 21;
		numbers = [{
			rowName: "和值",
			cols: numbers
		}]
	} else if(BJSCBetNumbersConfig.special[subGameIds[0]]) {
		max = 10
	}
	return {
		hasSub: false,
		max: max,
		numberType: 'button',
		numbers: numbers,
		optionalMin: -1,
		quickBtnOption: [],
		subGameId: firstSubGameId
	}
};
export function calcChooseBetCount(betNumbers, optionalFields) {
	var subGameId = betNumbers.subGameId,
		dantuoMax = betNumbers.dantuoMax,
		numbers = betNumbers.numbers,
		optionalMin = betNumbers.optionalMin;
	var ticketCount = 0,
		newNumbers = [];
	if(calcBetCountConfig.hk6Special[subGameId] || calcBetCountConfig.hk6hexiao[subGameId]) {
		numbers.forEach((item) => {
			if(item.data_selected) {
				newNumbers.push(item.rowName)
			}
		})
	} else {
		numbers.forEach(function(row) {
			var selectedNumber = [];
			row.cols.forEach(function(col, index) {
				if(col.data_selected) {
					selectedNumber.push(index)
				}
			});
			newNumbers.push(selectedNumber)
		});
	}

	var firstRow = newNumbers[0],
		secondRow = newNumbers[1];
	if(calcBetCountConfig.numberTimes[subGameId]) {
		switch(subGameId) {
			case "300305":
			case "300405":
			case "300505":
				ticketCount = 3 * numberTimesClac(newNumbers);
				break;
			default:
				ticketCount = numberTimesClac(newNumbers);
				break
		}
	}
	if(calcBetCountConfig.hk6Special[subGameId] || calcBetCountConfig.hk6hexiao[subGameId]) {
		switch(subGameId) {
			case '201001':
			case '201002':
			case '201003':
			case '201004':
			case '201005':
			case '201006':
			case '201007':
			case '201008':
			case '201009':
			case '201010':
			case '201011':
				let numbersLg = subGameId.slice(4, 6) * 1;
				if(newNumbers.length == numbersLg) {
					ticketCount = 1;
				} else {
					ticketCount = 0;
				}
				break;
			default:
				ticketCount = newNumbers.length
				break;
		}

	}
	if(calcBetCountConfig.fixedBet[subGameId]) {
		ticketCount = fixedBetClac(firstRow, fixedBetNumberConfig.plusAndCrossValueArray[subGameId])
	}
	if(calcBetCountConfig.baodan[subGameId]) {
		ticketCount = firstRow.length * fixedBetNumberConfig.baodanFixedValue[subGameId]
	}
	if(calcBetCountConfig.oneCombine[subGameId]) {
		ticketCount = newNumbers.reduce(function(prev, item) {
			return prev + combination(item, 1).length
		}, 0)
	}
	if(calcBetCountConfig.twoCombine[subGameId]) {
		ticketCount = combination(firstRow, 2).length
	}
	if(calcBetCountConfig.threeCombine[subGameId]) {
		ticketCount = combination(firstRow, 3).length
	}
	if(calcBetCountConfig.combineTimes[subGameId]) {
		switch(subGameId) {
			case "301001":
				ticketCount = combineTimesClac(newNumbers, 2);
				break;
			case "301101":
				ticketCount = combineTimesClac(newNumbers, 3);
				break;
			case "301201":
				ticketCount = combineTimesClac(newNumbers, 4);
				break
		}
	}
	if(calcBetCountConfig.twoArrange[subGameId]) {
		ticketCount = arrange(firstRow, 2).length
	}
	if(calcBetCountConfig.moreCombine[subGameId]) {
		ticketCount = combination(firstRow, parseInt(subGameId.charAt(5))).length
	}
	if(calcBetCountConfig.noOneEqual[subGameId]) {
		ticketCount = noOneEqualCalc(newNumbers)
	}
	if(calcBetCountConfig.dantuo[subGameId]) {
		ticketCount = calcDantuo(firstRow, secondRow, dantuoMax)
	}
	if(subGameId === '400701') {
		ticketCount = firstRow.length * secondRow.length
	}
	if(subGameId === "301203") {
		ticketCount = combination(firstRow, 4).length
	}
	if(subGameId === "301204") {
		ticketCount = optionalFourClac(firstRow, secondRow, 2)
	}
	if(optionalMin > 0) {
		ticketCount *= combination(optionalFields, optionalMin).length
	}
	return {
		ticketCount: ticketCount,
		newNumbers: newNumbers
	}
};

function loopNumbers_bet(_a) {
	var labels = _a.labels,
		subGameId = _a.subGameId;
	var numbers = [];
	labels.forEach(function(item) {
		var notCircle = (isNaN(parseInt(item)) && item.length > 1) || item.length > 2;
		if(blueLabels.indexOf(item) != -1 || ["3", "4", "9"].indexOf(item) != -1) {
			numbers.push({
				label: item,
				data_selected: false,
				notCircle: notCircle,
				btnColor: "blue",
			})
		} else if(redLabels.indexOf(item) != -1 || ["1", "2", "7", "8"].indexOf(item) != -1) {
			numbers.push({
				label: item,
				data_selected: false,
				notCircle: notCircle,
				btnColor: "red",
			})
		} else if(greenLabels.indexOf(item) != -1 || ["5", "6"].indexOf(item) != -1) {
			numbers.push({
				label: item,
				data_selected: false,
				notCircle: notCircle,
				btnColor: "green",
			})
		} else if(hk6BetNumbersConfig.telm[subGameId] || hk6BetNumbersConfig.zonghe[subGameId]) {
			let inverse;
			switch(item) {
				case '大':
					inverse = 1
					break
				case '小':
					inverse = 0
					break
				case '单':
					inverse = 3
					break
				case '双':
					inverse = 2
					break
				case '合大':
					inverse = 5
					break
				case '合小':
					inverse = 4
					break
				case '合单':
					inverse = 7
					break
				case '合双':
					inverse = 6
					break
				case '合尾大':
					inverse = 9
					break
				case '合尾小':
					inverse = 8
					break
				case '尾大':
					inverse = 11
					break
				case '尾小':
					inverse = 10
					break
				case '家禽':
					inverse = 12
					break
				case '野兽':
					inverse = 13
					break
				case '红':
					inverse = 14
					break
				case '蓝':
					inverse = 15
					break
				case '绿':
					inverse = 16
					break
			}
			numbers.push({
				label: item,
				inverse: inverse,
				data_selected: false,
				notCircle: notCircle,
			})
		} else {
			numbers.push({
				label: item,
				data_selected: false,
				notCircle: notCircle,
			})
		}

	});
	return numbers
};
export function createBetNumbers(betType) {
	var leftName = betType.leftName,
		rightName = betType.rightName,
		subGameId = betType.subGameId;
	var sscfushi = SSCBetNumbersConfig.fushi[subGameId],
		sscdanshi = SSCBetNumbersConfig.danshi[subGameId],
		sscother = SSCBetNumbersConfig.other[subGameId],
		elevenfushi = fiveFromElevenBetNumbersConfig.fushi[subGameId],
		elevendanshi = fiveFromElevenBetNumbersConfig.danshi[subGameId],
		elevenother = fiveFromElevenBetNumbersConfig.other[subGameId],
		ksnormal = KSBetNumbersConfig.normal[subGameId],
		bjscdanshi = BJSCBetNumbersConfig.danshi[subGameId],
		bjscnormal = BJSCBetNumbersConfig.normal[subGameId],
		bjscspecial = BJSCBetNumbersConfig.special[subGameId];
	var ftcfushi = FTCBetNumbersConfig.fushi[subGameId],
		ftcdanshi = FTCBetNumbersConfig.danshi[subGameId],
		ftcother = FTCBetNumbersConfig.other[subGameId];
	var hk6other = hk6BetNumbersConfig.other[subGameId],
		lhctexiao = hk6BetNumbersConfig.texiao[subGameId],
		telm = hk6BetNumbersConfig.telm[subGameId],
		sebo = hk6BetNumbersConfig.sebo[subGameId],
		banbo = hk6BetNumbersConfig.banbo[subGameId],
		zonghe = hk6BetNumbersConfig.zonghe[subGameId]
	var start = 0,
		end = 0,
		max = 0,
		min = 0,
		leftPad = false,
		names = [rightName],
		optionalMin = -1,
		labels = [],
		inputFormat, minSame = 1,
		maxSame, numberUnitFormat, quickBtnOption = [],
		dantuoMax;
	if(sscdanshi || elevendanshi || bjscdanshi || ftcdanshi) {
		if(ftcdanshi) {
			max = 9;
			min = 0;
			maxSame = -1;
			numberUnitFormat = 1;
			switch(subGameId) {
				case "100302":
					inputFormat = 3;
					break
			}
		} else if(sscdanshi) {
			max = 9;
			min = 0;
			maxSame = -1;
			numberUnitFormat = 1;
			switch(subGameId) {
				case "300202":
				case "300206":
					inputFormat = 2;
					break;
				case "300210":
				case "300214":
					inputFormat = 2;
					maxSame = 1;
					break;
				case "300302":
				case "300402":
				case "300502":
					inputFormat = 3;
					break;
				case "300308":
				case "300408":
				case "300508":
					inputFormat = 3;
					maxSame = 2;
					break;
				case "300602":
					inputFormat = 4;
					break;
				case "300702":
					inputFormat = 5;
					break;
				case "301002":
					optionalMin = 2;
					inputFormat = 2;
					break;
				case "301005":
					optionalMin = 2;
					inputFormat = 2;
					maxSame = 2;
					break;
				case "301102":
					optionalMin = 3;
					inputFormat = 3;
					break;
				case "301105":
					optionalMin = 3;
					inputFormat = 3;
					minSame = 2;
					maxSame = 2;
					break;
				case "301107":
					optionalMin = 3;
					inputFormat = 3;
					maxSame = 1;
					break;
				case "301108":
					optionalMin = 3;
					inputFormat = 3;
					maxSame = 2;
					break;
				case "301202":
					optionalMin = 4;
					inputFormat = 4;
					break
			}
		} else if(elevendanshi) {
			max = 11;
			min = 1;
			maxSame = 1;
			numberUnitFormat = 2;
			switch(subGameId) {
				case "500102":
				case "500104":
				case "500107":
				case "500109":
				case "500112":
				case "500114":
				case "500603":
					inputFormat = 3;
					break;
				case "500202":
				case "500204":
				case "500207":
				case "500209":
				case "500602":
					inputFormat = 2;
					break;
				case "500601":
					inputFormat = 1;
					break;
				case "500604":
					inputFormat = 4;
					break;
				case "500605":
					inputFormat = 5;
					break;
				case "500606":
					inputFormat = 6;
					break;
				case "500607":
					inputFormat = 7;
					break;
				case "500608":
					inputFormat = 8;
					break
			}
		} else if(bjscdanshi) {
			max = 10;
			min = 1;
			maxSame = 1;
			numberUnitFormat = 2;
			if(subGameId === '600203') {
				inputFormat = 2
			} else {
				inputFormat = 3
			}
		}
		return {
			hasSub: false,
			inputFormat: inputFormat,
			max: max,
			maxSame: maxSame,
			min: min,
			minSame: minSame,
			numberType: 'input',
			numberUnitFormat: numberUnitFormat,
			numbers: [],
			optionalMin: optionalMin,
			quickBtnOption: [],
			subGameId: subGameId
		}
	} else {
		var hasSub = false;
		if(hk6other) {
			min = 1;
			max = 49;
			leftPad = true;
		} else if(lhctexiao) {
			max = 12
			min = 1
			names = ["鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗", "猪"]
			quickBtnOption = quickBtnOptionFull
			hasSub = true;
			leftPad = true;
			switch(subGameId) {
				case "200401": // 特肖
				case "200901": // 一肖 一肖
					{
						end = 11
						labels = Array(12);
						let year = (new Date()).getFullYear();
						let animal = year % 12 + 8;
						let number_arr = new Array(12);
						for(var i = 0; i < 12; i++) {
							if(i == animal) {
								let first_number = 1;
								let item = [String(first_number), String(first_number + 12), String(first_number + 24), String(first_number + 36), String(first_number + 48)];
								labels.fill(item, i, i + 1);
							} else {
								let first_number = i < animal ? (animal - i) + 1 : 13 - (i - animal);
								let item = [String(first_number), String(first_number + 12), String(first_number + 24), String(first_number + 36)];

								labels.fill(item, i, i + 1);
							}
						}

					}

					quickBtnOption = []
					hasSub = false
					break;
				case "201001": // 合肖(中) 一肖
				case "201002": // 合肖(中) 二肖
				case "201003": // 合肖(中) 三肖
				case "201004": // 合肖(中) 四肖
				case "201005": // 合肖(中) 五肖
				case "201006": // 合肖(中) 六肖
				case "201007": // 合肖(中) 七肖
				case "201008": // 合肖(中) 八肖
				case "201009": // 合肖(中) 九肖
				case "201010": // 合肖(中) 十肖
				case "201011": // 合肖(中) 十一肖
					{
						end = 11
						labels = Array(12);
						let year = (new Date()).getFullYear();
						let animal = year % 12 + 8;
						let number_arr = new Array(12);
						for(var i = 0; i < 12; i++) {

							if(i == animal) {
								let first_number = 1;
								let item = [String(first_number), String(first_number + 12), String(first_number + 24), String(first_number + 36)];

								labels.fill(item, i, i + 1);
							} else {
								let first_number = i < animal ? (animal - i) + 1 : 13 - (i - animal);
								let item = [String(first_number), String(first_number + 12), String(first_number + 24), String(first_number + 36)];

								labels.fill(item, i, i + 1);
							}
						}

					}
					quickBtnOption = []
					hasSub = false;
					break;
				default:
					break
			}
		} else if(telm) {
			switch(subGameId) {
				case "200201": //特两面
					names = ['特两面', '特两面', '特两面'];
					labels = [
						['大', '小', '单', '双', ],
						['合大', '合小', '合单', '合双'],
						['合尾大', '合尾小', '尾大', '尾小', '家禽', '野兽'],
					];
					end = 2;
					break;
				default:
					names = [leftName, leftName, leftName];
					labels = [
						['大', '小', '单', '双', ],
						['合单', '合双'],
						['红', '蓝', '绿', ],
					];
					end = 2;
					break
			}

		} else if(sebo) {
			names = ["红", "蓝", "绿"];
			labels = [
				redLabels,
				blueLabels,
				greenLabels,
			];
			end = 2;
		} else if(banbo) {
			switch(subGameId) {
				case "200801":
				case "200802":
				case "200803":
				case "200804":
					names = ["红大", "红小", "红单", "红双"];
					labels = [
						['29', '30', '34', '35', '40', '45', '46'],
						['1', '2', '7', '8', '12', '13', '18', '19', '23', '24'],
						['1', '7', '13', '19', '23', '29', '35', '45'],
						['2', '8', '12', '18', '24', '30', '34', '40', '46']
					];
					end = 3;
					break
				case "200805":
				case "200806":
				case "200807":
				case "200808":
					names = ["蓝大", "蓝小", "蓝单", "蓝双"];
					labels = [
						['25', '26', '31', '36', '37', '41', '42', '47', '48'],
						['3', '4', '9', '10', '14', '15', '20'],
						['3', '9', '15', '25', '31', '37', '41', '47'],
						['4', '10', '14', '20', '26', '36', '42', '48']
					];
					end = 3;
					break
				case "200809":
				case "200810":
				case "200811":
				case "200812":
					names = ["绿大", "绿小", "绿单", "绿双"];
					labels = [
						['27', '28', '32', '33', '38', '39', '43', '44', '49'],
						['5', '6', '11', '16', '17', '21', '22', ],
						['5', '11', '17', '21', '27', '33', '39', '43'],
						['6', '16', '22', '28', '32', '38', '44']
					];
					end = 3;
					break
				default:
					break

			}

		} else if(zonghe) {
			names = ["", ""];
			labels = [
				['大', '小'],
				['单', '双']
			];
			end = 1;
		} else if(ftcfushi || ftcother) {
			max = 9;
			min = 0;
			names = FTCNames;
			hasSub = true;
			switch(subGameId) {
				case "100101":
				case "100301":
					end = 2;
					quickBtnOption = quickBtnOptionFull;
					break;
				case '100201':
					end = 1;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "100202":
					start = 1;
					end = 2;
					quickBtnOption = quickBtnOptionFull;
					break;
				case '100203':
					names = ["前二组选"];
					quickBtnOption = quickBtnOptionFull;
					break;
				case '100204':
					names = ["后二组选"];
					quickBtnOption = quickBtnOptionFull;
					break;
				case '100401':
					names = ["组三"];
					quickBtnOption = quickBtnOptionFull;
					break;
				case '100402':
					names = ["组六"];
					quickBtnOption = quickBtnOptionFull;
					break;
				case '100601':
					names = ["一码不定位"];
					quickBtnOption = quickBtnOptionFull;
					break;
				case '100602':
					names = ["二码不定位"];
					quickBtnOption = quickBtnOptionFull;
					break;
				case "100303":
					names = ['和值'];
					max = 27;
					quickBtnOption = quickBtnOptionPart;
					break;
				case "100403":
					names = ['和值'];
					min = 1;
					max = 26;
					quickBtnOption = quickBtnOptionPart;
					break;
				case '100501':
					end = 1;
					quickBtnOption = quickBtnOptionPart;
					break;
				case '100502':
					start = 1;
					end = 2;
					quickBtnOption = quickBtnOptionPart
			}
			var subGameType = subGameId.substr(2, 2);
			switch(subGameType) {
				case '05':
					names = FTCNames;
					labels = Array(5).fill(bigSmallOddEven);
					break;
				default:
					break
			}
		} else if(sscfushi || sscother) {
			max = 9;
			min = 0;
			if(sscfushi) {
				names = SSCNames;
				hasSub = true
			}
			switch(subGameId) {
				case "300101":
				case "300701":
				case "301001":
				case "301101":
				case "301201":
					end = 4;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "300201":
					end = 1;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "300803":
					end = 1;
					quickBtnOption = quickBtnOptionPart;
					break;
				case "300205":
					start = 3;
					end = 4;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "300801":
					start = 3;
					end = 4;
					quickBtnOption = quickBtnOptionPart;
					break;
				case "300301":
				case "300305":
					end = 2;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "300804":
					end = 2;
					quickBtnOption = quickBtnOptionPart;
					break;
				case "300401":
				case "300405":
					start = 1;
					end = 3;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "300501":
				case "300505":
					start = 2, end = 4;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "300802":
					start = 2, end = 4;
					quickBtnOption = quickBtnOptionPart;
					break;
				case "300601":
					start = 1, end = 4;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "300204":
				case "300208":
				case "300209":
				case "300213":
				case "300304":
				case "300306":
				case "300307":
				case "300311":
				case "300404":
				case "300406":
				case "300407":
				case "300411":
				case "300504":
				case "300506":
				case "300507":
				case "300511":
				case "301004":
				case "301104":
				case "301106":
				case "301203":
				case "300901":
				case "300902":
				case "300903":
				case "300904":
				case "300905":
				case "300906":
				case "300907":
				case "300908":
				case "300909":
				case "300910":
				case "300911":
					quickBtnOption = quickBtnOptionFull;
					break;
				case "300212":
				case "300216":
				case "300310":
				case "300410":
				case "300510":
					break;
				case "300203":
				case "300207":
				case "301003":
					max = 18;
					quickBtnOption = quickBtnOptionPart;
					break;
				case "300211":
				case "300215":
				case "301006":
					min = 1;
					max = 17;
					quickBtnOption = quickBtnOptionPart;
					break;
				case "300303":
				case "300403":
				case "300503":
				case "301103":
					max = 27;
					quickBtnOption = quickBtnOptionPart;
					break;
				case "300309":
				case "300409":
				case "300509":
				case "301109":
					min = 1;
					max = 26;
					quickBtnOption = quickBtnOptionPart;
					break;
				case "300312":
				case "300412":
				case "300512":
					labels = [
						['豹子', '对子', '顺子']
					];
					quickBtnOption = quickBtnOptionPart;
					break;
				case "301204":
					names = ['二重号', '单号'];
					end = 1;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "301205":
					names = ['二重号'];
					quickBtnOption = quickBtnOptionFull;
					break;
				case "301206":
					names = ['三重号', '单号'];
					end = 1;
					quickBtnOption = quickBtnOptionFull;
					break;
				default:
					break
			}
			var subGameType = subGameId.substr(2, 2);
			switch(subGameType) {
				case '08':
					names = SSCNames;
					labels = Array(5).fill(bigSmallOddEven);
					break;
				case '10':
					if(subGameId.substr(4, 2) !== '01') {
						optionalMin = 2
					}
					break;
				case '11':
					if(subGameId.substr(4, 2) !== '01') {
						optionalMin = 3
					}
					break;
				case '12':
					if(subGameId.substr(4, 2) !== '01') {
						optionalMin = 4
					}
					break;
				default:
					break
			}
		} else if(elevenfushi || elevenother) {
			leftPad = true;
			max = 11;
			min = 1;
			if(elevenfushi) {
				names = SSCNames;
				hasSub = true
			}
			switch(subGameId) {
				case "500401":
					end = 4;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "500101":
					end = 2;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "500106":
					start = 1;
					end = 3;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "500111":
					start = 2, end = 4;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "500201":
					end = 1;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "500206":
					start = 3;
					end = 4;
					quickBtnOption = quickBtnOptionFull;
					break;
				case "500103":
				case "500108":
				case "500113":
				case "500203":
				case "500208":
				case "500301":
				case "500302":
				case "500303":
				case "500501":
				case "500502":
				case "500503":
				case "500504":
				case "500505":
				case "500506":
				case "500507":
				case "500508":
					quickBtnOption = quickBtnOptionFull;
					break;
				case "500105":
				case "500110":
				case "500115":
				case "500702":
					dantuoMax = 3;
					break;
				case "500205":
				case "500210":
				case "500701":
					dantuoMax = 2;
					break;
				case "500703":
					dantuoMax = 4;
					break;
				case "500704":
					dantuoMax = 5;
					break;
				case "500705":
					dantuoMax = 6;
					break;
				case "500706":
					dantuoMax = 7;
					break;
				case "500707":
					dantuoMax = 8;
					break
			}
			if(calcBetCountConfig.dantuo[subGameId]) {
				names = dantuo;
				end = 1
			}
		} else if(ksnormal) {
			max = 6;
			min = 1;
			switch(subGameId) {
				case "400201":
					labels = [
						['三同号通选']
					];
					break;
				case "400301":
					labels = [
						['111', '222', '333', '444', '555', '666']
					];
					break;
				case "400402":
					names = dantuo;
					end = 1;
					dantuoMax = 3;
					break;
				case "400802":
					names = dantuo;
					end = 1;
					dantuoMax = 2;
					break;
				case "400501":
					labels = [
						['三连号通选']
					];
					break;
				case "400601":
					labels = [
						['11', '22', '33', '44', '55', '66']
					];
					break;
				case "400901":
					labels = [
						['123', '234', '345', '456']
					];
					break;
				case "400701":
					names = ['同号', '不同号'];
					labels = [
						['11', '22', '33', '44', '55', '66'],
						['1', '2', '3', '4', '5', '6']
					];
					end = 1;
					dantuoMax = 6;
					break
			}
		} else if(bjscnormal) {
			max = 10;
			min = 1;
			names = ["冠", "亚", "季", "四", "五", "六", "七", "八", "九", "十"];
			quickBtnOption = quickBtnOptionFull;
			leftPad = true;
			hasSub = true;
			switch(subGameId) {
				case "600101":
					end = 0;
					break;
				case "600202":
					end = 1;
					break;
				case "600301":
					end = 2;
					break;
				case "600401":
					end = 9;
					break;
				case "600501":
					end = 9;
					labels = ["", "", "", "", "", "", "", "", "", ""].fill(['大', '小', '单', '双']);
					quickBtnOption = [];
					hasSub = false;
					break;
				case "600502":
					end = 4;
					names = ['冠vs十', '亚vs九', '季vs八', '四vs七', '五vs六'];
					labels = ["", "", "", "", ""].fill(['龙', '虎']);
					quickBtnOption = [];
					hasSub = false;
					break
			}
		}
		if(labels.length === 0) {
			var sameLabels = [];
			for(var i = min; i <= max; i += 1) {
				sameLabels.push(leftPad ? i > 9 ? i + '' : '0' + i : i + '')
			}
			labels = Array(names.length).fill(sameLabels)
		}
		var numbers = getRegularNumbers({
			end: end,
			names: names,
			start: start,
			subGameId: subGameId,
			labels: labels
		});
		return {
			dantuoMax: dantuoMax,
			inputFormat: false,
			end: end,
			hasSub: hasSub,
			max: max,
			min: min,
			numberType: 'button',
			numbers: numbers,
			optionalMin: optionalMin,
			quickBtnOption: quickBtnOption,
			start: start,
			subGameId: subGameId
		}
	}
};