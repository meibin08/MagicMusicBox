/*
 * @authors :Bin Mei
 * @date    :2019-05-02
 * @description： 修改页面标题
 */
import Validate from './validate';


let bridge = {
  setTitle: (title: any, callBack?: Function) => {
    let defaultTitle = '幻方';
    if (Validate.isFromWeixin()) {
      wechatSetTitle(title || defaultTitle);
    } else {
      document.title = title || defaultTitle;
    };
    callBack && callBack();
  }
};

// 解决IOS在微信内不更新title的bug
function wechatSetTitle(title: string) {
  document.title = title;
  var i = document.createElement('iframe');
  // i.src = ZALogo;
  i.src = 'https://cdn-qcloud.zhongan.com/a00000/welfare/ZALogo.png';
  i.style.display = 'none';
  i.onload = function () {
    setTimeout(function () {
      i.remove();
    }, 9)
  }
  document.body.appendChild(i);
}

export default bridge;