const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  // initJMessage: initJMessage,
}


// function initJMessage() {
//   wx.showLoading({
//     title: '',
//     mask: true,
//   })
//   //jpush
//   var jim = new JMessage({
//     // debug : true
//   });
//   var time = Date.parse(new Date());
//   var random_str = "022cd9fd995849b";
//   var s = "appkey=" + "20a1f8331c8e462116c4d24e" + "&timestamp=" + time + "&random_str=" + random_str + "&key=fc92fd7140c3e9b228d368fb"
//   var signature = md5.hexMD5(s);
//   jim.init({
//     "appkey": "20a1f8331c8e462116c4d24e",
//     "random_str": random_str,
//     "signature": signature,
//     "timestamp": time,
//     "flag": 1,
//   }).onSuccess(function (data) {
//     //TODO
//     console.log('im初始化成功');
//     jim.login({
//       'username': app.globalData.myUser.openId,
//       'password': 'ah123456'
//     }).onSuccess(function () {
//       // wx.showToast({
//       //   title: '登录成功',
//       // })
//       console.log("登录成功");

//       wx.hideLoading();
//       jim.onSyncConversation(function (data) {
//         console.log("离线消息");
//         console.log(data);
//         wx.setStorageSync("allMessage", data);
//       });

//       jim.onMsgReceive(function (data) {
//         that.handlerMessage(data);
//       });

//     }).onFail(function (data) {
//       //同上
//       console.log(data);
//       // wx.showToast({
//       //   title: '登录失败',
//       // })
//       console.log("登录失败");
//       wx.hideLoading();
//       that.initJMessage();
//     });
//   }).onFail(function (data) {
//     //TODO
//     console.log('im初始化失败');
//     that.initJMessage();
//   });
// }