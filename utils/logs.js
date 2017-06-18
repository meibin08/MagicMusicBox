
var config = require('../config.js');

export const berichtenLogs = (options) => {//上报

	let { url,  data} = options;
	let _data = Object.assign({},(data||{}),{
			openid :"122", //token
			ENV :config.ENV, //环境 
			/*userAgent : navigator.userAgent,
			all_cookie : document.cookie,
			url : location.href*/
		});
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