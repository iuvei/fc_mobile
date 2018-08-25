import { request } from '../../../utils/request';
import { createSpecialBetNumbers,createBetNumbers,calcChooseBetCount} from './renderPalette.js';

const showHotColdOrOmit = [
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
];
const hk6PositiveCodeOnetoSix = ['200701', '200702', '200703', '200704', '200705', '200706']
const hk6CodeArr = ["200101", "200501", "200601", "200602", "200603", "200604", "200605", "200606"];
const specialGameId = ["4001", "3014", "6005", "2003", "2008", '2007']
//时时彩两面盘subGameId数组
var SscSpecialArr = [];
//bjsc两面盘subGameId数组;
var bjscSpecialArr = [];
//快三和值subGameId数组;
var ksSumValArr = ["400101", "400102", "400103", "400104", "400105", "400106", "400107", "400108", "400109", "400110", "400111", "400112", "400113", "400114", "400115", "400116"];
//胆拖subGameId数组
var dantuoArr = ['500105', '500110', '500115', '500205', '500210', '500701', '500702', '500703', '500704', '500705', '500706', '500707', '400402', '400802', '400701'];
//包胆subGameId数组
var baodanArr = ["300212", "300216", "300310", "300410", "300510"]
//特殊号码数组
var specialNum = ["300312", "300412", "300512"]
for(var i = 1; i < 28; i++) {
	if(i < 10) {
		SscSpecialArr.push("30140" + i)
	} else {
		SscSpecialArr.push("3014" + i)
	}
}
for(var i = 3; i < 24; i++) {
	if(i < 10) {
		bjscSpecialArr.push("60050" + i)
	} else {
		bjscSpecialArr.push("6005" + i)
	}
}
//buttom选号方式
export function onSelectBtn(obj, subGameId, data, bileCodeArr,optionalFields) {
	let noteNumber, newNumbers;
	let result;
	let row = obj.row,
		col = obj.col;
	let boolen = data.numbers[row]["cols"][col].data_selected
	//胆拖选号方式
	if(dantuoArr.indexOf(subGameId) != -1) {
		//胆码选择上限
		let dantuoMax = data.dantuoMax
		//点击之前的状态

		//row=="0"是点击的为胆码按钮
		data.numbers[row]["cols"][col].data_selected = !boolen
		if(!boolen) {
			if(row == "0") {
				//点击后将当前点击的胆码位置添加到bileCodeArr
				bileCodeArr.push(col)
				let length = bileCodeArr.length
				//判断bileCodeArr是否超过胆码选择上限
				if(length >= dantuoMax) {
					//要变为未选中的按钮的下标
					let oldIdx = bileCodeArr[0];
					//要变为选中的按钮的下标
					let newIdx = bileCodeArr[length - 1];
					//改变状态
					data.numbers[0]["cols"][oldIdx].data_selected = false;
					data.numbers[0]["cols"][newIdx].data_selected = true;
					//状态改变后删除第0条
					bileCodeArr.splice(0, 1)
				}
			} else {
				data.numbers[0]["cols"][col].data_selected = false;
				if(bileCodeArr.indexOf(col) != -1) {
					let idx = bileCodeArr.indexOf(col)
					bileCodeArr.splice(idx, 1)
				}
			}
		} else {
			data.numbers[0]["cols"][col].data_selected = false;
			if(bileCodeArr.indexOf(col) != -1) {
				let idx = bileCodeArr.indexOf(col)
				bileCodeArr.splice(idx, 1)
			}
		}
		//胆码与拖码互斥，两者间只有一个按钮得状态为true
		if(row == "0") {
			if(data.numbers[0]["cols"][col].data_selected == true) {
				data.numbers[1]["cols"][col].data_selected = false
			}
		} else if(row == "1") {
			if(data.numbers[1]["cols"][col].data_selected == true) {
				data.numbers[0]["cols"][col].data_selected = false
			}
		} ////包胆玩法
	} else if(baodanArr.indexOf(subGameId) != -1) {
		if(boolen == true) {
			data.numbers[row]["cols"][col]["data_selected"] = false;
		} else {
			for(let i = 0; i < data.numbers.length; i++) {
				for(let k = 0; k < data.numbers[i].cols.length; k++) {
					data.numbers[i]['cols'][k]["data_selected"] = false;
				}
			}
			//将其他按钮的["data_selected"] = false;
			data.numbers[row]["cols"][col]["data_selected"] = true;
		}
	} else if(SscSpecialArr.indexOf(subGameId) != -1||hk6BetNumbersConfig.telm[subGameId]||hk6BetNumbersConfig.zonghe[subGameId]) {
//		console.log("233")
		//点击改变状态
		data.numbers[row]["cols"][col].data_selected = !data.numbers[row]["cols"][col].data_selected;
		//点击之后的状态
		let boolen = data.numbers[row]["cols"][col].data_selected;
		//inverse为label对应的号码   大-1  小-0
		let inverse = data.numbers[row]["cols"][col].inverse;
		switch(inverse) {
			//大小单双质合互斥
			case 0:
				if(boolen) {
					mutex(obj, 1, boolen, data)
				}
				break
			case 1:
				if(boolen) {
					mutex(obj, 0, boolen, data)
				}
				break
			case 2:
				if(boolen) {
					mutex(obj, 3, boolen, data)
				}
				break
			case 3:
				if(boolen) {
					mutex(obj, 2, boolen, data)
				}
				break
			case 4:
				if(boolen) {
					mutex(obj, 5, boolen, data)
				}
				break
			case 5:
				if(boolen) {
					mutex(obj, 4, boolen, data)
				}
				break
			case 6:
				if(boolen) {
					mutex(obj, 7, boolen, data)
				}
				break
			case 7:
				if(boolen) {
					mutex(obj, 6, boolen, data)
				}
				break
			case 8:
				if(boolen) {
					mutex(obj, 9, boolen, data)
				}
				break
			case 9:
				if(boolen) {
					mutex(obj, 8, boolen, data)
				}
				break
			case 10:
				if(boolen) {
					mutex(obj, 11, boolen, data)
				}
				break
			case 11:
				if(boolen) {
					mutex(obj, 10, boolen, data)
				}
				break
			case 12:
				if(boolen) {
					mutex(obj, 13, boolen, data)
				}
				break
			case 13:
				if(boolen) {
					mutex(obj, 12, boolen, data)
				}
				break
			case 14:
				if(boolen) {
					mutex(obj, 15, boolen, data)
					mutex(obj, 16, boolen, data)
				}
				break
			case 15:
				if(boolen) {
					mutex(obj, 14, boolen, data)
					mutex(obj, 16, boolen, data)
				}
				break
			case 16:
				if(boolen) {
					mutex(obj, 14, boolen, data)
					mutex(obj, 15, boolen, data)
				}
				break
		}
	} else { //普通玩法
		if(boolen) {
			//选中
			data.numbers[row]["cols"][col]["data_selected"] = false
			//改变属性
		} else {
			//未选中
			data.numbers[row]["cols"][col]["data_selected"] = true
		}
	}
}

