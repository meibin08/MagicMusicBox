import { v4 as uuidv4 } from 'uuid';

const format = {
  // 格式化日期
  date: function (date: any, fmt: string) {
    if (!date || !fmt) {
      return date;
    }
    if (date.length == 8) {
      date = date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2);
    }
    if (typeof date !== 'number' && date.length <= 20) {
      //小于20 ，时间格式为  “yyyy-MM-dd hh:mm:ss” 有时分秒
      date = date.toString().replace(/-/g, '/');
    }
    date = new Date(date);
    interface oProps {
      'M+': number;
      'd+': number; //日
      'h+': number; //小时
      'm+': number; //分
      's+': number; //秒
      'q+': any; //季度
      S: number; //毫秒
      [k: string]: any;
    }
    var o: oProps = {
      'M+': date.getMonth() + 1, //月份
      'd+': date.getDate(), //日
      'h+': date.getHours(), //小时
      'm+': date.getMinutes(), //分
      's+': date.getSeconds(), //秒
      'q+': Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds(), //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    return fmt;
  },
  guid(isReplace?: boolean): string {
    let uid = uuidv4();
    return !isReplace ? uid : uid.replace(/-/g, '');
    // return Math.random().toString(36).substr(5).toUpperCase();
  },
  digits(value: number, n = 2): any {
    if (isNaN(value)) {
      return false;
    }
    var f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
      rs = s.length;
      s += '.';
    }
    while (s.length <= rs + 2) {
      s += '0';
    }
    return s;
    // return Math.round(value*Math.pow(10,n))/Math.pow(10,n);
  },
  GetAgeByBirthday(birthday) {
    function parseDate(str) {
      var date = new Date();
      var times = str.split('-');
      date.setFullYear(times[0]);
      date.setMonth(times[1] - 1);
      date.setDate(times[2]);
      return date;
    }

    var age = -1;
    var today = new Date();
    var todayYear = today.getFullYear();
    var todayMonth = today.getMonth() + 1;
    var todayDay = today.getDate();
    var bday = parseDate(birthday);
    var birthdayYear = bday.getFullYear();
    var birthdayMonth = bday.getMonth();
    var birthdayDay = bday.getDate();

    if (todayYear - birthdayYear < 0) {
      alert('出生日期选择错误!');
    } else {
      if (todayMonth - birthdayMonth > 0) {
        age = todayYear - birthdayYear;
      } else if (todayMonth - birthdayMonth < 0) {
        age = todayYear - birthdayYear - 1;
      } else if (todayMonth - birthdayMonth === 0) {
        if (todayDay - birthdayDay >= 0) {
          age = todayYear - birthdayYear;
        } else {
          age = todayYear - birthdayYear - 1;
        }
      }
    }
    return age == 0 ? 1 : age;
  },
  GetQueryString(url: string) {
    var reg = new RegExp('(^|&)' + url + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  },
  timeForMat(count) {
    // 拼接时间
    let time1 = new Date();
    time1.setTime(time1.getTime() - 24 * 60 * 60 * 1000);
    let time2 = new Date();
    time2.setTime(time2.getTime() - 24 * 60 * 60 * 1000 * count);
    let Y2 = time2.getFullYear();
    let M2 = time2.getMonth() + 1 > 10 ? time2.getMonth() + 1 : '0' + (time2.getMonth() + 1);
    let D2 = time2.getDate() > 10 ? time2.getDate() : '0' + time2.getDate();
    let timer2 = Y2 + '-' + M2 + '-' + D2; // 之前的7天或者30天
    return timer2;
  },
};
export default format;
