/*
* @authors :Bin Mei
* @date    :2017-06-20
* @description：接口请求封装，统一处理项目登录流程，
*/

import {DebugLogs,ErrorLogs} from "./logs.js";
import Store from "./storage.js";
var config = require('../config.js');
var userToken = "",userInfo={};


//登录授权
export const getUserLogin = (options)=>{

	showLoading();
	wx.login({
		success:(res) => {
			if (res.code) {

				//获取用户信息;
				getUserInfo(options);
			} else {
				DebugLogs("微信登录异常",res);
				//console.error('wx.login error:' + res.errMsg)
			}
			wx.hideLoading();
		},
		error:  (loginErr)=> {
			ErrorLogs("error-微信登录失败",loginErr);
			wx.hideLoading();
			showToast(loginErr.errMsg);
		}
	});

};
//获取用户信息
export const getUserInfo = (options)=>{

	showLoading();
	wx.getUserInfo({
		success:  (resInfo) =>{
			userInfo = resInfo.userInfo//保存用户信息
			Store.set('userInfo',userInfo);
			getUserToken(options);
			// options.success&&options.success(userInfo)
		},
		fail:  (failInfo)=> {
			//console.error('wx.getUserInfo error:' + failInfo.errMsg);
			options.error&&options.error(failInfo);
			wx.hideLoading();
			ErrorLogs('getUserInfo-微信授权失败', failInfo);
		}
	});
};
//获取token
export const getUserToken = (options)=>{
	let userInfo = (Store.get('userInfo')||{});
	let userToken = Store.get('userToken')||"";

	if(userToken && Object.keys(userInfo).length){
		options.success&&options.success(Object.assign({},{token:userToken,userInfo:userInfo}));
	}else{
		sendRequest({
			url:"/api/token",
			type:"POST",
			data:userInfo,
			success:res=>{
				let {result} = res;
				Store.set('userToken',result.token,config.token_expires);
				console.log(Store.get('userToken'))
				result.userInfo = Object.assign({},result,userInfo);
				options.success&&options.success(result);
			},error:err=>{
				options.error&&options.error(err);
				console.log(res);
			}
		});
	};
	
}

export const sendRequest = (options) => {//上报

	options.url = config.baseUrl+options.url;
	let { url,type , data} = options;
	let userToken = Store.get('userToken')||"";
	showLoading();
	wx.request({
		url:url,
		method:type||"GET",
		data:data,
		header:{
			"userToken":userToken,
			'Content-Type': 'application/json'
		},
		success:(res)=>{
			// console.log(84,res)
			resHandler(res,options);
			wx.hideLoading();
		},
		error:(err,status)=>{
			errorHandler(err,options,err.statusCode);
			wx.hideLoading();
			// ErrorLogs(url,err);
		}
	});
};

export const RequestJson = (options) =>{
	let userToken = Store.get('userToken')||"";
	if(userToken == ""){
		getUserLogin({
			success:(data)=>{
				// console.log(data)
				sendRequest(options);
			}
		})
		console.log("token== null");
		return false;
	}else{
		sendRequest(options);
	};
};

// 请求成功处理
function resHandler(resData, options) { 
  if (resData.statusCode && resData.statusCode != 200) {
	 errorHandler(resData, options, resData.statusCode);
	 return;
  };
  if(resData&&resData.data.code == 20002){ //未登录｜｜登录失效

	RequestJson(options);
  }else if(!resData || resData&&resData.data.code > 20000) {
	options.error && options.error(resData)
	showToast(resData.data.message);
  } else {
	options.success && options.success(resData.data);
  };
  if(resData.data.code != 0){
		DebugLogs(options.url,resData);
	};
}

// 异常处理
function errorHandler(error, options, status) {
  options.error && options.error(error.data);
	showToast(`网络异常，请稍后重试(${status})`);
	ErrorLogs(options.url,error);
}

function showLoading(options) {
	wx.showLoading({
	  title: (options&&options.title||"加载中"),
	});
};
function showToast(errMsg,callback){
	wx.showModal({
	  title: '提示',
	  showCancel:false,
	  content: errMsg,
	  success: (res) =>{
	    if (res.confirm) {
	      callback&&callback(res);
	    } else if (res.cancel) {
	      callback&&callback(res);
	    }
	  }
	});
}