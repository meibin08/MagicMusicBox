
import {DebugLogs,ErrorLogs} from "./logs.js";
var config = require('../config.js');
var userToken = "",userInfo={};

export const getUserInfo = (options)=>{

	showLoading();
	wx.getUserInfo({
		success:  (resInfo) =>{
			userInfo = resInfo.userInfo//保存用户信息
			wx.setStorageSync('userInfo',userInfo);
			options.success&&options.success(resInfo.userInfo);
		},
		fail:  (failInfo)=> {
			//console.error('wx.getUserInfo error:' + failInfo.errMsg);
			options.error&&options.error(failInfo);
			wx.hideLoading();
			ErrorLogs('getUserInfo-微信授权失败', failInfo);
		}
	});
};
export const login = (options)=>{

	showLoading();
	wx.login({
		success:  (res) => {
			if (res.code) {

				//获取用户信息;
				getUserInfo({
					success:options&&options.success,
					error:options&&options.error,
				});
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



export const sendRequest = (options) => {//上报

	options.url = config.baseUrl+options.url;
	let { url,type , data} = options;
	showLoading();
	wx.request({
		url:url,
		method:type||"GET",
		data:data,
		header:{
			'Content-Type': 'application/json'
		},
		success:(res)=>{
			console.log(res)
			resHandler(res,options);
			wx.hideLoading();
			if(res.data.code != 0){
				DebugLogs(url,res);
			}
		},
		error:(err,status)=>{
			errorHandler(err.data,options,err.statusCode);
			wx.hideLoading();
			ErrorLogs(url,err);
		}
	});
};

export const RequestJson = (options) =>{
	let userToken = wx.getStorageSync('userToken')||"";
	if(userToken == ""){
		login({
			success:(data)=>{
				console.log(data,userToken)
				sendRequest({
					url:"/api/token",
					type:"POST",
					data,
					success:res=>{
						let {result} = res;
						wx.setStorageSync('userToken',result.token);
						console.log(res)
					},error:err=>{
						console.log(res);
					}
				});
			}
		})
		return false;
	};
	sendRequest(options);
};

// 请求成功处理
function resHandler(resData, options) { 
  if (resData.statusCode && resData.statusCode != 200) {
	 errorHandler(resData.data, options, resData.statusCode);
	 return;
  }

  if (!resData || resData.code > 10000) {
	options.error && options.error(resData)
	showToast(resData.errMsg);
  } else {
	options.success && options.success(resData.data);
  }
}

// 异常处理
function errorHandler(error, options, status) {
  options.error && options.error(error);
	showToast(`网络异常，请稍后重试(${status})`);
}

function showLoading(options) {
	wx.showLoading({
	  title: (options&&options.title||"加载中"),
	});
};
function showToast(errMsg){
	wx.showModal({
	  title: '提示',
	  showCancel:false,
	  content: errMsg,
	});
}