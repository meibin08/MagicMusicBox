"use strict";

var cookies = {
  get: (name) => {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return decodeURIComponent(arr[2]);
    else
      return null;
  },
  set: (name, value, expire = 60) => {
    var minute = expire;
    var exp = new Date();
    exp.setTime(exp.getTime() + minute * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + exp.toUTCString() + ";path=/";
  },
  remove: (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = cookies.get(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString() + ";path=/";
  },
};

export default cookies;