import promise from 'es6-promise'
import fetch from 'isomorphic-fetch'
import StaticToast from '@cube-src/components/common/Toast';


promise.polyfill();
var urlInfo = {};
export const fetchJson = (options) => {

  let { url, type, data={}, ...others } = options;

  let urlSplit = url.split("/")
  urlInfo.urlName = urlSplit[urlSplit.length-1];
  urlInfo.startTime =Date.now();

  let opts = {
		...others,
		method: type || 'get',
		credentials: 'include',
		headers: {
			// Referer: "http://music.163.com",
			// Host: "music.163.com",
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
  };

  if(['POST','PUT'].indexOf(opts.method.toUpperCase()) >= 0){

		opts.body =  JSON.stringify(data);

  };

  typeof opts.beforeSend === 'function' && opts.beforeSend(opts);

  return fetch(url, opts)
	.then(resData => toJson(resData, opts))
	.then(resData => resHandler(resData, opts))
	// .finally(res => {
 //      typeof opts.finally === 'function' && opts.finally(res);
 //    });
	// .catch(error => errorHandler(error, opts))
}

function toJson(resp, options) {
  if (resp.status >= 400) {
	return errorHandler(null, options, resp.status)
  }
  return resp.json()
}

// 请求成功处理
function resHandler(resData, options) {
	console.log(`$$-fetch-----------${urlInfo.urlName}:请求耗时----${Date.now() - urlInfo.startTime}ms-------$$`);

  // Loading(false);
  if (resData.status && resData.status != 200) {
	return errorHandler(resData.error, options, resData.status);
  }

  if (!resData || resData.code > 10000) {
	options.error && options.error(resData)
		return Promise.reject(resData);
	StaticToast.error(resData.error);
  } else {
		options.success && options.success(resData);
		return (resData);
  }
}

// 异常处理
function errorHandler(error, options, status) {
  options.error && options.error(error);
  StaticToast.error(`网络异常，请稍后重试(${status})`)
  return Promise.reject(error);
}

