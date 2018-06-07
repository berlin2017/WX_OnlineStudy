//app.js
var JMessage = require('./jpush/jmessage-wxapplet-sdk-1.4.0.min.js')
var md5 = require('./jpush/md5.js')

App({

  onHide:function(){
    console.log("app进入后台");
  },

  onShow: function () {
    console.log("app进入前台");
  },
  
  
  onLaunch: function () {
    // 展示本地存储能力
    // qcloud.setLoginUrl(config.url + 'getwxinfo');
    // qcloud.setLoginUrl(config.url + 'login');
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log(res);
        
      }
    })  
  },


  globalData: {
    myUser:null,
    res:null,
    jim:null,
    userInfo: null,
    userType:2,
    jim:null,
  }  

})