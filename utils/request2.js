"use strict"
var server = 'mock', accessToken = '', userInfo = {}, systemInfo = {};

//配置环境：本地、开发、生产
function getServerUrl(route) {
	var url = '', fileName = route.replace(/\//g, '_');
	switch (server) {
		case 'local': url = `https://dev.wx.mecollege.cn/web/xiaohui/data/${fileName}.json`; break;
        case 'mock': url = `https://easy-mock.com/mock/5925383e91470c0ac1fb782d/index.php/${route}`; break;
		case 'dev': url = `https://dev.wx.mecollege.cn/index.php?r=${route}`; break;
		default: url = `https://wx.mecollege.cn/index.php?r=${route}`; break;
	}
	return url;
}

function save(className, data) {
	wx.request({
		url: `https://leancloud.cn/1.1/classes/${className}`, //仅为示例，并非真实的接口地址
		method: 'POST',
		data: data,
		header: {
			'X-Avoscloud-Application-Id': 'ei59ycKpc01CcPaD2gHqxDTT-gzGzoHsz',
			'X-Avoscloud-Application-Key': 'IzsJv9veH5YlwYkPO70B54mD',
			'content-type': 'application/json'
		},
		success: function (res) {
			console.info("report success")
		}
	})
}

function saveError(msg, detail) {
	save('ERROR', { 'nickName': userInfo.nickName, userInfo: userInfo, systemInfo: systemInfo, 'msg': msg, detail: detail });
}

function saveDebug(obj) {
	save('DEBUG', { 'nickName': userInfo.nickName, userInfo: userInfo, systemInfo: systemInfo, 'obj': obj });
}

function login(success) {
	wx.login({
		success: function (res) {
			if (res.code) {
				var code = res.code;
				var method = (server == 'local' ? 'GET' : 'POST');
				isLoading();
				wx.getUserInfo({
					success: function (resInfo) {
						userInfo = resInfo.userInfo//保存用户信息
						//参数
						wx.request({
							url: getServerUrl('api/get-access-token'),
							data: { code: code, encryptedData: resInfo.encryptedData, iv: resInfo.iv },
							method: method,
							header: {
								'content-type': 'application/json'
							},
							success: function (resRes) {
								if (resRes.data && resRes.data.data && resRes.data.data.access_token) {
									accessToken = resRes.data.data.access_token;
								} else {
									console.warn('wx.request warn:api/get-access-token')
									saveError('获取Token异常', resRes);
								}
								if (typeof success == 'function') {
									resRes.data.userInfo = resInfo.userInfo; //添加用户信息
									success.call(this, resRes.data);
								}
								wx.hideToast();
							},
							fail: function (err) {
								//console.error('wx.request error:api/get-access-token');
								saveError('获取Token失败', err);
								wx.hideToast();
							}
						})
					},
					fail: function (resInfo) {
						//console.error('wx.getUserInfo error:' + resInfo.errMsg);
						wx.hideToast();
						saveError('微信授权失败', resInfo);
					}
				})
			} else {
				saveError('微信登录异常', res);
				//console.error('wx.login error:' + res.errMsg)
				wx.hideToast();
			}
		},
		error: function (loginErr) {
			saveError('微信登录失败', loginErr);
			wx.hideToast();
		}
	});
}

function request(route, method, data, success, fail) {
	if (accessToken == '') {
		login(function () {
			request(route, method, data, success, fail)
		})
		return false
	}
	isLoading();
	wx.request({
		url: getServerUrl(route),
		method: server == 'local' ? 'GET' : method,
		data: data,
		header: {
			'content-type': 'application/x-www-form-urlencoded',
			'platform': 'wechatapp',
			'access-token': accessToken
		},
		success: function (res) {
			if (res.data.code == 0 && typeof success == 'function') {
				success.call(this, res.data)
			} else if (res.data.code == 10001) {
				//token已过期的约定，重新发起登录
				login(function () {
					request(route, method, data, success, fail);
				})
			} else {
				saveError('服务端接口异常：' + route, res);
				if (route == 'v2/user-course/video-url') {
					wx.showModal({
						title: '温馨提示',
						content: '您暂时没有权限播放该课程',
						success: function (err2) {

						}
					});
				}

			}
			wx.hideToast();
		},
		fail: function (err) {
			console.error('wx.request error:' + route);
			saveError('服务端接口失败：' + route);
			wx.hideToast();

		}
	});
}
function isLoading(options) {
	const {title, mask, duration} = options || {};
	let opt = {
		title: (title || '加载中'),
		mask: (mask || true),
		icon: 'loading',
		duration: (duration || 5000)
	};
	wx.showToast(opt);
};

function initInfo() {
	wx.getSystemInfo({
		success: function (res) {
			systemInfo = res;
		},
		error: function () {
			saveError('获取信息失败');
		}
	})
}

initInfo();//初始化系统信息

//对外的接口
module.exports = {
	save: save,
	saveError: saveError,
	saveDebug: saveDebug,
	request, request
}