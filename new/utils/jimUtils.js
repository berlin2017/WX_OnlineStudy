var JMessage = require('../jpush/jmessage-wxapplet-sdk-1.4.0.min.js')
var md5 = require('../jpush/md5.js')

var app = getApp();

export default class IMEventHandler {

  constructor(headers) {
    app.globalData.jim = new JMessage();
    wx.showLoading({
      title: '',
      mask: true,
    })
    var time = Date.parse(new Date());
    var random_str = "022cd9fd995849b";
    var s = "appkey=" + "20a1f8331c8e462116c4d24e" + "&timestamp=" + time + "&random_str=" + random_str + "&key=fc92fd7140c3e9b228d368fb"
    var signature = md5.hexMD5(s);
    app.globalData.jim.init({
      "appkey": "20a1f8331c8e462116c4d24e",
      "random_str": random_str,
      "signature": signature,
      "timestamp": time,
      "flag": 1,
    }).onSuccess(function (data) {
      //TODO
      wx.hideLoading()
      console.log('im初始化成功');
      initSuccess();
    }).onFail(function (data) {
      //TODO
      wx.hideLoading()
      console.log('im初始化失败');
      initFail();
    });

    
  }

}

function register(){
  app.globalData.jim.register({
    'username': username,
    'password': 'ah123456',
    'is_md5': false,
    'nickname': nickName,
    'media_id': avatarUrl,
  }).onSuccess(function (data) {
    that.loginJMessage(username, e);
  }).onFail(function (data) {
    // 同上
    if (data.code == 882002) {
      that.loginJMessage(username, e);
    } else {
      console.log('注册失败');
    }
  });

}

function initSuccess(){
  console.log('im初始化成功');
}


function initFail() {
  console.log('im初始化成功');
}