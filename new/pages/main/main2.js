// pages/main/main2.js
var app = getApp();
var util = require('../../utils/util.js');
var TIME = 1000;
var JMessage = require('../../jpush/jmessage-wxapplet-sdk-1.4.0.min.js')
var md5 = require('../../jpush/md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  intMsgReceive: function (e) {
    var that = this;
    // wx.showLoading({
    //   title: '',
    // })
    that.data.jim.onMsgReceive(function (data) {
      console.log(data);

      for (var index in data.messages) {


        // if (data.messages[index].from_username) {

        //   var history = wx.getStorageSync(data.messages[index].from_username);
        //   if (!history || history == '') {
        //     history = [];
        //   } else {
        //     history = JSON.parse(history);
        //   }

        //   if (data.messages[index].content.msg_type === 'image') {
        //     app.globalData.jim.getResource({
        //       'media_id': data.messages[index].content.msg_body.media_id,
        //     }).onSuccess(function (res) {
        //       //data.code 返回码
        //       //data.message 描述
        //       //data.url 资源临时访问路径
        //       data.messages[index].content.msg_body.media_id = res.url
        //     }).onFail(function (res) {
        //       //data.code 返回码
        //       //data.message 描述
        //     });
        //   }
        //   data.messages[index].content.create_time = util.formatTime(new Date(data.messages[index].content.create_time));
        //   var msgs = history.concat(data.messages);
        //   wx.setStorage({
        //     key: data.messages[index].content.msg_body.extras.orderId,
        //     data: JSON.stringify(msgs),
        //   })
        // }
        if (data.messages[index].content.msg_type === 'text' && data.messages[index].content.msg_body.text === '发起视频通话') {
          console.log('发起视频通话');
          wx.navigateTo({
            url: '../test/chating' + '?id=' + data.messages[0].content.from_id + '&type=' + app.globalData.userType + '&orderId=' + data.messages[index].content.msg_body.extras.orderId + '&call_type=1',
          })
          return;
        } else if (data.messages[index].content.msg_type === 'text' && data.messages[index].content.msg_body.text === '发起语音通话') {
          console.log('发起语音通话');
          wx.navigateTo({
            url: '../test/chating' + '?id=' + data.messages[0].content.from_id + '&type=' + app.globalData.userType + '&orderId=' + data.messages[index].content.msg_body.extras.orderId + '&call_type=0',
          })
          return;
        }
        wx.showModal({
          title: '新消息',
          content: '来自' + data.messages[0].content.from_name + '是否查看',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '../test/chating' + '?id=' + data.messages[0].content.from_id + '&type=' + app.globalData.userType+ '&orderId=' + data.messages[index].content.msg_body.extras.orderId,
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      }
    });

  },

  toTeacherMain: function () {
    app.globalData.userType = 1;
    wx.showLoading({
      title: '',
      mask: true,
    })
    wx.request({
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      url: 'https://weixin.ywkedu.com/App/teacher_check',
      data: {
        openId: app.globalData.myUser.openId
      },
      success: function (res) {
        wx.hideLoading();
        console.log(res);
        if (res.data.msg == 1) {
          wx.navigateTo({
            url: '../teacher/main',
          })
          // wx.navigateTo({
          //   url: '../teacher/user?enable=2',
          // })
        } else if (res.data.msg == 0) {
          wx.showToast({
            title: '账户审核中...',
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../teacher/user?enable=1',
            })
          }, 1000);

        } else if (res.data.msg == 2) {
          wx.showToast({
            title: '账户冻结中…',
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../teacher/user?enable=2',
            })
          }, 1000);

        } else {
          wx.navigateTo({
            url: '../teacher/regist',
          })

        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showToast({
          title: '请求失败',
        })
      },
    })
  },

  toStudentMain: function () {
    app.globalData.userType = 2;
    wx.switchTab({
      url: '../student/main',
    })
  },

  initJMessage: function (e) {
    wx.showLoading({
      title: '',
      mask:true,
    })
    var that = this;
    //jpush
    var jim = new JMessage({
      // debug : true
    });
    var time = Date.parse(new Date());
    var random_str = "022cd9fd995849b";
    var s = "appkey=" + "20a1f8331c8e462116c4d24e" + "&timestamp=" + time + "&random_str=" + random_str + "&key=fc92fd7140c3e9b228d368fb"
    var signature = md5.hexMD5(s);
    jim.init({
      "appkey": "20a1f8331c8e462116c4d24e",
      "random_str": random_str,
      "signature": signature,
      "timestamp": time,
      "flag": 1,
    }).onSuccess(function (data) {
      //TODO
      console.log('im初始化成功');
      that.data.jim = jim;
      that.registeJMessage(app.globalData.myUser.openId, app.globalData.userInfo.nickName, app.globalData.userInfo.avatarUrl,e);
    }).onFail(function (data) {
      //TODO
      console.log('im初始化失败');
      that.initJMessage(e);
    });
  },

  registeJMessage: function (username, nickName, avatarUrl,e) {
    var that = this;
    that.data.jim.register({
      'username': username,
      'password': 'ah123456',
      'is_md5': false,
      'nickname': nickName,
      'media_id': avatarUrl,
    }).onSuccess(function (data) {
      that.loginJMessage(username,e);
    }).onFail(function (data) {
      // 同上
      if (data.code == 882002) {
        that.loginJMessage(username,e);
      } else {
        console.log('注册失败');
      }
    });
  },

  loginJMessage: function (username,e) {
    var that = this;
    that.data.jim.login({
      'username': username,
      'password': 'ah123456'
    }).onSuccess(function () {
      wx.showToast({
        title: '登录成功',
      })
      that.intMsgReceive();
      wx.hideLoading();
      if(e.currentTarget.dataset.type == '1'){
        that.toTeacherMain();
      }else{
        that.toStudentMain();
      }
    }).onFail(function (data) {
      //同上
      console.log(data);
      that.loginJMessage(username);

    });
  },

})