//app.js
var JMessage = require('./jpush/jmessage-wxapplet-sdk-1.4.0.min.js')
var md5 = require('./jpush/md5.js')

App({

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
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              this.globalData.res = res

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
              console.log(res);
            }
          })
        }else{
          wx.authorize({
            scope: 'scope.userInfo',
            success(){
              wx.getUserInfo({
                success: res => {
                  // 可以将 res 发送给后台解码出 unionId
                  this.globalData.userInfo = res.userInfo
                  this.globalData.res = res

                  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                  // 所以此处加入 callback 以防止这种情况
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                }
              })
            }
          })
        }
      }
    })


  //jpush
    var jim = new JMessage({
      // debug : true
    });
    var time = Date.parse(new Date());
    var random_str = "022cd9fd995849b";
    var s = "appkey=" + "20a1f8331c8e462116c4d24e" + "&timestamp=" + time +"&random_str="+random_str+"&key=fc92fd7140c3e9b228d368fb"
    var signature = md5.hexMD5(s);
    jim.init({
      "appkey": "20a1f8331c8e462116c4d24e",
      "random_str": random_str,
      "signature": signature,
      "timestamp": time,
      "flag":1,
    }).onSuccess(function (data) {
      //TODO
     console.log('im初始化成功');
    }).onFail(function (data) {
      //TODO
      console.log('im初始化失败');
    });  
    this.globalData.jim = jim;


    jim.onDisconnect(function () {
      var new_time = Date.parse(new Date());
      var new_random_str = "022cd9fd995849b";
      var new_s = "appkey=" + "20a1f8331c8e462116c4d24e" + "&timestamp=" + time + "&random_str=" + random_str + "&key=fc92fd7140c3e9b228d368fb"
      var new_signature = md5.hexMD5(new_s);
      jim.init({
        "appkey": "20a1f8331c8e462116c4d24e",
        "random_str": new_random_str,
        "signature": new_signature,
        "timestamp": new_time,
        "flag": 1,
      })
    });
  },


  globalData: {
    myUser:null,
    res:null,
    jim:null,
    userInfo: null,
  }  

})