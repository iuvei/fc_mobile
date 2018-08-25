import {request} from "../../../utils/request.js"
export default{
	namespaced: true,
	state:{
		classId:"",
		kindId:"",
		leftName:"",
		rightName:"",
		subGameId:"",
		gameName:"",
		gameId:"",
		ticketCount:0,
		newNumbers:[],
		gamePlayList:[],
		standGameList:[],
		lotteryData:[],
		currentAwarPeriod:'',
		prevAwarPeriod:'',
		dragons:[],
		hotCold:[],
		omit:[],
		winList:[],
		subGameList:[],
		betDataList:{},
		standGameLists:{},
		historyData:null,
		
		
	},
    getters:{
    },
    mutations: {
    	cacheHistoryData(state,data){
    		state.historyData = data
    	},
		setClassId(state,classId){
    		state.classId = classId;
		},
		setKindId(state,kindId){
    		state.kindId = kindId;
    	},
    	saveStandGameList(state,obj){
    		state.standGameLists[obj.kindId] = obj.standGameList
    	},
    	setBetOrder(state,obj){
    		state.ticketCount = obj.ticketCount;
    		state.newNumbers = obj.newNumbers;
    	},
    	saveGamePlayList(state,obj){
    		state.standGameList = obj
    	},
    	saveDataOrSubGameList(state,obj){
    		state.betDataList = obj.betDataList;
    		state.newNumbers = obj.newNumbers;
    		state.leftName = obj.leftName;
    		state.rightName = obj.rightName;
    		state.subGameId = obj.subGameId;
    		state.gameName = obj.gameName;
    		state.gameId = obj.gameId;
    		state.gamePlayList = obj.gamePlayList
    	},
    	saveSubGameList(state,data){
    		state.subGameList = data
    	},
    	getWinsDragon(state,data){
    		state.currentAwarPeriod = data.winList[0].awarPeriod
    		state.prevAwarPeriod = data.winList[1].awarPeriod
    		state.dragons = data.dragons;
    		state.hotCold = data.hotCold;
    		state.omit = data.omit;
    		state.winList = data.winList
    	},
    	saveLotteryData(state,data){
    		state.lotteryData = data
    	},
    	updateAwarPeriod(state,obj){
    		
    		obj.currentAwarPeriod?state.currentAwarPeriod = obj.currentAwarPeriod:null;
    		obj.prevAwarPeriod?state.prevAwarPeriod = obj.prevAwarPeriod:null;
    	},
    	deleteLotteryData(state,index){
    		state.lotteryData.splice(index,1)
    	}
	},
	actions:{
		getGamePlayList({commit},params){
		return new Promise(function(resolve, reject) {
				let res = request('get','getGamePlayList',params).then((res) => {
					commit("saveGamePlayList", res.data.standGameList)
					resolve(res)
				})
			})	
    	},
    	getSubGames({commit},params){
    		return new Promise(function(resolve, reject) {
				let res = request('post', 'getSubGames', params).then((res) => {
					resolve(res)
				})
			})
    	},
    	getWinsDragon({commit},params){
    	return new Promise(function(resolve, reject) {
				let res = request('get', 'getWinsDragon', params).then((res) => {
					commit("getWinsDragon", res.data)
					resolve(res)
				})
			})
    	},
    	quickBet({commit},params){
    	return new Promise(function(resolve, reject) {
				let res = request('post', 'chipIn', params).then((res) => {
					resolve(res)
				})
			})
    	},
    	getTimes({commit},params){
    	return new Promise(function(resolve, reject) {
				let res = request('get', 'getTimes', params).then((res) => {
					resolve(res)
				})
			})
    	},
    	getSubGames({commit},params){
    	return new Promise(function(resolve, reject) {
				let res = request('post', 'getSubGames', params).then((res) => {
					resolve(res)
				})
			})
    	},
    	
	}
}