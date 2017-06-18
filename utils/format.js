import { isNotEmpty, isIdCard } from './validate';
import Events from './events';

const format = {

  // 格式化日期
  date: function (date, fmt) {
	if (!date || !fmt) {
	  return date;
	}
	if (date.length == 8) {
	  date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2)
	}
	date = new Date(date.toString().replace(/-/g, "/"));
	var o = {
	  "M+": date.getMonth() + 1, //月份
	  "d+": date.getDate(), //日
	  "h+": date.getHours(), //小时
	  "m+": date.getMinutes(), //分
	  "s+": date.getSeconds(), //秒
	  "q+": Math.floor((date.getMonth() + 3) / 3), //季度
	  "S": date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	  if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
  },

  // 根据身份证获取出生年月
  getBirthdayByIdCard(idCard) {
	if (!isIdCard(idCard)) {
	  return;
	}
	let tmpStr;
	if (idCard.length == 15) {
	  tmpStr = idCard.substring(6, 12);
	  tmpStr = "19" + tmpStr;
	  tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
	  return tmpStr;
	} else {
	  tmpStr = idCard.substring(6, 14);
	  tmpStr = tmpStr.substring(0, 4) + "-" + tmpStr.substring(4, 6) + "-" + tmpStr.substring(6)
	  return tmpStr;
	}
  },

  // 根据身份证获取性别
  getSexByIdCard(idCard) {
	if (!isIdCard(idCard)) {
	  return;
	}
	return (parseInt(idCard.substr(16, 1)) % 2)
  },
  	//动态取title关键字
  getKey(_props,type){
  	let t = {
		"I":{val:"身份证",link:"identity"},
		"P":{val:"护照",link:"passport"},
		"GA":{val:"港澳通行证",link:"gatePass"},
		"TW":{val:"台湾通行证",link:"gatePass"},
		"OTHER":{val:"",link:""},
	};
  	let {query}=_props.location;
	let key = query&&query.certType||"OTHER";

	return type ? t[key][type]:t[key];
  }
};

module.exports = format;