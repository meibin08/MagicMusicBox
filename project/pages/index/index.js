//index.js
//获取应用实例
import {RequestJson} from "../../utils/request.js";
import Store from "../../utils/storage.js";
var config = require('../../config.js');


var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
    // Store.set("test",1234,2)
    Store.remove("test");
    
    RequestJson({
      url:"/api/tokens",
      type:"POST",
      success:res=>{
      }
    })
  }
})
