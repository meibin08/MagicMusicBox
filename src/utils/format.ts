const format = {
  // 格式化日期
  date(date: any, fmt: string) {
    if (!date || !fmt) {
      return date;
    }
    if (date.length == 8) {
      date = `${date.substr(0, 4)}-${date.substr(4, 2)}-${date.substr(6, 2)}`;
    }
    if (typeof date !== 'number' && date.length <= 20) {
      // 小于20 ，时间格式为  “yyyy-MM-dd hh:mm:ss” 有时分秒
      date = date.toString().replace(/-/g, '/');
    }
    date = new Date(date);
    interface oProps {
      'M+': number;
      'd+': number; // 日
      'h+': number; // 小时
      'm+': number; // 分
      's+': number; // 秒
      'q+': any; // 季度
      S: number; // 毫秒
      [k: string]: any;
    }
    const o: oProps = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      S: date.getMilliseconds(), // 毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        `${date.getFullYear()}`.substr(4 - RegExp.$1.length)
      );
    for (const k in o)
      if (new RegExp(`(${k})`).test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length)
        );
    return fmt;
  },

  digits(value: number, n = 2): any {
    if (isNaN(value)) {
      return false;
    }
    const f = Math.round(value * Math.pow(10, n)) / Math.pow(10, n);
    let s = f.toString();
    let rs = s.indexOf('.');
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
};
export default format;
