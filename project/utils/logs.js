/*
* @authors :Bin Mei
* @date    :2017-06-20
* @description：项目接口异常信息日志上报，
*/

var config = require('../config.js');

//获取设备信息;
export const getSystem = (options)=>{
	let systemInfo = wx.getStorageSync('systemInfo')||{}; 
	wx.getSystemInfo({
	  success: function(res) {
	  	wx.setStorageSync('systemInfo',res);
	    options.success&&options.success(res);
	  },
	  error:(err)=>{
	  	options.error&&options.error(err);
	  }
	});
};
export const berichtenLogs = (options) => {//上报

	let { url,  data} = options;
	let userToken = wx.getStorageSync('userToken')||"";
	let userInfo = wx.getStorageSync('userInfo')||{};
	let systemInfo = wx.getStorageSync('systemInfo')||{}; 

	let _data = Object.assign({},(data||{}),{
			openid :userToken, //token
			ENV :config.ENV, //环境 
			userAgent : systemInfo,
			userInfo : userInfo,
			/*url : location.href*/
		});

	let logs = ()=>{
		wx.request({
			url:`https://leancloud.cn/1.1/classes/${url}`,
			method:"POST",
			data:_data,
			header:{
				'X-Avoscloud-Application-Id': config.logsId,
				'X-Avoscloud-Application-Key':config.logsKey,
				'Content-Type': 'application/json'
			},
			success:(res)=>{
				console.log(url+"上报完成",res);
			}
		});
	};
	if(!Object.keys(systemInfo).length){
		getSystem({
			success:(data)=>{
				_data.userAgent = data;
				logs();
			},
			error:()=>{
				logs();
			}
		})
	}else{
		logs();
	};
};

// 异常日志上报  
export const DebugLogs = (interfaces,detail)=>{
	berichtenLogs({
		url:"DEBUG",
		data:{
			interfaces,
			detail
		}
	});
};
// 错误日志上报
export const ErrorLogs = (interfaces,detail)=>{
	berichtenLogs({
		url:"ERROR",
		data:{
			interfaces,
			detail
		}
	});
};