//两面盘互斥算法
function mutex(obj, num, boolen, data) {
	let row = obj.row,
		col = obj.col;
	for(let i = 0; i < data.numbers[row]["cols"].length; i++) {
		if(data.numbers[row]["cols"][i].inverse == num) {
			data.numbers[row]["cols"][i].data_selected = !boolen
		}
	}
}
//处理购彩蓝数据
export function getLotteryData(data,checkAllGroup,selectMode) {
	let specialArys1 = bjscSpecialArr.concat(ksSumValArr);
	let specialArys2 = bjscSpecialArr.concat(ksSumValArr, SscSpecialArr, specialNum);
	let {
		unite,
		price,
		totalPrice,
		subGameId,
		ticketCount,
		subGameList,
		kindId,
		newNumbers,
		betDataList,
		rightName,
		leftName,
		periodNo 
	} = data;
	let selecteNum = '',
		subGames = '';
	if(specialArys2.indexOf(subGameId) != -1) {
		if(leftName == "整合") {
			let LotteryData = [];
			newNumbers.forEach((item1, index1) => {
				let obj = {};
				selecteNum = ''
				if(item1.length != 0) {
					item1.forEach((item2, index2) => {
						ticketCount = item1.length
						selecteNum += betDataList.numbers[index1]["cols"][item2]["label"] + ',';
						obj.selecteNum = selecteNum;
						obj.subGames = leftName + '(' + betDataList.numbers[index1]["rightName"] + ')';
						obj.ticketCount = ticketCount;
						obj.oddMax = subGameList[index1].oddMax;
						obj.totalPrice = price * ticketCount;
						obj.subGameId = subGameList[index1].subGameId;
						obj.price = price;
						obj.unite = unite;
						obj.periodNo = periodNo;

					})
					obj.selecteNum = obj.selecteNum.substr(0, obj.selecteNum.length - 1);
					LotteryData.push(obj)
				}
			})
			return LotteryData
		} else if(leftName == "龙虎") {
			let LotteryData = [];
			let count = 0,
				obj2 = {};
			obj2.selecteNum = "";
			newNumbers.forEach((item1, index1) => {
				let obj = {};
				selecteNum = ''
				if(item1.length != 0) {
					item1.forEach((item2, index2) => {
						if(item2 != 2) {
							ticketCount = 1;
							selecteNum += betDataList.numbers[index1]["cols"][item2]["label"];
							obj.selecteNum = selecteNum;
							obj.subGames = leftName + '(' + betDataList.numbers[index1]["rightName"] + ')';;
							obj.ticketCount = ticketCount;
							obj.oddMax = subGameList[index1].oddMax;
							obj.subGameId = subGameList[index1].subGameId;
							obj.totalPrice = price * ticketCount;
							obj.price = price;
							obj.unite = unite;
							obj.periodNo = periodNo;

						} else {
							count++
							obj2.selecteNum += betDataList.numbers[index1]["rightName"] + ',';
							obj2.subGames = leftName + "(" + "和" + ")";
							obj2.ticketCount = count;
							obj2.oddMax = subGameList[subGameList.length - 1].oddMax;
							obj2.totalPrice = price * count;
							obj2.subGameId = subGameList[subGameList.length - 1].subGameId;
							obj2.price = price;
							obj2.unite = unite;
							obj2.periodNo = periodNo;
						}
					})
					if(Object.keys(obj).length != 0) {
						LotteryData.push(obj)
					}
				}
			})
			obj2.selecteNum = obj2.selecteNum.substr(0, obj2.selecteNum.length - 1);
			LotteryData.push(obj2)
			return LotteryData
		} else if(leftName == "和值" || rightName == "特殊号码"||leftName == "特码") {
			let LotteryData = [];
			
			newNumbers[0].forEach((item) => {
				let obj = {};
				obj.selecteNum = betDataList.numbers[0]["cols"][item]["label"];
				
				obj.ticketCount = 1;
				if(rightName == "特殊号码"){
					obj.subGames = leftName
					obj.oddMax = subGameList[0].oddMax.split(",")[item];
					obj.subGameId = subGameList[0].subGameId;
				}else{
					obj.subGames = leftName + '(' + betDataList.numbers[0]["cols"][item]["rightName"] + ')';
					obj.oddMax = subGameList[item].oddMax;
					obj.subGameId = subGameList[item].subGameId;
				}
				
				
				obj.totalPrice = price * 1;
				obj.price = price;
				obj.unite = unite;
				obj.periodNo = periodNo;
				LotteryData.push(obj)
			})
			return LotteryData
		} else {
			 let LotteryData = [];
		      newNumbers.forEach((item1, index1) => {
				let obj = {};
				if(item1.length != 0) {
					item1.forEach((item2, index2) => {
						obj.ticketCount = 1;
						obj.selecteNum = betDataList.numbers[index1]["cols"][item2]["label"];
						obj.oddMax = subGameList[index1].oddMax;
						obj.totalPrice = price * 1;
						obj.subGameId = subGameList[index1].subGameId;
						obj.subGames = leftName + '(' + betDataList.numbers[index1]["rightName"] + ')';
						obj.price = price;
						obj.unite = unite;
						obj.periodNo = periodNo;

					})
					if(Object.keys(obj).length != 0) {
						LotteryData.push(obj)
					}
				}
			})
		
			return LotteryData
		}
		

	} else {
	let LotteryData = new Object();
		//单式
	let str = '';
    let o = checkAllGroup;
    if(checkAllGroup.length!=0){
    	let compareData = { "万位" : 1, "千位" : 2, "百位" : 3, "十位" : 4, "个位" : 5,};
    checkAllGroup = o.sort(function(a,b){return compareData[a]- compareData[b]});
			if(betDataList.optionalMin!=-1){
				checkAllGroup.forEach((item)=>{
					str += item[0]
				})
				str = str+"|";
			}//汉字排序
    }
    
		
		if(specialArys1.indexOf(subGameId) == -1 && rightName != leftName && rightName != 'null') {
			subGames = leftName + '(' + rightName + ')';
		} else {
			subGames = leftName
		}
	if(["200301","200302","200303"].indexOf(subGameId)!=-1||hk6BetNumbersConfig.banbo[subGameId]){
			let LotteryData = [];
			newNumbers.forEach((item,index)=>{
				let obj = {};
				obj.selecteNum = item;
				switch (item){
					case '红':
					obj.subGameId = "200301";
						break;
					case '蓝':
					obj.subGameId = "200302";
						break;
					case '绿':
					obj.subGameId = "200303";
						break;
					case '红大':
					obj.subGameId = "200801";
						break;
					case '红小':
					obj.subGameId = "200802";
						break;
					case '红单':
					obj.subGameId = "200803";
						break;
					case '红双':
					obj.subGameId = "200804";
						break;
					case '蓝大':
					obj.subGameId = "200805";
						break;
					case '蓝小':
					obj.subGameId = "200806";
						break;
					case '蓝单':
					obj.subGameId = "200807";
						break;
					case '蓝双':
					obj.subGameId = "200808";
						break;
					case '绿大':
					obj.subGameId = "200809";
						break;
					case '绿小':
					obj.subGameId = "200810";
						break;
					case '绿单':
					obj.subGameId = "200811";
						break;
					case '绿双':
					obj.subGameId = "200812";
						break;
					default:
						break;
				}
				obj.subGames = leftName;
				obj.ticketCount = 1;
				obj.oddMax = subGameList[index].oddMax;
				obj.totalPrice = price * 1;
				obj.price = price;
				obj.unite = unite;
				obj.periodNo = periodNo;
				LotteryData.push(obj)
			
			})
			
			return LotteryData
			
	}
	else if(hk6BetNumbersConfig.telm[subGameId]) {
//		console.log(newNumbers)
			let LotteryData = [];
			let obj = {};
			let arr = [];
			obj.ticketCount = 0;
			newNumbers.forEach((item1,index1) => {
				item1.forEach((item2,index2)=>{
					arr.push(betDataList.numbers[index1]["cols"][item2]["label"])
					obj.ticketCount++
				})
			})
			    obj.selecteNum = arr.join(",");
				obj.subGames = leftName;
				obj.oddMax = subGameList[0].oddMax;
				obj.subGameId = subGameList[0].subGameId;
				obj.totalPrice = price * 1*obj.ticketCount;
				obj.price = price;
				obj.unite = unite;
				obj.periodNo = periodNo;
				LotteryData.push(obj)
			return LotteryData
		}

	else if(hk6BetNumbersConfig.zonghe[subGameId]){
			let LotteryData = [];
			newNumbers.forEach((it,index)=>{
				it.forEach((item) => {
				let obj = {};
				obj.selecteNum = betDataList.numbers[index]["cols"][item]["label"];
				obj.subGames = leftName;
				obj.ticketCount = 1;
				obj.oddMax = subGameList[0].oddMax;
				obj.subGameId = subGameList[0].subGameId;
				obj.totalPrice = price * 1;
				obj.price = price;
				obj.unite = unite;
				obj.periodNo = periodNo;
				LotteryData.push(obj)
			})
			})
			
			return LotteryData
			
		}
	else if(calcBetCountConfig.hk6Special[subGameId]){
			let LotteryData = [];
			let obj = {};
			let arr = [];
			obj.ticketCount = 0;
			newNumbers.forEach((item,index)=>{
				arr.push(item)
				obj.ticketCount++;
			})
			    obj.selecteNum = arr.join(',')
			    obj.subGames = leftName;
				
				obj.oddMax = subGameList[0].oddMax;
				obj.subGameId = subGameList[0].subGameId;
				obj.totalPrice = price * 1*obj.ticketCount;
				obj.price = price;
				obj.unite = unite;
				obj.periodNo = periodNo;
			LotteryData.push(obj)
			return LotteryData
		}
	else if(calcBetCountConfig.hk6hexiao[subGameId]){
			let LotteryData = [];
			let obj = {};
				obj.selecteNum = newNumbers.join(',');
				obj.subGames = leftName;
				obj.ticketCount = 1;
				obj.oddMax = subGameList[0].oddMax;
				obj.subGameId = subGameList[0].subGameId;
				obj.totalPrice = price * 1;
				obj.price = price;
				obj.unite = unite;
				obj.periodNo = periodNo;
				LotteryData.push(obj)
			return LotteryData
		}else if(betDataList.inputFormat != false){
			console.log(newNumbers)
			if(selectMode=="0"){
		LotteryData.selecteNum = newNumbers.join(",");
			}else if(selectMode=="1"){
				let ary = []
				checkAllGroup.forEach((item)=>{
					item=item.slice(0,1)
					ary.push(item)
				})
		let str = ary.join('')+'|';
		LotteryData.selecteNum = str+newNumbers.join(",");
			}
		LotteryData.subGames = subGames;
		LotteryData.ticketCount = ticketCount;
		LotteryData.oddMax = subGameList[0].oddMax;
		LotteryData.subGameId = subGameList[0].subGameId;
		LotteryData.totalPrice = totalPrice;
		LotteryData.price = price;
		LotteryData.unite = unite;
		LotteryData.periodNo = periodNo;
		return [LotteryData]
	}
		newNumbers.forEach((item1, index1) => {
			if(item1.length != 0) {
				if(newNumbers.length == 1) {
					item1.forEach((item2, index2) => {
						newNumbers[index1][index2] = betDataList.numbers[index1]["cols"][item2]["label"];
						selecteNum += newNumbers[index1][index2] + ',';
					})
				} else {
					item1.forEach((item2, index2) => {
						newNumbers[index1][index2] = betDataList.numbers[index1]["cols"][item2]["label"];
						selecteNum += newNumbers[index1][index2] + '';
					})
					selecteNum += ","
				}

			} else {
				selecteNum += '?,'
			}

		})
		selecteNum = selecteNum.substr(0, selecteNum.length - 1);
		LotteryData.selecteNum = str+selecteNum;
		LotteryData.subGames = subGames;
		LotteryData.ticketCount = ticketCount;
		LotteryData.oddMax = subGameList[0].oddMax;
		LotteryData.subGameId = subGameList[0].subGameId;
		LotteryData.totalPrice = totalPrice;
		LotteryData.price = price;
		LotteryData.unite = unite;
		LotteryData.periodNo = periodNo;
		return [LotteryData]
	}

}
export function chaseBets(lotteryData, cachingArray){
	let arr = [];
	lotteryData.forEach((item1) => {
		cachingArray.forEach((item2) => {
			let obj = {}
			obj.oddMax = item1.oddMax;
			obj.price = item2.times;
			obj.selecteNum = item1.selecteNum;
			obj.subGameId = item1.subGameId;
			obj.subGames = item1.subGames;
			obj.unite = item1.unite;
			obj.ticketCount = item1.ticketCount;
			obj.totalPrice = item2.currentPay;
			obj.periodNo = item2.periodNo;
			arr.push(obj)
		})
	})
	return arr
}
export function quickBets(data) {
	let params = {};
	let {
		lotteryData,
		kindId,
		orderFrom,
		orderType,
		periodNo,
		noState,
	} = data;
	let orderList = [];
	let cost = 0;
	lotteryData.forEach((item) => {
		let obj = {}
		obj.lotteryNum = item.selecteNum.replace(/\?/g, "");
		obj.orderNum = item.ticketCount;
		obj.subGameId = item.subGameId;
		obj.unitPrice = Math.round(item.price * item.unite*100)/100;
		obj.totalAmount = Math.round(obj.unitPrice * obj.orderNum*100)/100;
		noState?obj.periodNo = periodNo:obj.periodNo = item.periodNo;
		orderList.push(obj)
		cost += obj.totalAmount
	})
	params.baseLotteryId = kindId;
	params.orderFrom = orderFrom;
	params.orderType = orderType;
	params.periodNo = periodNo;
	params.orderList = orderList;
	params.cost =  Math.round(cost*100)/100;
	return params
}
export async function renderingData(str, standGameList) {
	let oddTxtShow = true;
	let leftName = str.split('-')[0],
		rightName = str.split('-')[1],
		subGameId = str.split('-')[2];
	let data, subGameList;
	let subGameIds, gameSons;
	let params = {};
	let betTypeMap;
	let indexAry = [];
	if(SscSpecialArr.indexOf(subGameId) != -1) {
		oddTxtShow = true;
		switch(leftName) {
			case "整合":
				subGameIds = SscSpecialArr.slice(0, 6)
				gameSons = standGameList.gameSons.slice(0, 6)
				betTypeMap = getBetTypeMap(gameSons)
				break
			case "龙虎":
				subGameIds = SscSpecialArr.slice(6, 17)
				gameSons = standGameList.gameSons.slice(6, 17)
				betTypeMap = getBetTypeMap(gameSons)
				break
			case "和值单双":
				subGameIds = SscSpecialArr.slice(17)
				gameSons = standGameList.gameSons.slice(17)
				betTypeMap = getBetTypeMap(gameSons)
				break
		}
//		params.gameIds = subGameIds;
		//		let res = await request('post', 'getSubGames', params)
//		subGameList = [];
		data = createSpecialBetNumbers({
			betTypeMap: betTypeMap,
			subGameIds: subGameIds.slice(0, 10)
		})
		
		
	} else if(ksSumValArr.indexOf(subGameId) != -1) {
		oddTxtShow = false;
		subGameIds = ksSumValArr;
//		params.gameIds = subGameIds;
		//		let res = await request('post', 'getSubGames', params)
//		subGameList = [];
		gameSons = standGameList.gameSons

		betTypeMap = getBetTypeMap(gameSons)
		data = createSpecialBetNumbers({
			betTypeMap: betTypeMap,
			subGameIds: ksSumValArr
		})
	} else if(bjscSpecialArr.indexOf(subGameId) != -1) {
		oddTxtShow = false;
		switch(leftName) {
			
			case "冠亚合值":
				subGameIds = bjscSpecialArr.slice(0, 4)
				gameSons = standGameList.gameSons.slice(2, 6)
				betTypeMap = getBetTypeMap(gameSons)
				break
			case "冠亚组合合值":
				subGameIds = bjscSpecialArr.slice(4)
				gameSons = standGameList.gameSons.slice(6)
				betTypeMap = getBetTypeMap(gameSons)
				break
		}
//		params.gameIds = subGameIds;
//		let res = await request('post', 'getSubGames', params)
//		subGameList = [];
		data = createSpecialBetNumbers({
			betTypeMap: betTypeMap,
			subGameIds: subGameIds
		})
	} else {
		if(hk6BetNumbersConfig.sebo[subGameId]||hk6BetNumbersConfig.banbo[subGameId]){
		switch (subGameId){
			case '200801':
			subGameIds = ['200801','200802','200803','200804']
				break;
			case '200805':
			subGameIds = ['200805','200806','200807','200808']
				break;
			case '200809':
			subGameIds = ['200809','200810','200811','200812']
				break;
			case '200813':
			subGameIds = ['200813','200814','200815','200816']
				break;
			case '200301':
			subGameIds = ['200301','200302','200303']
			    break;
			default:
				break;
		}
//		params.gameIds = subGameIds;
//		let res = await request('post', 'getSubGames', params)
//		subGameList = res.data;
		data = createBetNumbers({
			leftName: leftName,
			rightName: rightName,
			subGameId: subGameId,
		})
		}else{
			//普通投注面板数据
		subGameIds = [subGameId]
//		params.gameIds = subGameIds;
//		
//		let res = await request('post', 'getSubGames', params)
//		subGameList = res.data;
		
		data = createBetNumbers({
			leftName: leftName,
			rightName: rightName,
			subGameId: subGameId,
			
		})
		}
		
		
	}
	
	return {
		oddTxtShow:oddTxtShow,
		data: data,
		leftName: leftName,
		rightName: rightName,
		subGameId: subGameId,
		subGameIds:subGameIds,
	}
}
//快捷选号
export function quickBtnSelect(data, obj,optionalFields) {
	
	let betDataList = data,
		value = obj.value,
		row = obj.row;
		
	let middleNumber = betDataList.max / 2;
	switch(value) {
		case 'all': //全选
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				betDataList.numbers[row]["cols"][k]["data_selected"] = true;
			}
			break;
		case 'big': //大
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				if(parseInt(betDataList.numbers[row].cols[k].label) > middleNumber) {
					betDataList.numbers[row]["cols"][k]["data_selected"] = true;
				} else {
					betDataList.numbers[row]["cols"][k]["data_selected"] = false;
				}
			}
			break;
		case 'small': //小
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				if(parseInt(betDataList.numbers[row].cols[k].label) <= middleNumber) {
					betDataList.numbers[row]["cols"][k]["data_selected"] = true;
				} else {
					betDataList.numbers[row]["cols"][k]["data_selected"] = false;
				}
			}
			break;
		case 'odd': //单
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				if(parseInt(betDataList.numbers[row].cols[k].label) % 2 === 1) {

					betDataList.numbers[row]["cols"][k]["data_selected"] = true;

				} else {
					betDataList.numbers[row]["cols"][k]["data_selected"] = false;
				}
			}
			break;
		case 'even': //双
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				if(parseInt(betDataList.numbers[row].cols[k].label) % 2 === 0) {
					betDataList.numbers[row]["cols"][k]["data_selected"] = true;
				} else {
					betDataList.numbers[row]["cols"][k]["data_selected"] = false;
				}
			}
			break;
		case 'clear': //清
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				betDataList.numbers[row]["cols"][k]["data_selected"] = false;
			}
			break;
	}
	let result;
	if(optionalFields.length == 0){
		result = calcChooseBetCount(data, [])
	}else{
		result = calcChooseBetCount(data, optionalFields)
	}
	return result
}
function getBetTypeMap(gameSons) {
	let betTypeMap = {}
	gameSons.forEach((item) => {
		let subGameId = item.subGameId
		betTypeMap[subGameId] = {
			rightName: item.rightName,
			leftName: item.leftName
		}
	})
	return betTypeMap
}
//快捷选号
function quickBtnSelect(data, obj,optionalFields) {
	
	let betDataList = data,
		value = obj.value,
		row = obj.row;
		
	let middleNumber = betDataList.max / 2;
	switch(value) {
		case 'all': //全选
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				betDataList.numbers[row]["cols"][k]["data_selected"] = true;
			}
			break;
		case 'big': //大
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				if(parseInt(betDataList.numbers[row].cols[k].label) > middleNumber) {
					betDataList.numbers[row]["cols"][k]["data_selected"] = true;
				} else {
					betDataList.numbers[row]["cols"][k]["data_selected"] = false;
				}
			}
			break;
		case 'small': //小
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				if(parseInt(betDataList.numbers[row].cols[k].label) <= middleNumber) {
					betDataList.numbers[row]["cols"][k]["data_selected"] = true;
				} else {
					betDataList.numbers[row]["cols"][k]["data_selected"] = false;
				}
			}
			break;
		case 'odd': //单
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				if(parseInt(betDataList.numbers[row].cols[k].label) % 2 === 1) {

					betDataList.numbers[row]["cols"][k]["data_selected"] = true;

				} else {
					betDataList.numbers[row]["cols"][k]["data_selected"] = false;
				}
			}
			break;
		case 'even': //双
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				if(parseInt(betDataList.numbers[row].cols[k].label) % 2 === 0) {
					betDataList.numbers[row]["cols"][k]["data_selected"] = true;
				} else {
					betDataList.numbers[row]["cols"][k]["data_selected"] = false;
				}
			}
			break;
		case 'clear': //清
			for(let k = 0; k < betDataList.numbers[row].cols.length; k++) {
				betDataList.numbers[row]["cols"][k]["data_selected"] = false;
			}
			break;
	}
	let result;
	if(optionalFields.length == 0){
		result = calcChooseBetCount(data, [])
	}else{
		result = calcChooseBetCount(data, optionalFields)
	}
	return result
}